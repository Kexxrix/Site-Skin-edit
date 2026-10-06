from pathlib import Path
import json, hashlib, difflib, re, datetime
from PIL import Image

Q = Path(__file__).resolve().parent
SITE = Q.parent.parent
C = Path('E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3')
B = C / 'application-20261006-v1'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
manifest = json.loads((B/'before-files.json').read_text(encoding='utf-8-sig'))
summary = {'time':datetime.datetime.now(datetime.timezone.utc).isoformat(),'manifest_keys':list(manifest),'target':str(SITE),'git_exists':(SITE/'.git').exists()}
for key, items in manifest.items():
    if isinstance(items,list) and items and isinstance(items[0],dict) and 'sha256' in items[0]:
        base = SITE if key.startswith('target') else Path(manifest.get('reference_source',''))
        checks=[]
        for item in items:
            p=base/item['path']
            checks.append({'path':item['path'],'exists':p.exists(),'before':item['sha256'],'now':sha(p) if p.is_file() else None})
        summary[key]={'count':len(checks),'same':sum(x['before'].lower()==(x['now'] or '').lower() for x in checks),'changed':[x for x in checks if x['before'].lower()!=(x['now'] or '').lower()]}
        (Q/(key+'-start-hashes.json')).write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf8')
for name in ['aldebaran-wog-r5.tsx','aldebaran-white.css']:
    old=(B/'before-source/app'/name).read_text(encoding='utf-8-sig')
    new=(SITE/'app'/name).read_text(encoding='utf-8-sig')
    diff=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='before/'+name,tofile='current/'+name))
    (Q/(name+'.diff')).write_text(diff,encoding='utf8')
    print(diff)
assets=[]
for p in sorted((SITE/'public/icons/aldebaran-simple-v3-20261006').glob('*.png')):
    im=Image.open(p).convert('RGBA')
    alpha=im.getchannel('A'); hist=alpha.histogram()
    equivalents=[str(x.relative_to(C)) for x in (C/'exports').rglob(p.name) if sha(x)==sha(p)]
    assets.append({'name':p.name,'bytes':p.stat().st_size,'sha256':sha(p),'size':im.size,'mode':Image.open(p).mode,'alpha_bbox':alpha.getbbox(),'transparent_pixels':hist[0],'semi_alpha_pixels':sum(hist[1:255]),'opaque_pixels':hist[255],'matching_derivatives':equivalents})
summary['assets']=assets
summary['baseline_source_hashes']={str(p.relative_to(B/'before-source')):sha(p) for p in (B/'before-source').rglob('*') if p.is_file()}
(Q/'static-start.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({k:v for k,v in summary.items() if k not in ['baseline_source_hashes','assets']},ensure_ascii=False,indent=2))
print('ASSETS',json.dumps(assets,ensure_ascii=False,indent=2))
