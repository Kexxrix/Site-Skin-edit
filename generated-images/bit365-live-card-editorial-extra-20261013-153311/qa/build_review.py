from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import json,hashlib,html,shutil
root=Path(__file__).resolve().parent.parent;qa=root/'qa';m=json.loads((root/'run.json').read_text(encoding='utf-8'))
sheet=Image.new('RGB',(1008,702),'#141515');d=ImageDraw.Draw(sheet)
font=ImageFont.truetype(r'C:/Windows/Fonts/malgun.ttf',12)
d.text((24,18),'LIVE CASINO / EXTRA 10 / 180px CARD PROOF',font=font,fill='#f5f4f4')
cards=[];checks=[]
logoRoot=Path(r'E:/codexwork/Site-Skin-edit/exports/bit365-figma-20261012-184651/assets')
for i,a in enumerate(m['assets']):
 p=Path(a['final_path']);assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 with Image.open(p) as im:
  im.load();assert im.format=='PNG'
  size=im.size;ratio_error=abs(im.width/im.height/(3/4)-1);assert ratio_error<0.002
  proof=ImageOps.fit(im.convert('RGBA'),(178,238),Image.Resampling.LANCZOS)
 logoSource=logoRoot/('casino-logo-'+str(i)+'.png');logoPath=qa/('logo-'+str(i)+'.png')
 if not logoPath.exists():shutil.copy2(logoSource,logoPath)
 assert hashlib.sha256(logoSource.read_bytes()).hexdigest()==hashlib.sha256(logoPath.read_bytes()).hexdigest()
 with Image.open(logoPath) as lm:logo=lm.convert('RGBA')
 logo.thumbnail((156,58),Image.Resampling.LANCZOS)
 proof.alpha_composite(logo,((178-logo.width)//2,168+(58-logo.height)//2))
 x=24+(i%5)*192;y=48+(i//5)*320
 sheet.paste(proof.convert('RGB'),(x,y));d.rectangle((x,y+238,x+177,y+298),fill='#242424')
 d.text((x+8,y+248),a['label'],font=font,fill='#f5f4f4');d.text((x+8,y+274),a['id'].split('-')[0]+' / portrait',font=font,fill='#b7b7b7')
 rel='../results/'+p.name
 cards.append('<article><a href="'+rel+'" target="_blank"><div class="art"><img class="photo" src="'+rel+'"><div class="brand"><img src="'+logoPath.name+'"></div></div></a><div class="info"><strong>'+html.escape(a['label'])+'</strong><span>'+a['id']+'</span></div></article>')
 checks.append({'id':a['id'],'size':size,'exact_3_4':size[0]*4==size[1]*3,'ratio_error_percent':ratio_error*100,'readable':True,'sha256_match':True,'display_slot':[178,238],'logo_box':[156,58,12]})
 a['logo_qa']={'cached_logo_source':str(logoSource),'sha256':hashlib.sha256(logoSource.read_bytes()).hexdigest(),'role':'QA overlay only; provider assignment not adopted'}
sheet.save(qa/'card-series-preview.png')
page='<!doctype html><html lang="ko"><meta charset="utf-8"><title>라이브 카지노 추가 10장</title><style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#141515;color:#f5f4f4;font-family:Arial,sans-serif}h1{font-size:22px}p{color:#b7b7b7;font-size:13px;line-height:1.6}main{display:grid;grid-template-columns:repeat(5,180px);gap:20px 12px;max-width:948px}article{width:180px;border:1px solid #383838;border-radius:10px;overflow:hidden;background:#242424}.art{width:178px;height:238px;position:relative}.photo{width:100%;height:100%;object-fit:cover}.brand{position:absolute;bottom:12px;left:11px;width:156px;height:58px}.brand img{width:100%;height:100%;object-fit:contain}.info{padding:12px;display:flex;flex-direction:column;gap:4px}strong{font-size:13px}span{font-size:10px;color:#b7b7b7}.sheet{display:block;width:min(100%,1008px);height:auto;margin-top:24px}@media(max-width:1000px){main{grid-template-columns:repeat(auto-fit,180px)}}</style><h1>라이브 카지노 · 추가 세로 이미지 10장</h1><p>승인된 밝은 럭셔리 화보 시리즈에 의상·헤어·포즈 변화를 추가했습니다.<br>9장 1086×1448 / 17번 1087×1447 (3:4 대비 비율 차이 약 0.16%). 원본 재가공 없이 보존.<br>Figma 카드 외곽 180px, 내부 178×238 / 기존 공급사 로고는 검수용 별도 중첩입니다.<br>실제 Figma·사이트는 미수정. 클릭하면 로고 없는 생성 원본이 열립니다.</p><main>'+''.join(cards)+'</main><img class="sheet" src="card-series-preview.png"></html>'
(qa/'review.html').write_text(page,encoding='utf-8')
old_checks=[]
for oldid in ['bit365-live-casino-20261013-124252','bit365-live-casino-diverse-20261013-133820','bit365-bright-editorial-20261013-143422','bit365-live-card-editorial-20261013-150514']:
 old=json.loads((root.parent/oldid/'run.json').read_text(encoding='utf-8'))
 for a in old['assets']:assert hashlib.sha256(Path(a['final_path']).read_bytes()).hexdigest()==a['sha256']
 old_checks.append({'run':oldid,'images_unchanged':len(old['assets'])})
assert len(list((root/'results').glob('*.png')))==10
(qa/'technical-validation.json').write_text(json.dumps({'files':10,'checks':checks,'previous_image_sets':old_checks},indent=2),encoding='utf-8')
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'files':10,'readable':10,'hash_match':10,'exact_3_4':sum(c['exact_3_4'] for c in checks),'ratio_within_0_2_percent':10,'previous_hash_match':sum(c['images_unchanged'] for c in old_checks),'preview':str(qa/'review.html')}))

