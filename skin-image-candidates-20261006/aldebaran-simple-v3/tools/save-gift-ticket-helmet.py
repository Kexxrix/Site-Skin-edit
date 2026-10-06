import base64, hashlib, io, json, sys
from pathlib import Path
from PIL import Image
BASE = Path(r"E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3").resolve()
assert str(BASE).startswith(str(Path(r"E:/codexwork/Site-Skin-edit").resolve()))
icon = sys.argv[1]
assert icon in ("action-gift", "state-empty-slip", "sport-motorsport")
payload_path = BASE / "refs" / (icon + "-tool-payload.base64")
raw = base64.b64decode(payload_path.read_text(encoding="ascii").strip(), validate=True)
source_hash = hashlib.sha256(raw).hexdigest()
im = Image.open(io.BytesIO(raw))
assert im.format == "PNG"
im.load()
assert im.mode == "RGBA"
alpha = im.getchannel("A")
hist = alpha.histogram()
assert hist[0] > 0 and hist[255] > 0
out = BASE / "results" / (icon + ".png")
with out.open("xb") as f:
    f.write(raw)
saved = out.read_bytes()
assert hashlib.sha256(saved).hexdigest() == source_hash
check = Image.open(out)
check.verify()
edges = [alpha.crop((0,0,im.width,1)), alpha.crop((0,im.height-1,im.width,im.height)), alpha.crop((0,0,1,im.height)), alpha.crop((im.width-1,0,im.width,im.height))]
ref = None if icon == "sport-motorsport" else {"page_id":"page_47645aed071c81918769018d818cb7f0","reference":"library-file:fde1_bGliZmlsZV95Z1l2cVF0T001WXVWSFpHeUJDZTFR_FileDrive_0981513dfcb08191b072af9fa2582442","sha256":"bf07e48a3bd6d21f6d8eca98c3bc1c2a42720dd6ddf9e462e2cf094e54aa3833","role":"style-reference"}
record = {
    "icon":icon,"tool":"image_gen.imagegen","mode":"built-in",
    "tool_output_path":None,"tool_output_path_note":"Tool returned embedded PNG data URL; no local tool output path was supplied.",
    "source_payload":str(payload_path),"final_path":str(out),"save_operation":"decode embedded original bytes; no pixel edits",
    "byte_size":len(raw),"source_sha256":source_hash,"final_sha256":hashlib.sha256(saved).hexdigest(),
    "source_saved_hash_match":True,"format":im.format,"mode":im.mode,"width":im.width,"height":im.height,
    "transparent_pixels":hist[0],"opaque_pixels":hist[255],"partial_alpha_pixels":sum(hist[1:255]),
    "nonzero_alpha_bbox":alpha.getbbox(),"border_alpha_max":max(e.getextrema()[1] for e in edges),
    "prompt_path":str(BASE/"prompts"/(icon+".txt")),"reference":ref,
    "generation_status":"completed","technical_validation":"passed","visual_review_status":"pending actual-size inspection",
    "candidate_status":"candidate only","user_final_approval":False,"site_adopted":False
}
record_path = BASE / "refs" / (icon + "-generation.json")
with record_path.open("x",encoding="utf-8") as f: json.dump(record,f,ensure_ascii=False,indent=2)
print(json.dumps(record,ensure_ascii=True))

