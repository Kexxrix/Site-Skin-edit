import json
from pathlib import Path
from PIL import Image
root=Path("E:/codexwork/Site-Skin-edit/generated-images/hanji-bio-backgrounds-20261022-160647")
out=[]
for p in (root/"results").glob("*.png"):
    with Image.open(p) as im:
        im.load()
        out.append({"file":str(p),"format":im.format,"width":im.width,"height":im.height,"mode":im.mode,"readable":True})
(root/"qa"/"file-verification.json").write_text(json.dumps(out,indent=2),encoding="utf-8")
print(json.dumps(out))

