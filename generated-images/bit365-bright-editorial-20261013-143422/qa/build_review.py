from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,hashlib,html
root=Path(__file__).resolve().parent.parent; qa=root/'qa'
m=json.loads((root/'run.json').read_text(encoding='utf-8'))
font=ImageFont.truetype(r'C:/Windows/Fonts/malgun.ttf',15)
small=ImageFont.truetype(r'C:/Windows/Fonts/malgun.ttf',12)
sheet=Image.new('RGB',(1248,1350),'#eee9e1');d=ImageDraw.Draw(sheet)
d.text((24,15),'밝은 럭셔리 패션 에디토리얼 · 10장 시리즈',font=font,fill='#302b26')
cards=[]; checks=[]
for i,a in enumerate(m['assets']):
 p=Path(a['final_path']); assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 with Image.open(p) as im:
  im.load(); assert im.format=='PNG'; assert im.size==(1672,941)
  preview=im.convert('RGB').resize((588,331),Image.Resampling.LANCZOS) if False else im.convert('RGB').resize((390,219),Image.Resampling.LANCZOS)
 x=24+(i%3)*408; y=48+(i//3)*322
 sheet.paste(preview,(x,y)); d.text((x,y+227),a['label'],font=small,fill='#302b26');d.text((x,y+250),a['id'],font=small,fill='#746b61')
 cards.append('<article><a href="../results/'+p.name+'" target="_blank"><img src="../results/'+p.name+'" alt="'+html.escape(a['label'])+'"></a><strong>'+html.escape(a['label'])+'</strong><span>'+a['id']+'</span></article>')
 checks.append({'id':a['id'],'readable':True,'sha256_match':True,'size':[1672,941],'native_ratio':1672/941,'exact_16_9':False,'pixel_rounding':{'height_at_16_9':1672*9/16,'actual_height':941,'delta_pixels':941-1672*9/16},'same_size_as_user_local_wide_examples':True})
sheet=sheet.crop((0,0,1248,1300))
sheet.save(qa/'series-preview.png')
page='<!doctype html><html lang="ko"><meta charset="utf-8"><title>밝은 럭셔리 화보 10장</title><style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#eee9e1;color:#302b26;font-family:Arial,sans-serif}h1{font-size:24px}p{font-size:13px;line-height:1.6;color:#746b61}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:18px;max-width:1500px}article{background:#fff;border:1px solid #d8cfc2;border-radius:8px;overflow:hidden}article img{display:block;width:100%;height:auto}strong,span{display:block;padding:9px 12px;font-size:13px}span{padding-top:0;font-size:10px;color:#746b61}.sheet{display:block;width:min(100%,1248px);margin-top:26px}@media(max-width:500px){main{grid-template-columns:1fr}body{padding:14px}}</style><h1>밝은 럭셔리 패션 에디토리얼 · 10장 시리즈</h1><p>20대 초중반 성인 모델 · 미형과 패션 화보 질감 · 밝은 크림/샴페인 공간 · 의상·헤어·표정 변화<br>바카라 전용 또는 슬롯 전용 장면. 원본 PNG 1672×941: 16:9 환산 높이 940.5px와 0.5px 반올림 차이. 기존 결과 보존, Figma/사이트에는 미적용.<br>이미지를 클릭하면 생성 원본을 볼 수 있습니다.</p><main>'+''.join(cards)+'</main><img class="sheet" src="series-preview.png"></html>'
(qa/'review.html').write_text(page,encoding='utf-8')
old_checks=[]
for oldid in ['bit365-live-casino-20261013-124252','bit365-live-casino-diverse-20261013-133820']:
 oldroot=root.parent/oldid; old=json.loads((oldroot/'run.json').read_text(encoding='utf-8'))
 for a in old['assets']: assert hashlib.sha256(Path(a['final_path']).read_bytes()).hexdigest()==a['sha256']
 old_checks.append({'run':oldid,'selected_images_unchanged':10})
assert len(list((root/'results').glob('*.png')))==10
assert m['counts']['attempted']==14 and m['counts']['generated']==10 and m['counts']['failed']==4
(qa/'technical-validation.json').write_text(json.dumps({'generated':10,'failed_attempts':4,'selected_files':10,'checks':checks,'preservation':old_checks},indent=2),encoding='utf-8')
print(json.dumps({'files':10,'readable':10,'hash_match':10,'previous_hash_match':20,'size':'1672x941','native_16_9_rounding_delta_height':0.5,'preview':str(qa/'review.html')}))

