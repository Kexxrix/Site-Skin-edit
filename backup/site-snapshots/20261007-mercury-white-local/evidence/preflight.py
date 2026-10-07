from pathlib import Path
from datetime import datetime, timezone
import hashlib, json, subprocess, urllib.request, re

root=Path('E:/codexwork/Site-Skin-edit')
project=root/'demo-sites/mercury-white-20261007'
site=project/'site'
out=Path(__file__).parent
fixed=json.loads((project/'qa/card-outline-service-20261007-085124/final-source.json').read_text(encoding='utf-8-sig'))
sha=lambda b:hashlib.sha256(b).hexdigest()
def git(*args):
    return subprocess.check_output(['git','-c','safe.directory='+site.as_posix(),'-C',str(site),*args]).decode().strip()
assert git('rev-parse','HEAD')==fixed['commit']=='b425507730a4f39dd393645ef4273653a7c13176'
assert git('branch','--show-current')=='mercury-white-20261007'
assert not git('status','--porcelain')
assert not git('remote')
assert not (site/'.openai/hosting.json').exists()
for group in ['source','build']:
    for rel,rec in fixed[group].items():
        assert sha((site/rel).read_bytes())==rec['sha256'],rel
input_sha=sha((project/'input/mercury-palette_98.json').read_bytes())
assert input_sha==sha((site/'theme/mercury-palette_98.json').read_bytes())=='f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5'
url='http://127.0.0.1:5418/'
with urllib.request.urlopen(url,timeout=10) as r:
    html=r.read().decode(); html_status=r.status
css_path='/_next/static/css/index.CIlfXfuu.css'
assert css_path in html
with urllib.request.urlopen(url.rstrip('/')+css_path,timeout=10) as r:
    css=r.read(); css_status=r.status
assert sha(css)=='a1901d8fcefc84277c7723e0755e8e6e958a01fd2cbbe8c259c90e1f8fb13a35'
qa=json.loads((project/'qa-results/card-service-independent-20261007-0911/summary.json').read_text(encoding='utf-8-sig'))
result={'checked_at_utc':datetime.now(timezone.utc).isoformat(),'name':'MERCURY White','source_path':str(site),'source_commit':fixed['commit'],'branch':git('branch','--show-current'),'source_files_verified':len(fixed['source']),'build_files_verified':len(fixed['build']),'source_checkout_clean':True,'local_url':url,'http_status':html_status,'page_title':re.search(r'<title>(.*?)</title>',html).group(1),'css_status':css_status,'css_sha256':sha(css),'approved_input_sha256':input_sha,'current_qa_reused':{'path':'qa-results/card-service-independent-20261007-0911/summary.json','counts':qa['counts'],'reason':'Current source, build and served CSS match frozen QA inputs; no app changes'},'source_remotes':[],'sites_project_id':None,'site_registration_performed':False,'deployment_performed':False,'server_restarted':False,'scope':'Register current implementation in local project documents and integrated GitHub backup only.'}
(out/'preflight.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
