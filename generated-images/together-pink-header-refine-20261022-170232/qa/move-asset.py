from pathlib import Path
from PIL import Image
import hashlib, shutil, json
source=Path("C:/Users/User/.codex/generated_images/01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c/exec-c9114ba5-9782-4dbb-b63b-e05bafe9c431.png").resolve()
dest=Path("E:/codexwork/Site-Skin-edit/generated-images/together-pink-header-refine-20261022-170232/results/together-pink-fantasy-header-v1.png").resolve()
root=Path("E:/codexwork/Site-Skin-edit").resolve()
if not dest.is_relative_to(root): raise RuntimeError("Destination outside project")
if dest.exists(): raise RuntimeError("File collision")
before=hashlib.sha256(source.read_bytes()).hexdigest()
with Image.open(source) as im:
    im.load(); fmt=im.format; size=im.size; mode=im.mode
shutil.move(str(source),str(dest))
after=hashlib.sha256(dest.read_bytes()).hexdigest()
if before!=after: raise RuntimeError("SHA mismatch")
with Image.open(dest) as im: im.verify()
record=dict(source=str(source),final=str(dest),operation="move",sha256_before=before,sha256_after=after,sha256_match=True,format=fmt,width=size[0],height=size[1],mode=mode,readable=True,bytes=dest.stat().st_size,accepted_by_user=False)
Path("E:/codexwork/Site-Skin-edit/generated-images/together-pink-header-refine-20261022-170232/qa/asset-move.json").write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(record))

