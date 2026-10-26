from pathlib import Path
from PIL import Image
import sys,json,hashlib,shutil
root=Path(__file__).resolve().parent.parent; src=Path(sys.argv[1]).resolve(); index=int(sys.argv[2])
m=json.loads((root/'run.json').read_text(encoding='utf-8')); a=m['assets'][index]
dst=(root/'results'/(a['id']+'.png')).resolve()
if not dst.is_relative_to(root) or dst.exists(): raise RuntimeError('Unsafe target or collision')
with Image.open(src) as im: im.load(); fmt=im.format; size=im.size; mode=im.mode
if fmt!='PNG': raise RuntimeError('Expected PNG')
before=hashlib.sha256(src.read_bytes()).hexdigest(); shutil.copy2(src,dst)
after=hashlib.sha256(dst.read_bytes()).hexdigest(); assert before==after
with Image.open(dst) as im: im.load()
src.unlink()
a.update(original_tool_path=str(src),final_path=str(dst),transfer='move',sha256=after,bytes=dst.stat().st_size,format=fmt,width=size[0],height=size[1],mode=mode,state='generated',technical_valid=True,actual_aspect_ratio=size[0]/size[1],exact_16_9=size[0]*9==size[1]*16)
a['inspected_reference_records']=[dict(r,sha256=hashlib.sha256(Path(r['path']).read_bytes()).hexdigest()) for r in m['reference_roles']]
a['generation_references']=[]
m['counts']['attempted']+=1; m['counts']['generated']+=1
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'id':a['id'],'size':size,'exact_16_9':a['exact_16_9'],'sha256_match':True,'path':str(dst)}))

