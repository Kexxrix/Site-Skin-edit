from pathlib import Path
from PIL import Image
import hashlib,json
from datetime import datetime,timezone
root=Path(__file__).resolve().parent.parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
archive=json.loads((root/"qa/01-furin-tablet-english-caption.png.json").read_text(encoding="utf-8-sig"))
out=Path(archive["path"])
with Image.open(out) as im: im.load();fmt=im.format;size=list(im.size)
assert fmt=="PNG" and size==[1918,820]
assert sha(out)==archive["sha256"] and not Path(archive["source"]).exists()
req=json.loads((root/"prompts/01-caption-image-request.json").read_text(encoding="utf-8-sig"))
expected=["2ebafe21ca31c7a4dfe4e97440819ce4e489824e66b53884153a7d159f18d311","5092cc3641227084e07be4e7a467f85d3638cfbb24bac369a046e3780ee3f70d"]
refs=[]
for i,p in enumerate(req["referenced_image_paths"]):
    assert sha(Path(p))==expected[i]
    refs.append({"path":p,"sha256":expected[i]})
grok=(root/"prompts/02-grok-caption-six-seconds.txt").read_text(encoding="utf-8-sig")
assert "6.0 seconds" in grok and "CORE SYSTEMS" in grok and "BUILT IN-HOUSE" in grok
assert "0.5 to 4.5" in grok and "4.5 to 6.0" in grok
qa={"verified_at":datetime.now(timezone.utc).isoformat(),"format":fmt,"size":size,"bytes":out.stat().st_size,"sha256":sha(out),"move_hash_match":True,"default_source_residue":False,"references_unchanged":True,"image_readable":True,"output_ratio":size[0]/size[1],"target_ratio":75/32,"ratio_error_percent":abs(size[0]/size[1]-75/32)/(75/32)*100,"caption_read_visually":["CORE SYSTEMS","BUILT IN-HOUSE"],"caption_language":"English","caption_and_tablet_visible_at_937_5_by_400":True,"source_ui_exact_copy":False,"video_generated_or_tested":False,"site_modified":False}
manifest={"run_id":root.name,"status":"english_captioned_first_frame_and_six_second_prompt_ready_for_trial","user_request":"Try the intended post-edit caption inside a single generated video; six-second source clips, four seconds selected per clip for a twelve-second edit. User subsequently changed the added caption from Korean to English before image generation.","output":{**archive,"format":fmt,"size":size},"references":refs,"image_prompt":"prompts/01-caption-image.txt","image_request":"prompts/01-caption-image-request.json","grok_prompt":"prompts/02-grok-caption-six-seconds.txt","caption":["CORE SYSTEMS","BUILT IN-HOUSE"],"video_duration_seconds":6,"proposed_usable_interval_seconds":[0.5,4.5],"planned_edit":{"clip_count":3,"seconds_per_clip":4,"total_seconds":12,"currently_prepared":"first clip only"},"counts":{"attempted":1,"generated":1,"failed":0,"skipped":0,"selected_for_video_trial":1,"accepted_by_user":0,"adopted":0},"qa":qa}
(root/"run.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
(root/"qa/final-verification.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(qa,ensure_ascii=False,indent=2))

