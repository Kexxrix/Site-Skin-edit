from pathlib import Path
from PIL import Image
import hashlib,json
base=Path(__file__).resolve().parents[1]
inventory=[]
for p in sorted((base/'results').glob('*.png')):
    with Image.open(p) as im:
        im.load()
        alpha=im.getchannel('A').getextrema() if im.mode=='RGBA' else None
        inventory.append({'file':p.name,'bytes':p.stat().st_size,'format':im.format,'mode':im.mode,'width':im.width,'height':im.height,'alphaExtrema':alpha,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
out={'count':len(inventory),'uniqueSha256':len(set(x['sha256'] for x in inventory)),'promptCount':len(list((base/'prompts').glob('*.txt'))),'images':inventory}
(base/'qa'/'asset-verification.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
assert out['count']==14 and out['uniqueSha256']==14 and out['promptCount']==14
assert all(x['format']=='PNG' and x['mode']=='RGBA' and x['alphaExtrema'][0]==0 and x['width']==x['height'] for x in inventory)
print(json.dumps(out,ensure_ascii=False))

