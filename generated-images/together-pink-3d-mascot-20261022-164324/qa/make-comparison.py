from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json
base=Path("E:/codexwork/Site-Skin-edit/generated-images/together-pink-3d-mascot-20261022-164324")
width=800; h=round(1820*width/1920); pad=20
canvas=Image.new("RGB",(width*2+pad*3,h+88),(25,23,26))
draw=ImageDraw.Draw(canvas)
font=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",24)
small=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",15)
for i,(file,title,desc) in enumerate([("reference-before.png","BEFORE","Together Pink / fixed layout"),("together-pink-applied.png","3D MASCOT + FANTASY WORLD","Separate transparent mascot and background")]):
    im=Image.open(base/"qa"/file).convert("RGB")
    x=pad+i*(width+pad)
    draw.text((x,12),title,font=font,fill=(246,226,239))
    draw.text((x,42),desc,font=small,fill=(170,155,168))
    canvas.paste(im.resize((width,h),Image.Resampling.LANCZOS),(x,70))
canvas.save(base/"qa"/"before-after.png")
# A QA crop from the final screenshot, preserving actual asset files.
im=Image.open(base/"qa"/"together-pink-applied.png")
im.crop((0,1068,290,1460)).save(base/"qa"/"mascot-placement-detail.png")
json.load(open(base/"run.json",encoding="utf-8"))
print("QA comparison created; run.json parsed; source asset files untouched.")

