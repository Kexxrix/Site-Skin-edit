from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json,hashlib
root=Path(r"E:/codexwork/Site-Skin-edit/generated-images/sidebar-library-gold-free-20261019-144156"); items=json.loads((root/"qa/generated-manifest.json").read_text(encoding="utf-8"))
font=ImageFont.truetype("C:/Windows/Fonts/arial.ttf",15)
proof=Image.new("RGB",(1400,720),"#303030"); draw=ImageDraw.Draw(proof);meta=[]
for i,a in enumerate(items):
    p=Path(a["finalPath"]);im=Image.open(p);im.load()
    alpha=im.getchannel("A") if "A" in im.getbands() else None
    bounds=alpha.getbbox() if alpha else None
    corners=[alpha.getpixel(point) for point in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]] if alpha else None
    meta.append({"id":a["id"],"path":str(p),"format":im.format,"mode":im.mode,"width":im.width,"height":im.height,"alphaExtrema":alpha.getextrema() if alpha else None,"cornerAlpha":corners,"bbox":bounds,"sha256":hashlib.sha256(p.read_bytes()).hexdigest(),"bytes":p.stat().st_size})
    x=i%7*200;y=i//7*360
    for offset,bg in [(0,"#141515"),(154,"#F4F3ED")]:
        tile=Image.new("RGB",(196,148),bg);small=im.convert("RGBA");small.thumbnail((132,132));tile.paste(small,((196-small.width)//2,(148-small.height)//2),small);proof.paste(tile,(x,y+offset))
    draw.text((x+8,y+314),a["id"],font=font,fill="#E1CB98")
    # Actual-size icon proof, both light and dark
    for offset,bg in [(0,"#141515"),(52,"#F4F3ED")]:
        tile=Image.new("RGB",(44,36),bg);small=im.convert("RGBA");small.thumbnail((28,28));tile.paste(small,((44-small.width)//2,(36-small.height)//2),small);proof.paste(tile,(x+100+offset,y+312))
proof.save(root/"qa/generated-series-proof.png")
(root/"qa/image-validation.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding="utf-8")
print({"count":len(meta),"readablePng":all(m["format"]=="PNG" for m in meta),"allTransparent":all(m["alphaExtrema"]== (0,255) and m["cornerAlpha"]==[0,0,0,0] for m in meta),"dimensions":[[m["id"],m["width"],m["height"]] for m in meta]})

