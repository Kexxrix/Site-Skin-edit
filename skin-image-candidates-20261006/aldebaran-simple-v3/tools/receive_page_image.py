"""Save exact Page image bytes without overwriting existing local files."""
import argparse
import base64
import hashlib
import io
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('relative_path')
parser.add_argument('--chunk')
parser.add_argument('--base64-file')
parser.add_argument('--offset', type=int, default=0)
parser.add_argument('--sha256')
parser.add_argument('--bytes', type=int)
args = parser.parse_args()
target = (ROOT / args.relative_path).resolve()
if ROOT not in target.parents:
    raise SystemExit('Destination is outside the authorized task folder')
partial = target.with_name(target.name + '.transfer')
target.parent.mkdir(parents=True, exist_ok=True)
if args.chunk is not None:
    raw = base64.b64decode(args.chunk, validate=True)
    if args.offset == 0:
        mode = 'xb'
    else:
        if partial.stat().st_size != args.offset:
            raise SystemExit('Transfer offset mismatch')
        mode = 'ab'
    with partial.open(mode) as handle:
        handle.write(raw)
    raise SystemExit(0)
if not args.sha256 or args.bytes is None:
    raise SystemExit('Completion requires authoritative hash and byte count')
if args.base64_file:
    staging = (ROOT / args.base64_file).resolve()
    if ROOT not in staging.parents:
        raise SystemExit('Staging is outside the authorized task folder')
    raw = base64.b64decode(staging.read_text(encoding='ascii').strip(), validate=True)
else:
    raw = partial.read_bytes()
if len(raw) != args.bytes or hashlib.sha256(raw).hexdigest() != args.sha256:
    raise SystemExit('Transferred bytes differ from the Page source')
with Image.open(io.BytesIO(raw)) as probe:
    probe.load()
    info = {'format': probe.format, 'mode': probe.mode,
            'size': list(probe.size), 'bytes': len(raw),
            'sha256': hashlib.sha256(raw).hexdigest()}
if target.exists():
    raise SystemExit('Destination already exists')
if args.base64_file:
    with target.open('xb') as handle:
        handle.write(raw)
else:
    partial.rename(target)
if hashlib.sha256(target.read_bytes()).hexdigest() != info['sha256']:
    raise SystemExit('Saved hash differs from received bytes')
info['path'] = str(target)
print(json.dumps(info))
