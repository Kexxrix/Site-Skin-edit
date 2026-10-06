"""Export the completed 18-icon set and render static actual-size QA."""
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
SPORTS=['sport-all','sport-soccer','sport-basketball','sport-baseball','sport-volleyball','sport-hockey','sport-formula1','sport-boxing','sport-mma','sport-motorsport']
FUNCTIONS=['action-deposit','action-withdraw','action-support','action-message','action-gift','action-notice','action-attendance','state-empty-slip']
NAMES=SPORTS+FUNCTIONS
BACKGROUNDS=[('WHITE','#ffffff'),('PANEL','#e9e9e7'),('ORANGE','#ff6b12')]
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',15)
small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',12)

def save_new(image,path):
    path.parent.mkdir(parents=True,exist_ok=True)
    with path.open('xb') as handle:
        image.save(handle,format='PNG',optimize=True)

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def percentile(values,p):
    values.sort()
    return values[round((len(values)-1)*p)]

rows=[]
for name in NAMES:
    source=ROOT/'results'/(name+'.png')
    assert source.exists(),name+' missing'
    with Image.open(source) as image:
        image.load()
        assert image.format=='PNG' and image.mode=='RGBA' and image.width==image.height,name
        alpha=image.getchannel('A')
        hist=alpha.histogram()
        width,height=image.size
        border=alpha.crop((0,0,width,1)).tobytes()+alpha.crop((0,height-1,width,height)).tobytes()
        border+=alpha.crop((0,0,1,height)).tobytes()+alpha.crop((width-1,0,width,height)).tobytes()
        row={'name':name,'source_path':str(source),'format':'PNG','mode':'RGBA','size':list(image.size),
             'bytes':source.stat().st_size,'sha256':digest(source),'transparent_fraction':round(hist[0]/(width*height),5),
             'alpha_bbox_any':alpha.getbbox(),'alpha_bbox_128':alpha.point(lambda a:255 if a>=128 else 0).getbbox(),
             'outer_border_nonzero_alpha_pixels':sum(v>0 for v in border),'near_transparent_pixels_alpha1_to15':sum(hist[1:16]),
             'outer_border_alpha_max':max(border),'outer_border_pixels_alpha_over8':sum(v>8 for v in border),
             'exports':[],'user_approval':'not_final_approved','site_adoption':'not_applied'}
        assert hist[0]>0 and hist[255]>0 and row['outer_border_alpha_max']<=8,name
        if name in FUNCTIONS:
            rgb=[(r,g,b) for r,g,b,a in image.getdata() if a>=240]
            spread=[max(c)-min(c) for c in rgb]
            luma=[round(0.2126*c[0]+0.7152*c[1]+0.0722*c[2]) for c in rgb]
            row['monochrome_metrics']={'opaque_rgb_channel_spread_p99':percentile(spread.copy(),.99),
                'opaque_fraction_channel_spread_over24':round(sum(v>24 for v in spread)/len(spread),6),
                'opaque_luminance_p05':percentile(luma.copy(),.05),'opaque_luminance_p95':percentile(luma.copy(),.95),
                'opaque_fraction_luminance_over160':round(sum(v>160 for v in luma)/len(luma),6)}
        for size in (16,24,32,256):
            output=ROOT/'exports'/str(size)/(name+'.png')
            scaled=image.resize((size,size),Image.Resampling.LANCZOS)
            if output.exists():
                with Image.open(output) as existing:
                    existing.load()
                    assert existing.mode=='RGBA' and existing.size==(size,size) and existing.tobytes()==scaled.tobytes(),str(output)+' existing derivative differs'
            else:
                save_new(scaled,output)
            with Image.open(output) as check:
                check.load()
                assert check.mode=='RGBA' and check.size==(size,size) and check.format=='PNG'
            row['exports'].append({'path':output.relative_to(ROOT).as_posix(),'size':[size,size],
                                  'bytes':output.stat().st_size,'sha256':digest(output),
                                  'alpha_bbox_128':scaled.getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox()})
        rows.append(row)

# All displayed small PNGs are placed at their exact native raster dimensions.
sheet=Image.new('RGB',(1160,1252),'#f4f5f6')
d=ImageDraw.Draw(sheet)
d.text((14,12),'ALDEBARAN / COMPLETE V3 / ACTUAL 16 + 24 + 32 PX / 18 CANDIDATES',fill='#20252b',font=font)
d.text((14,37),'Original canvas preserved | graphite functions | retained balls + trophy | no site adoption',fill='#434a51',font=small)
for group,(label,color) in enumerate(BACKGROUNDS):
    left=240+group*304
    d.rectangle((left,78,left+298,1248),fill=color)
    d.text((left+106,58),label,fill='#20252b',font=small)
for row,name in enumerate(NAMES):
    top=86+row*64
    d.text((14,top+4),name,fill='#20252b',font=font)
    for group,_ in enumerate(BACKGROUNDS):
        for col,size in enumerate((16,24,32)):
            image=Image.open(ROOT/'exports'/str(size)/(name+'.png')).convert('RGBA')
            left=260+group*304+col*88
            sheet.paste(image,(left+(32-size)//2,top+(32-size)//2),image)
            d.text((left+6,top+37),str(size),fill='#20252b',font=small)
save_new(sheet,ROOT/'qa/actual-size-complete-18.png')

# Three times nearest-neighbor magnification preserves exact exported pixels.
for tag,names in [('functions',FUNCTIONS),('sports',SPORTS)]:
    canvas=Image.new('RGB',(1160,70+len(names)*126),'#f4f5f6')
    draw=ImageDraw.Draw(canvas)
    draw.text((14,12),tag.upper()+' / SAME 16+24+32 PX EXPORTS AT 3X NEAREST',fill='#20252b',font=font)
    for row,name in enumerate(names):
        y=50+row*126
        draw.text((14,y+42),name,fill='#20252b',font=font)
        for group,(_,color) in enumerate(BACKGROUNDS):
            left=240+group*304
            draw.rectangle((left,y,left+298,y+122),fill=color)
            cursor=left+15
            for size in (16,24,32):
                raw=Image.open(ROOT/'exports'/str(size)/(name+'.png')).convert('RGBA')
                zoom=raw.resize((size*3,size*3),Image.Resampling.NEAREST)
                canvas.paste(zoom,(cursor,y+8+(96-size*3)//2),zoom)
                draw.text((cursor+8,y+106),str(size)+'px',fill='#20252b',font=small)
                cursor+=size*3+12
    save_new(canvas,ROOT/'qa'/('pixel-review-'+tag+'-3x.png'))

style=Image.new('RGB',(1060,1250),'#f4f5f6')
draw=ImageDraw.Draw(style)
draw.text((14,12),'ALPHA + SHAPE COMPOSITES / 128PX DISPLAY / CANDIDATES',fill='#20252b',font=font)
for idx,name in enumerate(NAMES):
    col,row=idx%3,idx//3
    left,top=14+col*348,55+row*198
    draw.text((left,top),name,fill='#20252b',font=small)
    for j,bg in enumerate(('#ffffff','#e9e9e7')):
        draw.rectangle((left+j*158,top+22,left+j*158+144,top+174),fill=bg)
        source=Image.open(ROOT/'exports/256'/(name+'.png')).convert('RGBA').resize((128,128),Image.Resampling.LANCZOS)
        style.paste(source,(left+j*158+8,top+34),source)
save_new(style,ROOT/'qa/shape-and-alpha-complete.png')
with (ROOT/'qa/technical-complete.json').open('x',encoding='utf-8') as file:
    json.dump({'created_utc':datetime.now(timezone.utc).isoformat(),'asset_count':18,
        'method':'Exact source PNG preservation; full-canvas LANCZOS RGBA derivatives; no recolor, crop, sharpening or alpha cleanup',
        'visual_review_status':'awaiting final parent visual review','backgrounds':dict(BACKGROUNDS),'assets':rows},file,indent=2)
print(json.dumps({'assets':len(rows),'source_bytes':sum(r['bytes'] for r in rows),
                  'monochrome':[{'name':r['name'],**r['monochrome_metrics']} for r in rows if 'monochrome_metrics' in r]}))
