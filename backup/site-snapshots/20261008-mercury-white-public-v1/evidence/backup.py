from pathlib import Path
from datetime import datetime, timezone
from collections import Counter
import hashlib, json, os, re, shutil, subprocess, sys

ROOT = Path('E:/codexwork/Site-Skin-edit')
PROJECT = ROOT/'demo-sites/mercury-white-20261007'
APP = PROJECT/'site'
REPO = Path('E:/codexwork/Site-Skin-edit-backups/20260911-203900/repository')
EVIDENCE = Path(__file__).parent
SNAPREL = 'backup/site-snapshots/20261008-mercury-white-public-v1'
SNAP = REPO/SNAPREL
BASE = '11f6f9dc1e6923ce1d6e6bb9652c0e71a64f0705'
SOURCE_COMMIT = 'b425507730a4f39dd393645ef4273653a7c13176'
SHARED = ['README.md', '00_프로젝트 홈.md', 'demo-sites/README.ko.md']
META = ['source-files.json', 'summary.json', 'excluded.json', 'content-scan.json', 'publication.json']

def git(root, *args):
    return subprocess.check_output(['git','-c','safe.directory='+root.as_posix(),'-c','maintenance.auto=false','-c','gc.auto=0','-c','core.quotepath=false','-c','core.autocrlf=false','-C',str(root),*args])
def sha(data): return hashlib.sha256(data).hexdigest()
def blob(data): return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
def read(p): return json.loads(p.read_text(encoding='utf-8-sig'))
def write(p, value):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def tree(ref):
    result = {}
    for row in git(REPO,'ls-tree','-r','-z',ref).split(b'\0'):
        if row:
            info,p = row.split(b'\t',1)
            mode,kind,h = info.decode().split()
            result[p.decode()] = {'sha':h,'mode':mode,'type':kind}
    return result
def preservation():
    assert git(APP,'rev-parse','HEAD').decode().strip() == SOURCE_COMMIT
    assert git(APP,'branch','--show-current').decode().strip() == 'mercury-white-20261007'
    assert not git(APP,'remote').strip()
    assert not (APP/'.openai/hosting.json').exists()
    approved = read(EVIDENCE/'approved-source.json')
    release = PROJECT/'publish/site'
    differences = []
    for rec in approved['files']:
        assert sha((APP/rec['path']).read_bytes()) == rec['sha256'], rec['path']
        if sha((release/rec['path']).read_bytes()) != rec['sha256']:
            differences.append(rec['path'])
    assert set(differences) == {'.gitignore','vite.config.ts'}, differences
    assert git(release,'rev-parse','HEAD').decode().strip() == '694efe89b8f230030c21f554d674ab71617a60bc'
    assert not git(release,'status','--porcelain').strip()
    assert read(release/'.openai/hosting.json')['project_id'] == 'appgprj_6ac7523068808191aa0f1014883e0752'
    input_sha = sha((PROJECT/'input/mercury-palette_98.json').read_bytes())
    assert input_sha == sha((APP/'theme/mercury-palette_98.json').read_bytes()) == 'f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5'
    return {'local_base_commit':SOURCE_COMMIT,'approved_local_source_files_verified':len(approved['files']),'local_source_bytes_unchanged':True,'local_remotes_unchanged':True,'release_commit':'694efe89b8f230030c21f554d674ab71617a60bc','release_only_differences':differences,'approved_input_sha256':input_sha,'sites_project_id':'appgprj_6ac7523068808191aa0f1014883e0752','deployment_performed':True,'public_version':1}

def baseline():
    assert git(REPO,'rev-parse','HEAD').decode().strip() == BASE
    assert git(REPO,'branch','--show-current').decode().strip() == 'main'
    assert git(REPO,'ls-remote','origin','refs/heads/main').decode().split()[0] == BASE
    assert not git(REPO,'status','--porcelain').strip(), 'Backup checkout changed'
    assert not SNAP.exists(), 'Snapshot already exists'

def inventory():
    baseline()
    preserved = preservation()
    prune = {'.git','node_modules','.next','.vinext','.wrangler','dist','out','.sites-runtime','__pycache__','coverage','build-site'}
    excluded,items = [],[]
    for folder,dirs,files in os.walk(PROJECT):
        skip = {d for d in dirs if d in prune or d.startswith('runtime-')}
        for d in sorted(skip):
            excluded.append({'path':(Path(folder)/d).relative_to(ROOT).as_posix(),'reason':'Git metadata, dependencies, build output, cache or retired runtime copy'})
        dirs[:] = sorted(d for d in dirs if d not in skip)
        for d in dirs: assert not (Path(folder)/d).is_symlink(), str(Path(folder)/d)
        for name in sorted(files):
            p = Path(folder)/name
            rel = p.relative_to(ROOT).as_posix()
            if name.startswith('.env') or p.suffix.lower() in {'.pem','.key','.pfx','.p12','.jsonl','.pyc','.tmp','.tsbuildinfo','.zip','.tar','.tgz'} or name == 'next-env.d.ts':
                excluded.append({'path':rel,'reason':'Local environment/secret material, raw log, cache or redundant archive'})
                continue
            items.append({'source_path':str(p),'path':rel,'origin':'demo-sites/mercury-white-20261007'})
    for rel in SHARED:
        items.append({'source_path':str(ROOT/rel),'path':rel,'origin':'shared navigation document'})
    for name in ['approved-source.json','publication.json','live-status.json','public-browser-verification.json','public-http-verification.json','public-final.png','build.log','typecheck.log','backup.py','verify-public.py','update-docs.py','prepare-backup.py']:
        items.append({'source_path':str(EVIDENCE/name),'path':SNAPREL+'/evidence/'+name,'origin':'publication evidence'})
    assert len({i['path'] for i in items}) == len(items)
    patterns = {
        'private_key':rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----',
        'github_token':rb'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b',
        'openai_key':rb'\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{40,}\b',
        'jwt':rb'\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b',
        'bearer_literal':rb'(?i)Bearer\s+[A-Za-z0-9_-]{35,}'
    }
    text_ext = {'.md','.json','.canvas','.ts','.tsx','.js','.cjs','.mjs','.css','.html','.svg','.txt','.toml','.yml','.yaml','.log','.py','.ps1','.sh','.cmd','.bat','.patch'}
    findings,records = [],[]
    text_count = 0
    for item in sorted(items,key=lambda i:i['path']):
        p = Path(item['source_path'])
        assert p.is_file() and not p.is_symlink(), str(p)
        data = p.read_bytes()
        assert len(data) < 100*1024*1024, item['path']
        if p.suffix.lower() in text_ext or p.name.startswith('.'):
            text_count += 1
            for label,pattern in patterns.items():
                if re.search(pattern,data): findings.append({'path':item['path'],'pattern':label})
        records.append({**item,'bytes':len(data),'sha256':sha(data),'git_blob_sha1':blob(data)})
    source_paths = {i['path'].removeprefix('demo-sites/mercury-white-20261007/site/') for i in records if i['path'].startswith('demo-sites/mercury-white-20261007/site/')}
    tracked = {p.decode() for p in git(APP,'ls-files','-z').split(b'\0') if p}
    assert tracked <= source_paths, sorted(tracked-source_paths)
    scan = {'files':len(records),'text_files_scanned':text_count,'patterns':list(patterns),'findings':findings,'limits':'Strong-pattern scan plus explicit exclusions, not a universal guarantee.'}
    write(EVIDENCE/'content-scan.json',scan)
    assert not findings, 'Inspect content-scan.json before publishing'
    summary = {'source_files':len(records),'metadata_files':len(META),'total_bytes':sum(i['bytes'] for i in records),'by_origin':dict(Counter(i['origin'] for i in records)),'preservation':preserved,'removed_paths':[],'scope':'MERCURY White PUBLIC v1: approved local source and release checkout, assets, documents, input, eligible QA and sanitized publication evidence.'}
    write(EVIDENCE/'inventory.json',{'records':records,'excluded':excluded,'scan':scan,'summary':summary})
    print(json.dumps({**summary,'text_files_scanned':text_count,'secret_findings':len(findings),'excluded_entries':len(excluded)}))

def snapshot():
    baseline()
    preservation()
    plan = read(EVIDENCE/'inventory.json')
    records = plan['records']
    for rec in records:
        assert sha(Path(rec['source_path']).read_bytes()) == rec['sha256'], rec['path']
        dst = REPO/rec['path']
        assert dst.resolve().is_relative_to(REPO.resolve())
        assert not dst.exists() or rec['path'] in SHARED or rec['path'].startswith('demo-sites/mercury-white-20261007/'), rec['path']
    for rec in records:
        dst = REPO/rec['path']
        dst.parent.mkdir(parents=True,exist_ok=True)
        shutil.copyfile(rec['source_path'],dst)
        assert sha(dst.read_bytes()) == rec['sha256'], rec['path']
    write(SNAP/'source-files.json',{'captured_at_utc':datetime.now(timezone.utc).isoformat(),'baseline_github_commit':BASE,'app_source_commit':SOURCE_COMMIT,'name':'MERCURY White','local_url':'http://127.0.0.1:5418/','public_url':'https://mercury-white.kexxadrix.chatgpt.site/','files':records})
    write(SNAP/'summary.json',plan['summary'])
    write(SNAP/'excluded.json',{'entries':plan['excluded'],'notes':'All originals retained locally. Other sites and previous backup-only files preserved. No credentials or installation/build runtimes are collected.'})
    write(SNAP/'content-scan.json',plan['scan'])
    write(SNAP/'publication.json',read(EVIDENCE/'publication.json'))
    paths = sorted({i['path'] for i in records}|{SNAPREL+'/'+name for name in META})
    staging = EVIDENCE/'staging-paths.bin'
    staging.write_bytes(b'\0'.join(p.encode() for p in paths)+b'\0')
    git(REPO,'--literal-pathspecs','add','-f','--pathspec-from-file='+str(staging),'--pathspec-file-nul')
    print(json.dumps({'source_files':len(records),'metadata_files':len(META),'staged_paths':len(paths),'total_bytes':sum(i['bytes'] for i in records)}))

def verify(mode):
    manifest = read(SNAP/'source-files.json')
    base = tree(BASE)
    if mode == 'staged':
        current = {}
        for row in git(REPO,'ls-files','-s','-z').split(b'\0'):
            if row:
                info,p = row.split(b'\t',1)
                m,h,stage = info.decode().split()
                assert stage == '0'
                current[p.decode()] = {'sha':h,'mode':m,'type':'blob'}
        commit = None
    else:
        commit = git(REPO,'rev-parse','HEAD').decode().strip()
        assert git(REPO,'rev-parse','HEAD^').decode().strip() == BASE
        assert not git(REPO,'status','--porcelain').strip()
        current = tree('HEAD')
    expected = {}
    for rec in manifest['files']:
        data = Path(rec['source_path']).read_bytes()
        assert sha(data) == rec['sha256'] == sha((REPO/rec['path']).read_bytes()), rec['path']
        assert blob(data) == rec['git_blob_sha1'] == current[rec['path']]['sha'], rec['path']
        expected[rec['path']] = rec['git_blob_sha1']
    for name in META:
        p = SNAP/name
        rel = p.relative_to(REPO).as_posix()
        expected[rel] = blob(p.read_bytes())
        assert expected[rel] == current[rel]['sha'], rel
    assert all(p in current for p in base), 'Old files were deleted'
    changed = {p for p in current if current.get(p) != base.get(p)}
    expected_changed = {p for p,h in expected.items() if h != base.get(p,{}).get('sha')}
    assert changed == expected_changed, {'unexpected':sorted(changed-expected_changed),'missing':sorted(expected_changed-changed)}
    for p,v in base.items():
        if p not in expected_changed: assert current[p] == v, p
    preserved = preservation()
    result = {'verified_at_utc':datetime.now(timezone.utc).isoformat(),'mode':mode,'backup_commit':commit,'source_files_verified':len(manifest['files']),'metadata_files_verified':len(META),'changed_files':len(changed),'previous_entries_preserved':len(base)-len(set(base)&changed),'no_deletions':True,'all_expected_blobs_match':True,'preservation':preserved,'remote_verified':False}
    if mode == 'remote':
        assert git(REPO,'ls-remote','origin','refs/heads/main').decode().split()[0] == commit
        ref = json.loads(subprocess.check_output(['gh','api','repos/Kexxrix/Site-Skin-edit/git/ref/heads/main']))
        assert ref['object']['sha'] == commit
        remote = json.loads(subprocess.check_output(['gh','api','repos/Kexxrix/Site-Skin-edit/git/trees/'+commit+'?recursive=1']))
        assert not remote.get('truncated')
        remote_tree = {i['path']:{'sha':i['sha'],'mode':i['mode'],'type':i['type']} for i in remote['tree'] if i['type'] != 'tree'}
        assert remote_tree == current, 'GitHub complete tree mismatch'
        result.update({'remote_verified':True,'github_complete_tree_verified':True,'remote_entries':len(remote_tree),'backup_checkout_clean':True,'commit_url':'https://github.com/Kexxrix/Site-Skin-edit/commit/'+commit})
    write(EVIDENCE/('github-'+mode+'-verification.json'),result)
    print(json.dumps(result))

if __name__ == '__main__':
    if sys.argv[1] == 'inventory': inventory()
    elif sys.argv[1] == 'snapshot': snapshot()
    else: verify(sys.argv[1])
