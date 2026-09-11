from pathlib import Path
from PIL import Image
import json, hashlib
from datetime import datetime, timezone
root=Path(__file__).resolve().parent.parent
request=json.loads((root/"prompts/01-image-request.json").read_text(encoding="utf-8-sig"))
archive=json.loads((root/"qa/01-products-with-sites.png.json").read_text(encoding="utf-8-sig"))
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
out=Path(archive["path"])
with Image.open(out) as im: im.load(); size=list(im.size); fmt=im.format
assert fmt=="PNG" and size==[1672,941]
assert sha(out)==archive["sha256"]
assert not Path(archive["source"]).exists()
expected=["e5f3523554375072c2f2fd4462ab8943e461b591cf95840b00aa31867b1f77be","c79fae62e6db327ae789b698b31c9ba3fe7d346bea7432472d14cf90458727b9","0680923415c81ad9ef9f4e3f8da96de60380a313b16f644121b28f162f366bc2"]
refs=[]
for i,p in enumerate(request["referenced_image_paths"]):
    assert sha(p)==expected[i], p
    refs.append({"path":p,"sha256":sha(p),"role":["edit target with blank devices","actual CAT VILLAGE tablet screenshot","actual COBALT desktop-detail crop for phone"][i]})
assert (root/"prompts/01-grok-one-shot.txt").is_file()
qa={"checked_at":datetime.now(timezone.utc).isoformat(),"readable":True,"format":fmt,"size":size,"sha256":sha(out),"move_hash_match":True,"source_residue":False,"reference_files_preserved":True,"visual_review":"Both site screens present; hardware and light read naturally. Devices are larger than the supplied edit target and the phone base is lower. Some fine UI typography differs from the source. Suitable as a one-shot video trial candidate, not certified as an exact UI reproduction.","exact_ui_fidelity":False,"video_generated_or_tested":False}
manifest={"run_id":root.name,"request":"Regenerate the two-device starting image with real website screenshots inserted, for the user to try one continuous video shot.","interpretation":"The last two-device image is the requested current image. Earlier approximately four-second trial duration retained.","method":"Codex built-in image edit with three actual local references; no code compositing after generation.","output":{**archive,"format":fmt,"size":size},"image_prompt":"prompts/01-image-edit.txt","exact_tool_request":"prompts/01-image-request.json","grok_prompt":"prompts/01-grok-one-shot.txt","references":refs,"counts":{"attempted":1,"generated":1,"tool_failed":0,"skipped":0,"selected_for_video_trial":1,"user_accepted":0,"site_adopted":0},"status":"video_trial_candidate_with_ui_fidelity_differences","qa":qa,"previous_code_composite_preserved":"E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303/derived/04-products-start.png","site_changed":False}
(root/"run.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
(root/"qa/final-verification.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({"format":fmt,"size":size,"sha256":sha(out),"bytes":out.stat().st_size,"reference_files_preserved":True,"selected_for_video_trial":1,"exact_ui_fidelity":False,"video_tested":False},ensure_ascii=False,indent=2))

