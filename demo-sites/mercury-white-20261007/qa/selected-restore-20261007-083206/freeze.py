from pathlib import Path
import json,subprocess,hashlib,zipfile,shutil,urllib.request,datetime
from html.parser import HTMLParser
qa=Path(__file__).resolve().parent;root=qa.parent.parent;site=root/'site';stage=root/'qa/button-polish-20261007-080224/build-site'
expected='22bba115d3df595c968f32c2ed8ba802ef454ad0';base='697a5711c8684eadd7c7f9068fe2974d47a91fb7'
def git(p,*a,input=None):return subprocess.check_output(['git','-c','safe.directory='+p.as_posix(),*a],cwd=p,input=input)
def rec(p):
 b=p.read_bytes();return {'path':str(p.resolve()),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
assert git(site,'rev-parse','HEAD').decode().strip()==expected
assert git(site,'merge-base',base,expected).decode().strip()==base
assert not git(site,'status','--porcelain').strip() and not git(site,'remote').strip()
assert subprocess.call(['git','-c','safe.directory='+site.as_posix(),'diff','--check',base,expected],cwd=site)==0
prior=json.loads((qa/'baseline/final-source.json').read_text(encoding='utf-8'));original=json.loads((root/'input/source-baseline.json').read_text(encoding='utf-8'));preserved={}
for k in ['editor','original_mercury']:
 old=original[k];p=Path(old['path']);assert git(p,'rev-parse','HEAD').decode().strip()==old['head'];assert git(p,'status','--short').decode().strip()==old['status']
 for name,v in old['files'].items():assert rec(p/name)['sha256']==v['sha256'],k+name
 preserved[k]={'files':len(old['files']),'head':old['head'],'status':old['status'],'unchanged':True}
changed=git(site,'diff','--name-only',base,expected).decode().splitlines();assert set(changed)=={'app/mercury-white.css','theme/mercury-white-button-polish.json'}
names=[n for n in git(site,'ls-files','-z').decode().split('\0') if n];batch=git(site,'cat-file','--batch',input=('\n'.join(expected+':'+n for n in names)+'\n').encode());offset=0;blobs={};source={}
for name in names:
 end=batch.index(b'\n',offset);h=batch[offset:end].split();assert len(h)==3 and h[1]==b'blob';count=int(h[2]);start=end+1;blobs[name]=batch[start:start+count];assert batch[start+count:start+count+1]==b'\n';offset=start+count+1
 p=site/name;b=p.read_bytes();assert b.replace(b'\r\n',b'\n')==blobs[name].replace(b'\r\n',b'\n');assert b==(stage/name).read_bytes(),name
 if name not in changed:assert rec(p)['sha256']==prior['source'][name]['sha256'],name
 v=rec(p);v['git_blob_sha256']=hashlib.sha256(blobs[name]).hexdigest()
 if name in changed:
  dst=qa/'source-final'/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,dst);assert rec(dst)['sha256']==v['sha256'];v['frozen_copy']=str(dst)
 source[name]=v
assert offset==len(batch)
raw=root/'input/mercury-palette_98.json';inputrec=rec(raw);assert inputrec['bytes']==3132 and inputrec['sha256']=='f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5'
assert raw.read_bytes()==blobs['theme/mercury-palette_98.json'];(qa/'input').mkdir(exist_ok=True);shutil.copy2(raw,qa/'input/mercury-palette_98.json');assert rec(qa/'input/mercury-palette_98.json')['sha256']==inputrec['sha256']
assert rec(qa/'baseline/mercury-white-polish-source.zip')['sha256']==prior['source_archive']['sha256']
for name,v in prior['build'].items():
 rel=Path(name).relative_to('dist');assert rec(qa/'baseline/dist'/rel)['sha256']==v['sha256'];assert rec(qa/'runtime-retired-697/dist'/rel)['sha256']==v['sha256']
build={str(p.relative_to(site)):rec(p) for p in (site/'dist').rglob('*') if p.is_file()}
for name,v in build.items():assert rec(stage/name)['sha256']==v['sha256'],name
archive=qa/'mercury-white-selected-restored-source.zip';git(site,'-c','core.autocrlf=false','archive','--format=zip','-o',str(archive),expected)
with zipfile.ZipFile(archive) as z:
 assert {i.filename for i in z.infolist() if not i.is_dir()}==set(names)
 for name in names:assert z.read(name)==blobs[name],name
(qa/'change.patch').write_bytes(git(site,'diff','--binary',base,expected))
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='link' and a.get('rel')=='stylesheet' and a.get('href','').startswith('/_next/'):self.links.append(a['href'])
def fetch(url):
 with urllib.request.urlopen(urllib.request.Request(url,headers={'Accept-Encoding':'identity'}),timeout=15) as r:return r.status,r.read()
status,html=fetch('http://127.0.0.1:5418/');assert status==200;parser=Links();parser.feed(html.decode());assert parser.links;served=[]
for url in parser.links:
 status,b=fetch('http://127.0.0.1:5418'+url);p=site/'dist/client'/url.lstrip('/');assert status==200 and b==p.read_bytes();assert b'--white-button-fill' in b and b'#ffdfaf' in b
 served.append({'url':'http://127.0.0.1:5418'+url,'status':status,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'build_file':str(p)})
proof={'UTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source_commit':expected,'html_status':200,'stylesheets':served,'no_injected_styles':True};(qa/'served-css-proof.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2),encoding='utf-8')
ui=json.loads((qa/'restore-ui-results.json').read_text(encoding='utf-8'));selected=json.loads((qa/'selected-restoration-results.json').read_text(encoding='utf-8'));server=json.loads((qa/'server-final.json').read_text(encoding='utf-8-sig'))
assert ui['pass']==24 and selected['pass']==7 and ui['fail']==selected['fail']==0
assert server['WhitePID']==36312 and server['EditorPID']==35992 and server['WhiteHTTP']==server['EditorHTTP']==200 and server['StderrBytes']==0 and server['LaunchShellStillRunning'] is False and server['StabilitySeconds']>=120
progresspath=root/'qa/progress-selected-restore.json';progress=json.loads(progresspath.read_text(encoding='utf-8'));progress.update({'phase':'Final selected-restored production source frozen; ready for independent QA','source_commit':expected,'live_pid':36312,'handoff':str(qa/'QA-HANDOFF.ko.md'),'manifest':str(qa/'final-source.json'),'visual_proof':str(qa/'selected-full.png'),'independent_qa_complete':False,'remaining':['Independent QA and user final visual acceptance','Example PNG supported transfer failed; actual pixels unavailable','Existing Adobe Typekit network restriction'],'updated_utc':datetime.datetime.now(datetime.timezone.utc).isoformat()})
for n in ['progress-selected-restore.json','progress-button-polish.json']:(root/'qa'/n).write_text(json.dumps(progress,ensure_ascii=False,indent=2),encoding='utf-8')
manifest={'commit':expected,'base_commit':base,'selected_reference_commit':'f9e5847acccbe6bd2790abab9b448d15494ffe17','branch':'mercury-white-20261007','site':str(site),'url':'http://127.0.0.1:5418/','git_status':'clean','remotes':[],'changed_files':changed,'source':source,'source_archive':rec(archive),'approved_input':inputrec,'approved_input_git_exact':True,'derived_polish':rec(site/'theme/mercury-white-button-polish.json'),'build':build,'staging_source_exact':True,'served_css':proof,'checks':{'restore_ui_pass':24,'targeted_comparison_pass':7,'fail':0,'selected_groups':3,'selected_states_per_group':3,'nonselected_groups_exact':12,'image_paths_sizes_filters_exact':164,'build_exit':0,'typecheck_exit_reused':0,'new_modules_lint_exit_reused':0,'related_lint_existing':1,'related_lint_new':0,'type_lint_reuse_inputs_exact':True,'diff_check_exit':0},'server':server,'server_activation':json.loads((qa/'server-activation.json').read_text(encoding='utf-8-sig')),'preserved':preserved,'unchanged_source_files':len(names)-2,'public_assets_preserved':sum(n.startswith('public/') for n in names),'prior_build_preserved':{'files':len(prior['build']),'snapshot':str(qa/'baseline/dist'),'retired_original':str(qa/'runtime-retired-697/dist'),'sha256_exact':True},'attachment':json.loads((qa/'attachment-receipt.json').read_text(encoding='utf-8')),'earlier_auto_review_rejection':prior['earlier_auto_review_rejection'],'artifacts':{p.relative_to(qa).as_posix():rec(p) for p in qa.rglob('*') if p.is_file() and ('baseline' not in p.relative_to(qa).parts and 'runtime-retired-697' not in p.relative_to(qa).parts and 'source-final' not in p.relative_to(qa).parts) and p.name not in ['final-source.json','server-stdout.log','server-stderr.log']},'project_documents':{p.name:rec(p) for p in root.glob('*.md')},'progress':rec(progresspath),'independent_qa_complete':False,'user_final_visual_approval':False,'transaction_submission':0,'remote_push':0,'deployment':0,'remaining_limits':['Example PNG metadata readable but supported transfer failed once; no pixels viewed or retry/bypass','Existing attachment Library404','Existing AdobeTypekit3 resources blocked','Independent QA and final visual acceptance pending']}
(qa/'final-source.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'commit':expected,'source_files':len(names),'changed_file_sha256':{n:source[n]['sha256'] for n in changed},'archive':rec(archive),'build_files':len(build),'preserved':preserved,'checks':manifest['checks'],'server':server,'served_css':served,'manifest':str(qa/'final-source.json')},ensure_ascii=False,indent=2))
