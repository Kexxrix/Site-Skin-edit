from pathlib import Path
from fractions import Fraction
import subprocess, json, hashlib, math
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
SOURCES = [
    Path('D:/WebDL/grok-4760de93-3788-46d6-ad84-b9fd0d42f5a2-720p.mp4'),
    Path('D:/WebDL/grok-02092da0-046b-4471-96e9-c6be496861be-720p.mp4'),
    Path('D:/WebDL/grok-a4a4baec-5d67-4269-9fbb-dc9efc6a5f71.mp4'),
]
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 19)
records = []
for index, source in enumerate(SOURCES):
    probe = json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_format','-show_streams','-of','json',str(source)]))
    video = next(s for s in probe['streams'] if s['codec_type']=='video')
    fps = float(Fraction(video['avg_frame_rate']))
    record = {'source':str(source),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'bytes':source.stat().st_size,'metadata':probe}
    records.append(record)
    if index == 2:
        continue
    key = source.name.split('-')[1]
    dest = ROOT/key
    dest.mkdir(exist_ok=False)
    (dest/'metadata.json').write_text(json.dumps(record,indent=2),encoding='utf-8')
    step=max(1,round(fps/4))
    subprocess.run(['ffmpeg','-v','error','-i',str(source),'-vf',f'select=not(mod(n\\,{step}))','-fps_mode','vfr',str(dest/'sample-%03d.png')],check=True)
    files=sorted(dest.glob('sample-*.png'))
    thumb_w=480; thumb_h=round(thumb_w*video['height']/video['width']); label_h=26; cols=4
    sheet=Image.new('RGB',(thumb_w*cols,(thumb_h+label_h)*math.ceil(len(files)/cols)),(30,30,30))
    draw=ImageDraw.Draw(sheet)
    for i,path in enumerate(files):
        frame=Image.open(path).convert('RGB'); frame.thumbnail((thumb_w,thumb_h),Image.Resampling.LANCZOS)
        x=(i%cols)*thumb_w; y=(i//cols)*(thumb_h+label_h)
        sheet.paste(frame,(x,y+label_h))
        draw.text((x+8,y+3),f'{key}  frame {i*step}  ~{i*step/fps:.2f}s',font=font,fill='white')
    sheet.save(dest/'contact.png')
    print(json.dumps({'key':key,'width':video['width'],'height':video['height'],'fps':fps,'frames':video.get('nb_read_frames'),'duration':probe['format']['duration'],'audio_streams':sum(s['codec_type']=='audio' for s in probe['streams']),'contact':str(dest/'contact.png'),'sample_step_frames':step}))
(ROOT/'sources.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
print(json.dumps({'all_source_hashes_saved':len(records)}))
