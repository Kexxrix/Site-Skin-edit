from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import hashlib, json

root = Path(__file__).resolve().parent
qa = root / "qa"
items = [("A  ·  단일 히어로 + 2×2 바로가기", qa / "a-solo-square-final.png"),
         ("B  ·  중앙 강조 캐러셀 + 슬림 바", qa / "b-center-bars.png")]
font_path = Path("C:/Windows/Fonts/malgun.ttf")
font = ImageFont.truetype(str(font_path), 23)
small = ImageFont.truetype(str(font_path), 17)
canvas = Image.new("RGB", (1664, 930), "#171b1a")
d = ImageDraw.Draw(canvas)
d.text((24, 16), "25 · CC Lime · 레이아웃 바리에이션 / 기존 이미지 재사용", font=font, fill="#d6f8a9")
for i, (label, path) in enumerate(items):
    img = Image.open(path).convert("RGB")
    img.thumbnail((800, 812), Image.Resampling.LANCZOS)
    x = 24 + i * 816
    d.text((x, 57), label, font=small, fill="#e8eee5")
    canvas.paste(img, (x, 94))
canvas.save(qa / "comparison.png")
# Source screenshot crop only for QA, never replace source assets.
detail = Image.new("RGB", (1920, 1700), "#171b1a")
dd = ImageDraw.Draw(detail)
for i, (label, path) in enumerate(items):
    y = i * 850
    dd.text((24, y+10), label+" · 상단 + 주변 콘텐츠", font=font, fill="#d6f8a9")
    img = Image.open(path).convert("RGB")
    detail.paste(img.crop((0, 0, 1920, 790)), (0, y+48))
detail.save(qa / "top-details.png")
files = []
for p in sorted(qa.glob("*.png")):
    with Image.open(p) as image:
        image.verify()
    with Image.open(p) as image:
        size = list(image.size)
        fmt = image.format
    files.append({"path": str(p), "size": size, "format": fmt, "bytes": p.stat().st_size,
                  "sha256": hashlib.sha256(p.read_bytes()).hexdigest()})
(root / "qa-files.json").write_text(json.dumps(files, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"qaImages": len(files), "verified": True, "comparison": str(qa / "comparison.png")}, ensure_ascii=False))
