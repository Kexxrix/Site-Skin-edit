import argparse,hashlib,json,shutil
from pathlib import Path
from PIL import Image
p=argparse.ArgumentParser();p.add_argument('id');p.add_argument('source');p.add_argument('--refs',nargs='*',default=[]);a=p.parse_args()
root=Path(__file__).resolve().parent
assert root.is_relative_to(Path('E:/codexwork/Site-Skin-edit/generated-images').resolve())
src=Path(a.source).resolve()
assert src.is_relative_to(Path('C:/Users/User/.codex/generated_images').resolve())
dest=root/'results'/(a.id+'.png');dest.parent.mkdir(exist_ok=True)
assert not dest.exists(),dest
sha=lambda x:hashlib.sha256(x.read_bytes()).hexdigest()
before=sha(src)
with Image.open(src) as im:
 im.load();fmt=im.format;mode=im.mode;size=im.size
 assert fmt=='PNG'
 alpha=im.convert('RGBA').getchannel('A');hist=alpha.histogram();box=alpha.point(lambda p:255 if p>24 else 0).getbbox()
 transparent=hist[0]/(size[0]*size[1])
shutil.move(str(src),str(dest))
assert sha(dest)==before
with Image.open(dest) as im:im.verify()
record={'id':a.id,'tool_output_path':str(src),'final_path':str(dest),'operation':'move','sha256':before,'bytes':dest.stat().st_size,'format':fmt,'mode':mode,'dimensions':size,'transparent_fraction':transparent,'visible_bbox_alpha24':box,'prompt_path':str(root/'prompts'/(a.id+'.txt')),'references':[{'path':r,'sha256':sha(Path(r))} for r in a.refs],'generation':'succeeded','technical_readability':'pass','visual_qa':'pending_actual_size','selection':'pending','user_approval':'pending','site_adoption':'not_started'}
manifest=root/'run.json';data=json.loads(manifest.read_text(encoding='utf-8'));data['assets'].append(record);manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(record,ensure_ascii=False))
