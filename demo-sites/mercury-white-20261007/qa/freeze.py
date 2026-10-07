from pathlib import Path
import hashlib,json,subprocess,shutil,zipfile
qa=Path(__file__).resolve().parent;root=qa.parent;site=root/'site'
base='c5b033a3a714b94be846c62554823b773abe8329';expected='f9e5847acccbe6bd2790abab9b448d15494ffe17'
def git(p,*args):return subprocess.check_output(['git','-c','safe.directory='+p.as_posix(),*args],cwd=p)
def rec(p):
 b=p.read_bytes();return {'path':str(p.resolve()),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
assert git(site,'rev-parse','HEAD').decode().strip()==expected
assert git(site,'merge-base',base,expected).decode().strip()==base
assert not git(site,'status','--porcelain').strip()
assert not git(site,'remote').strip()
baseline=json.loads((root/'input/source-baseline.json').read_text(encoding='utf-8'))
preserved={}
for key in ['editor','original_mercury']:
 original=baseline[key];p=Path(original['path']);assert git(p,'rev-parse','HEAD').decode().strip()==original['head'];assert git(p,'status','--short').decode().strip()==original['status']
 for name,value in original['files'].items():assert rec(p/name)['sha256']==value['sha256'],key+name
 preserved[key]={'files':len(original['files']),'head':original['head'],'status':original['status'],'unchanged':True}
inputFile=root/'input/mercury-palette_98.json';inputRec=rec(inputFile)
assert inputRec['bytes']==3132 and inputRec['sha256']=='f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5'
assert (site/'theme/mercury-palette_98.json').read_bytes()==inputFile.read_bytes()
assert git(site,'show',expected+':theme/mercury-palette_98.json')==inputFile.read_bytes()
assets=[n for n in baseline['new_base']['files'] if n.startswith('public/')]
for name in assets:assert rec(site/name)['sha256']==baseline['new_base']['files'][name]['sha256'],name
changed=git(site,'diff','--name-only',base,expected).decode().splitlines();files={}
for name in git(site,'ls-files','-z').decode().split('\0'):
 if not name:continue
 p=site/name;v=rec(p);blob=git(site,'show',expected+':'+name)
 assert p.read_bytes().replace(b'\r\n',b'\n')==blob.replace(b'\r\n',b'\n'),name
 v['normalized_git_blob_sha256']=hashlib.sha256(blob).hexdigest()
 if name in changed:
  target=qa/'source-final'/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,target);assert rec(target)['sha256']==v['sha256'];v['frozen_copy']=str(target)
 else:assert v['sha256']==baseline['new_base']['files'][name]['sha256'],name
 files[name]=v
archive=qa/'mercury-white-source.zip';git(site,'-c','core.autocrlf=false','archive','--format=zip','-o',str(archive),expected)
with zipfile.ZipFile(archive) as z:
 names={i.filename for i in z.infolist() if not i.is_dir()};assert names==set(files)
 for name in names:assert z.read(name)==git(site,'show',expected+':'+name),name
 assert z.read('theme/mercury-palette_98.json')==inputFile.read_bytes()
(qa/'change.patch').write_bytes(git(site,'diff','--binary',base,expected))
ui=json.loads((qa/'ui-results.json').read_text(encoding='utf-8'));theme=json.loads((qa/'theme-results.json').read_text(encoding='utf-8'));server=json.loads((qa/'server-final.json').read_text(encoding='utf-8-sig'))
assert ui['fail']==theme['fail']==0
assert server['WhitePID']==17860 and server['EditorPID']==35992 and server['WhiteHTTP']==server['EditorHTTP']==200 and server['LaunchShellStillRunning'] is False
status={'phase':'Frozen implementation ready for independent QA','site':str(site),'branch':'mercury-white-20261007','commit':expected,'url':'http://127.0.0.1:5418/','white_pid':17860,'editor_preserved_pid':35992,'approved_input_sha256':inputRec['sha256'],'ui_pass':ui['pass'],'theme_pass':theme['pass'],'build_exit':0,'typecheck_exit':0,'new_lint_exit':0,'related_lint_existing_diagnostics':1,'related_lint_new_diagnostics':0,'independent_qa_complete':False,'png_pixels_viewed':False,'parent_send_tool_available':False}
(qa/'status.json').write_text(json.dumps(status,ensure_ascii=False,indent=2),encoding='utf-8')
manifest={'base_commit':base,'commit':expected,'branch':'mercury-white-20261007','site':str(site),'url':'http://127.0.0.1:5418/','git_status':'clean','remotes':[],'changed_files':changed,'diffstat':git(site,'diff','--stat',base,expected).decode().strip(),'source':files,'input':inputRec,'input_git_blob_exact':True,'source_archive':rec(archive),'preserved':preserved,'public_assets_preserved':len(assets),'checks':{'theme_pass':theme['pass'],'ui_pass':ui['pass'],'fail':0,'typecheck_exit':0,'build_exit':0,'new_modules_lint_exit':0,'related_lint_existing':1,'related_lint_new':0,'diff_check_exit':0},'server':server,'last_change':'Build-only compiler final blank line removed; runtime sources/CSS/build input unchanged and passed checks reused','png_access':json.loads((root/'input/receipt.json').read_text(encoding='utf-8')),'pixel_comparison':json.loads((qa/'pixel-comparison.json').read_text(encoding='utf-8')),'independent_qa_complete':False,'transaction_submission':0,'remote_push':0,'deployment':0,'build_outputs':{str(p.relative_to(site)):rec(p) for p in (site/'dist').rglob('*') if p.is_file()},'artifacts':{str(p.relative_to(qa)):rec(p) for p in qa.rglob('*') if p.is_file() and 'source-final' not in p.parts and p.name not in ['final-source.json','server-stdout.log','server-stderr.log']},'project_documents':{p.name:rec(p) for p in root.glob('*.md')}}
(qa/'final-source.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'commit':expected,'files':len(files),'changed':changed,'hashes':{n:files[n]['sha256'] for n in changed if n in files},'input':inputRec,'archive':rec(archive),'preserved':preserved,'ui_pass':ui['pass'],'theme_pass':theme['pass'],'server':server},ensure_ascii=False,indent=2))
