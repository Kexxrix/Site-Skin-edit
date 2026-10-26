function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

const page=await figma.getNodeByIdAsync("919:7490");await figma.setCurrentPageAsync(page);figma.skipInvisibleInstanceChildren=false;
await Promise.all([{"family":"Pretendard JP","style":"Medium"},{"family":"Pretendard JP","style":"SemiBold"},{"family":"Pretendard JP","style":"Bold"},{"family":"Bebas Neue","style":"Regular"},{"family":"Pretendard JP","style":"ExtraBold"},{"family":"Pretendard JP","style":"Regular"},{"family":"Noto Sans KR","style":"Medium","variationSettings":{"wght":500}},{"family":"Noto Sans KR","style":"Bold","variationSettings":{"wght":700}},{"family":"Noto Sans KR","style":"Black","variationSettings":{"wght":900}},{"family":"Noto Sans KR","style":"Regular","variationSettings":{"wght":400}},{"family":"Pretendard JP","style":"Black"},{"family":"Noto Serif KR","style":"SemiBold","variationSettings":{"wght":600}}].map(f=>figma.loadFontAsync(f)));
const created=[],mutated=[],replacements=[],checks=[];
for(const r of [{"rootId":"919:7491","mainId":"919:7505","moduleInstanceId":"925:1785","moduleComponentId":"925:1784","variant":"SoloSquare","width":1920,"height":1941.199951171875,"moduleWidth":1592,"moduleHeight":588,"clonedContentHashBeforePromotion":"30cd521d"},{"rootId":"920:7490","mainId":"920:7504","moduleInstanceId":"925:1879","moduleComponentId":"925:1878","variant":"CenterBars","width":1920,"height":1941.199951171875,"moduleWidth":1592,"moduleHeight":588,"clonedContentHashBeforePromotion":"e56ba595"}]){
 const top=await figma.getNodeByIdAsync(r.moduleInstanceId),oldEntries=[];
 function collect(n,path){oldEntries.push({id:n.id,canonical:n.id.includes(";")?n.id.slice(n.id.indexOf(";")+1):n.id,path,reactions:"reactions"in n?n.reactions:[]});if("children"in n)n.children.forEach((c,i)=>collect(c,[...path,i]));}
 collect(top,[]);
 const oldById=new Map();for(const e of oldEntries){oldById.set(e.id,e);oldById.set(e.canonical,e);}
 const frame=top.detachInstance();frame.name=r.variant==="SoloSquare"?"Top layout · SoloSquare · prototype frame":"Top layout · CenterBars · prototype frame";
 created.push(frame.id,...frame.findAll(()=>true).map(n=>n.id));
 const at=path=>path.reduce((n,i)=>n.children[i],frame);
 for(const entry of oldEntries.filter(e=>e.reactions.some(rx=>(rx.actions||[rx.action]).some(a=>a?.type==="NODE"&&a.navigation==="SCROLL_TO")))){
  const node=at(entry.path);
  const reactions=entry.reactions.map(rx=>({trigger:rx.trigger,actions:(rx.actions||[rx.action]).filter(Boolean).map(action=>{
   if(action.type!=="NODE"||action.navigation!=="SCROLL_TO")return action;
   const targetData=oldById.get(action.destinationId);if(!targetData)throw new Error("Unmapped prototype target "+action.destinationId);
   return {...action,destinationId:at(targetData.path).id};
  })}));
  await node.setReactionsAsync(reactions);mutated.push(node.id);
  for(const rx of node.reactions)for(const a of rx.actions||[])if(a.type==="NODE"&&a.navigation==="SCROLL_TO"){const target=await figma.getNodeByIdAsync(a.destinationId);checks.push({from:node.id,to:target.id,name:target.name,targetExists:true});}
 }
 replacements.push({rootId:r.rootId,variant:r.variant,oldInstanceId:r.moduleInstanceId,prototypeFrameId:frame.id,masterComponentId:r.moduleComponentId,width:frame.width,height:frame.height});
}
return {createdNodeIds:created,mutatedNodeIds:mutated,replacements,checks,allTargetsExist:checks.every(c=>c.targetExists)};

