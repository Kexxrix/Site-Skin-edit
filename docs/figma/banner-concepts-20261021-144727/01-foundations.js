await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("693:3254"));

function normalize(v){if(typeof v==='number')return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(normalize);if(v&&typeof v==='object'){const o={};for(const k of Object.keys(v).sort())o[k]=normalize(v[k]);return o;}return v;}
function renderSnapshot(n,ignoreRootXY=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:n.opacity};if(!ignoreRootXY){r.x=n.x;r.y=n.y;}for(const k of ['fills','strokes','effects','cornerRadius','layoutMode','layoutSizingHorizontal','layoutSizingVertical','paddingLeft','paddingRight','paddingTop','paddingBottom','itemSpacing','clipsContent','overflowDirection'])if(k in n&&typeof n[k]!=='symbol')r[k]=n[k];if(n.type==='TEXT'){r.characters=n.characters;r.fonts=n.getStyledTextSegments(['fontName','fontSize','lineHeight','letterSpacing']);r.leadingTrim=n.leadingTrim;}if('children'in n)r.children=n.children.map(c=>renderSnapshot(c));return normalize(r);}
function digest(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}

const pageName="22 · 혜택 배너 · 5방향 디자인 비교";
if(figma.root.children.some(p=>p.name===pageName))throw Error("Comparison page exists; inspect before retry.");
const sourceIds=["693:3446","693:3503","693:4772","693:4826"],sourceBaseline=[];
for(const id of sourceIds){const n=await figma.getNodeByIdAsync(id);sourceBaseline.push({id,hash:digest(renderSnapshot(n,true))});}
const source=await figma.getNodeByIdAsync("693:3446"),fontMap=new Map();
for(const t of source.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fontMap.set(JSON.stringify(s.fontName),s.fontName);
for(const f of [{family:"Noto Serif KR",style:"SemiBold"},{family:"Pretendard JP",style:"Regular"},{family:"Pretendard JP",style:"SemiBold"},{family:"Pretendard JP",style:"Bold"}])fontMap.set(JSON.stringify(f),f);
await Promise.all([...fontMap.values()].map(f=>figma.loadFontAsync(f)));
async function createVariableCollection(name,modeNames){const collection=figma.variables.createVariableCollection(name),modeIds={};collection.renameMode(collection.modes[0].modeId,modeNames[0]);modeIds[modeNames[0]]=collection.modes[0].modeId;for(let i=1;i<modeNames.length;i++)modeIds[modeNames[i]]=collection.addMode(modeNames[i]);return{collection,modeIds};}
const{collection,modeIds}=await createVariableCollection("P22 · Banner concepts",["Value"]),created=[],styles={},tokens={};
function track(n){created.push(n.id);if("children"in n)for(const c of n.children)if(!c.id.startsWith("I"))track(c);}
function colorVariable(name,value,scopes,syntax){const v=figma.variables.createVariable(name,collection,"COLOR");v.scopes=scopes;v.setValueForMode(modeIds.Value,value);v.setVariableCodeSyntax("WEB","var(--"+syntax+")");tokens[name]=v.id;return v;}
const paperP=colorVariable("primitive/paper",{r:238/255,g:233/255,b:218/255,a:1},[],"p22-paper");
const scopes=["FRAME_FILL","SHAPE_FILL","TEXT_FILL","STROKE_COLOR"];
colorVariable("paper",{type:"VARIABLE_ALIAS",id:paperP.id},scopes,"banner-paper");
for(const[n,id]of [["ink","VariableID:435:14066"],["gold","VariableID:435:14100"],["white","VariableID:435:14094"],["muted","VariableID:435:14082"],["line","VariableID:435:14067"]]){
 if(!await figma.variables.getVariableByIdAsync(id))throw Error("Missing existing primitive "+id);
 colorVariable(n,{type:"VARIABLE_ALIAS",id},scopes,"banner-"+n);
}
const styleSpecs=[["Editorial",26,36,"Noto Serif KR","SemiBold"],["Chapter",36,44,"Pretendard JP","SemiBold"],["Poster",40,46,"Pretendard JP","Bold"],["Ticket",26,34,"Pretendard JP","Bold"],["Focus",36,44,"Pretendard JP","Bold"],["Compact",26,34,"Pretendard JP","SemiBold"],["Body",14,21,"Pretendard JP","Regular"],["Meta",12,18,"Pretendard JP","SemiBold"],["Action",14,20,"Pretendard JP","SemiBold"],["DocTitle",24,32,"Pretendard JP","SemiBold"]];
for(const[name,size,line,family,style]of styleSpecs){const s=figma.createTextStyle();s.name="P22/BannerStudy/"+name;s.fontName={family,style};s.fontSize=size;s.lineHeight={unit:"PIXELS",value:line};styles[name]=s.id;}
const page=figma.createPage();page.name=pageName;track(page);
const shared=figma.createSection();page.appendChild(shared);shared.name="90 · 공통 요소 · 클릭 화살표";shared.x=4600;shared.y=100;shared.resizeWithoutConstraints(1800,240);track(shared);
const variants=[];
for(const[tone,key]of [["Ink","ink"],["Gold","gold"],["White","white"]]){
 const c=figma.createComponent();shared.appendChild(c);c.name="Tone="+tone;c.resize(24,24);c.fills=[];
 const v=figma.createVector();c.appendChild(v);v.name="Arrow right";v.vectorPaths=[{windingRule:"NONE",data:"M 4 12 L 20 12 M 14 6 L 20 12 L 14 18"}];v.fills=[];v.strokes=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:1,g:1,b:1}},"color",await figma.variables.getVariableByIdAsync(tokens[key]))];v.strokeWeight=1.5;v.strokeCap="ROUND";v.strokeJoin="ROUND";v.x=4;v.y=6;variants.push(c);track(c);
}
const arrowSet=figma.combineAsVariants(variants,shared);arrowSet.name="P22/EntryArrow";arrowSet.description="혜택 카드 전체 클릭을 나타내는 원본 벡터 화살표. Ink / Gold / White.";arrowSet.x=40;arrowSet.y=64;
for(let i=0;i<arrowSet.children.length;i++){arrowSet.children[i].x=24+i*80;arrowSet.children[i].y=24;}arrowSet.resize(280,72);track(arrowSet);
const guide=figma.createAutoLayout("VERTICAL");page.appendChild(guide);guide.name="00 · 비교 안내 · 기존 화면 보존 / 미채택";guide.x=100;guide.y=100;guide.paddingLeft=48;guide.paddingRight=48;guide.paddingTop=32;guide.paddingBottom=32;guide.itemSpacing=12;guide.fills=[{type:"SOLID",color:{r:.1,g:.11,b:.105}}];guide.resize(4300,200);guide.layoutSizingHorizontal="FIXED";guide.layoutSizingVertical="HUG";track(guide);
for(const[text,key]of [["혜택 배너 · 서로 다른 다섯 가지 디자인 언어","DocTitle"],["15개 개별 카드와 5개 실제 페이지 배치 · 사진 3종 재사용 · 편집 가능한 레이어와 컴포넌트","Body"],["비교 시안 / 아직 미채택. 기존 21번과 원본을 유지하며, 금액·지급 조건은 새로 작성하지 않았습니다.","Body"]]){
 const t=figma.createText();t.textStyleId=styles[key];t.characters=text;t.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:1,g:1,b:1}},"color",await figma.variables.getVariableByIdAsync(tokens.white))];guide.appendChild(t);t.textAutoResize="WIDTH_AND_HEIGHT";track(t);
}
return{pageId:page.id,pageName:page.name,guideId:guide.id,sharedId:shared.id,arrowSetId:arrowSet.id,arrowVariants:arrowSet.children.map(n=>({id:n.id,name:n.name})),collectionId:collection.id,tokens,styles,sourceBaseline,sourceScreenId:"693:3446",sourceMainId:"693:3456",createdNodeIds:[...new Set(created)],mutatedNodeIds:[]};
