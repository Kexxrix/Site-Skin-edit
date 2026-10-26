from pathlib import Path
from PIL import Image
import hashlib,json
paths=["D:/WebDL/ChatGPT 이미지 2026년 10월 16일 오후 12_39_58-1.png","D:/WebDL/ChatGPT 이미지 2026년 10월 16일 오후 12_39_59-2.png","D:/WebDL/ChatGPT 이미지 2026년 10월 16일 오후 12_40_00-3.png"]
items=[]
for path in paths:
 p=Path(path)
 with Image.open(p) as im:
  im.load()
  items.append({"path":str(p),"bytes":p.stat().st_size,"sha256":hashlib.sha256(p.read_bytes()).hexdigest(),"format":im.format,"mode":im.mode,"width":im.width,"height":im.height,"aspectRatio":im.width/im.height})
out=Path(__file__).resolve().parent/'input-metadata.json'
out.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(items,ensure_ascii=True))

