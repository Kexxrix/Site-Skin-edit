import json,hashlib
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path("E:/codexwork/Site-Skin-edit/generated-images/hanji-bio-backgrounds-20261022-160647")
moves=json.loads((root/"qa"/"asset-moves.json").read_text(encoding="utf-8-sig"))
files=json.loads((root/"qa"/"file-verification.json").read_text(encoding="utf-8"))
refs=[{"key":"hanji","path":"E:/codexwork/Site-Skin-edit/docs/figma/fixed-layout-concepts-20261022-153331/qa/hanji-final.png","prompt":"prompts/hanji.txt"},{"key":"bio","path":"E:/codexwork/Site-Skin-edit/docs/figma/fixed-layout-concepts-20261022-153331/qa/bio-final.png","prompt":"prompts/bio.txt"}]
for item in moves:
    item["fileVerification"]=next(f for f in files if Path(f["file"])==Path(item["finalPath"]))
    ref=next(r for r in refs if r["key"]==item["key"])
    item["reference"]={"path":ref["path"],"role":"palette and exposed-background composition only","sha256":hashlib.sha256(Path(ref["path"]).read_bytes()).hexdigest()}
    item["promptFile"]=ref["prompt"]
    item["prompt"]=(root/ref["prompt"]).read_text(encoding="utf-8")
    item["figmaImageHash"]={"hanji":"a2cd80de9ddca68bec20c1503dedeeaff2edda37","bio":"49ead48586ea54525261a8aff33bf6037ae0ebf3"}[item["key"]]
    item["status"]={"generated":True,"qa_pass":True,"selected_by_agent":True,"applied_to_figma":True,"accepted_by_user":False,"site_adopted":False}
run={"date":"2026-10-22","timezone":"Asia/Seoul","tool":"built-in image_gen","mode":"new backgrounds with screenshot style references","attempted":2,"succeeded":2,"failed":0,"skipped":0,"agentSelected":2,"userAccepted":0,"rejected":0,"outputs":moves,"fileKey":"PoUHKHsm9xOYavWBQ7uAGP","pageId":"795:1330","targets":[{"frameId":"884:7328","backgroundId":"886:7514"},{"frameId":"884:8017","backgroundId":"886:7584"}],"preservation":{"contentHashesMatch":True,"protectedNodes":54,"protectedFailures":0},"layoutChanged":False,"webCodeChanged":False,"deployed":False}
(root/"run.json").write_text(json.dumps(run,ensure_ascii=False,indent=2),encoding="utf-8")
w=800;gap=16;title=44;h=round(1820*w/1920)
canvas=Image.new("RGB",(2*w+gap*3,h+title+gap*2),"#242424")
draw=ImageDraw.Draw(canvas)
font=ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf",19)
for i,(key,name) in enumerate([("hanji","HANJI INK / GENERATED BACKGROUND"),("bio","BIO MEMBRANE / GENERATED BACKGROUND")]):
    im=Image.open(root/"qa"/(key+"-applied.png")).convert("RGB")
    im.thumbnail((w,h),Image.Resampling.LANCZOS)
    x=gap+i*(w+gap)
    draw.text((x,gap+8),name,font=font,fill="white")
    canvas.paste(im,(x,gap+title))
canvas.save(root/"qa"/"comparison.png")
print(json.dumps({"run":str(root/"run.json"),"comparison":str(root/"qa"/"comparison.png"),"outputs":len(moves)}))

