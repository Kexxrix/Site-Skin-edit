from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fractions import Fraction
import subprocess,json,hashlib,math

root=Path(__file__).resolve().parent
sources=[Path('D:/WebDL/grok-ed03c639-9cf5-4289-8e03-7cb02274dc15.mp4'),Path('D:/WebDL/grok-2d598645-f0f6-42c3-a166-a6377a05f670-720p.mp4')]
records=[]
for source in sources:
    probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_format','-show_streams','-of','json',str(source)]))
    video=next(s for s in probe['streams'] if s['codec_type']=='video' and not s.get('disposition',{}).get('attached_pic'))
    records.append({'source':str(source),'bytes':source.stat().st_size,'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'metadata':probe})
    print(json.dumps({'source':source.name,'size':[video['width'],video['height']],'fps':video['avg_frame_rate'],'frames':video.get('nb_read_frames'),'duration':probe['format']['duration'],'audio_streams':sum(s['codec_type']=='audio' for s in probe['streams'])}))
(root/'sources.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
video=next(s for s in records[0]['metadata']['streams'] if s['codec_type']=='video')
fps=float(Fraction(video['avg_frame_rate'])); step=max(1,round(fps/4)); dest=root/'ed03c639'; dest.mkdir(exist_ok=False)
subprocess.run(['ffmpeg','-v','error','-i',str(sources[0]),'-vf',f'select=not(mod(n\\,{step}))','-fps_mode','vfr',str(dest/'sample-%03d.png')],check=True)
files=sorted(dest.glob('sample-*.png')); cellw=480; h=round(cellw*video['height']/video['width']); cellh=h+26; cols=4
sheet=Image.new('RGB',(cellw*cols,cellh*math.ceil(len(files)/cols)),(30,30,30)); d=ImageDraw.Draw(sheet); font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',19)
for i,p in enumerate(files):
    im=Image.open(p).convert('RGB'); im.thumbnail((cellw,h),Image.Resampling.LANCZOS); x=(i%cols)*cellw; y=(i//cols)*cellh; sheet.paste(im,(x,y+26)); d.text((x+8,y+3),f'ed03  frame {i*step} / {i*step/fps:.2f}s',font=font,fill='white')
sheet.save(dest/'contact.png')
print(str(dest/'contact.png'))
