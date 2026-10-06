from pathlib import Path
import collections,json,subprocess,sys,time
ROOT=Path(__file__).resolve().parents[1]
SITE=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site')
NODE='C:/Program Files/nodejs/node.exe'
mode=sys.argv[1]
commands={'type':[NODE,'node_modules/typescript/bin/tsc','--noEmit','--incremental','false'],
          'build':[NODE,'node_modules/vinext/dist/cli.js','build'],
          'lint':[NODE,'node_modules/oxlint/bin/oxlint','--format','json','app/aldebaran-wog-r5.tsx']}
start=time.time();run=subprocess.run(commands[mode],cwd=SITE,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
(ROOT/(mode+'-stdout.log')).write_bytes(run.stdout);(ROOT/(mode+'-stderr.log')).write_bytes(run.stderr)
report={'mode':mode,'command':commands[mode],'exit_code':run.returncode,'seconds':round(time.time()-start,3)}
if mode=='lint':
    before=json.loads((ROOT/'lint-before.json').read_text(encoding='utf-8-sig'))
    after=json.loads(run.stdout)
    signature=lambda d:(d['code'],d['message'],d['severity'],len(d.get('labels',[])))
    previous=collections.Counter(map(signature,before['diagnostics']));current=collections.Counter(map(signature,after['diagnostics']))
    report.update({'before_diagnostics':len(before['diagnostics']),'after_diagnostics':len(after['diagnostics']),
                   'new_findings':[list(k)+[v] for k,v in (current-previous).items()],
                   'same_existing_diagnostics':previous==current,'full_lint_pass':run.returncode==0})
    assert previous==current
with (ROOT/(mode+'-result.json')).open('w',encoding='utf-8') as f:json.dump(report,f,ensure_ascii=False,indent=2)
print(json.dumps(report));
if mode!='lint':sys.exit(run.returncode)
