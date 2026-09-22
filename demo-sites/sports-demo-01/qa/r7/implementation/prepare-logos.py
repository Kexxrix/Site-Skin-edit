import json, math
from pathlib import Path
from PIL import Image, ImageDraw
qa=Path(__file__).resolve().parent
site=qa.parents[2]/'site'
records=json.loads((site/'app/match-records.json').read_text(encoding='utf-8'))
menu=json.loads((site/'app/sport-menu.json').read_text(encoding='utf-8'))
roles={}
for g in records:
 for role,url in [('sport',g['sportLogo']),('league',g['leagueLogo']),('team',g['home']['logo']),('team',g['away']['logo'])]: roles[url]=role
for m in menu:
 if m['logo']:roles.setdefault(m['logo'],'sport')
styles={}; checks=[]
sheet=Image.new('RGB',(1000,math.ceil(len(roles)/8)*92),'#141414');draw=ImageDraw.Draw(sheet)
for index,(url,role) in enumerate(roles.items()):
 im=Image.open(site/'public'/url.lstrip('/')).convert('RGBA');w,h=im.size
 alpha=im.getchannel('A').point(lambda a:255 if a>16 else 0);left,top,right,bottom=alpha.getbbox();bw,bh=right-left,bottom-top
 pixels=[p for p in im.getdata() if p[3]>128]
 dark=sum(0.2126*p[0]+0.7152*p[1]+0.0722*p[2]<65 and max(p[:3])<160 for p in pixels)/len(pixels)
 backing=dark>0.58 or url.endswith('/ligue-1.png') or url.endswith('/nfl/new-york-jets.png')
 # Match opaque artwork, not transparent canvas or backing: 20px for ball/league
 # pairs, 15px for the wide hockey puck and NHL. No original pixels are clipped.
 sw,sh=((40,20) if url.endswith('/mlb.png') else (24,20)) if role=='league' else (32,32) if role=='team' else (22,22)
 target=15 if url.endswith('/nhl.png') else 20
 scale=min(sw/bw,target/bh) if role=='league' else min((sw-4)/bw,(sh-4)/bh) if role=='team' else min(20/bw,20/bh)
 iw,ih=w*scale,h*scale
 x=(sw-bw*scale)/2-left*scale;y=(sh-bh*scale)/2-top*scale
 styles[url]={'width':round(iw/sw*100,4),'height':round(ih/sh*100,4),'left':round(x/sw*100,4),'top':round(y/sh*100,4),'backing':backing,'slotWidth':sw}
 checks.append({'url':url,'role':role,'bounds':[left,top,right,bottom],'darkFraction':round(dark,4),'backing':backing,'visibleWidth':round(bw*scale,3),'visibleHeight':round(bh*scale,3),'center':[sw/2,sh/2]})
 cx=index%8*125+46;cy=index//8*92+8
 if backing:
  if role=='league':draw.rounded_rectangle((cx,cy,cx+sw*2,cy+sh*2),radius=2,fill='#F5EEDF')
  else:draw.ellipse((cx,cy,cx+sw*2,cy+sh*2),fill='#F5EEDF')
 preview=im.resize((round(iw*2),round(ih*2)),Image.Resampling.LANCZOS)
 sheet.paste(preview,(round(cx+x*2),round(cy+y*2)),preview)
 label=url.rsplit('/',1)[1][:-4];draw.text((index%8*125+3,index//8*92+72),label[:21],fill='white')
(site/'app/logo-presentation.json').write_text(json.dumps(styles,indent=2)+'\n',encoding='utf-8')
(qa/'logo-geometry.json').write_text(json.dumps(checks,indent=2)+'\n',encoding='utf-8')
sheet.save(qa/'logo-review.png')
print(json.dumps({'logos':len(styles),'backing':sum(x['backing'] for x in checks),'removedBacking':sum(not x['backing'] for x in checks)}))
