from pathlib import Path
import json,hashlib
from PIL import Image
root=Path(__file__).resolve().parent.parent
m=json.loads((root/'run.json').read_text(encoding='utf-8'))
for a in m['assets']:
 p=Path(a['final_path'])
 assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 with Image.open(p) as im: im.load(); assert im.format=='PNG' and im.size==(1086,1448)
 a['casting']=a['prompt'].split('CASTING AND STYLING: ')[-1]
 a['qa_pass']=True; a['selected_by_agent']=True; a['state']='selected_by_agent'
 a['visual_review']={'studio_editorial_lighting_and_texture':True,'face_expression_hair_outfit_variation_reviewed':True,'full_and_card_crop_inspected':True,'no_major_anatomy_defect_found':True,'accepted_by_user':False}
m['counts'].update(qa_pass=10,selected_by_agent=10)
m['verification']={'files':'10 PNGs decode successfully; each 1086x1448, SHA-256 before/after move matches and final check matches','preservation':'All prior 10 selected image hashes match their recorded originals','visual':'Each individual image viewed; final full-image comparison and 178x238 crops viewed; studio-fashion effect and differences in faces and outfits assessed','browser':{'url':'http://127.0.0.1:62529/qa/review.html','cards':10,'images':12,'broken':0},'selection':'Two initial candidates for 17 and 19 were too close to another face; one revision per candidate, v2 selected, initial images preserved in qa/not-selected'}
m['next_action']='Review this additional 10-image studio-fashion series. No Figma or site adoption performed.'
m['remaining_risks']=['Final provider-logo overlay and actual Figma/site application have not been verified in this additional-image task.']
assert m['counts']['attempted']==12 and m['counts']['generated']==12 and m['counts']['failed']==0
assert len(list((root/'results').glob('*.png')))==10
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(m['counts']))

