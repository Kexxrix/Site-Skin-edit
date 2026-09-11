from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import sys
from PIL import Image

RUN_ROOT = Path(__file__).resolve().parents[1]
APP_ROOT = RUN_ROOT.parents[1] / 'titan_promotion'
BASELINE = RUN_ROOT / 'qa' / 'app-hashes-before.json'
SCOPES = ('components', 'app', 'public')

def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()

def app_hashes():
    files = {}
    for scope in SCOPES:
        directory = APP_ROOT / scope
        if not directory.is_dir():
            raise FileNotFoundError(f'Missing required app scope: {directory}')
        for file in sorted(directory.rglob('*')):
            relative = file.relative_to(APP_ROOT)
            if any(part.lower() in ('.next', 'node_modules') for part in relative.parts):
                continue
            if file.is_file():
                files[relative.as_posix()] = sha256(file)
    return files

def inspect_image(path):
    path = Path(path).resolve(strict=True)
    with Image.open(path) as image:
        if image.format != 'PNG':
            raise ValueError(f'Expected actual PNG, received {image.format}: {path}')
        image.verify()
    with Image.open(path) as image:
        image.load()
        width, height = image.size
        mode = image.mode
    return {
        'path': str(path), 'format': 'PNG', 'readable': True,
        'width': width, 'height': height, 'mode': mode,
        'orientation': 'portrait' if height > width else ('landscape' if width > height else 'square'),
        'bytes': path.stat().st_size, 'sha256': sha256(path),
    }

def main():
    parser = argparse.ArgumentParser(description='Verify the four generated PNGs and preservation of app/components/public. No aspect-ratio or dimension constraints are imposed.')
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--baseline', action='store_true', help='Create the app hash baseline once without checking generated images.')
    mode.add_argument('--inspect-image', type=Path, help='Decode and report one actual PNG; used by archive.ps1.')
    args = parser.parse_args()
    if args.inspect_image:
        print(json.dumps(inspect_image(args.inspect_image), ensure_ascii=False))
        return 0
    if args.baseline:
        record = {
            'created_at': datetime.now(timezone.utc).isoformat(),
            'app_root': str(APP_ROOT), 'scopes': list(SCOPES),
            'excluded_directory_names': ['.next', 'node_modules'],
            'files': app_hashes(),
        }
        with BASELINE.open('x', encoding='utf-8') as output:
            json.dump(record, output, ensure_ascii=False, indent=2)
            output.write('\n')
        print(json.dumps({'baseline': str(BASELINE), 'files': len(record['files']), 'created_at': record['created_at']}))
        return 0
    before_record = json.loads(BASELINE.read_text(encoding='utf-8-sig'))
    if Path(before_record['app_root']).resolve() != APP_ROOT.resolve():
        raise ValueError('Baseline app root does not match this run')
    before = before_record['files']
    current = app_hashes()
    changed = sorted(name for name in before.keys() & current.keys() if before[name] != current[name])
    added = sorted(current.keys() - before.keys())
    removed = sorted(before.keys() - current.keys())
    result_files = sorted(path for path in (RUN_ROOT / 'results').iterdir() if path.is_file() and path.suffix.lower() == '.png')
    images, failures = [], []
    for path in result_files:
        try:
            images.append(inspect_image(path))
        except Exception as error:
            failures.append({'path': str(path), 'error': str(error)})
    okay = len(result_files) == 4 and not failures and not (changed or added or removed)
    report = {
        'run_root': str(RUN_ROOT), 'status': 'pass' if okay else 'fail',
        'results': {'expected_png_count': 4, 'found_png_count': len(result_files), 'images': images, 'decode_failures': failures},
        'app': {'baseline': str(BASELINE), 'before_file_count': len(before), 'current_file_count': len(current), 'unchanged': not (changed or added or removed), 'changed': changed, 'added': added, 'removed': removed},
        'aspect_ratio_requirement': None,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if okay else 1

if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as error:
        print(json.dumps({'status': 'error', 'error': str(error)}, ensure_ascii=False), file=sys.stderr)
        sys.exit(1)
