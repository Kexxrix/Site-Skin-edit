import argparse, base64, hashlib, json
from pathlib import Path
from datetime import datetime, timezone
from PIL import Image, ImageDraw, ImageFont
ap=argparse.ArgumentParser()
ap.add_argument("icon")
args=ap.parse_args()
allowed={"action-support","action-notice","action-attendance"}
if args.icon not in allowed: raise ValueError("Unexpected icon")
root=Path(r"E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3")
payload=root/"refs"/(args.icon+"-tool-payload.base64")
raw=base64.b64decode(payload.read_text(encoding="utf-8"),validate=False)
sha=hashlib.sha256(raw).hexdigest()
dest=root/"results"/(args.icon+".png")
with dest.open("xb") as f: f.write(raw)
assert hashlib.sha256(dest.read_bytes()).hexdigest()==sha
with Image.open(dest) as im:
    assert im.format=="PNG" and im.mode=="RGBA", (im.format,im.mode)
    im.load()
    img=im.copy()
a=img.getchannel("A")
assert a.getextrema()==(0,255)
mask=a.point(lambda v:255 if v>8 else 0)
bbox=mask.getbbox()
w,h=img.size
corner_alpha=[a.getpixel(p) for p in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]]
assert corner_alpha==[0,0,0,0]
exports=[]
for size in (16,24,32):
    out=root/"exports"/str(size)/(args.icon+".png")
    out.parent.mkdir(parents=True,exist_ok=True)
    reduced=img.resize((size,size),Image.Resampling.LANCZOS)
    with out.open("xb") as f: reduced.save(f,format="PNG",optimize=True)
    with Image.open(out) as chk:
        assert chk.mode=="RGBA" and chk.size==(size,size)
        chk.load()
    exports.append({"size":size,"path":str(out),"sha256":hashlib.sha256(out.read_bytes()).hexdigest(),"byte_size":out.stat().st_size})
sheet=Image.new("RGB",(540,210),"#FFFFFF")
draw=ImageDraw.Draw(sheet)
bgs=[("#FFFFFF","WHITE"),("#F1F2F4","GRAY"),("#FF8A3D","ORANGE")]
for j,(bg,label) in enumerate(bgs):
    x=j*180
    draw.rectangle((x,0,x+179,209),fill=bg)
    draw.text((x+16,10),label,fill="#222222")
    for i,size in enumerate((16,24,32)):
        y=45+i*48
        draw.text((x+16,y+5),str(size)+"px",fill="#222222")
        small=img.resize((size,size),Image.Resampling.LANCZOS)
        sheet.paste(small,(x+86,y),small)
draw.text((16,193),args.icon+" / ACTUAL PIXELS",fill="#222222")
qa=root/"qa"/(args.icon+"-actual-16-24-32.png")
with qa.open("xb") as f:sheet.save(f,format="PNG")
zoom=img.resize((24,24),Image.Resampling.LANCZOS)
composite=Image.new("RGBA",(24,24),"#FFFFFF")
composite.alpha_composite(zoom)
large=composite.convert("RGB").resize((288,288),Image.Resampling.NEAREST)
with (root/"qa"/(args.icon+"-24px-nearest.png")).open("xb") as f:large.save(f,format="PNG")
record={
"icon":args.icon,"created_utc":datetime.now(timezone.utc).isoformat(),
"tool":"built-in image_gen","mode":"generate using visual style reference",
"source_output_path":None,"source_output_kind":"embedded data:image/png;base64 tool result",
"transfer_operation":"lossless base64 decode to exclusive-create PNG; no source filesystem image was moved",
"payload_path":str(payload),"final_path":str(dest),"sha256_before":sha,"sha256_after":sha,
"byte_size":len(raw),"format":"PNG","mode":"RGBA","dimensions":[w,h],
"alpha_extrema":a.getextrema(),"corner_alpha":corner_alpha,
"visible_bbox_alpha_gt_8":bbox,
"transparent_padding_fractions":[bbox[0]/w,bbox[1]/h,(w-bbox[2])/w,(h-bbox[3])/h],
"prompt_path":str(root/"prompts"/(args.icon+".txt")),
"style_reference":{"page_id":"page_47645aed071c81918769018d818cb7f0","reference":"library-file:fde1_bGliZmlsZV95Z1l2cVF0T001WXVWSFpHeUJDZTFR_FileDrive_0981513dfcb08191b072af9fa2582442","sha256":"bf07e48a3bd6d21f6d8eca98c3bc1c2a42720dd6ddf9e462e2cf094e54aa3833","used_as":"style only; not arrow geometry"},
"exports":exports,"qa_actual":str(qa),"status":{"generated":True,"technical_validation":"passed","visual_review":"pending","user_approved":False,"site_adopted":False},
"postprocessing":"Original pixels and alpha preserved. Only LANCZOS resizing and background composites for QA."}
rec=root/"refs"/(args.icon+"-generation.json")
with rec.open("x",encoding="utf-8") as f:json.dump(record,f,ensure_ascii=False,indent=2)
print(json.dumps({"icon":args.icon,"path":str(dest),"sha256":sha,"byte_size":len(raw),"mode":img.mode,"size":img.size,"alpha":a.getextrema(),"bbox":bbox,"padding":record["transparent_padding_fractions"],"qa":str(qa)},ensure_ascii=False))

