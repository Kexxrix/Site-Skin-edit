figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
const set=await figma.getNodeByIdAsync("487:5107"),collection=await figma.variables.getVariableCollectionByIdAsync("VariableCollectionId:435:14044");
const defs=[
 {layout:"07A BronzeFlat",label:"브론즈 플랫",kind:"SOLID",keys:["bronze-flat"],black:["292720"],white:["E7E2D8"]},
 {layout:"07B BronzeFlow",label:"브론즈 가로 흐름",kind:"GRADIENT_LINEAR",keys:["bronze-flow-start","bronze-flow-end"],black:["2B2823","1C1D1C"],white:["E8E2D8","F4F2EC"]},
 {layout:"07C WarmGraphite",label:"웜 그라파이트 플랫",kind:"SOLID",keys:["warm-graphite"],black:["242526"],white:["E5E6E3"]},
 {layout:"07D StoneFlow",label:"스톤 가로 흐름",kind:"GRADIENT_LINEAR",keys:["stone-flow-start","stone-flow-end"],black:["242727","302D25"],white:["E2E5E2","EEE8DD"]}
];
if(set.children.some(c=>c.name.includes("Layout=07A ")))throw Error("Muted variants already exist");
const fonts={};for(const rootId of ["485:4159","485:4213","486:4945","486:4998"]){const root=await figma.getNodeByIdAsync(rootId);for(const t of root.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts[JSON.stringify(s.fontName)]=s.fontName;}
await Promise.all(Object.values(fonts).map(f=>figma.loadFontAsync(f)));
const createdNodeIds=[],createdVariableIds=[],createdStyleIds=[],mutatedNodeIds=[],headers=[],tokens={};
function rgb(hex){return {r:parseInt(hex.slice(0,2),16)/255,g:parseInt(hex.slice(2,4),16)/255,b:parseInt(hex.slice(4,6),16)/255};}
function alias(v){return {type:"VARIABLE_ALIAS",id:v.id};}
function primitive(name,color){const v=figma.variables.createVariable("header-band/primitive/"+name,collection,"COLOR");v.scopes=[];for(const mode of collection.modes)v.setValueForMode(mode.modeId,rgb(color));v.setVariableCodeSyntax("WEB","var(--p17-header-"+name+")");createdVariableIds.push(v.id);return v;}
for(const d of defs)for(let i=0;i<d.keys.length;i++){
 const key=d.keys[i],black=primitive(key+"-black",d.black[i]),white=primitive(key+"-white",d.white[i]);
 const v=figma.variables.createVariable("header-band/"+key,collection,"COLOR");v.scopes=["FRAME_FILL","SHAPE_FILL"];
 v.setValueForMode("435:1",alias(black));v.setValueForMode("435:0",alias(white));v.setVariableCodeSyntax("WEB","var(--p17-header-"+key+")");
 createdVariableIds.push(v.id);tokens[key]=v;
}
const styles={};
for(const d of defs){
 const style=figma.createPaintStyle();style.name="P17/Header/Band/"+d.layout.slice(4);
 if(d.kind==="SOLID")style.paints=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:rgb(d.black[0])},"color",tokens[d.keys[0]])];
 else style.paints=[{type:"GRADIENT_LINEAR",gradientTransform:[[1,0,0],[0,1,0]],gradientStops:d.keys.map((key,i)=>({position:i,color:{...rgb(d.black[i]),a:1},boundVariables:{color:alias(tokens[key])}}))}];
 createdStyleIds.push(style.id);styles[d.layout]=style;
}
function physical(n){const out=[n.id];if(n.type!=="INSTANCE"&&"children"in n)for(const child of n.children)out.push(...physical(child));return out;}
function find(root,name){const n=root.findOne(n=>n.name===name);if(!n)throw Error("Missing "+name);return n;}
const roleNames=["Logo","Notice · inline","CheckIn","Betting","Telegram","Login","Join","Anonymous"];
let i=0;
for(const d of defs)for(const theme of ["BlackGold","WhiteGold"]){
 const source=await figma.getNodeByIdAsync(theme==="BlackGold"?"485:4159":"485:4213");
 const reference=await figma.getNodeByIdAsync(theme==="BlackGold"?"486:4945":"486:4998");
 const c=source.clone();set.appendChild(c);c.name="Layout="+d.layout+", Theme="+theme;
 c.setExplicitVariableModeForCollection(collection,theme==="BlackGold"?"435:1":"435:0");
 for(const name of roleNames){
  const n=find(c,name),ref=find(reference,name),w=n.width,h=n.height;
  n.swapComponent(await ref.getMainComponentAsync());n.removeOverrides();n.name=name;n.resize(w,h);
  if(name==="Notice · inline")n.layoutSizingHorizontal="FILL";
  if(["Login","Join","Anonymous"].includes(name)){n.resize(w,44);n.primaryAxisSizingMode="AUTO";n.cornerRadius=22;}
 }
 const quick=find(c,"Quick links");quick.resize(374,44);quick.paddingLeft=20;quick.paddingRight=20;quick.paddingTop=0;quick.paddingBottom=0;quick.primaryAxisSizingMode="AUTO";quick.counterAxisSizingMode="FIXED";quick.cornerRadius=22;
 const page=await figma.variables.getVariableByIdAsync("VariableID:435:14050"),line=await figma.variables.getVariableByIdAsync("VariableID:435:14058");
 quick.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:rgb(theme==="BlackGold"?"141515":"FFFFFF")},"color",page)];
 quick.strokes=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:rgb(theme==="BlackGold"?"383838":"DEDED7")},"color",line)];quick.strokeWeight=1;quick.strokeAlign="INSIDE";quick.effects=[];
 const auth=find(c,"Member access");auth.resize(auth.width,44);auth.counterAxisSizingMode="FIXED";
 const divider=find(c,"Functional divider");divider.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:rgb("383838")},"color",line)];
 await c.setFillStyleIdAsync(styles[d.layout].id);c.effects=[];
 c.description=d.label+" · 과장된 세로 광택 없이 낮은 채도의 전체 컬러 헤더. "+(d.kind==="SOLID"?"단색 면.":"좌→우 가로 그라데이션.")+" 로고 → 공지 → 출석체크·베팅내역·고객지원 → 계정. 메뉴 캡슐과 계정 버튼 44px. 기존 개별 컴포넌트 인스턴스 재사용.";
 c.x=24+(i%4)*2000;c.y=24+(5+Math.floor(i/4))*280;i++;
 createdNodeIds.push(...physical(c));headers.push({id:c.id,layout:d.layout,label:d.label,theme,w:c.width,h:c.height,paintStyleId:c.fillStyleId,fillType:c.fills[0].type,capsule:quick.height,authHeights:auth.children.filter(n=>n.type==="INSTANCE").map(n=>n.height)});
}
set.resizeWithoutConstraints(7968,1970);set.description="선정 10종 + 07번 저채도 컬러 추가 4종. 14개 구조 × BlackGold/WhiteGold. 전체 순서 통일, 단일 가로 공지.";
set.parent.name="13 · 헤더 14종 · 두 가지 스킨";set.parent.resizeWithoutConstraints(8200,2320);
mutatedNodeIds.push(set.id,set.parent.id);
return {createdNodeIds,createdVariableIds,createdStyleIds,mutatedNodeIds,headers,summary:{addedDirections:4,addedVariants:8,totalVariants:set.children.length,styles:createdStyleIds.length,variables:createdVariableIds.length}};

