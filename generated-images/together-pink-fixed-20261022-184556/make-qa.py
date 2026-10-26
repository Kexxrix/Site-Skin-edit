from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, hashlib
root=Path(__file__).resolve().parent
qa=root/"qa"
font=ImageFont.truetype("C:/Windows/Fonts/malgun.ttf",22)
small=ImageFont.truetype("C:/Windows/Fonts/malgun.ttf",17)
im=Image.open(qa/"pink-full-v1.png").convert("RGB")
im.crop((0,0,1920,900)).save(qa/"pink-top.png")
im.save(qa/"pink-full.png")
canvas=Image.new("RGB",(1664,870),"#21121c")
d=ImageDraw.Draw(canvas)
d.text((24,14),"Together Pink / 24 원본 레이아웃 유지 · 이미지 7종 교체",font=font,fill="#f7c3df")
for i,(file,label) in enumerate([("source-pink.png","원본 · 24페이지"),("pink-full.png","복사본 · 25페이지 / 생성 이미지 적용")]):
    p=Image.open(qa/file).convert("RGB");p.thumbnail((800,760),Image.Resampling.LANCZOS)
    x=24+i*816;d.text((x,54),label,font=small,fill="#f5e7f0");canvas.paste(p,(x,92))
canvas.save(qa/"comparison.png")
board=Image.new("RGB",(1600,1395),"#21121c")
bd=ImageDraw.Draw(board)
keys=["banner-payback","banner-events","banner-reward","gateway-casino","gateway-slots","gateway-sports","gateway-inplay"]
meta=[]
for i,k in enumerate(keys):
    p=root/"results"/(k+".png")
    with Image.open(p) as v:
        size=list(v.size);fmt=v.format;v.verify()
    meta.append({"key":k,"size":size,"format":fmt,"bytes":p.stat().st_size,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()})
    thumb=Image.open(p).convert("RGB");thumb.thumbnail((760,295),Image.Resampling.LANCZOS)
    row,col=divmod(i,2);x=20+col*800;y=20+row*345
    bd.text((x,y),k,font=small,fill="#f7c3df");board.paste(thumb,(x,y+32))
board.save(qa/"generated-contact-sheet.png")
(root/"asset-inventory.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({"assets":len(meta),"allReadable":True,"layoutComparison":str(qa/"comparison.png")},ensure_ascii=False))
