from pathlib import Path
import subprocess, json, hashlib
from PIL import Image, ImageChops, ImageDraw

root=Path(__file__).parent
source=Path('D:/WebDL/grok-a4a4baec-5d67-4269-9fbb-dc9efc6a5f71.mp4')
cmd=['ffmpeg','-v','error','-i',str(source),'-f','rawvideo','-pix_fmt','rgb24','-']
p=subprocess.Popen(cmd,stdout=subprocess.PIPE)
w,h=1456,624
selected=[0,12,18,24,26,28,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,86,88,90,96,120,144]
rows=[]
frames={}
for n in range(145):
    raw=p.stdout.read(w*h*3)
    if len(raw)!=w*h*3: raise RuntimeError((n,len(raw)))
    im=Image.frombytes('RGB',(w,h),raw)
    r,g,b=im.crop((0,215,1200,401)).split()
    lo=ImageChops.darker(ImageChops.darker(r,g),b)
    hi=ImageChops.lighter(ImageChops.lighter(r,g),b)
    white=lo.point(lambda v: 255 if v>120 else 0)
    neutral=ImageChops.subtract(hi,lo).point(lambda v:255 if v<45 else 0)
    mask=ImageChops.multiply(white,neutral)
    bbox=mask.getbbox()
    if bbox: bbox=[bbox[0],bbox[1]+215,bbox[2],bbox[3]+215]
    rows.append({'frame':n,'time':round(n/24,6),'neutral_bright_text_bbox':bbox,'mask_pixels':mask.histogram()[255]})
    if n in selected:
        frames[n]=im
        im.save(root/f'detail-f{n:03d}-{n/24:.3f}s.png')
p.stdout.close()
if p.wait()!=0: raise RuntimeError('ffmpeg failed')
data={'method':'All 145 frames decoded, neutral bright pixel mask in x=0..1199,y=215..400; geometric diagnostic only, not OCR or all-frame visual acceptance. Threshold min(R,G,B)>120 and max-min<45.','source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'frames':rows}
(root/'all-frame-text-metrics.json').write_text(json.dumps(data,indent=2),encoding='utf-8')
for page,start in enumerate(range(0,len(selected),12),1):
    chunk=selected[start:start+12]
    sheet=Image.new('RGB',(1456,4*230),'#272727')
    draw=ImageDraw.Draw(sheet)
    for i,n in enumerate(chunk):
        thumb=frames[n].resize((485,208))
        x,y=i%3*485,i//3*230
        sheet.paste(thumb,(x,y+22))
        draw.text((x+8,y+4),f'{n/24:.3f}s | frame {n}',fill='white')
    sheet.save(root/f'detailed-contact-{page:02d}.jpg',quality=96)
print(json.dumps([r for r in rows if r['frame'] in selected],indent=2))
