from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json, hashlib
root=Path("E:/codexwork/Site-Skin-edit/generated-images/together-pink-header-refine-20261022-170232")
w=760; h=round(1820*w/1920); pad=20
out=Image.new("RGB",(w*2+pad*3,h+80),(25,22,26))
d=ImageDraw.Draw(out); f=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",24); small=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",15)
for i,(file,title,desc) in enumerate([("reference-before.png","BEFORE","User-enlarged mascot / background 80%"),("together-pink-final.png","HEADER + SOFTER BACKGROUND","Themed header / body background 38%")]):
    with Image.open(root/"qa"/file) as im:
        im.load();thumb=im.convert("RGB").resize((w,h),Image.Resampling.LANCZOS)
    x=pad+i*(w+pad);d.text((x,10),title,font=f,fill=(245,226,238));d.text((x,40),desc,font=small,fill=(174,153,168));out.paste(thumb,(x,68))
out.save(root/"qa"/"before-after.png")
originals=[
("E:/codexwork/Site-Skin-edit/generated-images/together-pink-3d-mascot-20261022-164324/results/together-pink-fantasy-background-v1.png","3f4fdbd0d79a7399b23d92f7f81c4d6f8cb3dabf1fb45a1861aa4d6e3f54370d"),
("E:/codexwork/Site-Skin-edit/generated-images/together-pink-3d-mascot-20261022-164324/results/together-pink-star-mascot-v1.png","c5c8b39ed920bec3c8f90e0e4d15709cc3ddda78fde58189f6b1f35de527b6d7")]
checks=[]
for file,expected in originals:
    actual=hashlib.sha256(Path(file).read_bytes()).hexdigest()
    checks.append(dict(file=file,sha256=actual,originalUnchanged=actual==expected))
if not all(x["originalUnchanged"] for x in checks): raise RuntimeError("Original asset changed")
(root/"qa"/"source-preservation.json").write_text(json.dumps(checks,indent=2),encoding="utf-8")
json.load(open(root/"run.json",encoding="utf-8"))
print(json.dumps(dict(runJsonValid=True,originalAssetsUnchanged=True,qaComparisonCreated=True)))

