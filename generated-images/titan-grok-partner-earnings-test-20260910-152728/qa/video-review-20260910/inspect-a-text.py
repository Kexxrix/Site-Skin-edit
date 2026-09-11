from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess, math

root = Path(__file__).resolve().parent / '0a799488'
dest = root / 'text-every-frame'
dest.mkdir(exist_ok=False)
source = 'D:/WebDL/grok-0a799488-066a-4a12-b5ef-b6b5e88b285c-720p (1).mp4'
subprocess.run(['ffmpeg', '-v', 'error', '-i', source, '-vf', 'crop=1120:200:170:200', '-fps_mode', 'passthrough', str(dest / 'frame-%03d.png')], check=True)
frames = sorted(dest.glob('frame-*.png'))
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 14)
for page, start in enumerate(range(0, len(frames), 49), 1):
    selected = frames[start:start + 49]
    sheet = Image.new('RGB', (1600, 78 * math.ceil(len(selected) / 5)), '#242424')
    draw = ImageDraw.Draw(sheet)
    for offset, file in enumerate(selected):
        index = start + offset
        im = Image.open(file).convert('RGB').resize((320, 57), Image.Resampling.LANCZOS)
        x, y = (offset % 5) * 320, (offset // 5) * 78
        sheet.paste(im, (x, y + 20))
        draw.text((x + 5, y + 2), f'A frame {index} / {index / 24:.3f}s', fill='white', font=font)
    out = root / f'text-page-{page}.png'
    sheet.save(out)
    print(out)
