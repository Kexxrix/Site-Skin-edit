from pathlib import Path
import hashlib,json
import numpy as np
from PIL import Image,ImageDraw,ImageFilter

ROOT=Path(__file__).resolve().parent.parent
PLATE=ROOT/'results/02-phone-overhead-v002-plate.png'
SOURCE=ROOT/'sources/cobalt-phone-tall.png'
OUTPUT=ROOT/'derived/02-phone-start.png'
REPORT=ROOT/'qa/02-phone-composite.json'
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
if OUTPUT.exists(): raise FileExistsError(OUTPUT)
plate_hash,source_hash=sha(PLATE),sha(SOURCE)
plate=Image.open(PLATE).convert('RGB'); source=Image.open(SOURCE).convert('RGB')
pixels=np.asarray(plate); lum=np.mean(pixels.astype(float),axis=2)
eligible=np.zeros(lum.shape,dtype=np.uint8)
eligible[30:855,250:910]=((lum[30:855,250:910]>70)&(lum[30:855,250:910]<190)).astype(np.uint8)*255
region=Image.fromarray(eligible).copy()
ImageDraw.floodfill(region,(575,430),128,thresh=0)
inside=np.asarray(region)==128
ys,xs=np.where(inside)
if not 140000<inside.sum()<260000: raise ValueError(f'Unexpected mask size {inside.sum()}')
points=np.column_stack((xs,ys)).astype(float)
center=points.mean(axis=0)
eig,evec=np.linalg.eigh(np.cov(points.T))
v=evec[:,np.argmax(eig)]
if v[1]<0: v=-v
u=np.array([v[1],-v[0]])
projected=np.column_stack(((points-center)@u,(points-center)@v))
umin,vmin=projected.min(axis=0); umax,vmax=projected.max(axis=0)
quad=[center+u*umin+v*vmin,center+u*umax+v*vmin,center+u*umax+v*vmax,center+u*umin+v*vmax]
source_quad=[(0,0),(source.width-1,0),(source.width-1,source.height-1),(0,source.height-1)]
A,b=[],[]
for (x,y),(sx,sy) in zip(quad,source_quad):
    A += [[x,y,1,0,0,0,-sx*x,-sx*y],[0,0,0,x,y,1,-sy*x,-sy*y]]
    b += [sx,sy]
coeff=np.linalg.solve(np.array(A,dtype=float),np.array(b,dtype=float))
warped=source.transform(plate.size,Image.Transform.PERSPECTIVE,coeff.tolist(),resample=Image.Resampling.BICUBIC)
mask=Image.fromarray(inside.astype(np.uint8)*255).filter(ImageFilter.GaussianBlur(.35))
out=Image.composite(warped,plate,mask)
outside=np.asarray(mask)==0
outside_changes=int(np.count_nonzero(np.any(np.asarray(out)[outside]!=pixels[outside],axis=1)))
assert outside_changes==0
with OUTPUT.open('xb') as f: out.save(f,format='PNG')
with Image.open(OUTPUT) as im: im.load(); size=list(im.size)
assert sha(PLATE)==plate_hash and sha(SOURCE)==source_hash
report={'method':'Original COBALT desktop-detail screenshot directly projected into the overhead phone screen; gray-screen mask preserves bezel and background. No UI regeneration or text changes.','source':{'path':str(SOURCE),'sha256':source_hash,'size':list(source.size),'mobile_native':False,'desktop_detail_crop':True,'crop_approved_by_user':True},'plate':{'path':str(PLATE),'sha256':plate_hash,'size':list(plate.size)},'output':{'path':str(OUTPUT),'sha256':sha(OUTPUT),'size':size},'screen_quad_tl_tr_br_bl':[q.tolist() for q in quad],'screen_mask_pixels':int(inside.sum()),'screen_mask_bounds':[int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())],'outside_screen_mask_changed_pixels':outside_changes,'plate_and_source_hashes_preserved':True}
REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
