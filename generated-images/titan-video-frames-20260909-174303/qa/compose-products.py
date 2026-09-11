from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path('E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303')
PLATE = ROOT / 'results/04-products-plate.png'
OUTPUT = ROOT / 'derived/04-products-start.png'
REPORT = ROOT / 'qa/04-products-composite.json'

def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def intersect(horizontal, vertical):
    a, b = horizontal
    c, d = vertical
    x = (c*b+d) / (1-c*a)
    return (float(x), float(a*x+b))

if OUTPUT.exists():
    raise FileExistsError(f'Preserving existing output: {OUTPUT}')
plate_hash = sha256(PLATE)
plate = Image.open(PLATE).convert('RGB')
plate_pixels = np.asarray(plate)
luminance = plate_pixels.astype(float).mean(axis=2)
composite = plate.copy()
all_screen_pixels = np.zeros(luminance.shape, dtype=bool)
screens = []
specifications = [
    {'device': 'tablet', 'source': 'cat-village-tablet-character.png', 'roi': [337, 295, 941, 716], 'seed': [600, 500], 'area_range': [220000, 250000]},
    {'device': 'phone', 'source': 'cobalt-phone-tall.png', 'roi': [1095, 274, 1313, 732], 'seed': [1200, 500], 'area_range': [85000, 100000]},
]

for spec in specifications:
    source_path = ROOT / 'sources' / spec['source']
    source_hash = sha256(source_path)
    source = Image.open(source_path).convert('RGB')
    x0, y0, x1, y1 = spec['roi']
    eligible = np.zeros(luminance.shape, dtype=np.uint8)
    eligible[y0:y1, x0:x1] = (luminance[y0:y1, x0:x1] > 80).astype(np.uint8)*255
    region = Image.fromarray(eligible).copy()
    ImageDraw.floodfill(region, tuple(spec['seed']), 128, thresh=0)
    inside = np.asarray(region) == 128
    area = int(inside.sum())
    if not spec['area_range'][0] < area < spec['area_range'][1]:
        raise ValueError(f'Unexpected {spec["device"]} display mask area: {area}')
    yy, xx = np.where(inside)
    edge_x = np.arange(int(xx.min())+35, int(xx.max())-35)
    edge_y = np.arange(int(yy.min())+35, int(yy.max())-35)
    top = np.polyfit(edge_x, [np.flatnonzero(inside[:, x])[0] for x in edge_x], 1)
    bottom = np.polyfit(edge_x, [np.flatnonzero(inside[:, x])[-1] for x in edge_x], 1)
    left = np.polyfit(edge_y, [np.flatnonzero(inside[y, :])[0] for y in edge_y], 1)
    right = np.polyfit(edge_y, [np.flatnonzero(inside[y, :])[-1] for y in edge_y], 1)
    quad = [intersect(top, left), intersect(top, right), intersect(bottom, right), intersect(bottom, left)]
    source_quad = [(0, 0), (source.width-1, 0), (source.width-1, source.height-1), (0, source.height-1)]
    matrix, values = [], []
    for (x, y), (u, v) in zip(quad, source_quad):
        matrix.extend([[x, y, 1, 0, 0, 0, -u*x, -u*y], [0, 0, 0, x, y, 1, -v*x, -v*y]])
        values.extend([u, v])
    coefficients = np.linalg.solve(np.array(matrix, dtype=float), np.array(values, dtype=float))
    warped = source.transform(plate.size, Image.Transform.PERSPECTIVE, coefficients.tolist(), resample=Image.Resampling.BICUBIC)
    mask = Image.fromarray(inside.astype(np.uint8)*255).filter(ImageFilter.GaussianBlur(0.35))
    alpha = np.array(mask)
    alpha[~inside] = 0
    composite = Image.composite(warped, composite, Image.fromarray(alpha))
    all_screen_pixels |= inside
    if sha256(source_path) != source_hash:
        raise ValueError('Source changed during compositing')
    screens.append({'device': spec['device'], 'source': {'path': str(source_path), 'sha256': source_hash, 'size': list(source.size)}, 'screen_quad_tl_tr_br_bl': quad, 'screen_mask_pixels': area, 'screen_mask_bounds': [int(xx.min()), int(yy.min()), int(xx.max()), int(yy.max())], 'original_source_preserved': True, 'source_content_regenerated': False, 'source_color_adjustment': False})

result_pixels = np.asarray(composite)
outside_changes = int(np.count_nonzero(np.any(result_pixels[~all_screen_pixels] != plate_pixels[~all_screen_pixels], axis=1)))
if outside_changes:
    raise ValueError('Pixels outside the two original gray displays changed')
if sha256(PLATE) != plate_hash:
    raise ValueError('Original plate changed')
with OUTPUT.open('xb') as output_file:
    composite.save(output_file, format='PNG')
with Image.open(OUTPUT) as check:
    check.load()
    output_size = list(check.size)
report = {
    'created_at': datetime.now(timezone.utc).isoformat(),
    'method': 'Code perspective compositing of the two original screenshots into the existing gray display regions. Rounded masks follow the original screen pixels. No UI regeneration, text additions, color adjustment, or added camera notch.',
    'plate': {'path': str(PLATE), 'sha256': plate_hash, 'size': list(plate.size)},
    'screens': screens,
    'output': {'path': str(OUTPUT), 'sha256': sha256(OUTPUT), 'size': output_size},
    'outside_original_screen_regions_changed_pixels': outside_changes,
    'qa': {'png_readable': True, 'bezel_and_background_changed_pixels': outside_changes, 'phone_notch_added': False, 'original_files_preserved': True}
}
REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False))
