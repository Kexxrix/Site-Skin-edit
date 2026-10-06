from pathlib import Path
from PIL import Image
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT.parent/'exports/aligned/256'
TARGET=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site/public/icons/aldebaran-simple-v3-20261006')
TARGET.mkdir(exist_ok=False)
copies=[]
for p in sorted(SOURCE.glob('*.png')):
    data=p.read_bytes();target=TARGET/p.name
    with target.open('xb') as f:f.write(data)
    assert target.read_bytes()==data
    with Image.open(target) as im:
        assert im.format=='PNG' and im.mode=='RGBA' and im.size==(256,256)
        im.verify()
    copies.append({'source':str(p),'target':str(target),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'operation':'exact copy of approved aligned 256px derivative','original_preserved':True})
assert len(copies)==18
with (ROOT/'asset-copy-record.json').open('x',encoding='utf-8') as f:json.dump(copies,f,ensure_ascii=False,indent=2)
print(json.dumps({'copied':len(copies),'bytes':sum(x['bytes'] for x in copies),'path':str(TARGET)}))
