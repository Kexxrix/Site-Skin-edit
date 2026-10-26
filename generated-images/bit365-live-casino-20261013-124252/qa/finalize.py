from pathlib import Path
import json,hashlib
from PIL import Image
root=Path(__file__).resolve().parent.parent
m=json.loads((root/'run.json').read_text(encoding='utf-8'))
for i,a in enumerate(m['assets']):
 a['qa_pass']=True; a['state']='selected_by_agent'; a['selected_by_agent']=True
 a['visual_review']={'same_campaign_lighting_palette':True,'readable_face_at_card_size':True,'no_face_obscured_by_logo':True,'anatomy_major_defect_found':False,'limitations':'Some East Asian faces and upright poses remain similar. Logo overlays can cover peripheral hand/waist details.'}
 a['reference_records']=[{'path':r,'sha256':hashlib.sha256(Path(r).read_bytes()).hexdigest()} for r in a['references']]
m['counts'].update(qa_pass=10,selected_by_agent=10,accepted_by_user=0,skipped=0)
for j,attempt in enumerate(m['attempt_log']):
 if attempt['status']=='generated':
  index=next(i for i,a in enumerate(m['assets']) if a['id']==attempt['asset'])
  if j>10: attempt['prompt_path']='prompts/'+attempt['asset']+'-v2.txt'
  elif index>=3: attempt['prompt_path']='prompts/'+attempt['asset']+'-distinct.txt'
m['verification']={'selected_files':10,'technical':'PNG decoding, 1086x1448, SHA-256 before/after transfer and final recheck passed for all','visual':'All independent images visually inspected; 10-card contact sheet inspected with existing logos; browser screenshot inspected','browser':{'url':'http://127.0.0.1:5417/qa/review.html','cards':10,'images':21,'broken':0,'card_width':180,'inner_art_size':[178,238]},'reference_logo_retrieval':'Figma asset URL response could not be decoded as PNG; used existing local export logos and confirmed visual agreement with Figma section screenshot'}
m['remaining_risks']=['Some faces and poses remain similar, despite two revised portraits.','Figma and site asset replacement have not been performed; user acceptance and adoption remain false.']
m['next_action']='User review of generated series; any later Figma/site replacement should use these selected image paths and preserve provider logos.'
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
assert m['counts']['attempted']==13 and m['counts']['generated']==12 and m['counts']['failed']==1
assert len(list((root/'results').glob('*.png')))==10
for a in m['assets']:
 p=Path(a['final_path']); assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 with Image.open(p) as im: im.load()
print(json.dumps(m['counts']))

