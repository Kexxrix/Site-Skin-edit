from pathlib import Path
import json,subprocess,sys,time,collections
ROOT=Path(__file__).resolve().parents[1];SITE=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site');NODE='C:/Program Files/nodejs/node.exe'
mode=sys.argv[1]
def run(name,args):
    start=time.time();p=subprocess.run(args,cwd=SITE,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    (ROOT/(name+'-stdout.log')).write_bytes(p.stdout);(ROOT/(name+'-stderr.log')).write_bytes(p.stderr)
    return {'command':args,'exit_code':p.returncode,'seconds':round(time.time()-start,3)},p
if mode=='lint':
    config=json.loads((SITE/'.oxlintrc.json').read_text(encoding='utf-8'));config['options']['typeAware']=False;config['options']['typeCheck']=False
    cfg=ROOT/'lint-comparison-config.json';cfg.write_text(json.dumps(config),encoding='utf-8')
    base=[NODE,'node_modules/oxlint/bin/oxlint','--config',str(cfg),'--format','json']
    br,before=run('lint-baseline-static',base+[str(ROOT/'before-app/page.tsx')]);ar,after=run('lint-after-static',base+['app/page.tsx'])
    old=json.loads(before.stdout)['diagnostics'];new=json.loads(after.stdout)['diagnostics']
    sig=lambda d:(d['code'],d['message'],d['severity'],len(d.get('labels',[])))
    a=collections.Counter(map(sig,old));b=collections.Counter(map(sig,new));assert a==b
    full,unused=run('lint-project', [NODE,'node_modules/oxlint/bin/oxlint','--format','json','app/page.tsx'])
    report={'static_comparison':'same project rules with typeAware/typeCheck disabled equally for outside baseline and live file;full TypeScript separately checked',
            'before':br,'after':ar,'existing_before':len(old),'existing_after':len(new),'new_findings':0,'full_project_lint':full,'full_lint_pass':full['exit_code']==0}
else:
    args=[NODE,'node_modules/typescript/bin/tsc','--noEmit','--incremental','false'] if mode=='type' else [NODE,'node_modules/vinext/dist/cli.js','build']
    report,process=run(mode,args)
with (ROOT/(mode+'-result.json')).open('x',encoding='utf-8') as f:json.dump(report,f,ensure_ascii=False,indent=2)
print(json.dumps(report))
if mode!='lint':sys.exit(process.returncode)
