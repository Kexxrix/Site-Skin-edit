import json, urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

root = Path(__file__).parent
plan = json.loads((root / 'png-upload-plan.json').read_text(encoding='utf-8'))
def upload(item):
    request = urllib.request.Request(item['submitUrl'], data=Path(item['path']).read_bytes(), headers={'Content-Type': 'image/png'}, method='POST')
    with urllib.request.urlopen(request, timeout=120) as response:
        body = response.read().decode()
        return {'key': item['key'], 'targetNodeId': item['targetNodeId'], 'status': response.status, 'body': body}
with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(upload, plan))
(root / 'png-upload-results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'uploaded': len(results), 'statuses': [x['status'] for x in results]}))
