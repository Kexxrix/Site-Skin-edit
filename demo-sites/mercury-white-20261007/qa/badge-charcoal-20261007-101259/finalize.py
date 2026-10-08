from pathlib import Path
from datetime import datetime, timezone
import hashlib, json, re, urllib.request

out=Path(__file__).parent
project=out.parent.parent
app=project/'site'
read=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
before=read(out/'source-before.json')
source=read(out/'source-after.json')
activation=read(out/'server-activation.json')
qa=read(out/'after.json')
for rel,rec in source['source'].items(): assert sha(app/rel)==rec['sha256'],rel
for rel,rec in before['build'].items(): assert sha(out/'runtime-retired-b425'/rel)==rec['sha256'],rel
for rec in activation['built_files']: assert sha(app/'dist'/rec['relative'])==rec['sha256'],rec['relative']
url='http://127.0.0.1:5418/'
with urllib.request.urlopen(url,timeout=10) as r: html=r.read().decode();status=r.status
css_urls=re.findall(r'<link[^>]+href="([^\"]+\.css[^\"]*)"',html)
proof=[]
for css_path in css_urls:
    if not css_path.startswith('/'): continue
    with urllib.request.urlopen(url.rstrip('/')+css_path,timeout=10) as r: data=r.read()
    digest=hashlib.sha256(data).hexdigest()
    matching=[rec for rec in activation['built_files'] if rec['sha256']==digest]
    assert matching,css_path
    if b'#36312b' in data and b'#f5e8c5' in data and b'#806c49' in data:
        proof.append({'url':url.rstrip('/')+css_path,'sha256':digest,'build_file':matching[0]['relative']})
assert proof,'New badge CSS is not served'
assert len(qa['checks'])==8 and all(c['pass'] for c in qa['checks'])
result={'checked_at_utc':datetime.now(timezone.utc).isoformat(),'source_base_commit':source['base_commit'],'source_working_tree_changes':source['working_tree_changes'],'source_files_verified':len(source['source']),'unchanged_source_files':len(source['source'])-len(source['working_tree_changes']),'retired_build_files_verified':len(before['build']),'active_build_files_verified':len(activation['built_files']),'http_status':status,'served_css':proof,'browser_pass':8,'browser_fail':0,'screenshots_visually_reviewed':['after-desktop.png','after-sports.png'],'external_typekit_requests':'Blocked before transmission in isolated QA; previous restriction retained','git_commit_created':False,'github_pushed':False,'sites_deployed':False}
(out/'final-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result))
