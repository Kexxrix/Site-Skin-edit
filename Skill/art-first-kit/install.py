"""Copy this package's two self-contained skills to one project's .agents/skills."""
import argparse
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent
NAMES = ('site-font-setup', 'theme-image-pipeline')

def files(root):
    return {p.relative_to(root): p.read_bytes() for p in root.rglob('*')
            if p.is_file() and '__pycache__' not in p.parts and p.suffix != '.pyc'}

def install(project, verify_only=False):
    project = project.resolve(strict=True)
    if not project.is_dir():
        raise ValueError('project must be an existing directory')
    target_root = project / '.agents' / 'skills'
    jobs = []
    # Preflight the whole set before writing either skill. Never overwrite edits.
    for name in NAMES:
        source = ROOT / 'skills' / name
        payload = files(source)
        if Path('SKILL.md') not in payload:
            raise ValueError(f'incomplete package skill: {name}')
        dest = target_root / name
        dest.resolve().relative_to(project)
        if dest.exists() and not dest.is_dir():
            raise ValueError(f'not a directory: {dest}')
        if dest.exists():
            unexpected = set(files(dest)) - set(payload)
            if unexpected:
                raise ValueError(f'existing skill has extra files; refusing mixed versions: {dest}')
        for relative, data in payload.items():
            target = dest / relative
            target.resolve().relative_to(project)
            if target.exists() and (not target.is_file() or target.read_bytes() != data):
                raise ValueError(f'refusing to overwrite different file: {target}')
            if verify_only and not target.is_file():
                raise ValueError(f'missing installed file: {target}')
            jobs.append((target, data))
    if not verify_only:
        for target, data in jobs:
            if not target.exists():
                target.parent.mkdir(parents=True, exist_ok=True)
                with target.open('xb') as stream:
                    stream.write(data)
    for target, data in jobs:
        if hashlib.sha256(target.read_bytes()).digest() != hashlib.sha256(data).digest():
            raise ValueError(f'copy verification failed: {target}')
    return {'project': str(project), 'skills': list(NAMES), 'files_verified': len(jobs),
            'mode': 'verify-only' if verify_only else 'installed', 'overwrites': 0}

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--project', required=True, type=Path)
    parser.add_argument('--verify-only', action='store_true')
    args = parser.parse_args()
    try:
        print(json.dumps(install(args.project, args.verify_only), ensure_ascii=False, indent=2))
    except (OSError, ValueError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        raise SystemExit(2)
