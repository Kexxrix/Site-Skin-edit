from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import hashlib,json,html
root=Path(__file__).resolve().parent.parent;qa=root/'qa';m=json.loads((root/'run.json').read_text(encoding='utf-8'))
source=json.loads(Path(r'E:/codexwork/Site-Skin-edit/exports/bit365-figma-20261012-184651/source.json').read_text(encoding='utf-8'))['data']['benefits']
sheet=Image.new('RGB',(948,1120),'#111720');d=ImageDraw.Draw(sheet);font=ImageFont.truetype(r'C:/Windows/Fonts/malgun.ttf',14)
d.text((16,12),'3:1 BANNER SERIES / NO TEXT IN ORIGINAL IMAGES',fill='#ead9b0',font=font)
checks=[];cards=[];full=[]
for i,a in enumerate(m['assets']):
 p=Path(a['final_path']);assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 with Image.open(p) as im:
  im.load();assert im.format=='PNG';ratio=im.width/im.height;assert im.width>im.height
  small=ImageOps.fit(im.convert('RGB'),(297,101),Image.Resampling.LANCZOS)
  large=ImageOps.fit(im.convert('RGB'),(900,300),Image.Resampling.LANCZOS)
 sheet.paste(small,(16+i*309,42));d.text((16+i*309,149),a['label'],fill='#ead9b0',font=font)
 y=184+i*312;sheet.paste(large,(24,y))
 rel='../results/'+p.name;b=source[i]
 cards.append('<article class="banner"><img src="'+rel+'" alt="'+a['label']+'"><div class="copy"><small>'+html.escape(b[1])+'</small><strong>'+html.escape(b[0])+'</strong><p>'+html.escape(b[2])+'</p><span class="btn">'+html.escape(b[3])+'</span></div></article>')
 full.append('<section><h2>'+html.escape(a['label'])+'</h2><a href="'+rel+'" target="_blank"><img class="full" src="'+rel+'" alt="'+a['label']+' 원본"></a></section>')
 checks.append({'id':a['id'],'size':[a['width'],a['height']],'ratio':ratio,'ratio_error_percent':abs(ratio/3-1)*100,'readable':True,'sha256_match':True,'proof_slot':[297,101]})
 for ref in a['references']:assert hashlib.sha256(Path(ref['path']).read_bytes()).hexdigest()==ref['sha256']
sheet.save(qa/'banner-series-preview.png')
page='<!doctype html><html lang="ko"><meta charset="utf-8"><title>상단 혜택 배너 3장 검수</title><style>*{box-sizing:border-box}body{background:#111720;color:#ece8df;margin:0;padding:24px;font-family:Arial,sans-serif}h1{font-size:22px}h2{font-size:15px;margin-top:24px}body>p{font-size:13px;color:#bdc1c8;line-height:1.6}.row{display:flex;gap:12px;flex-wrap:wrap}.banner{position:relative;width:297px;height:101px;border:1px solid #625843;border-radius:6px;overflow:hidden}.banner>img{width:100%;height:100%;object-fit:cover}.copy{position:absolute;left:9px;top:8px;width:143px}.copy small{font-size:4px;line-height:7px;display:block;color:#d6bc83}.copy strong{font-size:11px;line-height:15px;display:block}.copy p{font-size:5.5px;line-height:8px;margin:4px 0 9px;white-space:nowrap}.btn{font-size:6px;color:#dfc487;border:1px solid #99845d;border-radius:2px;padding:4px 7px;background:#14202dcc}.full{width:min(100%,900px);height:auto;display:block}section{max-width:900px}a{color:#ddc998}.guide{border-top:1px solid #3e4650;margin-top:24px;padding-top:12px}</style><h1>페이백 포인트 · 회원 이벤트 · 데일리 리워드</h1><p>생성 원본 3장에는 텍스트가 없습니다. 아래 작은 배너의 문구·버튼은 여백 검수용 HTML 오버레이입니다.<br>원본 약 3:1 / 검수 표시 297×101px / 실제 사이트·Figma 미수정</p><div class="row">'+''.join(cards)+'</div><p class="guide">아래는 텍스트 없는 생성 원본입니다. 클릭하면 원본 파일이 열립니다.</p>'+''.join(full)+'</html>'
(qa/'review.html').write_text(page,encoding='utf-8')
(qa/'technical-validation.json').write_text(json.dumps({'files':3,'checks':checks,'originals_modified':False,'reference_hashes_match':True},indent=2),encoding='utf-8')
print(json.dumps({'images':3,'readable':3,'hash_match':3,'ratios':[c['ratio'] for c in checks],'references_preserved':True}))

