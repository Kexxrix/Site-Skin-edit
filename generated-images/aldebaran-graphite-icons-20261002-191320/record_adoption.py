import json,hashlib
from pathlib import Path
root=Path(__file__).resolve().parent
manifest=root/'run.json'
d=json.loads(manifest.read_text(encoding='utf-8'))
copyrecord=Path('E:/codexwork/Site-Skin-edit-backups/20261002-aldebaran-graphite-icons/implementation/asset-copy-record.json')
copies=json.loads(copyrecord.read_text(encoding='utf-8-sig'))['files']
byid={c['id']:c for c in copies}
for a in d['assets']:
 c=byid[a['id'].removesuffix('-v001')]
 dest=Path(c['destination'])
 actual=hashlib.sha256(dest.read_bytes()).hexdigest()
 assert actual==a['sha256']==c['sha256'].lower()
 a['site_path']=str(dest)
 a['site_operation']='copy_original_png_unchanged'
 a['site_sha256']=actual
 a['site_adoption']='adopted_local_pending_final_qa'
d['site_adoption']='local_only_pending_final_qa'
d['site_url']='http://127.0.0.1:5384/'
d['copy_evidence']=str(copyrecord)
d['qa']['site_root_visual']='Integrated icons-v1-1920x1080.png inspected by root: coherent graphite family in sport tabs/tree and account/services, no crop/placement defect observed.'
d['qa']['root_screenshot']='E:/codexwork/Site-Skin-edit-backups/20261002-aldebaran-graphite-icons/implementation/icons-v1-1920x1080.png'
d['total_generated_bytes']=sum(a['bytes'] for a in d['assets'])
manifest.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'copied':len(copies),'sha_matches':True,'bytes':d['total_generated_bytes']}))
