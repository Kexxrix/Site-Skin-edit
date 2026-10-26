from pathlib import Path
import json,hashlib
from PIL import Image
root=Path(__file__).resolve().parent.parent;m=json.loads((root/'run.json').read_text(encoding='utf-8'))
for a in m['assets']:
 p=Path(a['final_path']);assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 with Image.open(p) as im:im.load();assert im.size==(1086,1448) and im.width*4==im.height*3
 a.update(state='selected_by_agent',selected_by_agent=True,qa_pass=True,accepted_by_user=False,adopted=False)
 a['visual_review']={'portrait_framing':True,'bright_editorial_quality_retained':True,'face_and_hair_not_cut_in_card_crop':True,'logo_does_not_obscure_face':True,'logo_readable':True,'note':'Some logos overlap lower garments or peripheral hands; no face overlap.'}
m['counts'].update(qa_pass=10,selected_by_agent=10)
m['verification']={'technical':'10 PNGs decode; all 1086x1448, exact 3:4, transfer and final SHA-256 match','visual':'All individual portraits, full 10-card proof and browser screenshot inspected; faces unobscured and logos readable','browser':{'url':'http://127.0.0.1:52396/qa/review.html','cards':10,'images':21,'broken':0,'inner_art':[178,238],'logo_box':[156,58],'logo_bottom_px':12},'preservation':'All 30 previously selected image hashes match their prior run records'}
m['generation_context']={'correction':'Prior 16:9 was a mistaken reuse of quality-reference prompt output format. These are purpose-built vertical card compositions, not code crops of the landscapes.','quality_source':'User regarded previous landscape photographic quality as good; reused those individual images for beauty/material/lighting roles.','layout_source':'User supplied portrait screenshot and earlier verified Figma 180px provider-card geometry.','retry':'Navy-shawl first output rejected by image tool sexual filter; one clarified wardrobe retry succeeded.','saved_path_reporting':'User requested actual saved location in every generation report; final paths are recorded per image.'}
m['remaining_risks']=['Final user aesthetic approval is pending.','Actual Figma/site asset replacement not performed; only matching card-size QA preview created.','Some logo overlays overlap lower garment/peripheral hand details.']
m['next_action']='Review saved portrait artworks and card proof. Preserve existing logos as separate layers if adopted later.'
(root/'run.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(m['counts']))

