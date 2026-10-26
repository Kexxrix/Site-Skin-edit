from PIL import Image
from pathlib import Path
import hashlib, json
p=Path(r'E:/codexwork/Site-Skin-edit/docs/figma/zxc-cyan-skin-20261021-185743/reference/milky-way-emerald-desktop-v2.webp')
q=p.with_suffix('.png')
if q.exists(): raise RuntimeError('PNG already exists; inspect before replacing')
with Image.open(p) as a:
 a.load()
 a.save(q, format='PNG')
 with Image.open(q) as b:
  b.load()
  result={'source':str(p),'copy':str(q),'sourceFormat':a.format,'copyFormat':b.format,'size':a.size,'pixelsIdentical':a.mode==b.mode and a.tobytes()==b.tobytes(),'sourceSHA256':hashlib.sha256(p.read_bytes()).hexdigest(),'copySHA256':hashlib.sha256(q.read_bytes()).hexdigest(),'sourceBytes':p.stat().st_size,'copyBytes':q.stat().st_size,'resized':False,'cropped':False,'generated':False}
  assert result['pixelsIdentical']
  print(json.dumps(result))
  (p.parent/'format-copy.json').write_text(json.dumps(result,indent=2),encoding='utf-8')

