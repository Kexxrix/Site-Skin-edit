figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
const set=await figma.getNodeByIdAsync("484:3633");
const expected="서비스 점검 및 이벤트 안내는 공지사항에서 확인해 주세요.";
const stateChecks=[],resizedChecks=[],createdNodeIds=[],removedNodeIds=[];
const farX=Math.max(...figma.currentPage.children.map(n=>n.x+n.width))+400;
for(const c of set.children){
  const stage=Number(c.name.match(/Step=(\d+)/)[1]);
  const view=c.findOne(n=>n.type==="FRAME"&&n.name.startsWith("Notice viewport"));
  const texts=view.findAllWithCriteria({types:["TEXT"]});
  stateChecks.push({id:c.id,step:stage,messageCount:texts.length,
    noTrim:texts.every(t=>t.leadingTrim==="NONE"),clips:view.clipsContent,
    destination:c.reactions[0]?.actions?.[0]?.destinationId,transition:c.reactions[0]?.actions?.[0]?.transition,oneMessage:texts.length===1&&texts[0].characters===expected});
  const sample=c.createInstance();sample.x=farX;sample.y=1000+stage*60;
  sample.resize(900,28);
  const ids=[sample.id,...sample.findAll(()=>true).map(n=>n.id)];createdNodeIds.push(...ids);
  const v=sample.findOne(n=>n.type==="FRAME"&&n.name.startsWith("Notice viewport"));
  const t=v.findOne(n=>n.type==="TEXT"),track=t.parent;
  const wanted=[0,v.width/2,v.width+24,-t.width-24][stage-1];
  resizedChecks.push({source:c.id,step:stage,width:sample.width,viewportWidth:v.width,trackWidth:track.width,
    x:t.x,expectedX:wanted,pass:Math.abs(t.x-wanted)<.1&&Math.abs(track.width-v.width)<.1});
  sample.remove();removedNodeIds.push(...ids);
}
function auditNotices(root){return root.findAll(n=>n.type==="INSTANCE"&&n.name==="Notice · inline").map(n=>{
  const v=n.findOne(x=>x.type==="FRAME"&&x.name.startsWith("Notice viewport"));
  const ts=v.findAllWithCriteria({types:["TEXT"]});
  return {id:n.id,count:ts.length,viewportWidth:v.width,trackWidth:ts[0]?.parent.width,
    x:ts[0]?.x,noTrim:ts.every(t=>t.leadingTrim==="NONE"),pass:ts.length===1&&ts[0].characters===expected&&ts[0].x===0&&Math.abs(ts[0].parent.width-v.width)<.1};
});}
const headers=await figma.getNodeByIdAsync("487:5107"),masterNotices=auditNotices(headers);
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("347:553"));
const board=await figma.getNodeByIdAsync("488:17987"),overview=await figma.getNodeByIdAsync("488:17986");
const fullNotices=auditNotices(board),overviewNotices=auditNotices(overview);
return {createdNodeIds,removedNodeIds,mutatedNodeIds:[],stateChecks,resizedChecks,masterNotices,fullNotices,overviewNotices,
 summary:{states:stateChecks.length,headers:headers.children.length,masterNoticeCount:masterNotices.length,
 fullNoticeCount:fullNotices.length,overviewNoticeCount:overviewNotices.length,
 allPass:[...stateChecks.map(n=>n.oneMessage&&n.noTrim&&n.clips),...resizedChecks.map(n=>n.pass),
 ...masterNotices.map(n=>n.pass&&n.noTrim),...fullNotices.map(n=>n.pass&&n.noTrim),...overviewNotices.map(n=>n.pass&&n.noTrim)].every(Boolean)}};

