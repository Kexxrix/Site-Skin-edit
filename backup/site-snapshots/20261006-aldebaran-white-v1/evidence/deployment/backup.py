from pathlib import Path
from datetime import datetime, timezone
from collections import Counter
import hashlib, json, os, re, shutil, subprocess, sys

ROOT = Path('E:/codexwork/Site-Skin-edit')
APP = ROOT/'demo-sites/sports-demo-03-white/site'
REPO = Path('E:/codexwork/Site-Skin-edit-backups/20260911-203900/repository')
EVIDENCE = Path(__file__).parent
PREP = Path('E:/codexwork/Site-Skin-edit-backups/20261006-aldebaran-white-release-prep-184711')
SNAPREL = 'backup/site-snapshots/20261006-aldebaran-white-v1'
SNAP = REPO/SNAPREL
BASE = '05e24e2b3c4545c09649091021cccb62d85bab4f'
SOURCE_COMMIT = '5459f3425a1388c2d978747ff43a4364b16bfe94'

def git(root, *args):
    return subprocess.check_output(['git','-c','safe.directory='+root.as_posix(),'-c','maintenance.auto=false','-c','gc.auto=0','-c','core.quotepath=false','-c','core.autocrlf=false','-C',str(root),*args])
def sha(data): return hashlib.sha256(data).hexdigest()
def blob(data): return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
def read(p): return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p, data):
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def tree(ref):
    result={}
    for row in git(REPO,'ls-tree','-r','-z',ref).split(b'\0'):
        if row:
            info,p=row.split(b'\t',1); mode,kind,h=info.decode().split()
            result[p.decode()]={'sha':h,'mode':mode,'type':kind}
    return result

def preservation():
    approved=read(PREP/'source-manifest.json')
    changes=[f['path'] for f in approved['files'] if sha((APP/f['path']).read_bytes())!=f['sha256']]
    assert set(changes)=={'.gitignore','.openai/hosting.json'},changes
    assert git(APP,'rev-parse','HEAD').decode().strip()==SOURCE_COMMIT
    assert not git(APP,'status','--porcelain').strip()
    assert len(git(APP,'ls-files','-z').split(b'\0'))-1==359
    baseline=read(ROOT/'demo-sites/sports-demo-03-white/input/source-baseline.json')
    original=Path(baseline['source'])
    failures=[f['path'] for f in baseline['source_files'] if sha((original/f['path']).read_bytes())!=f['sha256']]
    assert not failures,failures
    assert git(original,'rev-parse','HEAD').decode().strip()==baseline['source_head']
    assert git(original,'status','--porcelain').decode().strip()==baseline['source_status']
    result={'checked_at_utc':datetime.now(timezone.utc).isoformat(),'approved_source_files':len(approved['files']),'unchanged_approved_files':len(approved['files'])-len(changes),'authorized_configuration_changes':changes,'application_code_assets_unchanged':True,'source_commit':SOURCE_COMMIT,'source_checkout_clean':True,'original_unchanged_files':len(baseline['source_files']),'original_head':baseline['source_head'],'original_checkout_clean':True}
    write(EVIDENCE/'preservation.json',result)
    return result

def snapshot():
    preserved=preservation()
    assert git(REPO,'rev-parse','HEAD').decode().strip()==BASE
    assert git(REPO,'ls-remote','origin','refs/heads/main').decode().split()[0]==BASE
    assert not git(REPO,'status','--porcelain').strip(),'Backup checkout changed'
    assert not SNAP.exists(),'Snapshot already exists'
    groups=['demo-sites/sports-demo-03-white','skin-image-candidates-20261006/aldebaran-simple-v3','generated-images/aldebaran-graphite-icons-20261002-191320']
    prune={'.git','node_modules','.next','.vinext','.wrangler','dist','out','.sites-runtime','__pycache__','coverage'}
    excluded=[]; items=[]
    for group in groups:
        for folder,dirs,files in os.walk(ROOT/group):
            for d in sorted(set(dirs)&prune): excluded.append({'path':(Path(folder)/d).relative_to(ROOT).as_posix(),'reason':'Git metadata, dependencies, build output or cache'})
            dirs[:]=[d for d in dirs if d not in prune]
            for name in sorted(files):
                p=Path(folder)/name; rel=p.relative_to(ROOT).as_posix()
                if name.startswith('.env') or p.suffix.lower() in {'.pem','.key','.pfx','.p12','.jsonl','.pyc','.tmp','.tsbuildinfo','.zip','.tar','.tgz'} or name=='next-env.d.ts':
                    excluded.append({'path':rel,'reason':'Local environment/secret material, raw log, cache or redundant archive'});continue
                items.append({'source_path':str(p),'path':rel,'origin':group})
    items.append({'source_path':str(ROOT/'demo-sites/README.ko.md'),'path':'demo-sites/README.ko.md','origin':'shared navigation document'})
    external={
        'deployment':(EVIDENCE,['publication.json','preflight.json','build.log','preservation.json','public-verification.json','public-1920.png','public-active.png','public-active.json','public-initial.json','backup.py']),
        'release-preparation':(PREP,['source-manifest.json','source-package-verification.json','checks-result.json','typecheck.log','build.log','browser-check.json','current-local.jpg','original-preservation.json','sites-status.json','github-status.json'])
    }
    for group,(folder,names) in external.items():
        for name in names:
            p=folder/name;assert p.is_file(),str(p)
            items.append({'source_path':str(p),'path':SNAPREL+'/evidence/'+group+'/'+name,'origin':'external '+group})
    assert len({i['path'] for i in items})==len(items)
    patterns={
        'private_key':rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----',
        'github_token':rb'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b',
        'openai_key':rb'\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{40,}\b',
        'jwt':rb'\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b',
        'bearer_literal':rb'(?i)Bearer\s+[A-Za-z0-9_-]{35,}'
    }
    text_ext={'.md','.json','.canvas','.ts','.tsx','.js','.cjs','.mjs','.css','.html','.svg','.txt','.toml','.yml','.yaml','.log','.py','.ps1','.sh'}
    findings=[];records=[];text_count=0
    for item in sorted(items,key=lambda i:i['path']):
        p=Path(item['source_path']);assert p.is_file() and not p.is_symlink()
        data=p.read_bytes();assert len(data)<100*1024*1024,item['path']
        if p.suffix.lower() in text_ext or p.name.startswith('.'):
            text_count+=1
            for label,pattern in patterns.items():
                if re.search(pattern,data): findings.append({'path':item['path'],'pattern':label})
        records.append({**item,'bytes':len(data),'sha256':sha(data),'git_blob_sha1':blob(data)})
    write(EVIDENCE/'content-scan.json',{'text_files':text_count,'findings':findings})
    assert not findings,'Inspect content-scan.json before publishing'
    for rec in records:
        src=Path(rec['source_path']);dst=REPO/rec['path']
        assert dst.resolve().is_relative_to(REPO.resolve())
        assert sha(src.read_bytes())==rec['sha256']
        dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
        assert sha(dst.read_bytes())==rec['sha256']
    write(SNAP/'source-files.json',{'captured_at_utc':datetime.now(timezone.utc).isoformat(),'baseline_github_commit':BASE,'app_source_commit':SOURCE_COMMIT,'public_url':'https://aldebaran-2.kexxadrix.chatgpt.site/','version':1,'files':records})
    write(SNAP/'summary.json',{'source_files':len(records),'total_bytes':sum(i['bytes'] for i in records),'by_origin':dict(Counter(i['origin'] for i in records)),'preservation':preserved,'removed_paths':[],'scope':'ALDEBARAN-2 white v1 source, assets, documents, input/QA, relevant image production history and publication evidence.'})
    write(SNAP/'excluded.json',{'entries':excluded,'notes':'All originals retained locally. Other sites and previous backup-only files preserved. No credentials or installation/build runtimes are collected.'})
    write(SNAP/'content-scan.json',{'files':len(records),'text_files_scanned':text_count,'patterns':list(patterns),'findings':[],'limits':'Strong-pattern scan plus explicit exclusions, not a universal guarantee.'})
    write(SNAP/'publication.json',read(EVIDENCE/'publication.json'))
    paths=sorted({i['path'] for i in records}|{p.relative_to(REPO).as_posix() for p in SNAP.glob('*.json')})
    staging=EVIDENCE/'staging-paths.bin';staging.write_bytes(b'\0'.join(p.encode() for p in paths)+b'\0')
    git(REPO,'--literal-pathspecs','add','-f','--pathspec-from-file='+str(staging),'--pathspec-file-nul')
    print(json.dumps({'source_files':len(records),'metadata_files':5,'bytes':sum(i['bytes'] for i in records),'text_files_scanned':text_count,'secret_findings':len(findings),'staged_paths':len(paths),'by_origin':dict(Counter(i['origin'] for i in records))}))

def verify(mode):
    manifest=read(SNAP/'source-files.json'); base=tree(BASE)
    if mode=='staged':
        current={}
        for row in git(REPO,'ls-files','-s','-z').split(b'\0'):
            if row:
                info,p=row.split(b'\t',1);m,h,stage=info.decode().split();assert stage=='0'
                current[p.decode()]={'sha':h,'mode':m,'type':'blob'}
        commit=None
    else:
        commit=git(REPO,'rev-parse','HEAD').decode().strip()
        assert git(REPO,'rev-parse','HEAD^').decode().strip()==BASE
        assert not git(REPO,'status','--porcelain').strip()
        current=tree('HEAD')
    expected={}
    for rec in manifest['files']:
        data=Path(rec['source_path']).read_bytes()
        assert sha(data)==rec['sha256']==sha((REPO/rec['path']).read_bytes()),rec['path']
        assert blob(data)==rec['git_blob_sha1']==current[rec['path']]['sha'],rec['path']
        expected[rec['path']]=rec['git_blob_sha1']
    for p in SNAP.glob('*.json'):
        rel=p.relative_to(REPO).as_posix();expected[rel]=blob(p.read_bytes())
        assert expected[rel]==current[rel]['sha'],rel
    assert all(p in current for p in base),'Old files were deleted'
    changed={p for p in current if current.get(p)!=base.get(p)}
    expected_changed={p for p,h in expected.items() if h!=base.get(p,{}).get('sha')}
    assert changed==expected_changed,{'unexpected':sorted(changed-expected_changed),'missing':sorted(expected_changed-changed)}
    for p,v in base.items():
        if p not in expected_changed:assert current[p]==v,p
    assert git(APP,'rev-parse','HEAD').decode().strip()==SOURCE_COMMIT
    assert not git(APP,'status','--porcelain').strip()
    result={'verified_at_utc':datetime.now(timezone.utc).isoformat(),'mode':mode,'backup_commit':commit,'source_files_verified':len(manifest['files']),'metadata_files_verified':5,'changed_files':len(changed),'previous_entries_preserved':len(base)-len(set(base)&changed),'no_deletions':True,'all_expected_blobs_match':True,'source_commit':SOURCE_COMMIT,'remote_verified':False}
    if mode=='remote':
        assert git(REPO,'ls-remote','origin','refs/heads/main').decode().split()[0]==commit
        ref=json.loads(subprocess.check_output(['gh','api','repos/Kexxrix/Site-Skin-edit/git/ref/heads/main']))
        assert ref['object']['sha']==commit
        remote=json.loads(subprocess.check_output(['gh','api','repos/Kexxrix/Site-Skin-edit/git/trees/'+commit+'?recursive=1']))
        assert not remote.get('truncated')
        remote_tree={i['path']:{'sha':i['sha'],'mode':i['mode'],'type':i['type']} for i in remote['tree'] if i['type']!='tree'}
        assert remote_tree==current,'GitHub complete tree mismatch'
        result.update({'remote_verified':True,'github_complete_tree_verified':True,'remote_entries':len(remote_tree),'backup_checkout_clean':True,'commit_url':'https://github.com/Kexxrix/Site-Skin-edit/commit/'+commit})
    write(EVIDENCE/('github-'+mode+'-verification.json'),result)
    print(json.dumps(result))

if sys.argv[1]=='snapshot': snapshot()
elif sys.argv[1]=='preservation': print(json.dumps(preservation()))
else: verify(sys.argv[1])
