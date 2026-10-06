from pathlib import Path
import hashlib,json,shutil,subprocess
ROOT=Path(__file__).resolve().parents[1]
SITE=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site')
DARK=SITE.parent.parent/'sports-demo-03/site'
SKIP={'node_modules','.git','.next','.vinext','.wrangler','dist','__pycache__'}
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def inventory(root):
    return [{'path':p.relative_to(root).as_posix(),'bytes':p.stat().st_size,'sha256':digest(p)}
            for p in sorted(root.rglob('*')) if p.is_file() and not SKIP.intersection(p.relative_to(root).parts)]
def git(*args):
    return subprocess.check_output(['git','-c','safe.directory='+DARK.as_posix(),'-C',str(DARK),*args],text=True).strip()
ROOT.mkdir(parents=True,exist_ok=True)
baseline={'target':str(SITE),'target_git':'none; existing local-only copy','reference_source':str(DARK),
          'reference_HEAD':git('rev-parse','HEAD'),'reference_status':git('status','--porcelain'),
          'target_files':inventory(SITE),'protected_original_files':inventory(DARK)}
with (ROOT/'before-files.json').open('x',encoding='utf-8') as f:json.dump(baseline,f,ensure_ascii=False,indent=2)
for folder in ('app','components','hooks','lib'):
    shutil.copytree(SITE/folder,ROOT/'before-source'/folder)
for name in ('package.json','package-lock.json','.oxlintrc.json','vite.config.ts','tsconfig.json'):
    shutil.copy2(SITE/name,ROOT/'before-source'/name)
print(json.dumps({'target_files':len(baseline['target_files']),'protected_original_files':len(baseline['protected_original_files']),
                  'target':str(SITE),'source_HEAD':baseline['reference_HEAD'],'source_status':baseline['reference_status']}))
