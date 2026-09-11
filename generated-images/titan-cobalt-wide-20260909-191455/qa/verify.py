from pathlib import Path
from PIL import Image
import hashlib,json

root=Path(__file__).resolve().parent.parent
template=Path('E:/codexwork/Site-Skin-edit/.agents/skills/theme-image-pipeline/assets/run.template.json')
run=json.loads(template.read_text(encoding='utf-8-sig'))
request=json.loads((root/'prompts/01-image-request.json').read_text(encoding='utf-8'))
archive=json.loads((root/'qa/02-cobalt-phone-wide-english.png.json').read_text(encoding='utf-8-sig'))
p=Path(archive['path'])
with Image.open(p) as im:
    im.load();fmt=im.format;size=list(im.size)
digest=hashlib.sha256(p.read_bytes()).hexdigest()
assert digest==archive['sha256'] and not Path(archive['source']).exists()
expected=['07d46a991ced4fcdb149adedd42cf81d13d2c1fee90dde378d4380a5b08dafb1','0680923415c81ad9ef9f4e3f8da96de60380a313b16f644121b28f162f366bc2','fc7386b5d5d6b3d664f98f1f94c066e7e53044d21ef8df5cde80153a6fcac219']
roles=['Scene 02 device and overhead composition','Actual COBALT sports-list screenshot, approved desktop-detail crop','English typography and bright photographic treatment only']
references=[]
for path,sha,role in zip(request['referenced_image_paths'],expected,roles):
    actual=hashlib.sha256(Path(path).read_bytes()).hexdigest()
    assert actual==sha
    references.append({'path':path,'sha256':actual,'role':role,'unchanged':True})
ratio=size[0]/size[1]
ratio_error=abs(ratio-7/3)/(7/3)*100
assert fmt=='PNG' and ratio_error<0.25
visual={'phone_all_four_corners_visible':True,'phone_top_bottom_visible_at_page_size':True,'caption_exact':'OPERATIONAL CONTROL\nREFINED IN PRACTICE','caption_readable_at_page_size':True,'caption_phone_overlap':False,'original_diagonal_overhead_composition_retained':True,'ui_exact_copy':False,'ui_note':'Three-section navy COBALT match-list structure retained. Generated display is not certified pixel-exact; tiny Korean lettering and UI details are redrawn. Original supplied captures remain unchanged.','margin_note':'Phone is fully visible, but generated top/bottom margins are smaller than the 13 percent requested in the image prompt. Do not infer safety for a large camera zoom.','grok_video_tested':False,'site_modified':False}
run.update({'run_id':root.name,'theme':'Titan video scene 02 - COBALT operational control','brand_exact':None,'requested_roles_and_counts':[{'role':'21:9 second-scene starting image','count':1}],'character_use':'none','output_directory':str(root),'editing_mode':'built-in image edit with reference inputs; no post-generation image editing','selection_authority':'user requested generation; agent selected one trial candidate; user acceptance pending','shared_visual_rules':{'user_requirements':['Same wide ratio as supplied 1456x624 video','Existing second scene','English added caption, following current sequence','Project-local archive'],'inferred_from_selected_references':['Left diagonal phone, top-down camera','COBALT screenshot on phone','Bold black right-side caption'],'local_details_not_to_propagate':['Scene 01 tablet and fantasy characters']},'references':references,'assets':[{'role':'scene-02-start','path':str(p),'source_tool_path':archive['source'],'prompt':str(root/'prompts/01-cobalt-wide-image.txt'),'request':str(root/'prompts/01-image-request.json'),'storage_action':archive['action'],'sha256':digest,'bytes':p.stat().st_size,'format':fmt,'dimensions':size,'aspect_ratio':ratio,'requested_aspect_ratio':'21:9 (7:3)','relative_ratio_error_percent':ratio_error,'generated':True,'qa_pass':True,'selected_by_agent':True,'accepted_by_user':False,'adopted':False,'qa':visual}],'counts':{'attempted':1,'generated':1,'failed':0,'skipped':0,'qa_pass':1,'selected_by_agent':1,'accepted_by_user':0,'adopted':0,'rejected':0},'next_action':'User may attach this first frame to Grok. No video generation or site application performed.'})
(root/'run.json').write_text(json.dumps(run,ensure_ascii=False,indent=2),encoding='utf-8')
proof={'image_decoded':True,'sha256_move_match':True,'default_source_residue':False,'references_unchanged':True,'size':size,'ratio':ratio,'relative_ratio_error_percent':ratio_error,'ratio_error_formula':'abs((1916 / 821) - (7 / 3)) / (7 / 3) * 100','visual':visual,'browser_evidence':'qa/at-page-size.png and qa/browser-framing.json'}
(root/'qa/final-verification.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(proof,ensure_ascii=False,indent=2))
