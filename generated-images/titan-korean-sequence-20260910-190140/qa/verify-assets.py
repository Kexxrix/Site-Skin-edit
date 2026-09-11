"""Verify saved PNGs without modifying them; --final also checks the delivery ZIP."""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import ntpath
import re
import sys
import zipfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image


EXPECTED_IDS = [f"{number:02d}" for number in range(1, 17)]
ZIP_NAME = "titan-korean-16-images.zip"


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_journal(path: Path, errors: list[str]) -> list[dict]:
    if not path.exists():
        return []
    records = []
    for line_number, line in enumerate(path.read_text(encoding="utf-8-sig").splitlines(), 1):
        if not line.strip():
            continue
        try:
            record = json.loads(line)
            if not isinstance(record, dict):
                raise ValueError("record must be a JSON object")
            value = record.get("file") or record.get("filename") or record.get("final_path") or record.get("path")
            if not isinstance(value, str) or not value:
                raise ValueError("missing file/filename/final_path/path")
            record = dict(record)
            record["_filename"] = ntpath.basename(value)
            record["_line"] = line_number
            records.append(record)
        except (ValueError, TypeError) as exc:
            errors.append(f"Journal line {line_number}: {exc}")
    return records


def verify_zip(zip_path: Path, assets: list[dict], errors: list[str]) -> dict:
    expected = {asset["filename"]: asset for asset in assets}
    report = {"path": str(zip_path), "exists": zip_path.is_file(), "entries": [], "valid": False}
    if not zip_path.is_file():
        errors.append("Final ZIP is missing.")
        return report
    try:
        with zipfile.ZipFile(zip_path, "r") as archive:
            entries = archive.infolist()
            names = [entry.filename for entry in entries]
            if len(names) != 16 or len(set(names)) != 16 or set(names) != set(expected):
                raise ValueError("ZIP must contain exactly the 16 expected PNG filenames, with no extra entries")
            for entry in entries:
                if entry.is_dir() or "/" in entry.filename or "\\" in entry.filename:
                    raise ValueError(f"Unexpected directory entry: {entry.filename}")
                data = archive.read(entry)
                sha256 = digest(data)
                asset = expected[entry.filename]
                matches = sha256 == asset.get("sha256") and len(data) == asset.get("bytes")
                report["entries"].append({"filename": entry.filename, "bytes": len(data), "sha256": sha256, "matches_source": matches})
                if not matches:
                    raise ValueError(f"ZIP bytes/hash do not match the PNG: {entry.filename}")
        report["valid"] = True
    except (OSError, ValueError, RuntimeError, zipfile.BadZipFile) as exc:
        errors.append(f"ZIP validation: {exc}")
    return report


def verify_run(run_root: Path, final: bool = False) -> dict:
    run_root = run_root.resolve()
    results_root = run_root / "results"
    journal_path = run_root / "qa" / "saved-outputs.jsonl"
    errors: list[str] = []
    assets: list[dict] = []
    if not results_root.is_dir():
        errors.append("Results directory does not exist.")
    paths = sorted((path for path in results_root.iterdir() if path.is_file() and path.suffix.lower() == ".png"), key=lambda path: path.name) if results_root.is_dir() else []
    for path in paths:
        item = {"filename": path.name, "path": str(path), "readable": False}
        match = re.match(r"^(\d{2})(?:[-_].+)?\.png$", path.name, re.IGNORECASE)
        scene_id = match.group(1) if match else None
        item["scene_id"] = scene_id
        if scene_id not in EXPECTED_IDS:
            errors.append(f"Invalid scene filename: {path.name}; expected a scene ID from 01 to 16")
        try:
            data = path.read_bytes()
            item.update(bytes=len(data), sha256=digest(data))
            with Image.open(io.BytesIO(data)) as opened:
                image_format = opened.format
                opened.verify()
            with Image.open(io.BytesIO(data)) as opened:
                opened.load()
                width, height = opened.size
            if image_format != "PNG":
                raise ValueError(f"actual format is {image_format}, not PNG")
            width_error = abs(width - height * 16 / 9)
            ratio_pass = width_error <= 1.0
            item.update(readable=True, format=image_format, width=width, height=height, aspect_ratio=width / height, expected_ratio="16:9", width_rounding_error_px=width_error, rounding_tolerance_px=1, ratio_16_9_rounding_pass=ratio_pass)
            if not ratio_pass:
                errors.append(f"Aspect ratio mismatch: {path.name} is {width}x{height}; 16:9 width error {width_error:g}px exceeds 1px")
        except (OSError, ValueError, SyntaxError, Image.DecompressionBombError) as exc:
            errors.append(f"Cannot decode {path.name}: {exc}")
        assets.append(item)

    scene_counts = Counter(asset["scene_id"] for asset in assets if asset["scene_id"] in EXPECTED_IDS)
    duplicate_scenes = sorted(scene_id for scene_id, count in scene_counts.items() if count > 1)
    if duplicate_scenes:
        errors.append(f"Duplicate scene IDs: {', '.join(duplicate_scenes)}")
    hash_counts = Counter(asset["sha256"] for asset in assets if "sha256" in asset)
    duplicate_hashes = sorted(sha256 for sha256, count in hash_counts.items() if count > 1)
    if duplicate_hashes:
        errors.append("Duplicate PNG bytes found: SHA-256 values are not unique.")
    missing_ids = [scene_id for scene_id in EXPECTED_IDS if scene_id not in scene_counts]
    if final and (len(paths) != 16 or missing_ids):
        errors.append(f"Final set requires exactly 16 scenes (01-16); found {len(paths)}, missing: {', '.join(missing_ids) or 'none'}")

    records = read_journal(journal_path, errors)
    if paths and not journal_path.is_file():
        errors.append("PNG files exist but qa/saved-outputs.jsonl is missing.")
    journal_names = Counter(record["_filename"] for record in records)
    for name, count in journal_names.items():
        if count > 1:
            errors.append(f"Duplicate journal filename: {name}")
    actual_names = {asset["filename"] for asset in assets}
    extra_journal = sorted(set(journal_names) - actual_names)
    if extra_journal:
        errors.append(f"Journal refers to absent PNGs: {', '.join(extra_journal)}")
    matched_records = 0
    for asset in assets:
        matches = [record for record in records if record["_filename"] == asset["filename"]]
        if len(matches) != 1:
            errors.append(f"Expected one journal record for {asset['filename']}; found {len(matches)}")
            continue
        record = matches[0]
        record_sha = str(record.get("sha256", "")).lower()
        hash_matches = bool(re.fullmatch(r"[0-9a-f]{64}", record_sha)) and record_sha == asset.get("sha256")
        asset["journal_hash_matches"] = hash_matches
        if not hash_matches:
            errors.append(f"Journal SHA-256 mismatch: {asset['filename']}")
        else:
            matched_records += 1
        for key in ("bytes", "width", "height", "ratio_16_9_rounding_pass"):
            if key in record and record[key] != asset.get(key):
                errors.append(f"Journal {key} mismatch: {asset['filename']}")

    report = {
        "checked_at_utc": datetime.now(timezone.utc).isoformat(),
        "mode": "final" if final else "incremental",
        "run_directory": str(run_root),
        "expected_image_count": 16,
        "image_count": len(paths),
        "total_bytes": sum(asset.get("bytes", 0) for asset in assets),
        "present_scene_ids": sorted(scene_counts),
        "missing_scene_ids": missing_ids,
        "duplicate_scene_ids": duplicate_scenes,
        "unique_sha256": not duplicate_hashes,
        "journal": {"path": str(journal_path), "exists": journal_path.is_file(), "record_count": len(records), "matched_file_and_sha_count": matched_records},
        "assets": assets,
        "zip": {"checked": False, "created": False, "reason": "Incremental mode never creates or checks a ZIP."},
        "source_files_modified": False,
        "errors": errors,
    }
    if final:
        zip_path = run_root / ZIP_NAME
        created = False
        if not errors and not zip_path.exists():
            try:
                buffer = io.BytesIO()
                with zipfile.ZipFile(buffer, "w", compression=zipfile.ZIP_STORED) as archive:
                    for asset in assets:
                        data = Path(asset["path"]).read_bytes()
                        if digest(data) != asset["sha256"] or len(data) != asset["bytes"]:
                            raise ValueError(f"Source changed after verification: {asset['filename']}")
                        archive.writestr(asset["filename"], data)
                with zip_path.open("xb") as output:
                    output.write(buffer.getvalue())
                created = True
            except (OSError, ValueError, zipfile.BadZipFile) as exc:
                errors.append(f"ZIP creation: {exc}")
        if zip_path.is_file():
            report["zip"] = verify_zip(zip_path, assets, errors)
            report["zip"].update(checked=True, created=created)
        else:
            report["zip"] = {"path": str(zip_path), "checked": False, "created": False, "valid": False, "reason": "Input checks failed; ZIP was not created."}
    report["ok"] = not errors
    report["complete_16_scenes"] = len(paths) == 16 and not missing_ids and not duplicate_scenes
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--final", action="store_true", help="Require all 16 scenes, create the ZIP only if absent, verify ZIP bytes, and write qa/verification.json.")
    args = parser.parse_args()
    run_root = Path(__file__).resolve().parents[1]
    report = verify_run(run_root, final=args.final)
    if args.final:
        report_path = run_root / "qa" / "verification.json"
        report["verification_report"] = str(report_path)
        report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())
