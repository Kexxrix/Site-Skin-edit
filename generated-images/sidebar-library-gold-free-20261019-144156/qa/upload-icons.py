import json, urllib.request, concurrent.futures
from pathlib import Path
root=Path(r"E:/codexwork/Site-Skin-edit/generated-images/sidebar-library-gold-free-20261019-144156")
items=json.loads((root/"qa/upload-tickets.json").read_text())
def upload(item):
    req=urllib.request.Request(item["submitUrl"],data=Path(item["path"]).read_bytes(),headers={"Content-Type":"image/png"},method="POST")
    with urllib.request.urlopen(req,timeout=120) as response:
        body=response.read().decode("utf-8")
        return {"id":item["id"],"targetNodeId":item["targetNodeId"],"status":response.status,"response":json.loads(body)}
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    for result in pool.map(upload,items):
        results.append(result)
        print(json.dumps({"id":result["id"],"status":result["status"]}),flush=True)
(root/"qa/upload-results.json").write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({"uploaded":len(results),"all_ok":all(r["status"]==200 for r in results)}))

