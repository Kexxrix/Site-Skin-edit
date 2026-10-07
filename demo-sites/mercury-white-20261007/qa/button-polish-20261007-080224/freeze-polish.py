from pathlib import Path
import subprocess,json,hashlib,zipfile,shutil,datetime,urllib.request
from html.parser import HTMLParser

qa=Path(__file__).resolve().parent;root=qa.parent.parent;site=root/'site'
expected='697a5711c8684eadd7c7f9068fe2974d47a91fb7';base='f9e5847acccbe6bd2790abab9b448d154ffe17'
# Keep the complete base SHA explicit (the shortened draft above is not used).
base='f9e5847acccbe6bd2790abab9b448d15494ffe17'
def git(p,*a,input=None):return subprocess.check_output(['git','-c','safe.directory='+p.as_posix(),*a],cwd=p,input=input)
def rec(p):
 b=p.read_bytes();return {'path':str(p.resolve()),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
assert git(site,'rev-parse','HEAD').decode().strip()==expected
assert git(site,'merge-base',base,expected).decode().strip()==base
assert not git(site,'status','--porcelain').strip()
assert not git(site,'remote').strip()
assert subprocess.call(['git','-c','safe.directory='+site.as_posix(),'diff','--check',base,expected],cwd=site)==0
prior=json.loads((qa/'baseline/final-source.json').read_text(encoding='utf-8'))
baseline=json.loads((root/'input/source-baseline.json').read_text(encoding='utf-8'))
preserved={}
for k in ['editor','original_mercury']:
 old=baseline[k];p=Path(old['path']);assert git(p,'rev-parse','HEAD').decode().strip()==old['head'];assert git(p,'status','--short').decode().strip()==old['status']
 for name,value in old['files'].items():assert rec(p/name)['sha256']==value['sha256'],k+name
 preserved[k]={'files':len(old['files']),'head':old['head'],'status':old['status'],'unchanged':True}
changed=git(site,'diff','--name-only',base,expected).decode().splitlines()
assert set(changed)=={'app/mercury-white.css','theme/mercury-white-button-polish.json'}
names=[n for n in git(site,'ls-files','-z').decode().split('\0') if n]
batch=git(site,'cat-file','--batch',input=('\n'.join(expected+':'+n for n in names)+'\n').encode());offset=0;blobs={}
for name in names:
 end=batch.index(b'\n',offset);header=batch[offset:end].split();assert len(header)==3 and header[1]==b'blob',name
 count=int(header[2]);start=end+1;blobs[name]=batch[start:start+count];assert batch[start+count:start+count+1]==b'\n';offset=start+count+1
assert offset==len(batch)
source={}
for name in names:
 p=site/name;b=p.read_bytes();blob=blobs[name];assert b.replace(b'\r\n',b'\n')==blob.replace(b'\r\n',b'\n'),name
 assert (qa/'build-site'/name).read_bytes()==b,'build input '+name
 if name not in changed:assert rec(p)['sha256']==prior['source'][name]['sha256'],name
 v=rec(p);v['git_blob_sha256']=hashlib.sha256(blob).hexdigest()
 if name in changed:
  dst=qa/'source-final'/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,dst);assert rec(dst)['sha256']==v['sha256'];v['frozen_copy']=str(dst)
 source[name]=v
raw=root/'input/mercury-palette_98.json';inputrec=rec(raw)
assert inputrec['bytes']==3132 and inputrec['sha256']=='f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5'
assert raw.read_bytes()==(qa/'baseline/mercury-palette_98.json').read_bytes()==blobs['theme/mercury-palette_98.json']
assert rec(qa/'baseline/mercury-white-source.zip')['sha256']==prior['source_archive']['sha256']
for name,v in prior['build_outputs'].items():
 relative=Path(name).relative_to('dist')
 assert rec(qa/'baseline/dist'/relative)['sha256']==v['sha256'];assert rec(qa/'runtime-retired-f9/dist'/relative)['sha256']==v['sha256']
build={str(p.relative_to(site)):rec(p) for p in (site/'dist').rglob('*') if p.is_file()}
for name,v in build.items():assert rec(qa/'build-site'/name)['sha256']==v['sha256'],name
archive=qa/'mercury-white-polish-source.zip';git(site,'-c','core.autocrlf=false','archive','--format=zip','-o',str(archive),expected)
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
 with urllib.request.urlopen(urllib.request.Request(url,headers={'Accept-Encoding':'identity'}),timeout=15) as r:return r.status,r.read(),dict(r.headers.items())
status,html,headers=fetch('http://127.0.0.1:5418/');assert status==200
parser=Links();parser.feed(html.decode());assert parser.links
served=[]
for url in parser.links:
 status,b,h=fetch('http://127.0.0.1:5418'+url);p=site/'dist/client'/url.lstrip('/');assert status==200 and b==p.read_bytes()
 assert b'--white-selected-fill' in b and b'#ffdfaf' in b and b'#b76016' in b
 served.append({'url':'http://127.0.0.1:5418'+url,'status':status,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'build_file':str(p),'headers':h})
proof={'UTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'html_status':200,'source_commit':expected,'stylesheets':served,'no_injected_styles':True}
(qa/'served-css-proof.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2),encoding='utf-8')
ui=json.loads((qa/'production-ui-results.json').read_text(encoding='utf-8'));state=json.loads((qa/'production-state-contrast-results.json').read_text(encoding='utf-8'));server=json.loads((qa/'server-final.json').read_text(encoding='utf-8-sig'))
assert ui['pass']==24 and state['pass']==10 and ui['fail']==state['fail']==0
assert server['WhitePID']==31792 and server['EditorPID']==35992 and server['WhiteHTTP']==server['EditorHTTP']==200
assert server['LaunchShellStillRunning'] is False and server['StderrBytes']==0 and server['StabilitySeconds']>=120 and server['RestartCount']==1
progresspath=root/'qa/progress-button-polish.json';progress=json.loads(progresspath.read_text(encoding='utf-8'))
progress.update({'phase':'Final production source frozen and ready for independent QA','source_commit':expected,'server_restart':True,'white_pid':31792,'editor_preserved_pid':35992,'polish_activated':True,'independent_qa_complete':False,'remaining':['independent QA and user final visual acceptance; existing attachment/Typekit access limitations'],'handoff':str(qa/'QA-HANDOFF.ko.md'),'manifest':str(qa/'final-source.json'),'updated_utc':datetime.datetime.now(datetime.timezone.utc).isoformat()})
progresspath.write_text(json.dumps(progress,ensure_ascii=False,indent=2),encoding='utf-8')
artifacts={p.name:rec(p) for p in qa.iterdir() if p.is_file() and p.name not in ['final-source.json','server-stdout.log','server-stderr.log']}
manifest={'base_commit':base,'commit':expected,'branch':'mercury-white-20261007','site':str(site),'url':'http://127.0.0.1:5418/','git_status':'clean','remotes':[],'source':source,'changed_files':changed,'diffstat':git(site,'diff','--stat',base,expected).decode().strip(),'approved_input':inputrec,'approved_input_git_exact':True,'derived_polish':rec(site/'theme/mercury-white-button-polish.json'),'source_archive':rec(archive),'build':build,'build_source_exact':True,'served_css':proof,'checks':{'production_ui_pass':24,'production_state_pass':10,'fail':0,'typecheck_exit':0,'build_exit':0,'new_modules_lint_exit':0,'related_lint_existing':1,'related_lint_new':0,'related_lint_reused_unchanged_source':True,'base_theme_eight_checks_reused':True,'diff_check_exit':0},'server':server,'server_activation':json.loads((qa/'server-activation.json').read_text(encoding='utf-8-sig')),'restart_approval':{'user_text':'재시작해','source_message_id':'Sentinel_3e3627b08b8c8191a29bce7e88c873d2','scope':'Only identified 5418 process, one restart; 5417 preserved'},'earlier_auto_review_rejection':progress['auto_review_block'],'preserved':preserved,'unchanged_source_files':len(prior['source'])-1,'public_assets_preserved':sum(n.startswith('public/') for n in names),'prior_build_preserved':{'files':len(prior['build_outputs']),'snapshot':str(qa/'baseline/dist'),'retired_original':str(qa/'runtime-retired-f9/dist'),'sha256_exact':True},'artifacts':artifacts,'project_documents':{p.name:rec(p) for p in root.glob('*.md')},'progress':rec(progresspath),'independent_qa_complete':False,'user_final_visual_approval':False,'png_pixels_viewed':False,'remaining_limits':['Original attached PNG Library 404, no retry or bypass','Adobe Typekit 3 resources network blocked','Independent QA and final aesthetic acceptance pending'],'transaction_submission':0,'remote_push':0,'deployment':0}
(qa/'final-source.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'commit':expected,'source_files':len(names),'changed_file_sha256':{n:source[n]['sha256'] for n in changed},'input':inputrec,'source_archive':rec(archive),'build_files':len(build),'public_assets_preserved':manifest['public_assets_preserved'],'preserved':preserved,'checks':manifest['checks'],'server':server,'served_css':served,'manifest':str(qa/'final-source.json')},ensure_ascii=False,indent=2))
