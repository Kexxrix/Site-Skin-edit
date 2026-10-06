from pathlib import Path
import subprocess,json,time,collections
Q=Path(__file__).resolve().parent;SITE=Q.parent.parent
B=Path('E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3/odds-text-20261006-v1')
NODE='C:/Program Files/nodejs/node.exe';result={}
def run(name,args):
    t=time.monotonic();r=subprocess.run(args,cwd=SITE,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    (Q/(name+'-stdout.log')).write_bytes(r.stdout);(Q/(name+'-stderr.log')).write_bytes(r.stderr)
    result[name]={'command':args,'exit_code':r.returncode,'seconds':round(time.monotonic()-t,3)};return r
run('type',[NODE,'node_modules/typescript/bin/tsc','--noEmit','--incremental','false'])
run('lint-full',[NODE,'node_modules/oxlint/bin/oxlint','--format','json','app/page.tsx'])
cfg=json.loads((SITE/'.oxlintrc.json').read_text(encoding='utf8'));cfg['options']['typeAware']=False;cfg['options']['typeCheck']=False
(Q/'lint-static-config.json').write_text(json.dumps(cfg),encoding='utf8')
args=[NODE,'node_modules/oxlint/bin/oxlint','--config',str(Q/'lint-static-config.json'),'--format','json']
old=run('lint-before',args+[str(B/'before-app/page.tsx')]);new=run('lint-after',args+['app/page.tsx'])
sig=lambda d:(d.get('code'),d['message'],d['severity'],len(d.get('labels',[])))
a=json.loads(old.stdout)['diagnostics'];b=json.loads(new.stdout)['diagnostics'];ac=collections.Counter(map(sig,a));bc=collections.Counter(map(sig,b))
result['lint-comparison']={'before':len(a),'after':len(b),'same':ac==bc,'new':[list(k)+[v] for k,v in (bc-ac).items()]}
(Q/'code-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(result,ensure_ascii=False,indent=2))
