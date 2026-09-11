from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fractions import Fraction
import subprocess, json, hashlib, math

root = Path(__file__).resolve().parent
sources = [Path('D:/WebDL/grok-0a799488-066a-4a12-b5ef-b6b5e88b285c-720p (1).mp4'), Path('D:/WebDL/grok-b37baa65-cf0f-41f5-a80d-7c3c7e4d800d (1).mp4')]
records = []
for source in sources:
    probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-count_frames', '-show_format', '-show_streams', '-of', 'json', str(source)]))
    stream = next(s for s in probe['streams'] if s['codec_type'] == 'video')
    records.append({'source': str(source), 'bytes': source.stat().st_size, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'metadata': probe})
    print(json.dumps({'source': source.name, 'size': [stream['width'], stream['height']], 'fps': stream['avg_frame_rate'], 'frames': stream.get('nb_read_frames'), 'duration': probe['format']['duration'], 'audio_streams': sum(s['codec_type'] == 'audio' for s in probe['streams'])}))
(root / 'sources.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
stream = next(s for s in records[0]['metadata']['streams'] if s['codec_type'] == 'video')
fps = float(Fraction(stream['avg_frame_rate']))
step = max(1, round(fps / 4))
dest = root / '0a799488'
dest.mkdir(exist_ok=False)
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(sources[0]), '-vf', f'select=not(mod(n\\,{step}))', '-fps_mode', 'vfr', str(dest / 'sample-%03d.png')], check=True)
files = sorted(dest.glob('sample-*.png'))
cellw = 480
h = round(cellw * stream['height'] / stream['width'])
cellh = h + 26
cols = 4
sheet = Image.new('RGB', (cellw * cols, cellh * math.ceil(len(files) / cols)), (30, 30, 30))
draw = ImageDraw.Draw(sheet)
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 19)
for i, path in enumerate(files):
    frame = Image.open(path).convert('RGB')
    frame.thumbnail((cellw, h), Image.Resampling.LANCZOS)
    x, y = (i % cols) * cellw, (i // cols) * cellh
    sheet.paste(frame, (x, y + 26))
    draw.text((x + 8, y + 3), f'A frame {i * step} / {i * step / fps:.3f}s', font=font, fill='white')
sheet.save(dest / 'contact.png')
print(str(dest / 'contact.png'))
