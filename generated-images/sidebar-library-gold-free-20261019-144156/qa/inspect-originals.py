import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(r"E:/codexwork/Site-Skin-edit/generated-images/sidebar-library-gold-20261015-172224")
out=Path(r"E:/codexwork/Site-Skin-edit/generated-images/sidebar-library-gold-free-20261019-144156")
(out/"qa").mkdir(parents=True,exist_ok=True)
for name in ["prompts","results"]:(out/name).mkdir(exist_ok=True)
assets=json.loads((root/"run.json").read_text(encoding="utf-8-sig"))["assets"]
font=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",16)
im=Image.new("RGB",(1400,560),"#303030");d=ImageDraw.Draw(im)
for i,a in enumerate(assets):
    src=Image.open(a["finalPath"]).convert("RGBA")
    src.thumbnail((184,224))
    x=(i%7)*200+(200-src.width)//2;y=(i//7)*280+30
    im.paste(src,(x,y),src)
    d.text(((i%7)*200+8,(i//7)*280+250),a["id"],font=font,fill="#E1CB98")
im.save(out/"qa"/"original-icon-series.png")
(out/"qa"/"original-assets.json").write_text(json.dumps([{k:a[k] for k in ["id","label","file","finalPath","sha256"]} for a in assets],ensure_ascii=False,indent=2),encoding="utf-8")
print({"assets":len(assets),"proof":str(out/"qa"/"original-icon-series.png")})

