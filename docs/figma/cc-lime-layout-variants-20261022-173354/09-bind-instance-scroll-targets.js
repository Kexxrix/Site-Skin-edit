function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

const page=await figma.getNodeByIdAsync("919:7490");await figma.setCurrentPageAsync(page);figma.skipInvisibleInstanceChildren=false;
const changed=[],checks=[];
for(const report of [{"rootId":"919:7491","mainId":"919:7505","moduleInstanceId":"925:1785","moduleComponentId":"925:1784","variant":"SoloSquare","width":1920,"height":1941.199951171875,"moduleWidth":1592,"moduleHeight":588,"clonedContentHashBeforePromotion":"30cd521d"},{"rootId":"920:7490","mainId":"920:7504","moduleInstanceId":"925:1879","moduleComponentId":"925:1878","variant":"CenterBars","width":1920,"height":1941.199951171875,"moduleWidth":1592,"moduleHeight":588,"clonedContentHashBeforePromotion":"e56ba595"}]){
 const top=await figma.getNodeByIdAsync(report.moduleInstanceId);
 const all=[top,...top.findAll(()=>true)],idMap=new Map();
 for(const n of all){idMap.set(n.id,n);if(n.id.includes(";"))idMap.set(n.id.slice(n.id.indexOf(";")+1),n);}
 for(const n of all.filter(n=>"reactions"in n&&n.reactions.length)){
  let didChange=false;
  const next=n.reactions.map(r=>({trigger:r.trigger,actions:(r.actions||[r.action]).filter(Boolean).map(a=>{
   if(a.type!=="NODE"||a.navigation!=="SCROLL_TO")return a;
   const target=idMap.get(a.destinationId);if(!target)throw new Error("Missing scroll destination "+a.destinationId);
   if(target.id!==a.destinationId)didChange=true;
   return {...a,destinationId:target.id};
  })}));
  if(didChange){await n.setReactionsAsync(next);changed.push(n.id);}
  for(const r of n.reactions)for(const a of r.actions||[])if(a.type==="NODE"&&a.navigation==="SCROLL_TO"){
   const target=await figma.getNodeByIdAsync(a.destinationId);let p=target,inside=false;while(p){if(p.id===top.id){inside=true;break;}p=p.parent;}
   checks.push({from:n.id,to:a.destinationId,targetExists:!!target,withinDisplayedInstance:inside});
  }
 }
}
return {mutatedNodeIds:changed,checks,allDestinationsValid:checks.every(c=>c.targetExists&&c.withinDisplayedInstance)};

