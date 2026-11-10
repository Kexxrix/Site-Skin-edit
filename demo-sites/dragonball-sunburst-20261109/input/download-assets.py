"""Download the exact Figma-exported assets using the provided curl workflow."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256, sha1
from PIL import Image
import json
import re
import subprocess

root = Path(__file__).resolve().parent.parent
assets = []
for source in sorted((root / 'input').glob('figma-*.tsx')):
    prefix = source.stem.removeprefix('figma-')
    for variable, url in re.findall(r'const (\w+) = "(https://www\.figma\.com/api/mcp/asset/[^\"]+)";', source.read_text(encoding='utf-8')):
        extension = Path(url).suffix
        assets.append({'source': source.name, 'variable': variable, 'url': url, 'local': f'assets/{prefix}-{variable}{extension}'})

def download(asset):
    path = root / 'site' / asset['local']
    if not path.exists():
        subprocess.run(['curl.exe', '-f', '-L', '-sS', '--retry', '2', '-o', str(path), asset['url']], check=True)
    assert path.stat().st_size > 0, path
    data = path.read_bytes()
    result = dict(asset, bytes=len(data), sha256=sha256(data).hexdigest(), sha1=sha1(data).hexdigest())
    if path.suffix == '.png':
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            result.update(width=image.width, height=image.height, format=image.format, mode=image.mode)
    else:
        assert b'<svg' in data[:1000], path
        result['format'] = 'SVG'
    return result

with ThreadPoolExecutor(max_workers=6) as pool:
    manifest = list(pool.map(download, assets))
(root / 'input/asset-map.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(root / 'input/asset-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'downloaded': len(manifest), 'bytes': sum(row['bytes'] for row in manifest), 'png': sum(row['format'] == 'PNG' for row in manifest), 'svg': sum(row['format'] == 'SVG' for row in manifest)}))
