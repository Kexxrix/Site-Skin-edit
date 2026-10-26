from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

qa = Path(__file__).resolve().parent / "qa"
font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 17)
groups = {
    "muted-bands": ["07A-black", "07A-white", "07B-black", "07B-white", "07C-black", "07C-white", "07D-black", "07D-white"],
    "aligned-capsules": ["06-black", "10-black", "18-white"],
}
for output_name, names in groups.items():
    pictures = [(name, Image.open(qa / (name + ".png")).convert("RGB")) for name in names]
    result = Image.new("RGB", (1920, sum(im.height + 36 for _, im in pictures)), "#303030")
    drawing = ImageDraw.Draw(result)
    y = 0
    for name, im in pictures:
        drawing.text((14, y + 8), name, font=font, fill="#E4D6B9")
        result.paste(im, (0, y + 36))
        y += im.height + 36
    result.save(qa / (output_name + ".png"))
print({"source_count": 13, "contact_sheets": list(groups)})

