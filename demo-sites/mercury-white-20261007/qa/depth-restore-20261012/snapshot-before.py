from pathlib import Path
import hashlib, json, shutil
APP=Path(__file__).resolve().parents[2]/'site'
QA=Path(__file__).parent
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
assert not (QA/'source-before.json').exists()
files=[p for folder in ['app','public','theme'] for p in (APP/folder).rglob('*') if p.is_file()]
(QA/'source-before.json').write_text(json.dumps([{'path':p.relative_to(APP).as_posix(),'bytes':p.stat().st_size,'sha256':digest(p)} for p in files],indent=2)+'\n',encoding='utf-8')
for rel in ['app/mercury-white.css','theme/mercury-white-button-polish.json']:
 dst=QA/'before'/rel;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(APP/rel,dst)
refs={'original-mercury.png':'C:/Users/User/AppData/Local/Temp/codex-clipboard-9af2b83b-5c12-4f5c-9a55-ac2f74748131.png','current-white.png':'C:/Users/User/AppData/Local/Temp/codex-clipboard-e540d050-d10c-47aa-ba0f-41d673e23866.png'}
for name,src in refs.items():
 dst=QA/'reference'/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
 assert digest(Path(src))==digest(dst)
print(json.dumps({'source_files':len(files),'reference_images':len(refs),'app':str(APP)}))
