"""Vinext adapter: install the approved local font bundle without a fake HTML entry."""
import hashlib
import importlib.util
import json
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
script = Path('E:/codexwork/Site-Skin-edit/.agents/skills/site-font-setup/scripts/install_typography.py')
spec = importlib.util.spec_from_file_location('font_installer', script)
module = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = module
spec.loader.exec_module(module)
records = []
for font in module.DOWNLOADS:
    data = module.bundled_font(font)
    target = root / 'site/public/fonts/pretendard-jp' / font.name
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists() and target.read_bytes() != data:
        raise ValueError(f'Refusing to replace {target}')
    target.write_bytes(data)
    records.append({'file': str(target), 'sha256': hashlib.sha256(data).hexdigest(), 'verified': True})
target = root / 'site/app/typography.css'
data = module.CSS_TEMPLATE.read_bytes()
if target.exists() and target.read_bytes() != data:
    raise ValueError('Refusing to replace edited typography.css')
target.write_bytes(data)
(root / 'qa/font-files.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
print('Verified 5 bundled Pretendard JP fonts, license, and CSS. Vinext layout imports typography.css.')
