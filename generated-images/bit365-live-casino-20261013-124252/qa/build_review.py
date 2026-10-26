from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import json,hashlib,urllib.request,html
root=Path(__file__).resolve().parent.parent
qa=root/'qa'; m=json.loads((root/'run.json').read_text(encoding='utf-8'))
for a in m.get('superseded_candidates',[]):
 src=Path(a['final_path']); dst=qa/'not-selected'/src.name; dst.parent.mkdir(exist_ok=True)
 if src.exists() and src!=dst:
  assert src.resolve().is_relative_to(root) and dst.resolve().is_relative_to(root) and not dst.exists()
  h=hashlib.sha256(src.read_bytes()).hexdigest(); src.rename(dst); assert hashlib.sha256(dst.read_bytes()).hexdigest()==h
 a['final_path']=str(dst); a['transfer']='moved_to_not_selected_after_comparison'
for i,a in enumerate(m['assets']):
 if i in [1,2]:
  a['prompt_path']='prompts/'+a['id']+'-v2.txt'; a['references']=[]; a['reference_mode']='text brief based on inspected original references'
 elif i>=3:
  a['prompt_path']='prompts/'+a['id']+'-distinct.txt'; a['references']=[str(root/'results/01-evolution.png')]
 else: a['references']=[r'D:/자료모음/슬롯_카지노배경 인물이미지 4/images/casino_0040_tall.png']
 a['prompt']=(root/a['prompt_path']).read_text(encoding='utf-8')
spec=json.loads((qa/'logo-sources.json').read_text())
for s in spec:
 target=qa/s['path']
 source=Path(r'E:/codexwork/Site-Skin-edit/exports/bit365-figma-20261012-184651/assets')/('casino-logo-'+str(s['index'])+'.png')
 target.write_bytes(source.read_bytes()); s['cached_source']=str(source)
 with Image.open(target) as im: im.load(); s['size']=list(im.size)
 s['sha256']=hashlib.sha256(target.read_bytes()).hexdigest()
(qa/'logo-sources.json').write_text(json.dumps(spec,indent=2),encoding='utf-8')
checks=[]
canvas=Image.new('RGB',(1008,702),'#141515'); d=ImageDraw.Draw(canvas)
font=ImageFont.truetype(r'C:/Windows/Fonts/arial.ttf',12)
d.text((24,18),'BIT365 / LIVE CASINO / GENERATED SERIES',font=font,fill='#f5f4f4')
cards=[]
for i,a in enumerate(m['assets']):
 p=Path(a['final_path']); digest=hashlib.sha256(p.read_bytes()).hexdigest(); assert digest==a['sha256']
 with Image.open(p) as im:
  im.load(); assert im.format=='PNG' and im.size==(1086,1448)
  proof=ImageOps.fit(im.convert('RGBA'),(180,238),method=Image.Resampling.LANCZOS)
 logo=Image.open(qa/spec[i]['path']).convert('RGBA'); logo.thumbnail((156,58),Image.Resampling.LANCZOS)
 proof.alpha_composite(logo,((180-logo.width)//2,238-12-58+(58-logo.height)//2))
 x=24+(i%5)*192; y=48+(i//5)*320
 canvas.paste(proof.convert('RGB'),(x,y)); d.rectangle((x,y+238,x+179,y+298),fill='#242424')
 d.text((x+10,y+250),a['provider'],font=font,fill='#f5f4f4')
 d.text((x+10,y+275),str(i+1).zfill(2)+' / generated',font=font,fill='#b7b7b7')
 checks.append({'id':a['id'],'readable':True,'sha256_match':True,'size':[1086,1448],'aspect_ratio':0.75,'display_slot':[180,238],'logo_overlay':[156,58,12]})
 rel='../results/'+p.name
 cards.append('<article><a href="'+rel+'" target="_blank"><div class="art"><img class="photo" src="'+rel+'"><div class="brand"><img src="'+spec[i]['path']+'"></div></div></a><div class="info"><strong>'+html.escape(a['provider'])+'</strong><span>'+a['figma_node']+'</span></div></article>')
canvas.save(qa/'series-card-preview.png')
page='<!doctype html><meta charset="utf-8"><title>BIT365 live casino image review</title><style>*{box-sizing:border-box}body{margin:0;background:#141515;color:#f5f4f4;font-family:Arial,sans-serif;padding:32px}h1{font-size:20px;margin:0 0 12px}p{color:#b7b7b7;font-size:13px;line-height:1.6}main{display:flex;gap:12px;overflow-x:auto;padding:14px 0 24px}article{flex:0 0 180px;border:1px solid #383838;border-radius:10px;overflow:hidden;background:#242424}.art{width:178px;height:238px;position:relative}.photo{width:100%;height:100%;object-fit:cover}.brand{position:absolute;bottom:12px;left:11px;width:156px;height:58px}.brand img{width:100%;height:100%;object-fit:contain}.info{padding:12px;display:flex;flex-direction:column;gap:4px}strong{font-size:14px}span{font-size:10px;color:#b7b7b7}.sheet{display:block;width:min(100%,1008px);height:auto;margin-top:24px}</style><h1>BIT365 · 라이브 카지노 이미지 검토</h1><p>공통 공간·조명·색감 / 생성 원본 1086×1448 / Figma 카드 영역 180×238<br>이미지 제작 및 검토용 미리보기입니다. 공급사 로고는 기존 Figma 자산이며 생성 이미지에 포함되지 않습니다. Figma 및 사이트에는 미적용.</p><main>'+''.join(cards)+'</main><img class="sheet" src="series-card-preview.png">'
(qa/'review.html').write_text(page,encoding='utf-8')
assert len(list((root/'results').glob('*.png')))==10
(qa/'technical-validation.json').write_text(json.dumps({'selected_count':10,'generated_candidates':12,'failed_attempts':1,'checks':checks},indent=2),encoding='utf-8')
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'selected':10,'generated':12,'not_selected':2,'failed_attempts':1,'readable':10,'hash_match':10,'dimensions':'1086x1448','preview':str(qa/'review.html')}))

