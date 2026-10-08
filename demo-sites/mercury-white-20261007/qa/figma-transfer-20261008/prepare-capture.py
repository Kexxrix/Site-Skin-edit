from pathlib import Path
import re, json, hashlib, urllib.request

root = Path(r'E:/codexwork/Site-Skin-edit/demo-sites/mercury-white-20261007/site')
qa = Path(__file__).parent
temporary = root / 'dist/client/__mercury_figma_65b55936.html'
assert not temporary.exists(), temporary
paths = []
for folder in ('app', 'public', 'theme', 'dist'):
    paths.extend(p for p in (root / folder).rglob('*') if p.is_file())
paths.extend(p for p in root.iterdir() if p.is_file())
hashes = {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in paths}
(qa / 'local-before.json').write_text(json.dumps(hashes, indent=2), encoding='utf-8')
html = urllib.request.urlopen('http://127.0.0.1:5418/').read().decode('utf-8')
(qa / 'source-response.html').write_text(html, encoding='utf-8')
html = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
html = re.sub(r'<link\b[^>]*(?:use\.typekit\.net|rel="modulepreload")[^>]*>', '', html, flags=re.I)
html = html.replace('</head>', '<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script></head>')
temporary.write_text(html, encoding='utf-8')
(qa / 'capture-preparation.json').write_text(json.dumps({'temporary': str(temporary), 'trackedFiles': len(hashes), 'sourceBytes': len(html.encode()), 'images': len(re.findall(r'<img\b', html)), 'scripts': re.findall(r'<script[^>]*>', html)}, indent=2), encoding='utf-8')
print(json.dumps({'temporary': str(temporary), 'hashedFiles': len(hashes), 'images': len(re.findall(r'<img\b', html))}))
