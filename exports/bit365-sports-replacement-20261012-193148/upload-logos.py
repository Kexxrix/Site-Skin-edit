import json, hashlib, urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

root = Path(__file__).parent
plan = json.loads((root / 'upload-plan.json').read_text(encoding='utf-8'))
def upload(item):
    path = Path(item['path'])
    with Image.open(path) as image:
        assert image.format == 'PNG'
        size = image.size
        image.verify()
    raw = path.read_bytes()
    request = urllib.request.Request(item['submitUrl'], data=raw, headers={'Content-Type': 'image/png'}, method='POST')
    with urllib.request.urlopen(request, timeout=90) as response:
        body = json.loads(response.read().decode())
        return {'key': item['key'], 'nodeId': item['targetNodeId'], 'sourcePath': str(path), 'size': size,
                'sha256': hashlib.sha256(raw).hexdigest(), 'status': response.status, 'imageHash': body['imageHash']}
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(upload, plan))
(root / 'uploaded-logos.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(results))
