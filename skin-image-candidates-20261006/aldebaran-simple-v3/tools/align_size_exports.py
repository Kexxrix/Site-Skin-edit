"""Align transparent export canvas geometry; retain all generated source PNGs."""
import hashlib
import json
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1]
FUNCTIONS=['action-deposit','action-withdraw','action-support','action-message','action-gift','action-notice','action-attendance','state-empty-slip']
report=json.loads((ROOT/'qa/technical-complete.json').read_text(encoding='utf-8'))
NAMES=[row['name'] for row in report['assets']]
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',15)
small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',12)
rows=[]
for name in NAMES:
    source=ROOT/'results'/(name+'.png')
    original_hash=hashlib.sha256(source.read_bytes()).hexdigest()
    image=Image.open(source).convert('RGBA')
    row={'name':name,'source_sha256':original_hash,'source_pixels_edited':False,'exports':[]}
    if name in FUNCTIONS:
        bbox=image.getchannel('A').point(lambda a:255 if a>=32 else 0).getbbox()
        guard=max(4,round(max(bbox[2]-bbox[0],bbox[3]-bbox[1])*.02))
        crop=(max(0,bbox[0]-guard),max(0,bbox[1]-guard),min(image.width,bbox[2]+guard),min(image.height,bbox[3]+guard))
        content=image.crop(crop)
        row.update({'method':'transparent canvas alignment and resampling only','visible_alpha_threshold':32,
                    'crop_window':list(crop),'edge_guard_source_pixels':guard,'target_long_axis_fraction':.70,
                    'note':'Same15% nominal transparent padding along the long axis; retains source shape/colors; no recolor or alpha-value cleanup'})
    else:
        row.update({'method':'exact byte copy of native export','note':'Retained/sports canvas and existing small-size appearance preserved'})
    for size in (16,24,32,256):
        target=ROOT/'exports/aligned'/str(size)/(name+'.png')
        target.parent.mkdir(parents=True,exist_ok=True)
        if name in FUNCTIONS:
            long_axis=max(1,round(size*.70))
            ratio=long_axis/max(content.size)
            dimensions=(max(1,round(content.width*ratio)),max(1,round(content.height*ratio)))
            scaled=content.resize(dimensions,Image.Resampling.LANCZOS)
            output=Image.new('RGBA',(size,size),(0,0,0,0))
            output.alpha_composite(scaled,((size-dimensions[0])//2,(size-dimensions[1])//2))
            with target.open('xb') as handle:
                output.save(handle,format='PNG',optimize=True)
        else:
            with target.open('xb') as handle:
                handle.write((ROOT/'exports'/str(size)/(name+'.png')).read_bytes())
        with Image.open(target) as check:
            check.load()
            assert check.format=='PNG' and check.mode=='RGBA' and check.size==(size,size)
            alpha=check.getchannel('A')
            border=alpha.crop((0,0,size,1)).tobytes()+alpha.crop((0,size-1,size,size)).tobytes()+alpha.crop((0,0,1,size)).tobytes()+alpha.crop((size-1,0,size,size)).tobytes()
            row['exports'].append({'path':target.relative_to(ROOT).as_posix(),'size':[size,size],
                                  'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),
                                  'alpha_bbox_128':alpha.point(lambda a:255 if a>=128 else 0).getbbox(),'outer_border_alpha_max':max(border)})
    assert hashlib.sha256(source.read_bytes()).hexdigest()==original_hash
    rows.append(row)

backgrounds=[('WHITE','#ffffff'),('PANEL','#e9e9e7'),('ORANGE','#ff6b12')]
sheet=Image.new('RGB',(1160,1252),'#f4f5f6'); d=ImageDraw.Draw(sheet)
d.text((14,12),'ALDEBARAN / COMPLETE V3 / ALIGNED FUNCTIONS / ACTUAL 16 + 24 + 32 PX',fill='#20252b',font=font)
d.text((14,37),'Function canvas: common15% long-axis padding | source PNGs retained | sports exports unchanged',fill='#434a51',font=small)
for group,(label,color) in enumerate(backgrounds):
    left=240+group*304;d.rectangle((left,78,left+298,1248),fill=color);d.text((left+106,58),label,fill='#20252b',font=small)
for row,name in enumerate(NAMES):
    top=86+row*64;d.text((14,top+4),name,fill='#20252b',font=font)
    for group,_ in enumerate(backgrounds):
        for col,size in enumerate((16,24,32)):
            icon=Image.open(ROOT/'exports/aligned'/str(size)/(name+'.png')).convert('RGBA')
            left=260+group*304+col*88;sheet.paste(icon,(left+(32-size)//2,top+(32-size)//2),icon);d.text((left+6,top+37),str(size),fill='#20252b',font=small)
with (ROOT/'qa/actual-size-aligned-18.png').open('xb') as handle:sheet.save(handle,format='PNG',optimize=True)
zoom=Image.new('RGB',(1160,1078),'#f4f5f6');draw=ImageDraw.Draw(zoom)
draw.text((14,12),'ALIGNED FUNCTIONS / SAME 16+24+32 PX AT 3X NEAREST',fill='#20252b',font=font)
for row,name in enumerate(FUNCTIONS):
    y=50+row*126;draw.text((14,y+42),name,fill='#20252b',font=font)
    for group,(_,color) in enumerate(backgrounds):
        left=240+group*304;draw.rectangle((left,y,left+298,y+122),fill=color);cursor=left+15
        for size in (16,24,32):
            icon=Image.open(ROOT/'exports/aligned'/str(size)/(name+'.png')).convert('RGBA').resize((size*3,size*3),Image.Resampling.NEAREST)
            zoom.paste(icon,(cursor,y+8+(96-size*3)//2),icon);draw.text((cursor+8,y+106),str(size)+'px',fill='#20252b',font=small);cursor+=size*3+12
with (ROOT/'qa/pixel-review-aligned-functions-3x.png').open('xb') as handle:zoom.save(handle,format='PNG',optimize=True)
with (ROOT/'qa/aligned-export-validation.json').open('x',encoding='utf-8') as file:json.dump({'source_originals_unchanged':True,'assets':rows},file,indent=2)
print(json.dumps({'aligned_pngs':72,'source_originals_unchanged':True,'functional_export_border_max':[{'name':r['name'],'max':max(e['outer_border_alpha_max'] for e in r['exports'])} for r in rows if r['name'] in FUNCTIONS]}))
