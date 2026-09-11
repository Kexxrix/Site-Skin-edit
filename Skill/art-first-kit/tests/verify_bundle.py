"""Exercise portable install, font safety, alpha processing and three-slice pixel invariants."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import sys
import tempfile
from types import SimpleNamespace
from PIL import Image

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    sys.modules[name] = result
    spec.loader.exec_module(result)
    return result

def snapshot(root):
    return {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in root.rglob('*') if p.is_file()}

def expect_error(call):
    try:
        call()
    except (OSError, ValueError):
        return
    raise AssertionError('expected refusal')

def verify():
    checks = []
    installer = module('kit_installer_test', ROOT / 'install.py')
    with tempfile.TemporaryDirectory(prefix='art-first-kit-') as tmp:
        sandbox = Path(tmp)
        project = sandbox / 'project with spaces 한글'
        project.mkdir()
        installer.install(project)
        installed = project / '.agents' / 'skills'
        before = snapshot(project)
        installer.install(project)
        installer.install(project, True)
        assert before == snapshot(project)
        checks.append('project skill installation and idempotence, spaces and Korean paths')

        font = module('kit_font_test', installed / 'site-font-setup/scripts/install_typography.py')
        index = project / 'index.html'
        index.write_text('<!doctype html><html lang="ko"><head><meta charset="utf-8"></head><body><p>가나다 ABC 123</p></body></html>', encoding='utf-8')
        entry, html = font.validate_project(project, True)
        font.install(project, entry, html)
        font.verify(project, entry, html)
        before = snapshot(project)
        font.install(project, entry, html)
        assert before == snapshot(project)
        assert 'url("./fonts/' in (project / 'typography.css').read_text(encoding='utf-8')
        assert index.read_text(encoding='utf-8').count(font.EMBED_START) == 1
        checks.append('static offline font install, font hashes, Adobe embeds, relative URLs and idempotence')

        (project / 'typography.css').write_text('/* user edited */', encoding='utf-8')
        before = snapshot(project)
        expect_error(lambda: font.install(project, entry, html))
        assert before == snapshot(project)
        checks.append('edited typography rejected before any write')

        app = sandbox / 'app'
        (app / 'src').mkdir(parents=True)
        (app / 'index.html').write_text('<html><head></head><body><div id="root"></div></body></html>')
        (app / 'src/main.jsx').write_text('import "./style.css";\nconsole.log("app");\n')
        entry, html = font.validate_project(app)
        font.install(app, entry, html, False)
        font.verify(app, entry, html, False)
        assert entry.read_text(encoding='utf-8').startswith(font.TYPOGRAPHY_IMPORT)
        assert 'use.typekit.net' not in html.read_text(encoding='utf-8')
        checks.append('JSX entry detection and local-only font mode')
        (app / 'src/main.tsx').write_text('export {}')
        expect_error(lambda: font.validate_project(app))
        assert font.validate_project(app, entry=Path('src/main.jsx'))[0] == entry
        expect_error(lambda: font.validate_project(app, entry=Path('../outside.tsx')))
        checks.append('ambiguous entry and escaped entry refused, explicit entry supported')

        bad = sandbox / 'invalid-html'
        bad.mkdir()
        (bad / 'index.html').write_text('<html><body>missing head close</body></html>')
        before = snapshot(bad)
        expect_error(lambda: font.install(bad, None, bad / 'index.html', False))
        assert before == snapshot(bad)
        checks.append('invalid HTML refusal leaves target unchanged')

        alpha = module('kit_alpha_test', installed / 'theme-image-pipeline/scripts/prepare_asset.py')
        fixture = sandbox / 'fixture.png'
        im = Image.new('RGBA', (100, 40), (70, 20, 10, 0))
        for y in range(5, 35):
            for x in range(10, 90):
                im.putpixel((x, y), (x, y, 90, 200))
        im.putpixel((0, 0), (50, 40, 10, 1))
        im.save(fixture)
        mask = sandbox / 'mask.png'
        Image.new('L', im.size, 128).save(mask)
        args = SimpleNamespace(source=fixture, mask=mask, crop=(10, 5, 90, 35), trim_alpha=None,
                               out=sandbox / 'cutout.png', proof=sandbox / 'proof.png', report=sandbox / 'alpha.json')
        record = alpha.run(args)
        assert record['source']['alpha_bounds']['0'] == (0, 0, 90, 35)
        assert record['source']['alpha_bounds']['8'] == (10, 5, 90, 35)
        with Image.open(args.out) as result:
            assert result.size == (80, 30)
            assert result.getpixel((0, 0)) == (10, 5, 90, 100)
        before = snapshot(sandbox)
        expect_error(lambda: alpha.run(args))
        assert before == snapshot(sandbox)
        checks.append('alpha residue detection, explicit mask/crop preserves RGB, overwrite rejected')

        slicer = module('kit_slice_test', installed / 'theme-image-pipeline/scripts/slice_panel.py')
        rebuilt = slicer.render_panel(im, 100, 40, 20, 20)
        assert rebuilt.tobytes() == im.tobytes()
        resized = slicer.render_panel(im, 160, 40, 20, 20)
        assert resized.crop((0, 0, 20, 40)).tobytes() == im.crop((0, 0, 20, 40)).tobytes()
        assert resized.crop((140, 0, 160, 40)).tobytes() == im.crop((80, 0, 100, 40)).tobytes()
        expect_error(lambda: slicer.render_panel(im, 40, 40, 20, 20))
        slicer.export(fixture, sandbox / 'slices', [160], 40, 20, 20)
        assert '__PANEL_CONFIG__' not in (sandbox / 'slices/panel-sizer.html').read_text(encoding='utf-8')
        expect_error(lambda: slicer.export(fixture, sandbox / 'slices', [160], 40, 20, 20))
        checks.append('3-slice original reconstruction, end-cap pixel preservation, export and collision refusal')

        conflict = project / '.agents/skills/theme-image-pipeline/SKILL.md'
        conflict.write_text('user changes', encoding='utf-8')
        before = snapshot(project)
        expect_error(lambda: installer.install(project))
        assert before == snapshot(project)
        checks.append('skill conflict rejected with no writes to either skill')

    links = 0
    for path in ROOT.rglob('*.md'):
        text = path.read_text(encoding='utf-8')
        assert text.count('```') % 2 == 0, str(path)
        for raw in re.findall(r'\[[^\]]+\]\(([^)]+)\)', text):
            if '://' in raw or raw.startswith('#'):
                continue
            link = raw.split('#')[0]
            assert (path.parent / link).is_file(), f'{path}: {link}'
            links += 1
    index = ROOT / 'skills/theme-image-pipeline/references/tested-prompts/index.json'
    records = json.loads(index.read_text(encoding='utf-8'))['files']
    for record in records:
        assert hashlib.sha256((index.parent / record['file']).read_bytes()).hexdigest() == record['sha256']
    checks.append(f'{links} local document links and {len(records)} historical prompt hashes')
    return {'passed': len(checks), 'failed': 0, 'checks': checks,
            'new_images_generated': 0, 'production_projects_modified': 0}

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    result = verify()
    text = json.dumps(result, ensure_ascii=False, indent=2)
    if args.report:
        args.report.write_text(text + '\n', encoding='utf-8')
    print(text)
