import json
from pathlib import Path
root=Path(__file__).resolve().parent
p=root/'run.json'
d=json.loads(p.read_text(encoding='utf-8'))
assert len(d['assets'])==23
d['status']='generated_and_selected_for_local_adoption'
d['counts']={'attempted':23,'succeeded':23,'failed':0,'skipped':0,'selected_by_agent':23,'rejected':0,'accepted_by_user':0}
d['visual_rules']={'source':'User graphite requirement + inspected SIRIUS gold assets + selected soccer-v001 material parent','inherits':['filled sculpted graphite surfaces','neutral medium-dark gray','soft pale gray highlights','upper-left light','shallow bevels'],'excludes':['SIRIUS gold color','hollow line-art rendering','background plates'],'geometry':'Sport and service meaning follows inspected references; generated success-check/logout/empty-search from functional role and shared graphite material','small_controls':'search/fold/close/reset/delete/lock/back-to-top preserved'}
d['qa']={'proof':'qa/proof.png','method':'Chrome rendered original PNGs on light and dark backgrounds at 92px and 12/16/20/22/30px','root_visual_observation':'23 roles are distinguishable as a filled 3D neutral graphite family. Natural object openings are transparent. No text, backdrop or cropped object observed. Fine detail naturally reduces at the smallest sizes; labels remain present in the site. Actual site validation pending.','technical':'All generated PNGs load; all23 move hashes equal and images readable','user_approval':'pending'}
for a in d['assets']:
 a['selection']='selected_by_agent'
 a['visual_qa']='pass_asset_proof; pending_site_render'
 a['selected_for']='local ALDEBARAN White only'
 for i,r in enumerate(a['references']):
  r['attachment_order']=i+1
  r['role']='functional silhouette and embossed material reference; gold excluded' if a['id']=='soccer-v001' else ('shared graphite material parent; soccer geometry excluded' if i==0 else 'functional silhouette reference; gold excluded')
p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(d['counts']))
