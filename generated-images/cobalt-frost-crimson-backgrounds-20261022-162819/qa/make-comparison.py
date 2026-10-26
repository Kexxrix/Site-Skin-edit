from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json
base=Path("E:/codexwork/Site-Skin-edit/generated-images/cobalt-frost-crimson-backgrounds-20261022-162819")
labels=[("cobalt","ROYAL COBALT","Cobalt optical glass"),("frost","FROST AZURE","Frost / crystalline ice"),("crimson","GGR CRIMSON","Obsidian / crimson light")]
font_path="C:/Windows/Fonts/arial.ttf"
font=ImageFont.truetype(font_path,26)
small=ImageFont.truetype(font_path,16)
thumbw=600
thumbh=round(1820*thumbw/1920)
pad=20
canvas=Image.new("RGB",(thumbw*3+pad*4,thumbh+94),(24,25,28))
draw=ImageDraw.Draw(canvas)
for i,(key,title,subtitle) in enumerate(labels):
    with Image.open(base/"qa"/f"{key}-applied.png") as im:
        im.load()
        thumb=im.convert("RGB").resize((thumbw,thumbh),Image.Resampling.LANCZOS)
    x=pad+i*(thumbw+pad)
    draw.text((x,14),title,font=font,fill=(240,243,248))
    draw.text((x,45),subtitle,font=small,fill=(165,175,190))
    canvas.paste(thumb,(x,78))
canvas.save(base/"qa"/"comparison.png")
checks=[]
for p in (base/"results").glob("*.png"):
    with Image.open(p) as im:
        im.load()
        checks.append(dict(file=str(p),format=im.format,size=im.size,readable=True,bytes=p.stat().st_size))
with open(base/"run.json",encoding="utf-8") as f: json.load(f)
print(json.dumps(dict(resultImages=checks,comparison=str(base/"qa"/"comparison.png"),runJsonValid=True)))

