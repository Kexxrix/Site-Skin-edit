from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json
BASE=Path(r"E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3")
ids=("action-gift","state-empty-slip","sport-motorsport")
sizes=(16,24,32)
backgrounds=(("#ffffff","WHITE"),("#ececec","LIGHT GRAY"))
sheet=Image.new("RGB",(900,365),"#f7f7f7")
d=ImageDraw.Draw(sheet)
d.text((12,10),"ALDEBARAN V3 | GIFT / EMPTY SLIP / MOTORSPORT",fill="#252a2e")
d.text((12,30),"Actual 16 / 24 / 32 px raster icons, no pixel edits to originals",fill="#252a2e")
sheet4=Image.new("RGB",(1100,500),"#f7f7f7")
d4=ImageDraw.Draw(sheet4)
d4.text((12,10),"4x nearest-neighbor view of actual 16 / 24 / 32 px icons",fill="#252a2e")
tech=[]
for row,icon in enumerate(ids):
    im=Image.open(BASE/"results"/(icon+".png"))
    a=im.getchannel("A")
    record={"icon":icon,"alpha_bbox_threshold_1":a.point(lambda v:255 if v>=1 else 0).getbbox(),
            "alpha_bbox_threshold_128":a.point(lambda v:255 if v>=128 else 0).getbbox(),
            "alpha_bbox_threshold_250":a.point(lambda v:255 if v>=250 else 0).getbbox(),
            "alpha_extrema":a.getextrema(),"alpha_ge_250":sum(a.histogram()[250:])}
    d.text((12,90+row*80),icon,fill="#252a2e")
    d4.text((12,75+row*130),icon,fill="#252a2e")
    for col,(bg,label) in enumerate(backgrounds):
        x=225+col*330
        y=65+row*80
        d.rectangle((x,y,x+318,y+70),fill=bg)
        if row==0: d.text((x+8,y+2),label,fill="#252a2e")
        x4=210+col*440
        y4=55+row*135
        d4.rectangle((x4,y4,x4+427,y4+125),fill=bg)
        for j,size in enumerate(sizes):
            small=im.resize((size,size),Image.Resampling.LANCZOS)
            xx=x+38+j*96
            yy=y+30
            sheet.paste(small,(xx,yy),small)
            d.text((xx,y+57),str(size),fill="#252a2e")
            large=small.resize((size*4,size*4),Image.Resampling.NEAREST)
            sheet4.paste(large,(x4+8+j*141,y4+10),large)
            d4.text((x4+8+j*141,y4+112),str(size)+"px",fill="#252a2e")
    tech.append(record)
out=BASE/"qa"/"gift-ticket-helmet-actual-size.png"
assert not out.exists()
sheet.save(out)
out4=BASE/"qa"/"gift-ticket-helmet-pixel-4x.png"
assert not out4.exists()
sheet4.save(out4)
with (BASE/"qa"/"gift-ticket-helmet-alpha-metrics.json").open("x",encoding="utf-8") as f:json.dump(tech,f,indent=2)
print(json.dumps(tech))

