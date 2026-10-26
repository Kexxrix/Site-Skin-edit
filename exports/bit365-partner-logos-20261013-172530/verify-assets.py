from PIL import Image
import pathlib,json,hashlib
root=pathlib.Path(r'D:\WebDL\BIT365 - 카지노사이트 · 토토사이트 · 슬롯 · 코인선물')
names=["evolution.png","asia-gaming.png","castar.png","betgames.png","big-gaming.png","dream-gaming.png","wm-casino.png","vivo-gaming.png","pragmatic-play.png","play-n-go.png","yggdrasil.png","red-tiger.png","relax-gaming.png","wazdan.png","hacksaw.png","playtech.png","netent.png","microgaming.webp","habanero.png","pg-soft.png","bng.webp","blueprint-gaming.png","cq9.png","elk-studios.png"]
rows=[]
for name in names:
 p=root/name
 with Image.open(p) as im:
  im.load()
  rows.append({'name':name,'path':str(p),'size':list(im.size),'format':im.format,'mode':im.mode,'alpha_bbox':list(im.convert('RGBA').getchannel('A').getbbox()),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size})
pathlib.Path(r'E:\codexwork\Site-Skin-edit\exports\bit365-partner-logos-20261013-172530\assets.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'count':len(rows),'all_320x144':all(r['size']==[320,144] for r in rows),'formats':list(set(r['format'] for r in rows))}))

