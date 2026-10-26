from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json
base=Path("E:/codexwork/Site-Skin-edit/generated-images/cc-lime-cyberpunk-20261022-171315")
w=760; h=716; pad=20
out=Image.new("RGB",(w*2+pad*3,h+80),(21,25,22))
d=ImageDraw.Draw(out); f=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",24); small=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",15)
for i,(file,title,desc) in enumerate([("reference-before.png","BEFORE","CC Lime / fixed layout"),("cc-lime-cyberpunk-applied.png","CYBERPUNK WORLD","Lime neon city / runner / scout robot")]):
    with Image.open(base/"qa"/file) as im:
        im.load(); thumb=im.convert("RGB").resize((w,h),Image.Resampling.LANCZOS)
    x=pad+i*(w+pad);d.text((x,10),title,font=f,fill=(222,245,195));d.text((x,40),desc,font=small,fill=(155,177,154));out.paste(thumb,(x,68))
out.save(base/"qa"/"before-after.png")
im=Image.open(base/"qa"/"cc-lime-cyberpunk-applied.png").convert("RGB")
im.crop((0,0,im.width,89)).save(base/"qa"/"header-detail.png")
left=im.crop((0,1070,405,1821))
right=im.crop((1660,1575,1935,1821))
detail=Image.new("RGB",(left.width+right.width+30,max(left.height,right.height)+60),(21,25,22))
dd=ImageDraw.Draw(detail);dd.text((12,10),"CYBER RUNNER",font=f,fill=(222,245,195));detail.paste(left,(0,52));dd.text((left.width+30,10),"SCOUT",font=f,fill=(222,245,195));detail.paste(right,(left.width+30,52))
detail.save(base/"qa"/"character-details.png")
json.load(open(base/"run.json",encoding="utf-8"))
print("Comparison and details created; run.json parsed; original generated files unchanged.")

