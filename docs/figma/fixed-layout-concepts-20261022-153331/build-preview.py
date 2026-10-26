from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path("E:/codexwork/Site-Skin-edit/docs/figma/fixed-layout-concepts-20261022-153331")
keys=[("gallery","01  WHITE GALLERY"),("hanji","02  HANJI INK"),("bio","03  BIO MEMBRANE")]
width=600
title=44
gap=16
canvas=Image.new("RGB",(width*3+gap*4,round(1820*width/1920)+title+gap*2),"#242424")
draw=ImageDraw.Draw(canvas)
font_path=Path("C:/Windows/Fonts/segoeuib.ttf")
font=ImageFont.truetype(str(font_path),18) if font_path.exists() else ImageFont.load_default()
for i,(key,label) in enumerate(keys):
    source=Image.open(root/"qa"/(key+"-final.png")).convert("RGB")
    source.thumbnail((width,round(1820*width/1920)),Image.Resampling.LANCZOS)
    x=gap+(width+gap)*i
    draw.text((x,gap+8),label,font=font,fill="#ffffff")
    canvas.paste(source,(x,gap+title))
canvas.save(root/"qa"/"comparison.png")
print(str(root/"qa"/"comparison.png"))

