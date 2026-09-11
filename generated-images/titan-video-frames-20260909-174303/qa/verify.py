from pathlib import Path
import json, hashlib
from PIL import Image
from datetime import datetime, timezone
ROOT = Path(__file__).resolve().parent.parent
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
plates = [
("01-tablet-plate.png", "01-tablet-image.txt", "selected_plate", []),
("02-phone-plate.png", "02-phone-image.txt", "superseded_after_user_composition_feedback", ["results/01-tablet-plate.png"]),
("02-phone-overhead-v002-plate.png", "02-phone-overhead-v002-image.txt", "selected_plate", []),
("03-ledger-start.png", "03-ledger-image.txt", "selected_final_frame", []),
("04-products-plate.png", "04-products-image.txt", "selected_plate", []),
]
scene_specs = [
("01","CAT VILLAGE tablet","derived/01-tablet-start-character.png","prompts/01-tablet-grok.txt","results/01-tablet-plate.png","qa/01-tablet-character-composite.json","sources/cat-village-tablet-character.png"),
("02","COBALT overhead phone","derived/02-phone-start.png","prompts/02-phone-grok.txt","results/02-phone-overhead-v002-plate.png","qa/02-phone-composite.json","sources/cobalt-phone-tall.png"),
("03","Calculation records align","results/03-ledger-start.png","prompts/03-ledger-grok.txt","results/03-ledger-start.png",None,None),
("04","Two-product end shot","derived/04-products-start.png","prompts/04-products-grok.txt","results/04-products-plate.png","qa/04-products-composite.json",None),
]
records=[]
for name,prompt,status,refs in plates:
    p=ROOT/"results"/name
    archive=json.loads((ROOT/"qa"/(name+".json")).read_text(encoding="utf-8-sig"))
    with Image.open(p) as im:
        im.load(); fmt=im.format; size=list(im.size)
    assert fmt=="PNG"
    assert sha(p)==archive["sha256"].lower()
    assert not Path(archive["source"]).exists()
    assert (ROOT/"prompts"/prompt).is_file()
    records.append({**archive, "format":fmt, "size":size, "prompt":"prompts/"+prompt,"image_references":refs,"status":status,"accepted_by_user":False,"adopted":False})
scenes=[]
def verify_evidence(node):
    if isinstance(node,dict):
        if isinstance(node.get('path'),str) and isinstance(node.get('sha256'),str):
            ep=Path(node['path'])
            if not ep.is_absolute(): ep=ROOT/ep
            assert ep.is_file() and sha(ep)==node['sha256'].lower(), str(ep)
        for key,value in node.items():
            if 'outside' in key and 'changed_pixels' in key: assert value==0, key
            verify_evidence(value)
    elif isinstance(node,list):
        for child in node: verify_evidence(child)
for sid,title,final,grok,plate,qa,source in scene_specs:
    p=ROOT/final
    with Image.open(p) as im:
        im.load(); size=list(im.size); fmt=im.format
    assert fmt=="PNG" and abs(size[0]/size[1]-16/9)/(16/9)<0.01
    assert (ROOT/grok).is_file() and (ROOT/grok).stat().st_size>200
    evidence=json.loads((ROOT/qa).read_text(encoding="utf-8-sig")) if qa else None
    if evidence: verify_evidence(evidence)
    scenes.append({"id":sid,"title":title,"first_frame":final,"sha256":sha(p),"bytes":p.stat().st_size,"format":fmt,"size":size,"plate":plate,"video_prompt":grok,"target_edit_duration_seconds":4,"qa_evidence":qa,"qa_pass":True,"selected_by_agent":True,"accepted_by_user":False,"adopted":False,"actual_video_generated_or_tested":False})
assert len({s["sha256"] for s in scenes})==4
source_images=[]
for p in sorted((ROOT/"sources").glob("*.png")):
    with Image.open(p) as im: im.load(); size=list(im.size)
    source_images.append({"path":p.relative_to(ROOT).as_posix(),"sha256":sha(p),"bytes":p.stat().st_size,"size":size,"source_content_regenerated":False})
report={"verified_at":datetime.now(timezone.utc).isoformat(),"selected_frame_count":4,"unique_selected_frame_hashes":4,"all_png_readable":True,"approximate_16_9_ratio_pass":True,"all_generation_moves_hash_matched":True,"generated_default_source_residue":False,"all_paired_video_prompts_present":True,"selected_frames":scenes,"raw_generated_count":len(records),"superseded_generated_count":1,"video_generation_tested":False,"site_modified_or_deployed_by_this_run":False}
manifest={"run_id":ROOT.name,"status":"first_frames_and_prompts_prepared_video_untested","request":"First-frame stills and Grok Imagine prompts for four approximately four-second shots; actual public product UI composited by code as requested.","output_directory":ROOT.as_posix(),"image_generation":"Codex built-in image generation","video_generation":"User will generate and edit in Grok Imagine","counts":{"requested_scenes":4,"attempted_image_generations":5,"successful_image_generations":5,"failed_image_generations":0,"selected_first_frames":4,"qa_pass_selected_frames":4,"superseded_generated_variants":1,"user_accepted_final_frames":0,"site_adopted_frames":0},"scenes":scenes,"generated_plates":records,"source_images":source_images,"source_capture_manifest":"sources/capture-manifest.json","composition_methods":["qa/compose-tablet-character.py","qa/compose-phone.py","qa/compose-products.py"],"constraints":{"actual_ui_code_composited":True,"ui_regenerated_by_image_model":False,"sportsbook_source":"User-approved COBALT desktop match-list detail crop; not a native mobile page","settlement_scene":"Conceptual record-sheet alignment; not actual back-office UI and not remittance","site_crop_note":"Source PNGs are approximately 16:9. Centered cover inside 938x400 crops top/bottom; scene 02 clips phone tips. Use 16:9 composition when trying Grok; website edit requires framing review.","brand_text":"TITAN SOLUTION is provided as editing text, not generated pixels","video_duration_note":"Four seconds is an editing target, not a verified Grok web UI duration control."},"references":[{"path":"E:/codexwork/Site-Skin-edit/titan_promotion/docs/briefs/hero-media-brief.md","role":"Message and product brief; current user overrides orange palette, consistent photo series, and older production split"},{"url":"https://docs.x.ai/developers/model-capabilities/video/image-to-video","role":"Official image-to-video usage"},{"url":"https://x.ai/grok/use-cases/video-generation","role":"Official prompting guidance"}],"verification":"qa/final-verification.json","website_modified":False,"video_tested":False}
(ROOT/"qa"/"final-verification.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
(ROOT/"run.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({k:v for k,v in report.items() if k!="selected_frames"},ensure_ascii=False,indent=2))
