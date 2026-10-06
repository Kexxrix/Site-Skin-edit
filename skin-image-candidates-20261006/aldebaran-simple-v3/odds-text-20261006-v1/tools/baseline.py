from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,os,shutil
ROOT=Path(__file__).resolve().parents[1]
SITE=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site')
DARK=SITE.parent.parent/'sports-demo-03/site'
SKIP={'node_modules','.git','.next','.vinext','.wrangler','dist','__pycache__'}
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def inventory(root):
    rows=[]
    for current,dirs,files in os.walk(root):
        dirs[:]=[d for d in dirs if d not in SKIP]
        for name in files:
            p=Path(current)/name;rows.append({'path':p.relative_to(root).as_posix(),'bytes':p.stat().st_size,'sha256':digest(p)})
    return sorted(rows,key=lambda x:x['path'])
ROOT.mkdir(parents=True,exist_ok=True)
manifest={'created_utc':datetime.now(timezone.utc).isoformat(),'site':str(SITE),'site_files':inventory(SITE),
          'protected_original':str(DARK),'protected_original_files':inventory(DARK),
          'icons_user_approved':True,'icon_approval':'확인했음. 아이콘은 쓰면 되겠어.',
          'scope':'Odds text only;existing icons/background/layout/data/behavior preserved'}
with (ROOT/'baseline-files.json').open('x',encoding='utf-8') as f:json.dump(manifest,f,ensure_ascii=False,indent=2)
shutil.copytree(SITE/'app',ROOT/'before-app')
print(json.dumps({'files':len(manifest['site_files']),'protected_original':len(manifest['protected_original_files']),
                  'CSS_sha256':digest(SITE/'app/aldebaran-white.css'),'TSX_sha256':digest(SITE/'app/aldebaran-wog-r5.tsx')}))
