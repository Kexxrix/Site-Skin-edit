"""Inspect alpha or apply an explicit mask/crop to a new output. Never infer semantic background."""
import argparse
import hashlib
import io
import json
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def metadata(path, image):
    alpha = image.getchannel('A')
    histogram = alpha.histogram()
    count = image.width * image.height
    return {'path': str(path.resolve()), 'sha256': digest(path), 'size': list(image.size),
            'transparent_pixels': histogram[0], 'partial_alpha_pixels': sum(histogram[1:255]),
            'opaque_pixels': histogram[255], 'total_pixels': count,
            'alpha_bounds': {str(t): alpha.point(lambda value: 255 if value > t else 0).getbbox()
                             for t in (0, 8, 24, 48, 128)},
            'semantic_background_removed': 'not inferred; visual verification required'}

def save_new(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('xb') as stream:
        stream.write(data)

def png(image):
    buffer = io.BytesIO()
    image.save(buffer, format='PNG')
    return buffer.getvalue()

def proof(image):
    sample = image.copy()
    sample.thumbnail((540, 640), Image.Resampling.LANCZOS)
    backgrounds = [Image.new('RGBA', sample.size, color) for color in ('white', '#111827', '#bdbdbd')]
    draw = ImageDraw.Draw(backgrounds[2])
    for y in range(0, sample.height, 16):
        for x in range(0, sample.width, 16):
            if (x // 16 + y // 16) % 2:
                draw.rectangle((x, y, x + 15, y + 15), fill='#ededed')
    result = Image.new('RGB', (sample.width * 3, sample.height))
    for index, bg in enumerate(backgrounds):
        result.paste(Image.alpha_composite(bg, sample).convert('RGB'), (index * sample.width, 0))
    return result

def run(args):
    source = args.source.resolve(strict=True)
    with Image.open(source) as im:
        im.load()
        original_mode = im.mode
        image = im.convert('RGBA')
    before = metadata(source, image)
    before['original_mode'] = original_mode
    operations = []
    if args.mask:
        with Image.open(args.mask) as mask:
            mask.load()
            if mask.size != image.size:
                raise ValueError('mask must exactly match source dimensions')
            mask = mask.convert('L')
        image.putalpha(ImageChops.multiply(image.getchannel('A'), mask))
        operations.append({'mask': str(args.mask.resolve()), 'sha256': digest(args.mask),
                           'white': 'keep', 'black': 'remove'})
    bounds = tuple(args.crop) if args.crop else None
    if args.trim_alpha is not None:
        bounds = image.getchannel('A').point(lambda a: 255 if a > args.trim_alpha else 0).getbbox()
        if bounds is None:
            raise ValueError('no pixels above trim threshold')
        operations.append({'trim_alpha_bounds_threshold': args.trim_alpha,
                           'note': 'threshold sets bounds only; pixels inside are not re-matted'})
    if bounds:
        x0, y0, x1, y1 = bounds
        if not (0 <= x0 < x1 <= image.width and 0 <= y0 < y1 <= image.height):
            raise ValueError('crop must lie within the source canvas and be nonempty')
        image = image.crop(bounds)
        operations.append({'crop': list(bounds)})
    if operations and not args.out:
        raise ValueError('--out is required for modifications')
    outputs = {}
    if args.out:
        if args.out.suffix.lower() != '.png':
            raise ValueError('transformed output must have .png extension')
        outputs[args.out.resolve()] = png(image)
    if args.proof:
        if args.proof.suffix.lower() != '.png':
            raise ValueError('proof must have .png extension')
        outputs[args.proof.resolve()] = png(proof(image))
    record = {'source': before, 'operations': operations, 'output_size': list(image.size),
              'retained_rgb': 'unchanged except cropping; no generative edits or colour adjustment',
              'user_accepted': False}
    if args.out:
        record['output'] = str(args.out.resolve())
        record['output_sha256'] = hashlib.sha256(outputs[args.out.resolve()]).hexdigest()
    if args.report:
        outputs[args.report.resolve()] = json.dumps(record, ensure_ascii=False, indent=2).encode('utf-8')
    specified = [p.resolve() for p in (args.out, args.proof, args.report) if p]
    if len(set(specified)) != len(specified):
        raise ValueError('output, proof and report must have distinct paths')
    for path in outputs:
        if path.exists():
            raise FileExistsError(f'refusing to overwrite: {path}')
    for path, data in outputs.items():
        save_new(path, data)
    return record

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('--mask', type=Path, help='Reviewed same-size grayscale mask: white keep, black remove')
    crop = parser.add_mutually_exclusive_group()
    crop.add_argument('--crop', type=int, nargs=4, metavar=('LEFT', 'TOP', 'RIGHT', 'BOTTOM'))
    crop.add_argument('--trim-alpha', type=int, choices=range(0, 255), metavar='0..254')
    parser.add_argument('--out', type=Path)
    parser.add_argument('--proof', type=Path)
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    try:
        print(json.dumps(run(args), ensure_ascii=False, indent=2))
    except (OSError, ValueError) as exc:
        parser.exit(2, f'ERROR: {exc}\n')
