from pathlib import Path
import json, hashlib
root = Path(r'E:/codexwork/Site-Skin-edit/demo-sites/mercury-white-20261007/site')
qa = Path(__file__).parent
before = json.loads((qa/'local-before.json').read_text(encoding='utf-8'))
changed = []
missing = []
for name, expected in before.items():
    path = root/name
    if not path.is_file(): missing.append(name)
    elif hashlib.sha256(path.read_bytes()).hexdigest() != expected: changed.append(name)
result = {'checkedFiles':len(before),'unchangedFiles':len(before)-len(changed)-len(missing),'changedFiles':changed,'missingFiles':missing,'captureTemporaryRemoved':not (root/'dist/client/__mercury_figma_65b55936.html').exists()}
(qa/'local-verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
assert not changed and not missing and result['captureTemporaryRemoved']
