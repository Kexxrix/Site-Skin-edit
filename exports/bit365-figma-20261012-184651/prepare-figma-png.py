import json, hashlib
from pathlib import Path
from PIL import Image, ImageChops

root = Path(__file__).parent
data = json.loads((root / 'source.json').read_text(encoding='utf-8-sig'))
assets = data['assets']
destination = root / 'figma-png'
destination.mkdir(exist_ok=True)
records = []
for asset in assets:
    source = Path(asset['path'])
    if source.suffix.lower() != '.webp':
        continue
    target = destination / (asset['key'] + '.png')
    if target.exists():
        raise RuntimeError(f'Output collision: {target}')
    with Image.open(source) as image:
        original = image.convert('RGBA')
        original.save(target, format='PNG')
    with Image.open(target) as image:
        result = image.convert('RGBA')
        assert result.size == original.size
        assert ImageChops.difference(original, result).getbbox() is None
    records.append({**asset, 'sourcePath': str(source), 'path': str(target), 'size': original.size,
                    'sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'pixelIdentical': True})
(root / 'figma-png-validation.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'converted': len(records), 'pixelIdentical': True}))
