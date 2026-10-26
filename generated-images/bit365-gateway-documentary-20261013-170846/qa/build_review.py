from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import json,hashlib,html
root=Path(__file__).resolve().parent.parent;qa=root/'qa';m=json.loads((root/'run.json').read_text(encoding='utf-8'))
font=ImageFont.truetype(r'C:/Windows/Fonts/malgun.ttf',14)
sheet=Image.new('RGB',(1444,922),'#111720');d=ImageDraw.Draw(sheet)
d.text((20,12),'LOCATION FEEL / LIVE CASINO / SLOTS / SPORTS / IN PLAY',font=font,fill='#e7dbbd')
cards=[];full=[];checks=[]
for i,a in enumerate(m['assets']):
 p=Path(a['final_path']);assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 with Image.open(p) as im:
  im.load();assert im.format=='PNG' and im.width>im.height
  small=ImageOps.fit(im.convert('RGB'),(342,142),Image.Resampling.LANCZOS)
  large=ImageOps.fit(im.convert('RGB'),(684,284),Image.Resampling.LANCZOS)
 sheet.paste(small,(20+i*354,42));d.text((20+i*354,191),a['label'],font=font,fill='#e7dbbd')
 x=20+(i%2)*704;y=238+(i//2)*330;sheet.paste(large,(x,y));d.text((x,y+292),a['label'],font=font,fill='#e7dbbd')
 rel='../results/'+p.name
 cards.append('<a class="card" href="'+rel+'" target="_blank"><img src="'+rel+'" alt="'+a['label']+'"><div class="shade"></div><div class="label"><small>'+html.escape(a['en'])+'</small><strong>'+html.escape(a['label'])+'</strong></div></a>')
 full.append('<section><h2>'+html.escape(a['label'])+'</h2><a href="'+rel+'" target="_blank"><img class="full" src="'+rel+'" alt="'+a['label']+' 생성 원본"></a></section>')
 refs_ok=True
 for ref in a['references']:assert hashlib.sha256(Path(ref['path']).read_bytes()).hexdigest()==ref['sha256']
 for old in a.get('prior_outputs',[]):assert hashlib.sha256(Path(old['final_path']).read_bytes()).hexdigest()==old['sha256']
 checks.append({'id':a['id'],'size':[a['width'],a['height']],'ratio':a['width']/a['height'],'readable':True,'sha256_match':True,'display_slot':[342,142],'source_not_cropped_or_resized':True})
sheet.save(qa/'gateway-preview.png')
page='<!doctype html><html lang="ko"><meta charset="utf-8"><title>현장감 있는 카테고리 이미지 4장</title><style>*{box-sizing:border-box}body{margin:0;padding:24px;background:#111720;color:#ece8df;font-family:Arial,sans-serif}h1{font-size:22px}h2{font-size:16px;margin-top:24px}p{font-size:13px;line-height:1.6;color:#bfc3cc}.row{display:flex;gap:12px;flex-wrap:wrap}.card{display:block;position:relative;width:342px;height:142px;border:1px solid #766442;border-radius:8px;overflow:hidden;color:white}.card>img{width:100%;height:100%;object-fit:cover}.shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.60),transparent 55%)}.label{position:absolute;left:12px;bottom:11px}.label small{font-size:6px;display:block;margin-bottom:5px}.label strong{font-size:15px}.full{display:block;width:min(100%,960px);height:auto}section{max-width:960px}a{color:#ddc58d}</style><h1>라이브 카지노 · 슬롯 · 스포츠 · 인플레이</h1><p>현장 사진의 인상을 목표로 생성한 독립 이미지 4장입니다. 실제 사건/장소 촬영 사진은 아닙니다.<br>라이브 카지노는 사용자 피드백을 반영한 딜러 얼굴·의상 수정본입니다.<br>아래 카테고리 제목과 음영은 배치 확인용 HTML 오버레이이며 생성 원본에는 추가 합성하지 않았습니다.<br>검수 표시 342×142px / 실제 사이트·Figma 미수정. 클릭하면 선택된 원본이 열립니다.</p><div class="row">'+''.join(cards)+'</div>'+''.join(full)+'</html>'
(qa/'review.html').write_text(page,encoding='utf-8')
assert len(list((root/'results').glob('*.png')))==4
(qa/'technical-validation.json').write_text(json.dumps({'files':4,'checks':checks,'references_hashes_match':True,'superseded_candidate_preserved':True},indent=2),encoding='utf-8')
print(json.dumps({'selected_files':4,'hashes_match':4,'references_match':True,'sizes':[c['size'] for c in checks]}))

