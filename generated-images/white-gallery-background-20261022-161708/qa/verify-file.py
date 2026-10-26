import json,hashlib
from pathlib import Path
from PIL import Image
root=Path("E:/codexwork/Site-Skin-edit/generated-images/white-gallery-background-20261022-161708")
path=root/"results"/"white-gallery-abstract-background-v1.png"
with Image.open(path) as im:
    im.load()
    data={"path":str(path),"format":im.format,"width":im.width,"height":im.height,"mode":im.mode,"readable":True,"sha256":hashlib.sha256(path.read_bytes()).hexdigest()}
(root/"qa"/"file-verification.json").write_text(json.dumps(data,indent=2),encoding="utf-8")
print(json.dumps(data))

