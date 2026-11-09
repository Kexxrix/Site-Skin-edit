from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess, json, hashlib, sys
from PIL import Image
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')
root = Path(__file__).resolve().parent.parent
assets = json.loads((root / 'input/asset-map.json').read_text(encoding='utf-8'))

def download(asset):
    target = root / 'site' / asset['local']
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        subprocess.run(['curl.exe', '-fL', '--retry', '2', '--silent', '--show-error', '--output', str(target), asset['url']], check=True)
    if not target.stat().st_size:
        raise ValueError(f'Empty asset: {target}')
    result = dict(asset, bytes=target.stat().st_size, sha256=hashlib.sha256(target.read_bytes()).hexdigest())
    if target.suffix == '.svg':
        svg = ET.parse(target).getroot()
        result.update(format='SVG', width=svg.get('width'), height=svg.get('height'), viewBox=svg.get('viewBox'))
    else:
        with Image.open(target) as image:
            image.load()
            result.update(format=image.format, width=image.width, height=image.height)
    return result

with ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(download, assets))
(root / 'input/asset-manifest.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'downloaded_and_validated':len(results), 'bytes':sum(x['bytes'] for x in results), 'unique_hashes':len(set(x['sha256'] for x in results))}))
