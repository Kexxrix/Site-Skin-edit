from pathlib import Path
from PIL import Image
import hashlib, shutil, json
assets=[{"key":"background","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-f58eb026-b963-49da-92fa-590bd3dcce29.png","final":"E:/codexwork/Site-Skin-edit/generated-images/cc-lime-cyberpunk-20261022-171315/results/cc-lime-cyberpunk-city-v1.png"},{"key":"header","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-124c298d-c64f-4243-b7da-6cb64febba51.png","final":"E:/codexwork/Site-Skin-edit/generated-images/cc-lime-cyberpunk-20261022-171315/results/cc-lime-cyberpunk-header-v1.png"},{"key":"runner","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-c8ca0e5c-5274-4211-afac-a5a0c298775f.png","final":"E:/codexwork/Site-Skin-edit/generated-images/cc-lime-cyberpunk-20261022-171315/results/cc-lime-cyber-runner-v1.png"},{"key":"scout","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-91980822-478c-47cc-a3f5-9f1eb4483cc0.png","final":"E:/codexwork/Site-Skin-edit/generated-images/cc-lime-cyberpunk-20261022-171315/results/cc-lime-scout-robot-v1.png"}]
root=Path("E:/codexwork/Site-Skin-edit").resolve()
records=[]
for a in assets:
    source=Path(a["source"]).resolve(); dest=Path(a["final"]).resolve()
    if not dest.is_relative_to(root): raise RuntimeError("Outside project")
    if dest.exists(): raise RuntimeError("Output collision")
    before=hashlib.sha256(source.read_bytes()).hexdigest()
    with Image.open(source) as im:
        im.load(); fmt=im.format; size=im.size; mode=im.mode
        alpha=im.getchannel("A") if "A" in im.getbands() else None
        info=dict(extrema=alpha.getextrema(),bbox=alpha.getbbox(),transparentPixels=alpha.histogram()[0]) if alpha else None
    if a["key"] in ("runner","scout") and (info is None or info["transparentPixels"]==0): raise RuntimeError("Alpha missing")
    shutil.move(str(source),str(dest))
    after=hashlib.sha256(dest.read_bytes()).hexdigest()
    if before!=after: raise RuntimeError("SHA mismatch")
    with Image.open(dest) as im: im.verify()
    records.append(dict(a,operation="move",sha256_before=before,sha256_after=after,sha256_match=True,format=fmt,width=size[0],height=size[1],mode=mode,alpha=info,bytes=dest.stat().st_size,readable=True,generated=True,acceptedByUser=False))
Path("E:/codexwork/Site-Skin-edit/generated-images/cc-lime-cyberpunk-20261022-171315/qa/asset-moves.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(records))

