function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

const page=await figma.getNodeByIdAsync("795:1330");await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren=false;
await Promise.all([{"family":"Pretendard JP","style":"Medium"},{"family":"Pretendard JP","style":"SemiBold"},{"family":"Pretendard JP","style":"Bold"},{"family":"Bebas Neue","style":"Regular"},{"family":"Pretendard JP","style":"ExtraBold"},{"family":"Pretendard JP","style":"Regular"},{"family":"Noto Sans KR","style":"Medium","variationSettings":{"wght":500}},{"family":"Noto Sans KR","style":"Bold","variationSettings":{"wght":700}},{"family":"Noto Sans KR","style":"Black","variationSettings":{"wght":900}},{"family":"Noto Sans KR","style":"Regular","variationSettings":{"wght":400}},{"family":"Pretendard JP","style":"Black"},{"family":"Noto Serif KR","style":"SemiBold","variationSettings":{"wght":600}}].map(f=>figma.loadFontAsync(f)));
const root=await figma.getNodeByIdAsync("850:3637");
if(hash(snap(root,true))!=="9540a15f")throw new Error("Target changed since baseline");
const createdNodeIds=[];
function layer(name,x,y,w,h,index){const n=figma.createRectangle();root.appendChild(n);n.layoutPositioning="ABSOLUTE";root.insertChild(index,n);n.name=name;n.x=x;n.y=y;n.resize(w,h);n.fills=[];n.strokes=[];n.locked=true;createdNodeIds.push(n.id);return n;}
const bg=layer("Together Pink · Generated 3D fantasy background",0,0,root.width,root.height,0);bg.constraints={horizontal:"STRETCH",vertical:"STRETCH"};
const mascot=layer("Together Pink · Original 3D star mascot",2,1090,260,340,1);mascot.constraints={horizontal:"MIN",vertical:"MIN"};
const current=snap(root,true);current.children=root.children.filter(n=>!createdNodeIds.includes(n.id)).map(n=>snap(n));
if(hash(current)!=="9540a15f")throw new Error("Original UI changed");
return {createdNodeIds,mutatedNodeIds:[root.id],rootId:root.id,backgroundId:bg.id,mascotId:mascot.id,originalUiHash:hash(current),originalUiUnchanged:true,mascotBounds:{x:mascot.x,y:mascot.y,width:mascot.width,height:mascot.height},originalNodeCount:629};

