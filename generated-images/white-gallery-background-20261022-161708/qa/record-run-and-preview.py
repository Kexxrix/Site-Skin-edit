import json,hashlib
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path("E:/codexwork/Site-Skin-edit/generated-images/white-gallery-background-20261022-161708")
moved=json.loads((root/"qa"/"asset-move.json").read_text(encoding="utf-8-sig"))
info=json.loads((root/"qa"/"file-verification.json").read_text(encoding="utf-8"))
run={"date":"2026-10-22","timezone":"Asia/Seoul","tool":"built-in image_gen","attempted":1,"succeeded":1,"failed":0,"skipped":0,"agentSelected":1,"userAccepted":0,"rejected":0,"asset":{**moved,**info},"prompt":(root/"prompts"/"white-gallery.txt").read_text(encoding="utf-8"),"promptFile":"prompts/white-gallery.txt","reference":{"path":str(root/"qa"/"reference-before.png"),"sha256":hashlib.sha256((root/"qa"/"reference-before.png").read_bytes()).hexdigest(),"role":"palette and exposed-background composition only"},"figma":{"fileKey":"PoUHKHsm9xOYavWBQ7uAGP","pageId":"795:1330","frameId":"884:6638","backgroundId":"896:7502","imageHash":"fda37e82d22561161085cfda7303f5872632cd28","opacity":0.55,"scaleMode":"FILL"},"status":{"generated":True,"qa_pass":True,"selected_by_agent":True,"applied_to_figma":True,"accepted_by_user":False,"site_adopted":False},"preservation":{"uiHashBefore":"3b484d0c","uiHashAfter":"3b484d0c","protectedNodes":55,"protectedFailures":0},"layoutChanged":False,"webCodeChanged":False,"deployed":False}
(root/"run.json").write_text(json.dumps(run,ensure_ascii=False,indent=2),encoding="utf-8")
w=800;gap=16;title=44;h=round(1820*w/1920)
canvas=Image.new("RGB",(2*w+3*gap,h+title+2*gap),"#242424")
draw=ImageDraw.Draw(canvas);font=ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf",19)
for i,(name,path) in enumerate([("WHITE GALLERY / BEFORE",root/"qa"/"reference-before.png"),("WHITE GALLERY / ABSTRACT BACKGROUND",root/"qa"/"white-gallery-applied.png")]):
    im=Image.open(path).convert("RGB");im.thumbnail((w,h),Image.Resampling.LANCZOS)
    x=gap+i*(w+gap);draw.text((x,gap+8),name,font=font,fill="white");canvas.paste(im,(x,gap+title))
canvas.save(root/"qa"/"before-after.png")
print(json.dumps({"run":str(root/"run.json"),"preview":str(root/"qa"/"before-after.png")}))

