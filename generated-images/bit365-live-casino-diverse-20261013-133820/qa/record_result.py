from pathlib import Path
from PIL import Image
import sys,json,hashlib,shutil
root=Path(__file__).resolve().parent.parent
src=Path(sys.argv[1]).resolve()
index=int(sys.argv[2])
m=json.loads((root/'run.json').read_text(encoding='utf-8'))
a=m['assets'][index]
suffix=sys.argv[3] if len(sys.argv)>3 else ''
dst=(root/'results'/(a['id']+suffix+'.png')).resolve()
if not dst.is_relative_to(root) or dst.exists(): raise RuntimeError('Unsafe target or collision')
with Image.open(src) as im: im.load(); fmt=im.format; size=im.size; mode=im.mode
if fmt!='PNG': raise RuntimeError('Expected PNG')
before=hashlib.sha256(src.read_bytes()).hexdigest()
shutil.copy2(src,dst)
after=hashlib.sha256(dst.read_bytes()).hexdigest()
assert before==after
with Image.open(dst) as im: im.load()
src.unlink()
if suffix:
 m.setdefault('superseded_candidates',[]).append(dict(a,state='not_selected',reason='facial impression too close to another model in this batch'))
 m['counts']['rejected']+=1
 a['prompt_path']='prompts/'+a['id']+suffix+'.txt'
 a['prompt']=(root/a['prompt_path']).read_text(encoding='utf-8')
a.update(original_tool_path=str(src),final_path=str(dst),transfer='move',sha256=after,bytes=dst.stat().st_size,format=fmt,width=size[0],height=size[1],mode=mode,state='generated',technical_valid=True)
m['counts']['attempted']+=1; m['counts']['generated']+=1
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'id':a['id'],'size':size,'sha256_match':True,'path':str(dst)}))

