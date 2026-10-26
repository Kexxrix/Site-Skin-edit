from pathlib import Path
from PIL import Image
import sys,json,hashlib,shutil
root=Path(__file__).resolve().parent.parent
src=Path(sys.argv[1]).resolve()
index=int(sys.argv[2])
m=json.loads((root/'run.json').read_text(encoding='utf-8-sig'))
a=m['assets'][index]
suffix=sys.argv[3] if len(sys.argv)>3 else ''
dst=(root/'results'/(a['id']+suffix+'.png')).resolve()
if not dst.is_relative_to(root) or dst.exists(): raise RuntimeError('Unsafe target or collision')
with Image.open(src) as im:
 im.load(); fmt=im.format; size=im.size; mode=im.mode
if fmt!='PNG': raise RuntimeError('Expected PNG')
before=hashlib.sha256(src.read_bytes()).hexdigest()
shutil.copy2(src,dst)
after=hashlib.sha256(dst.read_bytes()).hexdigest()
assert before==after
with Image.open(dst) as im: im.load()
src.unlink()
if suffix:
 m.setdefault('superseded_candidates',[]).append(dict(a,rejection_reason='face and pose too similar to series anchor',state='not_selected'))
 m['counts']['rejected']+=1
a.update(original_tool_path=str(src),final_path=str(dst),transfer='move',sha256=after,bytes=dst.stat().st_size,format=fmt,width=size[0],height=size[1],mode=mode,state='generated',technical_valid=True,accepted_by_user=False,adopted=False)
m['counts']['attempted']+=1
m['counts']['generated']+=1
m.setdefault('attempt_log',[]).append({'asset':a['id'],'status':'generated','prompt_path':a['prompt_path']})
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'asset':a['id'],'path':str(dst),'size':size,'sha256':after}))

