from pathlib import Path
from datetime import datetime, timezone
import hashlib, json

E = Path(__file__).parent
manifest = json.loads((E/'approved-source.json').read_text(encoding='utf-8-sig'))
app, publish = Path(manifest['source']), Path(manifest['publish'])
sha = lambda data: hashlib.sha256(data).hexdigest()
differences = []
for rec in manifest['files']:
    assert sha((app/rec['path']).read_bytes()) == rec['sha256'], rec['path']
    if sha((publish/rec['path']).read_bytes()) != rec['sha256']:
        differences.append(rec['path'])
assert set(differences) == {'.gitignore','vite.config.ts'}, differences
report = {'verified_at_utc':datetime.now(timezone.utc).isoformat(),'source_files_unchanged':len(manifest['files']),'release_only_differences':differences,'anonymous_http_checks':[{'path':'/','status':403,'verification':'Observed initial urllib request; stopped on HTTPError. No retry or bypass. Public response and asset response hashes unverified through this path.'}],'no_font_retry':True}
(E/'public-http-verification.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report))
