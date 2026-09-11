from pathlib import Path
from PIL import Image
import json,hashlib
from datetime import datetime,timezone
root=Path(__file__).resolve().parent.parent
archive=json.loads((root/"qa/01-furin-tablet-wide.png.json").read_text(encoding="utf-8-sig"))
out=Path(archive["path"])
ref=Path("E:/codexwork/Site-Skin-edit/titan_promotion/public/assets/fire.webp")
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(out)==archive["sha256"] and not Path(archive["source"]).exists()
assert sha(ref)=="5092cc3641227084e07be4e7a467f85d3638cfbb24bac369a046e3780ee3f70d"
with Image.open(out) as im:
    im.load();fmt=im.format;w,h=im.size
assert fmt=="PNG" and (w,h)==(1919,820)
ratio=w/h
target=75/32
err=abs(ratio-target)/target*100
assert err<0.2
prompt=(root/"prompts/02-grok-ratio-test.txt").read_text(encoding="utf-8-sig")
assert "TOTAL DURATION OF EXACTLY 4 SECONDS" in prompt
assert "End the video at exactly 4.0 seconds" in prompt
assert "remaining duration" not in prompt
qa={"verified_at":datetime.now(timezone.utc).isoformat(),"png_readable":True,"size":[w,h],"bytes":out.stat().st_size,"sha256":sha(out),"input_sha256_preserved":sha(ref),"move_hash_verified":True,"source_residue":False,"target_ratio":"75:32","actual_ratio":ratio,"ratio_error_percent":err,"ratio_formula":"abs((1919/820)-(75/32))/(75/32)*100","image_resized_or_cropped":False,"visual_checks":{"whole_tablet_visible":True,"screen_and_all_four_bezel_corners_visible":True,"top_and_bottom_space":"approximately 19 percent each","tablet_height":"approximately 62 percent of full image height","source_major_contents":"Furin Kasan logo, three characters in source order, seven game cards and bottom navigation retained","exact_screenshot_reproduction":False,"minor_differences":"Small labels, logo strokes, character/clothing and card details were redrawn; decorative book wording was added to the environment.","actual_desktop_937_5_by_400":"whole tablet and display visible","35_percent_centered_enlargement":"whole tablet and display still visible in separate browser QA simulation"},"independent_visual_review":True,"grok_prompt_duration_seconds":4,"actual_video_generated":False,"grok_non_16_9_video_support_verified":False,"site_modified":False}
manifest={"run_id":root.name,"status":"ultrawide_first_frame_ready_for_grok_ratio_test","user_request":"Create a tablet start image at the actual wide desktop hero ratio using the Furin Kasan thumbnail instead of CAT VILLAGE; explicitly require a four-second video in the prompt.","output":{**archive,"format":fmt,"size":[w,h]},"reference":{"path":ref.as_posix(),"sha256":sha(ref),"data_label":"風林花山","source":"Existing local portfolio thumbnail, not a fresh site capture"},"image_prompt":"prompts/01-wide-tablet-image.txt","image_request":"prompts/01-wide-tablet-request.json","grok_prompt":"prompts/02-grok-ratio-test.txt","image_generation_method":"Codex built-in reference-image generation","counts":{"attempted":1,"generated":1,"failed":0,"skipped":0,"selected_for_ratio_test":1,"user_accepted":0,"site_adopted":0},"layout_evidence":"qa/page-ratio.json","browser_evidence":"qa/framing-proof.png","qa":qa,"scope_note":"Only still-image creation and prompt preparation. No video generation, live site changes, resizing or cropping of original output."}
(root/"run.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
(root/"qa/final-verification.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({"size":[w,h],"ratio":ratio,"target_ratio":target,"error_percent":err,"png_and_hash_checks":"pass","grok_prompt_duration_seconds":4,"grok_video_tested":False,"reference_preserved":True},indent=2))

