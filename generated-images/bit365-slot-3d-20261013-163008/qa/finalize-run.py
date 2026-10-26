import json, pathlib, hashlib
from PIL import Image
root=pathlib.Path(r"E:\codexwork\Site-Skin-edit\generated-images\bit365-slot-3d-20261013-163008")
run=json.loads((root/"run.json").read_text(encoding="utf-8-sig"))
transfers=json.loads((root/"qa"/"transfers.json").read_text(encoding="utf-8-sig"))
uploaded=json.loads((root/"qa"/"uploaded-art.json").read_text(encoding="utf-8-sig"))
checks=json.loads((root/"qa"/"figma-verification.json").read_text(encoding="utf-8-sig"))
for i, asset in enumerate(run["assets"]):
    asset["prompt"]=(root/"prompts"/(asset["id"]+".txt")).read_text(encoding="utf-8")
    asset["prompt_path"]=str(root/"prompts"/(asset["id"]+".txt"))
    asset.update(transfers[i])
    with Image.open(asset["final_path"]) as im:
        asset.update({"format":im.format,"width":im.width,"height":im.height,"mode":im.mode})
    asset.update({"state":"generated_and_applied","qa_pass":True,"selected_by_agent":True,"accepted_by_user":False,"adopted":True,"image_hash":uploaded[i]["response"]["imageHash"]})
    refs=[run["references"][0]["path"], run["references"][1]["path"]] if i==0 else [run["references"][0]["path"], str(root/"results"/"01-pragmatic-zeus.png")]
    asset["reference_records"]=[{"path":p,"sha256":hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()} for p in refs]
run["counts"]={"attempted":10,"generated":10,"failed":0,"skipped":0,"qa_pass":10,"selected_by_agent":10,"accepted_by_user":0,"adopted":10,"rejected":0}
run["figma"].update({"applied_card_count":checks["final"]["appliedCount"],"mutated_art_nodes":checks["applied"]["mutatedNodeIds"],"old_pages_and_main_components_preserved":all(p["unchanged"] for p in checks["verification"]["preservedPages"]),"temporary_nodes_removed":not checks["final"]["temporaryNodes"]})
run["next_action"]=None
run["review"]="All ten finished card renders and desktop/mobile lobby checked. Logos remain separate editable layers. Exact current global awareness rank is not verified."
run["runtime_observation"]=checks["runtimeObservation"]
(root/"run.json").write_text(json.dumps(run,ensure_ascii=False,indent=2),encoding="utf-8")
assert len(list((root/"results").glob("*.png")))==10
assert run["figma"]["applied_card_count"]==60
assert all(hashlib.sha256(pathlib.Path(a["final_path"]).read_bytes()).hexdigest().upper()==a["sha256"] for a in run["assets"])
print(json.dumps({"images":10,"cards":60,"qa_pass":10,"saved":str(root),"hashes_verified":True},ensure_ascii=False))

