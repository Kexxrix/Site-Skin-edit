await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("647:46472"));
const targetName="21 · 헤더 디테일 · 36px / 중심 정렬";
if(figma.root.children.some(p=>p.name===targetName))throw Error("Target page already exists; inspect before retry");
const sourceSets=await Promise.all(["660:5907","660:6084","660:6215"].map(id=>figma.getNodeByIdAsync(id)));
const sourceSections=await Promise.all(["647:46473","647:46474"].map(id=>figma.getNodeByIdAsync(id)));
const fonts=new Map();
for(const root of [...sourceSets,...sourceSections])for(const t of root.findAllWithCriteria({types:["TEXT"]}))for(const seg of t.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const created=new Set(),mutated=new Set();function track(n){created.add(n.id);if("children"in n)for(const c of n.children)if(!c.id.startsWith("I"))track(c);return n}
function mark(n){mutated.add(n.id);}
function height(n,h,hs=n.layoutSizingHorizontal){const w=n.width;n.resize(w,h);n.layoutSizingHorizontal=hs;n.layoutSizingVertical="FIXED";mark(n);}
function swap(n,target,h=n.height){
 const w=n.width,hs=n.layoutSizingHorizontal,vs=n.layoutSizingVertical,props=n.componentProperties;
 n.swapComponent(target);const restore={};
 for(const[k,p]of Object.entries(props)){const next=Object.keys(n.componentProperties).find(k2=>k2.split("#")[0]===k.split("#")[0]);if(next)restore[next]=p.value;}
 if(Object.keys(restore).length)n.setProperties(restore);
 n.resize(w,h);n.layoutSizingHorizontal=hs;n.layoutSizingVertical=vs;mark(n);
}
async function createVariableCollection(name,modeNames){
 const collection=figma.variables.createVariableCollection(name),modeIds={};
 collection.renameMode(collection.modes[0].modeId,modeNames[0]);modeIds[modeNames[0]]=collection.modes[0].modeId;
 for(let i=1;i<modeNames.length;i++)modeIds[modeNames[i]]=collection.addMode(modeNames[i]);
 return{collection,modeIds};
}
const collectionName="P21 · Header detail";
if((await figma.variables.getLocalVariableCollectionsAsync()).some(c=>c.name===collectionName))throw Error("Target token collection already exists");
const{collection,modeIds}=await createVariableCollection(collectionName,["Value"]);
const controlHeight=figma.variables.createVariable("Header/control-height",collection,"FLOAT");
controlHeight.scopes=["WIDTH_HEIGHT"];controlHeight.setValueForMode(modeIds.Value,36);
controlHeight.setVariableCodeSyntax("WEB","var(--header-control-height)");
const page=figma.createPage();page.name=targetName;track(page);
const lib=figma.createSection();lib.name="03 · 이 페이지 전용 헤더 컴포넌트";page.appendChild(lib);lib.x=4400;lib.y=100;lib.resizeWithoutConstraints(4300,850);track(lib);
const map=new Map(),sets=[];
for(let i=0;i<sourceSets.length;i++){
 const src=sourceSets[i],clone=src.clone();lib.appendChild(clone);track(clone);
 clone.name=["P21/Header/GoldFlow03/Compact","P21/Header/QuickLinks/Compact","P21/Controls/AccountButton/Compact"][i];
 clone.description="21번 헤더 디테일 전용. 19번 원본 유지. 헤더 88px, 컨트롤 36px, R6, 기존 텍스트/아이콘/너비 보존.";
 clone.x=i===2?1100:64;clone.y=i===0?80:330;sets.push(clone);
 for(const old of src.children){const copy=clone.children.find(c=>c.name===old.name);if(!copy)throw Error("Missing cloned variant "+old.name);map.set(old.id,copy);}
}
const[headerSet,quickSet,accountSet]=sets;
for(const v of accountSet.children){
 v.paddingTop=6.5;v.paddingBottom=5.5;height(v,36);v.setBoundVariable("height",controlHeight);mark(v);
}
for(const v of quickSet.children){height(v,36);v.setBoundVariable("height",controlHeight);mark(v);}
for(const v of headerSet.children){
 const band=v.children.find(n=>n.name==="Single gold band");band.counterAxisAlignItems="CENTER";mark(band);
 const quick=band.children.find(n=>n.name==="Quick links");swap(quick,map.get(quick.mainComponent.id),36);quick.setBoundVariable("height",controlHeight);
 const member=band.children.find(n=>n.name==="Member access");height(member,36);member.counterAxisAlignItems="CENTER";member.setBoundVariable("height",controlHeight);mark(member);
 for(const b of member.children){const target=map.get(b.mainComponent?.id);if(target){swap(b,target,36);b.paddingTop=6.5;b.paddingBottom=5.5;b.setBoundVariable("height",controlHeight);mark(b);}}
}
const screenPairs=[],sections=[];
for(let si=0;si<sourceSections.length;si++){
 const src=sourceSections[si],clone=src.clone();page.appendChild(clone);track(clone);
 clone.name=si===0?"01 · 헤더 36px · Gold Flow03 · 다크 / 화이트":"02 · 헤더 36px · 동영상 + 배너 · 다크 / 화이트";
 clone.x=100;clone.y=si===0?800:800+sourceSections[0].height+160;mark(clone);sections.push(clone);
 const srcScreens=src.children.filter(n=>n.type==="FRAME"&&n.width===1920);
 const dstScreens=clone.children.filter(n=>n.type==="FRAME"&&n.width===1920);
 for(let i=0;i<srcScreens.length;i++){
 const s=srcScreens[i],d=dstScreens[i],header=d.children[0];d.name=s.name+" · 헤더 36px";mark(d);
 swap(header,map.get(header.mainComponent.id),88);
 screenPairs.push({sourceId:s.id,id:d.id,headerId:header.id,name:d.name,w:d.width,h:d.height});
 }
}
const docFont={family:"Pretendard JP",style:"SemiBold"};await figma.loadFontAsync(docFont);
function auto(parent,name,dir){const n=figma.createAutoLayout(dir);parent.appendChild(n);n.name=name;n.fills=[];n.itemSpacing=12;n.primaryAxisSizingMode="AUTO";n.counterAxisSizingMode="AUTO";track(n);return n}
function textNode(parent,chars,size=14){const t=figma.createText();t.fontName=docFont;t.fontSize=size;t.lineHeight={unit:"PIXELS",value:size+8};t.characters=chars;t.fills=[{type:"SOLID",color:{r:.83,g:.83,b:.8}}];parent.appendChild(t);t.textAutoResize="WIDTH_AND_HEIGHT";track(t);return t}
const review=auto(page,"00 · 헤더 수정 전후 비교 · 44px → 36px","VERTICAL");review.x=100;review.y=100;review.paddingLeft=64;review.paddingRight=64;review.paddingTop=48;review.paddingBottom=48;review.itemSpacing=24;review.fills=[{type:"SOLID",color:{r:.12,g:.12,b:.12}}];
textNode(review,"헤더 디테일 · 컨트롤 36px / 공통 세로 중심 44px",22);
const row=auto(review,"다크 / 화이트 비교","HORIZONTAL");row.itemSpacing=80;
const reviewIds=[];
for(let i=0;i<2;i++){
 const col=auto(row,i===0?"BlackGold":"WhiteGold","VERTICAL");
 textNode(col,(i===0?"BlackGold":"WhiteGold")+" · 기존 44px");
 const src=await figma.getNodeByIdAsync(i===0?"647:46476":"647:46528");const before=src.clone();col.appendChild(before);track(before);
 textNode(col,"수정 36px · 너비·글자·아이콘 유지");
 const after=src.clone();col.appendChild(after);track(after);swap(after,map.get(after.mainComponent.id),88);reviewIds.push(after.id);
}
textNode(lib,"21번 전용 · Header / QuickLinks / AccountButton · 높이 변수 36px",18).y=24;
const checks=[];
for(const pair of screenPairs){
 const d=await figma.getNodeByIdAsync(pair.id),header=d.children[0],band=header.children.find(n=>n.name==="Single gold band");
 const quick=band.children.find(n=>n.name==="Quick links"),member=band.children.find(n=>n.name==="Member access"),notice=band.children.find(n=>n.name==="Notice · inline");
 checks.push({id:d.id,w:d.width,h:d.height,headerH:header.height,quick:{x:quick.x,y:quick.y,w:quick.width,h:quick.height},member:{x:member.x,y:member.y,w:member.width,h:member.height},buttons:member.children.map(n=>({name:n.name,w:n.width,h:n.height,pad:[n.paddingTop,n.paddingBottom]})),notice:{x:notice.x,w:notice.width,h:notice.height},rightMargin:header.width-member.x-member.width});
}
return{pageId:page.id,pageName:page.name,createdNodeIds:[...created],mutatedNodeIds:[...mutated],variableCollectionId:collection.id,variableId:controlHeight.id,sourceMappings:[...map.entries()].map(([from,n])=>({from,to:n.id,name:n.name})),componentSetIds:sets.map(n=>n.id),sectionIds:sections.map(n=>n.id),reviewId:review.id,reviewAfterIds:reviewIds,screenPairs,checks};
