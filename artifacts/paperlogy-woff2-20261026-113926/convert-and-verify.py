"""Convert complete original fonts to WOFF2 and verify preserved font content."""
from pathlib import Path
from datetime import datetime, timezone, timedelta
import hashlib
import json
import importlib.metadata

from fontTools.ttLib import TTFont, woff2
from fontTools.pens.recordingPen import RecordingPen

QA = Path(__file__).resolve().parent
ROOT = QA.parents[1]
PACK = ROOT / "assets/fonts/paperlogy"
manifest = json.loads((PACK / "manifest.json").read_text(encoding="utf-8"))
output = PACK / "woff2"
assert not output.exists(), "Inspect existing outputs before converting"
output.mkdir()
checks = []

for item in manifest["weights"]:
    source = PACK / item["file"]
    destination = output / (source.stem + ".woff2")
    source_bytes = source.read_bytes()
    assert hashlib.sha256(source_bytes).hexdigest() == item["sha256"]
    woff2.compress(str(source), str(destination))
    encoded = destination.read_bytes()
    assert encoded[:4] == b"wOF2"

    with TTFont(source, recalcTimestamp=False) as original, TTFont(
        destination, recalcTimestamp=False
    ) as converted:
        assert converted.flavor == "woff2"
        assert original.sfntVersion == converted.sfntVersion
        assert original.getGlyphOrder() == converted.getGlyphOrder()
        assert original.getBestCmap() == converted.getBestCmap()
        assert original["hmtx"].metrics == converted["hmtx"].metrics
        assert original["head"].unitsPerEm == converted["head"].unitsPerEm
        stable_tags = set(original.reader.keys()) - {"head", "glyf", "loca", "DSIG"}
        stable_tables_equal = all(
            original.reader[tag] == converted.reader[tag] for tag in stable_tags
        )
        assert stable_tables_equal

        original_glyphs = original.getGlyphSet()
        converted_glyphs = converted.getGlyphSet()
        outlines = hashlib.sha256()
        for name in original.getGlyphOrder():
            original_pen = RecordingPen()
            converted_pen = RecordingPen()
            original_glyphs[name].draw(original_pen)
            converted_glyphs[name].draw(converted_pen)
            assert original_pen.value == converted_pen.value, name
            outlines.update(json.dumps([name, original_pen.value]).encode("utf-8"))
            original_program = getattr(original["glyf"][name], "program", None)
            converted_program = getattr(converted["glyf"][name], "program", None)
            assert (original_program.getBytecode() if original_program else b"") == (
                converted_program.getBytecode() if converted_program else b""
            ), name

        record = {
            "cssWeight": item["cssWeight"],
            "source": item["file"],
            "file": destination.relative_to(PACK).as_posix(),
            "sourceSha256": item["sha256"],
            "sha256": hashlib.sha256(encoded).hexdigest(),
            "sourceBytes": len(source_bytes),
            "sizeBytes": len(encoded),
            "glyphCount": len(original.getGlyphOrder()),
            "unicodeMappingCount": len(original.getBestCmap()),
            "allGlyphOutlinesAndHintProgramsEqual": True,
            "outlineDigestSha256": outlines.hexdigest(),
            "cmapMetricsGlyphOrderAndUnitsPerEmEqual": True,
            "unchangedRawTables": sorted(stable_tags),
            "sourceTables": sorted(original.reader.keys()),
            "convertedTables": sorted(converted.reader.keys()),
            "subset": False,
            "glyphOrMetricsEdits": False,
        }

    assert hashlib.sha256(source.read_bytes()).hexdigest() == item["sha256"]
    assert hashlib.sha256(Path(item["source"]).read_bytes()).hexdigest() == item["sha256"]
    checks.append(record)
    print(f"Verified {item['cssWeight']}: {len(source_bytes)} -> {len(encoded)} bytes", flush=True)

report = {
    "result": "pass",
    "completedAt": datetime.now(timezone(timedelta(hours=9))).isoformat(),
    "tool": "fontTools.ttLib.woff2.compress",
    "toolDocumentation": "https://fonttools.readthedocs.io/en/stable/ttLib/woff2.html",
    "versions": {name: importlib.metadata.version(name) for name in ["fonttools", "brotli"]},
    "toolEnvironment": json.loads((QA / "setup.json").read_text(encoding="utf-8"))["toolEnvironment"],
    "fullFontsNoSubsetting": True,
    "originalTtfPreserved": True,
    "files": checks,
    "totalTtfBytes": sum(x["sourceBytes"] for x in checks),
    "totalWoff2Bytes": sum(x["sizeBytes"] for x in checks),
}
(QA / "conversion.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(QA / "tool-requirements.txt").write_text(
    "".join(f"{name}=={version}\n" for name, version in report["versions"].items()), encoding="utf-8"
)
print(json.dumps({"result": "pass", "fonts": len(checks), "ttfBytes": report["totalTtfBytes"], "woff2Bytes": report["totalWoff2Bytes"]}), flush=True)
