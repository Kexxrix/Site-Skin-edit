from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, hashlib
root=Path(__file__).resolve().parent
qa=root/"qa"
font=ImageFont.truetype("C:/Windows/Fonts/malgun.ttf",22)
small=ImageFont.truetype("C:/Windows/Fonts/malgun.ttf",17)
with Image.open(qa/"b2-full.png") as im:
    im.crop((0,0,1920,1040)).save(qa/"b2-top.png")
    im.crop((277,621,1869,747)).save(qa/"gateway-display-1592.png")
# Two full pages at an equal scale, for QA only. Source assets are never modified.
canvas=Image.new("RGB",(1664,930),"#101814")
d=ImageDraw.Draw(canvas)
d.text((24,12),"CC Lime / B 원본과 B2 Neon District",font=font,fill="#DDF7C4")
for i,(file,label) in enumerate([("source-b.png","B · 기존 이미지 / 72px 바로가기"),("b2-full.png","B2 · 생성 이미지 / 전면 이미지 124px 바로가기")]):
    im=Image.open(qa/file).convert("RGB"); im.thumbnail((800,830),Image.Resampling.LANCZOS)
    x=24+i*816;d.text((x,52),label,font=small,fill="#DCE8DD");canvas.paste(im,(x,86))
canvas.save(qa/"comparison.png")
# Inspect seven independent source images without changing them.
keys=["hero-payback","hero-events","hero-reward","gateway-casino","gateway-slots","gateway-sports","gateway-inplay"]
board=Image.new("RGB",(1600,1395),"#101814")
bd=ImageDraw.Draw(board)
for i,k in enumerate(keys):
    row,col=divmod(i,2);x=20+col*800;y=20+row*345
    im=Image.open(root/"results"/(k+".png")).convert("RGB");im.thumbnail((760,295),Image.Resampling.LANCZOS)
    bd.text((x,y),k,font=small,fill="#DDF7C4");board.paste(im,(x,y+32))
board.save(qa/"generated-contact-sheet.png")
meta=[]
for p in sorted((root/"results").glob("*.png")):
    with Image.open(p) as im:
        size=list(im.size);fmt=im.format;im.verify()
    meta.append({"key":p.stem,"path":str(p),"size":size,"format":fmt,"bytes":p.stat().st_size,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()})
assert len(meta)==7
(root/"asset-inventory.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({"independentAssets":7,"filesReadable":True,"sourceAssetsModified":False,"qaOutputs":4},ensure_ascii=False))
