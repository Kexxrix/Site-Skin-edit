from pathlib import Path
import json, subprocess, time, collections
Q=Path(__file__).resolve().parent
SITE=Q.parent.parent
B=Path('E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3/application-20261006-v1')
NODE='C:/Program Files/nodejs/node.exe'
result={}
def run(label,args):
    start=time.monotonic()
    r=subprocess.run(args,cwd=SITE,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    (Q/(label+'-stdout.log')).write_bytes(r.stdout);(Q/(label+'-stderr.log')).write_bytes(r.stderr)
    result[label]={'command':args,'exit_code':r.returncode,'seconds':round(time.monotonic()-start,3)}
    return r
run('type',[NODE,'node_modules/typescript/bin/tsc','--noEmit','--incremental','false'])
lint=run('lint-current-full',[NODE,'node_modules/oxlint/bin/oxlint','--format','json','app/aldebaran-wog-r5.tsx'])
cfg=json.loads((SITE/'.oxlintrc.json').read_text(encoding='utf-8-sig'));cfg['options']['typeAware']=False;cfg['options']['typeCheck']=False
(Q/'lint-static-config.json').write_text(json.dumps(cfg),encoding='utf8')
old=run('lint-baseline-static',[NODE,'node_modules/oxlint/bin/oxlint','--config',str(Q/'lint-static-config.json'),'--format','json',str(B/'before-source/app/aldebaran-wog-r5.tsx')])
new=run('lint-current-static',[NODE,'node_modules/oxlint/bin/oxlint','--config',str(Q/'lint-static-config.json'),'--format','json','app/aldebaran-wog-r5.tsx'])
signature=lambda d:(d.get('code'),d['message'],d['severity'],len(d.get('labels',[])))
for name,left,right in [('independent_static_comparison',old.stdout,new.stdout),('saved_configured_baseline_comparison',(B/'lint-before.json').read_bytes(),lint.stdout)]:
    try:
        a=json.loads(left)['diagnostics'];b=json.loads(right)['diagnostics'];ac=collections.Counter(map(signature,a));bc=collections.Counter(map(signature,b))
        result[name]={'before':len(a),'after':len(b),'same':ac==bc,'new_diagnostics':[list(k)+[v] for k,v in (bc-ac).items()]}
    except Exception as e:result[name]={'error':str(e)}
(Q/'code-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(result,ensure_ascii=False,indent=2))
