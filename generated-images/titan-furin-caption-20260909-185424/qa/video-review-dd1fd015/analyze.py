from pathlib import Path
import subprocess,json,hashlib
import numpy as np
from PIL import Image,ImageDraw

root=Path(__file__).resolve().parent
video=Path('D:/WebDL/grok-dd1fd015-0a9b-496f-a748-f95391bdd7b5.mp4')
meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(video)]))
(root/'metadata.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
stream=next(s for s in meta['streams'] if s['codec_type']=='video')
w,h=stream['width'],stream['height']
fps=24
raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(video),'-map','0:v:0','-f','rawvideo','-pix_fmt','rgb24','pipe:1'])
frames=np.frombuffer(raw,dtype=np.uint8).reshape(-1,h,w,3)
samples=[0,.25,.5,1,2,3,4,4.5,5,5.5,6]
thumbw=728
thumbh=312
sheet=Image.new('RGB',(thumbw*2,(thumbh+30)*6),(35,35,35))
draw=ImageDraw.Draw(sheet)
for j,t in enumerate(samples):
    idx=round(t*fps)
    im=Image.fromarray(frames[idx])
    im.save(root/f'frame-{idx:03d}-{t:g}s.png')
    x=(j%2)*thumbw;y=(j//2)*(thumbh+30)
    sheet.paste(im.resize((thumbw,thumbh)),(x,y+30))
    draw.text((x+10,y+8),f'{t:g}s / frame {idx}',fill='white')
sheet.save(root/'contact.png')
result={'source':str(video),'source_sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'bytes':video.stat().st_size,'width':w,'height':h,'aspect_ratio':w/h,'duration':float(meta['format']['duration']),'fps':fps,'decoded_frames':len(frames),'audio_streams':sum(s['codec_type']=='audio' for s in meta['streams']),'sample_times':samples,'original_unchanged':True}
(root/'analysis.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))

rows=[]
for i,a in enumerate(frames):
    headline=(a.max(axis=2)<90)
    headline[:220,:]=False;headline[380:,:]=False;headline[:,535:]=False
    yy,xx=np.where(headline)
    text_bounds=[int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1)]
    device=(a.max(axis=2)<65)
    device[:70,:]=False;device[550:,:]=False;device[:,:535]=False;device[:,1340:]=False
    cols=np.where(device.sum(axis=0)>60)[0]
    x1,x2=int(cols.min()),int(cols.max()+1)
    ys=np.where(device[:,x1:x2].sum(axis=1)>220)[0]
    y1,y2=int(ys.min()),int(ys.max()+1)
    rows.append({'frame':i,'time':i/fps,'headline_bounds':text_bounds,'tablet_dark_bezel_bounds_approx':[x1,y1,x2,y2],'tablet_width_approx':x2-x1,'headline_to_tablet_gap_approx':x1-text_bounds[2]})
motion={'method':'All 145 frames decoded. Headline RGB max <90 in observed x<535 and y220:380 region. Approximate tablet dark-bezel bounds RGB max <65 inside observed ROI, filtering short row/column runs. These are bounds measurements, not exact hardware segmentation or UI fidelity metrics.','samples':[rows[round(t*fps)] for t in samples],'headline_horizontal_shift_px':rows[-1]['headline_bounds'][0]-rows[0]['headline_bounds'][0],'tablet_width_growth_percent':(rows[-1]['tablet_width_approx']/rows[0]['tablet_width_approx']-1)*100,'minimum_caption_tablet_gap_approx':min(r['headline_to_tablet_gap_approx'] for r in rows),'frames':rows}
(root/'motion.json').write_text(json.dumps(motion,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in motion.items() if k!='frames'},indent=2))
