"""Offline evidence audit. Reads artifacts; only writes verification.json."""
from pathlib import Path
import copy
import hashlib
import json
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent

def log(name):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))["results"]

def stable(value):
    value = copy.deepcopy(value)
    def visit(node):
        if isinstance(node, dict):
            if node.get("keyframes"):
                node.pop("value", None)  # evaluated at each comp's current time
            for child in node.values():
                visit(child)
        elif isinstance(node, list):
            for child in node:
                visit(child)
    visit(value)
    return value

dual = log("log-2026-09-11T06-36-57-871Z.json")
comparisons = {}
for comp in ["TITAN_TwoCuts_Devices_Kinetic_3s_v003", "TITAN_DEVICE_iPhone_3D_v003"]:
    snapshots = [r["response"]["result"] for r in dual
                 if r.get("call", {}).get("name") == "ae_layer_info"
                 and r["call"]["args"]["compNameOrId"] == comp]
    comparisons[comp] = stable(snapshots[0]) == stable(snapshots[1])

before = next(r["response"]["result"]["layers"] for r in log("log-2026-09-11T06-26-39-452Z.json")
              if r.get("call", {}).get("name") == "ae_layer_info")
after = next(r["response"]["result"]["layers"] for r in log("log-2026-09-11T06-35-37-887Z.json")
             if r.get("call", {}).get("name") == "ae_layer_info")
for layer in before:
    comparisons[layer["name"]] = stable(layer) == stable(next(r for r in after if r["id"] == layer["id"]))

settings = [r["response"]["result"] for r in dual
            if r.get("call", {}).get("args", {}).get("operation") == "project.get_settings"]
for state in settings:
    state.pop("file", None)
    state.pop("numItems", None)
comparisons["projectSettingsExcludingPathAndItemCount"] = settings[0] == settings[1]

a = np.array(Image.open(ROOT / "baseline-ipad-2.2.png").convert("RGB"))
b = np.array(Image.open(ROOT / "mapped-ipad-2.2.png").convert("RGB"))
mask = Image.fromarray(np.uint8((a.min(2) > 65) & (a.max(2) < 140)) * 255).copy()
ImageDraw.floodfill(mask, (1200, 512), 128)
screen = np.array(Image.fromarray(np.uint8(np.array(mask) == 128) * 255).filter(ImageFilter.MaxFilter(7))) > 0
delta = np.max(np.abs(a.astype(int) - b.astype(int)), axis=2)
pixel_check = {
    "method": "Baseline midgray connected screen region seeded at (1200,512), expanded 3 px for edge antialiasing.",
    "changedPixels": int((delta > 0).sum()),
    "changedOutsideScreenMask": int(((delta > 0) & ~screen).sum()),
    "outsideScreenPixelsWithDeltaOver2": int(((delta > 2) & ~screen).sum()),
    "outsideScreenMaximumChannelDelta": int(delta[~screen].max()),
    "note": "Not pixel-identical outside the screen; small render differences remain. No outside-screen material edits were issued.",
}

videos = []
for filename in ["iPad-VideoScreen-Test-3s.mp4", "TITAN-iPad-VideoScreen-Preview-3s.mp4"]:
    path = ROOT / filename
    probe = subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)], capture_output=True, text=True, encoding="utf-8", check=True)
    decode = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "null", "-"], capture_output=True, text=True, encoding="utf-8")
    videos.append({"file": filename, "bytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "metadata": json.loads(probe.stdout), "fullDecodeExitCode": decode.returncode, "fullDecodeErrors": decode.stderr})

deps = [Path("E:/하데스오프닝.mp4"), Path("C:/Users/User/Documents/Codex/2026-09-07/new-chat/work/device-mockup-blender-20260911/exports/iPad10.glb")]
dependency_checks = [{"path": str(p), "bytes": p.stat().st_size, "sha256": hashlib.sha256(p.read_bytes()).hexdigest()} for p in deps]

report = {
    "result": "Screen-only animated video material works in After Effects Beta 27.0x43.",
    "testedRangeSeconds": [0, 3],
    "fullOriginalVideoTested": False,
    "originalVideoDurationSeconds": 14.4166666666667,
    "fit": {"precomp": [2360, 1640], "source": [1920, 1080], "scalePercentFormula": "2360 / 1920 * 100", "scalePercent": 122.916666666667, "crop": False, "sourceInterpretationFpsUnchanged": 24},
    "preservedExposedLayerStateAndKeyframes": comparisons,
    "comparisonNormalization": "Animated properties' current evaluated value is omitted; all reported keyframes and other fields are compared. Project file and item count are expected to differ.",
    "pixelComparison": pixel_check,
    "videos": videos,
    "dependencies": dependency_checks,
    "aePreviewPlayback": "Observed live frame 9 door scene, then frame 85 character face; stopped after verification.",
    "visualReview": {"outputMp4Frames": ["output-ipad-0.2.png", "output-ipad-2.2.png", "output-ipad-2.9.png", "output-main-2.8.png"], "orientationFrames": ["qa-front-0.5.png", "qa-oblique-1.8.png", "qa-back-2.9.png"], "source2DLayerEnabled": False, "backOcclusion": "Screen video not visible through the rear body", "sourceOrientation": "Upright, not mirrored; Fit letterboxing retained"},
    "reopen": {"frame": "final-reopened-ipad-2.9.png", "pixelEqualToPreReopen": bool(np.array_equal(np.array(Image.open(ROOT / "mapped-ipad-2.9.png")), np.array(Image.open(ROOT / "final-reopened-ipad-2.9.png"))))},
    "limitations": ["Initial material assignment stayed gray until the saved AEP was reopened; underlying cause not proven.", "Only the first 3 seconds were tested; the original footage and source frame rate were not changed.", "Browser file-URL playback was blocked, so no browser workaround was attempted. MP4s were fully decoded and extracted frames visually reviewed; AE composition playback was observed live.", "The AEP references external GLB, PNG, and MP4 files and is not a self-contained collected project."],
}
(ROOT / "verification.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"preserved": comparisons, "pixelComparison": pixel_check, "reopen": report["reopen"], "videos": [{"file": v["file"], "bytes": v["bytes"], "decodeExit": v["fullDecodeExitCode"]} for v in videos]}, ensure_ascii=False, indent=2))
