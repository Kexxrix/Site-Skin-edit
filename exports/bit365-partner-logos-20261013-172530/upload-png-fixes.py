import json,pathlib,urllib.request
names=["microgaming","bng"]
jobs=json.loads(r'''[{"submitUrl":"https://mcp.figma.com/mcp/upload/c9305edd-1c9c-4ab7-89a2-e82c90a085df/submit?scaleMode=FIT&currentPageId=88%3A553","targetNodeId":"115:1075"},{"submitUrl":"https://mcp.figma.com/mcp/upload/8829579b-8caf-4dc0-8c3f-11e02e2b7219/submit?scaleMode=FIT&currentPageId=88%3A553","targetNodeId":"115:1078"}]''')
results=[]
for i,j in enumerate(jobs):
 p=pathlib.Path(r"E:\codexwork\Site-Skin-edit\exports\bit365-partner-logos-20261013-172530\upload-assets")/(names[i]+".png")
 req=urllib.request.Request(j["submitUrl"],data=p.read_bytes(),headers={"Content-Type":"image/png"},method="POST")
 with urllib.request.urlopen(req,timeout=90) as r: value=json.load(r)
 results.append({"name":names[i],"id":j["targetNodeId"],"response":value})
pathlib.Path(r"E:\codexwork\Site-Skin-edit\exports\bit365-partner-logos-20261013-172530\png-fix-uploads.json").write_text(json.dumps(results,indent=2),encoding="utf-8")
print(json.dumps(results))

