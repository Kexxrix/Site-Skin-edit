from pathlib import Path
import json, hashlib, shutil
from PIL import Image
assets=[{"key":"background","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-cff9461f-84b7-4731-bddb-54933a1176fa.png","final":"E:/codexwork/Site-Skin-edit/generated-images/together-pink-3d-mascot-20261022-164324/results/together-pink-fantasy-background-v1.png"},{"key":"mascot","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-985fd484-4268-4c6b-9e2c-e4d06698e66c.png","final":"E:/codexwork/Site-Skin-edit/generated-images/together-pink-3d-mascot-20261022-164324/results/together-pink-star-mascot-v1.png"}]
root=Path("E:/codexwork/Site-Skin-edit").resolve()
records=[]
for a in assets:
    source=Path(a["source"]).resolve(); dest=Path(a["final"]).resolve()
    if not dest.is_relative_to(root): raise RuntimeError("Outside requested project")
    if dest.exists(): raise RuntimeError("Output collision")
    before=hashlib.sha256(source.read_bytes()).hexdigest()
    with Image.open(source) as im:
        im.load(); fmt=im.format; size=im.size; mode=im.mode
        alpha=im.getchannel("A") if "A" in im.getbands() else None
        alpha_info=dict(extrema=alpha.getextrema(),bbox=alpha.getbbox(),transparent_pixels=sum(1 for v in alpha.getdata() if v==0)) if alpha else None
    if a["key"]=="mascot" and (alpha_info is None or alpha_info["transparent_pixels"]==0): raise RuntimeError("Missing actual transparency")
    shutil.move(str(source),str(dest))
    after=hashlib.sha256(dest.read_bytes()).hexdigest()
    if before!=after: raise RuntimeError("SHA mismatch")
    with Image.open(dest) as im: im.verify()
    records.append(dict(a,operation="move",sha256_before=before,sha256_after=after,sha256_match=True,format=fmt,width=size[0],height=size[1],mode=mode,alpha=alpha_info,bytes=dest.stat().st_size,readable=True,generated=True,user_approved=False))
Path("E:/codexwork/Site-Skin-edit/generated-images/together-pink-3d-mascot-20261022-164324/qa/asset-moves.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(records))

