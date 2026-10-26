function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

const page=await figma.getNodeByIdAsync("919:7490");await figma.setCurrentPageAsync(page);figma.skipInvisibleInstanceChildren=false;
await Promise.all([{"family":"Pretendard JP","style":"Medium"},{"family":"Pretendard JP","style":"SemiBold"},{"family":"Pretendard JP","style":"Bold"},{"family":"Bebas Neue","style":"Regular"},{"family":"Pretendard JP","style":"ExtraBold"},{"family":"Pretendard JP","style":"Regular"},{"family":"Noto Sans KR","style":"Medium","variationSettings":{"wght":500}},{"family":"Noto Sans KR","style":"Bold","variationSettings":{"wght":700}},{"family":"Noto Sans KR","style":"Black","variationSettings":{"wght":900}},{"family":"Noto Sans KR","style":"Regular","variationSettings":{"wght":400}},{"family":"Pretendard JP","style":"Black"},{"family":"Noto Serif KR","style":"SemiBold","variationSettings":{"wght":600}}].map(f=>figma.loadFontAsync(f)));
const created=[],mutated=new Set(),createdStyleIds=[],reports=[];
const mark=n=>{mutated.add(n.id);return n;};
const rootA=await figma.getNodeByIdAsync("919:7491"),rootB=await figma.getNodeByIdAsync("920:7490");
const moduleA=await figma.getNodeByIdAsync("924:1991"),heroB=await figma.getNodeByIdAsync("924:2083"),gateB=await figma.getNodeByIdAsync("920:7510"),mainB=await figma.getNodeByIdAsync("920:7504");
const moduleB=figma.createAutoLayout("VERTICAL");created.push(moduleB.id);mainB.appendChild(moduleB);moduleB.name="B · Center carousel and slim gateway bars";moduleB.fills=[];moduleB.resize(1592,588);moduleB.itemSpacing=16;moduleB.primaryAxisSizingMode="AUTO";moduleB.counterAxisSizingMode="FIXED";moduleB.layoutSizingHorizontal="FILL";moduleB.layoutSizingVertical="HUG";
moduleB.appendChild(heroB);moduleB.appendChild(gateB);mark(heroB);mark(gateB);mark(mainB);mainB.insertChild(1,moduleB);
const styles={};
for(const size of [11,12]){const text=page.findOne(n=>n.type==="TEXT"&&n.fontSize===size&&n.name==="Text");const font=text?text.fontName:moduleA.findOne(n=>n.type==="TEXT"&&n.characters==="01").fontName;const style=figma.createTextStyle();style.name="P25/CC Lime/Navigation/"+size;style.fontName=font;style.fontSize=size;style.lineHeight={unit:"PIXELS",value:size+6};style.letterSpacing={unit:"PIXELS",value:0};styles[size]=style;createdStyleIds.push(style.id);}
for(const module of [moduleA,moduleB])for(const t of module.findAllWithCriteria({types:["TEXT"]})){if(styles[t.fontSize]&&["01","02","03","페이백 포인트","회원 이벤트","데일리 리워드"].includes(t.characters)&&t.fontSize<=12){await t.setTextStyleIdAsync(styles[t.fontSize].id);mark(t);}}
const comps=[];
for(const [root,module,variant]of [[rootA,moduleA,"SoloSquare"],[rootB,moduleB,"CenterBars"]]){
 const main=module.parent,index=main.children.findIndex(c=>c.id===module.id),before=hash(snap(module,true));
 const component=figma.createComponentFromNode(module);created.push(component.id);page.appendChild(component);component.name="Layout="+variant;component.description=variant==="SoloSquare"?"One large promotion viewport with three existing benefit slides; four square gateway buttons in a 2×2 dock. Reuses CC Lime assets and theme variables.":"Three center-focus scroll stops using existing benefit images; four compact 72px gateway bars. Each selector scrolls to a full-width anchor.";
 component.layoutSizingHorizontal="FIXED";component.layoutSizingVertical="FIXED";
 for(const [id,mode]of Object.entries(root.explicitVariableModes)){const collection=await figma.variables.getVariableCollectionByIdAsync(id);component.setExplicitVariableModeForCollection(collection,mode);}
 for(const n of [component,...component.findAll(()=>true)])mutated.add(n.id);
 const inst=component.createInstance();main.insertChild(index,inst);inst.name=variant==="SoloSquare"?"Top layout · SoloSquare":"Top layout · CenterBars";inst.layoutSizingHorizontal="FILL";inst.layoutSizingVertical="HUG";
 created.push(inst.id,...inst.findAll(()=>true).map(n=>n.id));mark(main);mark(root);comps.push(component);
 reports.push({rootId:root.id,mainId:main.id,moduleInstanceId:inst.id,moduleComponentId:component.id,variant,width:root.width,height:root.height,moduleWidth:inst.width,moduleHeight:inst.height,clonedContentHashBeforePromotion:before});
}
const set=figma.combineAsVariants(comps,page);created.push(set.id);set.name="P25/CC Lime/Top layout";set.description="Layout-only exploration from the original page-24 CC Lime. Layout=SoloSquare or CenterBars. Original photography, cyberpunk assets, lower content and theme tokens are reused. Components are kept outside full-page review frames.";
set.x=100;set.y=2560;set.resize(3280,684);
comps[0].x=24;comps[0].y=64;comps[1].x=1656;comps[1].y=64;
const sample=page.findOne(n=>n.type==="TEXT"&&n.characters.startsWith("25 ·"));
const note=sample.clone();page.appendChild(note);created.push(note.id);note.characters="상단 전용 컴포넌트 · Layout 2종";note.fontSize=20;note.lineHeight={unit:"PIXELS",value:30};note.resize(3280,30);note.x=100;note.y=2490;
const artFit=root=>{const art=root.children.find(n=>n.name.includes("Cyberpunk artwork"));mark(art);art.resize(root.width,root.height);const bg=art.findOne(n=>n.name==="CC Lime · Generated neon city background");mark(bg);bg.resize(root.width,root.height);const scout=art.findOne(n=>n.name==="CC Lime · Original feline scout robot");mark(scout);scout.y=root.height-224;};
for(const root of [rootA,rootB])artFit(root);
return {createdNodeIds:created,mutatedNodeIds:[...mutated],createdStyleIds,pageId:page.id,componentSetId:set.id,componentPropertyDefinitions:set.componentPropertyDefinitions,reports};

