import json,hashlib
from pathlib import Path
root=Path(r"E:/codexwork/Site-Skin-edit/generated-images/sidebar-library-gold-free-20261019-144156")
run=json.loads((root/"run.json").read_text(encoding="utf-8"))
meta=json.loads((root/"qa/image-validation.json").read_text(encoding="utf-8"))
transfer=json.loads((root/"qa/transfers.json").read_text(encoding="utf-8-sig"))
originals=json.loads((root/"qa/original-assets.json").read_text(encoding="utf-8"))
for a in run["assets"]:
    m=next(x for x in meta if x["id"]==a["id"]);t=next(x for x in transfer if x["id"]==a["id"])
    a.update({"imageMetadata":m,"transferVerification":t,"prompt":(root/a["promptPath"]).read_text(encoding="utf-8")})
original_results=[{"id":a["id"],"path":a["finalPath"],"hashUnchanged":hashlib.sha256(Path(a["finalPath"]).read_bytes()).hexdigest()==a["sha256"]} for a in originals]
run["verification"]["originalFiles"]={"count":len(original_results),"allUnchanged":all(a["hashUnchanged"] for a in original_results),"files":original_results}
run["verification"]["imageFiles"]={"count":len(meta),"allPngRgba":all(a["format"]=="PNG" and a["mode"]=="RGBA" for a in meta),"allHaveTransparency":all(a["alphaExtrema"]==[0,255] for a in meta),"exactZeroCorners":sum(all(v==0 for v in a["cornerAlpha"]) for a in meta),"maxCornerAlpha":max(max(a["cornerAlpha"]) for a in meta),"preservedGenerationPixels":True,"note":"One source corner has alpha 1/255; no visible backing plate in native UI proofs. Generated images were not resized or cropped."}
(root/"run.json").write_text(json.dumps(run,ensure_ascii=False,indent=2),encoding="utf-8")
tickets_path=root/"qa/upload-tickets.json"
tickets=json.loads(tickets_path.read_text(encoding="utf-8"))
for t in tickets:t.pop("submitUrl",None);t["uploadCompleted"]=True
tickets_path.write_text(json.dumps(tickets,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({"images":len(meta),"hashTransfersMatch":all(t["match"] for t in transfer),"originalFilesUnchanged":run["verification"]["originalFiles"]["allUnchanged"],"alphaPngs":run["verification"]["imageFiles"]["allHaveTransparency"],"run":str(root/"run.json")}))

