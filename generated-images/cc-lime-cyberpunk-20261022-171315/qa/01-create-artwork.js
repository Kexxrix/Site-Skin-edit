function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

const page=await figma.getNodeByIdAsync("795:1330");await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren=false;
await Promise.all([{"family":"Pretendard JP","style":"Medium"},{"family":"Pretendard JP","style":"SemiBold"},{"family":"Pretendard JP","style":"Bold"},{"family":"Bebas Neue","style":"Regular"},{"family":"Pretendard JP","style":"ExtraBold"},{"family":"Pretendard JP","style":"Regular"},{"family":"Noto Sans KR","style":"Medium","variationSettings":{"wght":500}},{"family":"Noto Sans KR","style":"Bold","variationSettings":{"wght":700}},{"family":"Noto Sans KR","style":"Black","variationSettings":{"wght":900}},{"family":"Noto Sans KR","style":"Regular","variationSettings":{"wght":400}},{"family":"Pretendard JP","style":"Black"},{"family":"Noto Serif KR","style":"SemiBold","variationSettings":{"wght":600}}].map(f=>figma.loadFontAsync(f)));
const root=await figma.getNodeByIdAsync("803:1334");
if(hash(snap(root,true))!=="d76d92f4")throw new Error("CC Lime changed since baseline");
const createdNodeIds=[],art=figma.createFrame();
root.appendChild(art);art.layoutPositioning="ABSOLUTE";root.insertChild(0,art);art.name="CC Lime · Cyberpunk artwork · clipped decoration";
art.x=0;art.y=0;art.resize(root.width,root.height);art.fills=[];art.strokes=[];art.clipsContent=true;art.constraints={horizontal:"STRETCH",vertical:"STRETCH"};createdNodeIds.push(art.id);
function layer(name,x,y,w,h){const n=figma.createRectangle();art.appendChild(n);n.name=name;n.x=x;n.y=y;n.resize(w,h);n.fills=[];n.strokes=[];n.locked=true;createdNodeIds.push(n.id);return n;}
const bg=layer("CC Lime · Generated neon city background",0,0,root.width,root.height);bg.constraints={horizontal:"STRETCH",vertical:"STRETCH"};
const runner=layer("CC Lime · Original cyberpunk runner",-240,1082,800,1066.6667);
const scout=layer("CC Lime · Original feline scout robot",1680,1595,260,260);
art.locked=true;
const core=snap(root,true);core.children=root.children.filter(n=>n.id!==art.id).map(n=>snap(n));
if(hash(core)!=="d76d92f4")throw new Error("Original UI changed while placing artwork");
return {createdNodeIds,mutatedNodeIds:[root.id],rootId:root.id,artId:art.id,backgroundId:bg.id,headerId:"803:1335",runnerId:runner.id,scoutId:scout.id,originalUiUnchanged:true,coreHash:hash(core),rootClipsContentPreserved:root.clipsContent===false};

