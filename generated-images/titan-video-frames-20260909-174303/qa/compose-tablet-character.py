from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path('E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303')
PLATE = ROOT / 'results/01-tablet-plate.png'
SOURCE = ROOT / 'sources/cat-village-tablet-character.png'
OUTPUT = ROOT / 'derived/01-tablet-start-character.png'
REPORT = ROOT / 'qa/01-tablet-character-composite.json'

def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

if OUTPUT.exists():
    raise FileExistsError(f'Preserving existing output: {OUTPUT}')
plate_hash = sha256(PLATE)
source_hash = sha256(SOURCE)
plate = Image.open(PLATE).convert('RGB')
source = Image.open(SOURCE).convert('RGB')
pixels = np.asarray(plate)

# Find the continuous gray display inside the existing black bezel.
# The bounded region is taken from direct visual inspection of this plate.
luminance = np.mean(pixels.astype(float), axis=2)
eligible = np.zeros(luminance.shape, dtype=np.uint8)
eligible[160:702, 742:1500] = (luminance[160:702, 742:1500] > 80).astype(np.uint8) * 255
region = Image.fromarray(eligible).copy()
ImageDraw.floodfill(region, (1100, 450), 128, thresh=0)
inside = np.asarray(region) == 128
ys, xs = np.where(inside)
if not (300000 < inside.sum() < 420000):
    raise ValueError('Unexpected display region; refusing a speculative composite')

# Fit the four straight edges away from the display's existing rounded corners.
edge_x = np.arange(820, 1440)
top_y = np.array([np.flatnonzero(inside[:, x])[0] for x in edge_x])
bottom_y = np.array([np.flatnonzero(inside[:, x])[-1] for x in edge_x])
edge_y = np.arange(240, 635)
left_x = np.array([np.flatnonzero(inside[y, :])[0] for y in edge_y])
right_x = np.array([np.flatnonzero(inside[y, :])[-1] for y in edge_y])
top = np.polyfit(edge_x, top_y, 1)
bottom = np.polyfit(edge_x, bottom_y, 1)
left = np.polyfit(edge_y, left_x, 1)
right = np.polyfit(edge_y, right_x, 1)

def intersect(horizontal, vertical):
    a, b = horizontal
    c, d = vertical
    x = (c * b + d) / (1 - c * a)
    return (float(x), float(a * x + b))

quad = [intersect(top, left), intersect(top, right), intersect(bottom, right), intersect(bottom, left)]
source_quad = [(0, 0), (source.width-1, 0), (source.width-1, source.height-1), (0, source.height-1)]
matrix, values = [], []
for (x, y), (u, v) in zip(quad, source_quad):
    matrix.append([x, y, 1, 0, 0, 0, -u*x, -u*y])
    matrix.append([0, 0, 0, x, y, 1, -v*x, -v*y])
    values.extend([u, v])
coefficients = np.linalg.solve(np.array(matrix, dtype=float), np.array(values, dtype=float))
warped = source.transform(plate.size, Image.Transform.PERSPECTIVE, coefficients.tolist(), resample=Image.Resampling.BICUBIC)
mask = Image.fromarray(inside.astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(0.35))
composite = Image.composite(warped, plate, mask)
mask_pixels = np.asarray(mask)
result_pixels = np.asarray(composite)
outside_changes = int(np.count_nonzero(np.any(result_pixels[mask_pixels == 0] != pixels[mask_pixels == 0], axis=1)))
if outside_changes:
    raise ValueError('Pixels outside the display mask changed')
with OUTPUT.open('xb') as output_file:
    composite.save(output_file, format='PNG')
with Image.open(OUTPUT) as check:
    check.load()
    output_size = list(check.size)
if sha256(PLATE) != plate_hash or sha256(SOURCE) != source_hash:
    raise ValueError('Source file changed during compositing')

report = {
    'created_at': datetime.now(timezone.utc).isoformat(),
    'method': 'Original screenshot projected into the existing tablet display with an inverse homography and a mask derived from the gray screen. No generated UI, added text, recoloring, or background edits.',
    'plate': {'path': str(PLATE), 'sha256': plate_hash, 'size': list(plate.size)},
    'source': {'path': str(SOURCE), 'sha256': source_hash, 'size': list(source.size)},
    'output': {'path': str(OUTPUT), 'sha256': sha256(OUTPUT), 'size': output_size},
    'screen_quad_tl_tr_br_bl': quad,
    'screen_mask_pixels': int(inside.sum()),
    'screen_mask_bounds': [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())],
    'outside_screen_mask_changed_pixels': outside_changes,
    'plate_and_source_hashes_preserved': True,
    'qa': {'png_readable': True, 'rounded_screen_mask': True, 'bezel_and_background_preserved': True, 'source_content_regenerated': False, 'source_color_adjustment': False}
}
REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False))
