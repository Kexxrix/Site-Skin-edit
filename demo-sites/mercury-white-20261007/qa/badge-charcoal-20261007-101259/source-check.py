from pathlib import Path
import hashlib, json, shutil, subprocess, sys

OUT=Path(__file__).parent
PROJECT=OUT.parent.parent
APP=PROJECT/'site'
STAGE=PROJECT/'qa/button-polish-20261007-080224/build-site'
FIXED=PROJECT/'qa/card-outline-service-20261007-085124/final-source.json'
ALLOWED={'app/mercury-white.css','theme/mercury-white-button-polish.json'}
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def git(*args): return subprocess.check_output(['git','-c','safe.directory='+APP.as_posix(),'-C',str(APP),*args]).decode().strip()
def write(name,data): (OUT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
fixed=json.loads(FIXED.read_text(encoding='utf-8-sig'))
assert git('rev-parse','HEAD')==fixed['commit']=='b425507730a4f39dd393645ef4273653a7c13176'
if sys.argv[1]=='before':
    assert not git('status','--porcelain')
    for group in ['source','build']:
        for rel,rec in fixed[group].items(): assert sha(APP/rel)==rec['sha256'], rel
    write('source-before.json',{'commit':fixed['commit'],'source':fixed['source'],'build':fixed['build']})
    print(json.dumps({'source_files':len(fixed['source']),'build_files':len(fixed['build']),'clean':True}))
else:
    changed={rel for rel,rec in fixed['source'].items() if sha(APP/rel)!=rec['sha256']}
    assert changed==ALLOWED, sorted(changed)
    assert not git('remote')
    assert sha(APP/'theme/mercury-palette_98.json')==sha(PROJECT/'input/mercury-palette_98.json')=='f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5'
    records={rel:{'sha256':sha(APP/rel),'bytes':(APP/rel).stat().st_size} for rel in fixed['source']}
    if sys.argv[1]=='stage':
        assert STAGE.is_dir() and (STAGE/'node_modules').is_dir()
        assert STAGE.resolve().is_relative_to(PROJECT.resolve())
        for rel,rec in records.items():
            dest=STAGE/rel;dest.parent.mkdir(parents=True,exist_ok=True)
            shutil.copyfile(APP/rel,dest)
            assert sha(dest)==rec['sha256'], rel
        write('source-after.json',{'base_commit':fixed['commit'],'working_tree_changes':sorted(changed),'source':records})
    else:
        after=json.loads((OUT/'source-after.json').read_text(encoding='utf-8-sig'))
        assert records==after['source']
    print(json.dumps({'mode':sys.argv[1],'changed_source_paths':sorted(changed),'unchanged_source_files':len(records)-len(changed),'approved_palette_preserved':True,'no_remotes':True}))
