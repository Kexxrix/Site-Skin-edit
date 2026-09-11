import subprocess,json
from pathlib import Path
import numpy as np
video=Path("D:/WebDL/grok-244d3381-4c2d-4e30-a5f2-f8b3bf1088b0-720p.mp4")
root=Path(__file__).resolve().parent
w,h,fps=1456,624,24
proc=subprocess.Popen(["ffmpeg","-hide_banner","-loglevel","error","-i",str(video),"-map","0:v:0","-f","rawvideo","-pix_fmt","rgb24","pipe:1"],stdout=subprocess.PIPE)
rows=[]
frame_bytes=w*h*3
i=0
while True:
    raw=proc.stdout.read(frame_bytes)
    if not raw: break
    assert len(raw)==frame_bytes
    a=np.frombuffer(raw,dtype=np.uint8).reshape(h,w,3)
    mask=(a.max(axis=2)<65)
    mask[:80]=False;mask[h-8:]=False;mask[:,:250]=False;mask[:,w-25:]=False
    cols=np.where(mask.sum(axis=0)>40)[0]
    x1,x2=int(cols[0]),int(cols[-1])+1
    vertical=np.where(mask[:,x1:x2].sum(axis=1)>100)[0]
    y1,y2=int(vertical[0]),int(vertical[-1])+1
    rows.append({"frame":i,"time_seconds":i/fps,"dark_tablet_bounds_approx":[x1,y1,x2,y2],"width":x2-x1,"height":y2-y1})
    i+=1
assert proc.wait()==0 and i==145
chosen=[rows[min(round(t*fps),len(rows)-1)] for t in [0,1,2,3.2,4,5,6]]
result={"method":"Read-only decode of every video frame. Approximate dark-bezel silhouette bounds: RGB max <65 within observed device ROI; this is framing evidence, not a pixel-perfect hardware segmentation or screen-text fidelity test.","decoded_frames":i,"fps":fps,"sampled_motion":chosen,"minimum_top_margin":min(r["dark_tablet_bounds_approx"][1] for r in rows),"minimum_bottom_margin":min(h-r["dark_tablet_bounds_approx"][3] for r in rows),"width_growth_first_to_last_percent":(rows[-1]["width"]/rows[0]["width"]-1)*100,"width_growth_formula":"(last approximate tablet width / first approximate tablet width - 1) * 100","frames":rows}
(root/"frame-motion.json").write_text(json.dumps(result,indent=2),encoding="utf-8")
print(json.dumps({k:v for k,v in result.items() if k!="frames"},indent=2))

