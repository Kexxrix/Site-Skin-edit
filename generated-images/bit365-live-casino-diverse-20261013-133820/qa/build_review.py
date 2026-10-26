from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import json,hashlib,html
root=Path(__file__).resolve().parent.parent
qa=root/'qa'; m=json.loads((root/'run.json').read_text(encoding='utf-8'))
for a in m.get('superseded_candidates',[]):
 src=Path(a['final_path']); dst=qa/'not-selected'/src.name; dst.parent.mkdir(exist_ok=True)
 if src.exists() and src!=dst:
  assert src.resolve().is_relative_to(root) and dst.resolve().is_relative_to(root) and not dst.exists()
  h=hashlib.sha256(src.read_bytes()).hexdigest(); src.rename(dst); assert hashlib.sha256(dst.read_bytes()).hexdigest()==h
 a['final_path']=str(dst)
checks=[]; cards=[]
font=ImageFont.truetype(r'C:/Windows/Fonts/malgun.ttf',13)
small=ImageFont.truetype(r'C:/Windows/Fonts/malgun.ttf',11)
sheet=Image.new('RGB',(1228,766),'#141515'); d=ImageDraw.Draw(sheet)
d.text((24,12),'BIT365 · 추가 10장 · 스튜디오 패션 화보 / 얼굴·의상 다양화',font=font,fill='#f5f4f4')
crop=Image.new('RGB',(1008,620),'#141515'); cd=ImageDraw.Draw(crop)
cd.text((24,12),'카드 크롭 검토 · 178×238 · 공급사 미배정',font=font,fill='#f5f4f4')
for i,a in enumerate(m['assets']):
 p=Path(a['final_path']); digest=hashlib.sha256(p.read_bytes()).hexdigest(); assert digest==a['sha256']
 with Image.open(p) as im:
  im.load(); assert im.format=='PNG' and im.size==(1086,1448)
  full=im.convert('RGB').resize((228,304),Image.Resampling.LANCZOS)
  card=ImageOps.fit(im.convert('RGB'),(178,238),Image.Resampling.LANCZOS)
 x=24+(i%5)*240; y=42+(i//5)*356; sheet.paste(full,(x,y)); d.text((x,y+310),a['id'],font=small,fill='#cccccc'); d.text((x,y+328),a['label'],font=small,fill='#f5f4f4')
 cx=24+(i%5)*192; cy=42+(i//5)*280; crop.paste(card,(cx,cy)); cd.text((cx,cy+244),a['id'],font=small,fill='#f5f4f4')
 checks.append({'id':a['id'],'readable':True,'format':'PNG','size':[1086,1448],'aspect_ratio':0.75,'sha256_match':True,'display_crop':[178,238]})
 rel='../results/'+p.name
 cards.append('<article><a href="'+rel+'" target="_blank"><img src="'+rel+'" alt="'+html.escape(a['label'])+'"></a><strong>'+html.escape(a['label'])+'</strong><span>'+a['id']+'</span></article>')
 a['state']='selected_by_agent'; a['selected_by_agent']=True
sheet.save(qa/'series-preview.png'); crop.save(qa/'card-crop-preview.png')
page='<!doctype html><html lang="ko"><meta charset="utf-8"><title>BIT365 추가 화보 10장</title><style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#141515;color:#f5f4f4;font-family:Arial,sans-serif}h1{font-size:22px}p{color:#b7b7b7;font-size:13px;line-height:1.6}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;max-width:1228px}article{background:#242424;border:1px solid #383838;border-radius:8px;overflow:hidden}article img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover}strong,span{display:block;padding:8px 10px;font-size:12px}span{padding-top:0;color:#b7b7b7;font-size:10px}.sheet{width:min(100%,1228px);display:block;margin-top:24px}a{color:#e7c17f}</style><h1>BIT365 · 추가 이미지 10장</h1><p>스튜디오 촬영 화보 감각 / 얼굴형·눈매·표정·헤어·의상 구조 다양화<br>원본 1086×1448 PNG. 기존 10장 보존. 생성 이미지 후보이며 Figma·사이트에는 미적용.</p><main>'+''.join(cards)+'</main><img class="sheet" src="series-preview.png"><img class="sheet" src="card-crop-preview.png"></html>'
(qa/'review.html').write_text(page,encoding='utf-8')
oldroot=Path(m['previous_run']); old=json.loads((oldroot/'run.json').read_text(encoding='utf-8'))
for a in old['assets']: assert hashlib.sha256(Path(a['final_path']).read_bytes()).hexdigest()==a['sha256']
assert len(list((root/'results').glob('*.png')))==10
v={'selected_count':10,'generated_candidates':12,'failed_attempts':0,'not_selected':2,'checks':checks,'previous_selected_unchanged':10}
(qa/'technical-validation.json').write_text(json.dumps(v,indent=2),encoding='utf-8')
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'selected':10,'generated':12,'failed':0,'not_selected':2,'readable':10,'hash_match':10,'previous_hash_match':10,'size':'1086x1448','preview':str(qa/'review.html')}))

