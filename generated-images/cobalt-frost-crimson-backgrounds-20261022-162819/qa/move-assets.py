from pathlib import Path
import json, hashlib, shutil
from PIL import Image
assets = [{"key":"cobalt","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-e10378fb-acf8-49f6-960e-ccdefce629f3.png","final":"E:/codexwork/Site-Skin-edit/generated-images/cobalt-frost-crimson-backgrounds-20261022-162819/results/royal-cobalt-glass-background-v1.png"},{"key":"frost","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-9a9b88ac-3836-488f-9fc8-f569c14f962d.png","final":"E:/codexwork/Site-Skin-edit/generated-images/cobalt-frost-crimson-backgrounds-20261022-162819/results/frost-azure-ice-background-v1.png"},{"key":"crimson","source":"C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-19e7ecb4-8621-41cc-89aa-025ebd38f10e.png","final":"E:/codexwork/Site-Skin-edit/generated-images/cobalt-frost-crimson-backgrounds-20261022-162819/results/ggr-crimson-obsidian-background-v1.png"}]
project=Path("E:/codexwork/Site-Skin-edit").resolve()
records=[]
for a in assets:
    source=Path(a["source"]).resolve()
    dest=Path(a["final"]).resolve()
    if not dest.is_relative_to(project): raise RuntimeError("Destination outside project")
    if not source.is_file(): raise RuntimeError("Missing successful output: "+str(source))
    if dest.exists(): raise RuntimeError("Output collision: "+str(dest))
    before=hashlib.sha256(source.read_bytes()).hexdigest()
    with Image.open(source) as im:
        im.load()
        fmt, size, mode=im.format, im.size, im.mode
    if fmt!="PNG": raise RuntimeError("Unexpected actual file type")
    shutil.move(str(source),str(dest))
    after=hashlib.sha256(dest.read_bytes()).hexdigest()
    if before!=after: raise RuntimeError("Move hash mismatch")
    with Image.open(dest) as im: im.verify()
    records.append(dict(a,operation="move",sha256_before=before,sha256_after=after,sha256_match=True,format=fmt,width=size[0],height=size[1],mode=mode,bytes=dest.stat().st_size,readable=True,source_exists_after=source.exists(),generated=True,visual_review="pass",user_approved=False,figma_applied=False))
Path("E:/codexwork/Site-Skin-edit/generated-images/cobalt-frost-crimson-backgrounds-20261022-162819/qa/asset-moves.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(records,ensure_ascii=False))

