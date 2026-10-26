figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
const section=await figma.getNodeByIdAsync("550:4303"),sourceNav=await figma.getNodeByIdAsync("551:4303"),sourceSidebars=await figma.getNodeByIdAsync("551:5042"),example=await figma.getNodeByIdAsync("556:53649");
if(section.children.some(n=>n.name==="P17/Sidebar/LibraryGoldFree22"))throw Error("22px variant already exists");
function sig(root){const a=[];function visit(n){const r=[n.id,n.name,n.type,n.x,n.y,n.width,n.height];if(n.type==="TEXT")r.push(n.characters,n.fontSize,n.fontName);if(n.type==="INSTANCE")r.push(n.mainComponent.id,n.componentProperties);a.push(r);if("children"in n)for(const c of n.children)visit(c);}visit(root);return JSON.stringify(a);}
const beforeNav=sig(sourceNav),beforeSidebar=sig(sourceSidebars),beforeExample=example?sig(example):null;
const fonts={};for(const root of [sourceNav,sourceSidebars])for(const t of root.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts[JSON.stringify(s.fontName)]=s.fontName;await Promise.all(Object.values(fonts).map(f=>figma.loadFontAsync(f)));
const created=[],mutated=[],nav=sourceNav.clone();section.appendChild(nav);nav.name="P17/LibraryGoldFree22/NavigationItem";nav.x=64;nav.y=820;
function physical(n){created.push(n.id);if(n.type!=="INSTANCE"&&"children"in n)for(const c of n.children)physical(c);}
function iconOf(row){return row.children.find(n=>n.type==="INSTANCE"&&Object.values(n.componentPropertyReferences).some(v=>String(v).startsWith("Icon#")));}
for(const c of nav.children){const icon=iconOf(c);if(!icon)throw Error("Missing icon "+c.name);icon.resize(22,22);c.description="LibraryGoldFree22 · PNG 표시 크기 22×22px. 기존 메뉴 높이 36px·13px 텍스트·6px 간격 유지.";}
nav.description="22×22px 단독 골드 PNG 아이콘 추가안. 기존 28px 컴포넌트 보존. 2개 스킨 × 기본/호버/선택 상태.";
physical(nav);const navMap=Object.fromEntries(nav.children.map(c=>[c.name,c])),set=sourceSidebars.clone();section.appendChild(set);set.name="P17/Sidebar/LibraryGoldFree22";set.x=1660;set.y=100;set.description="추가 22px 아이콘 버전. 기존 28px LibraryGoldFree 및 채택안 유지. 메뉴·텍스트·색상·행 높이 동일.";
const sides=[];
for(const c of set.children){
 const theme=c.name.match(/Theme=(\w+)/)[1],rows=c.findAll(n=>n.type==="INSTANCE"&&n.name.startsWith("Menu /"));
 for(const row of rows){const oldProps=Object.fromEntries(Object.entries(row.componentProperties).filter(([,v])=>v.type!=="VARIANT").map(([k,v])=>[k,v.value])),state=row.componentProperties.State.value;
  row.swapComponent(navMap["Theme="+theme+", State="+state]);row.setProperties(oldProps);row.resize(216,36);row.layoutSizingHorizontal="FILL";const icon=iconOf(row);icon.resize(22,22);mutated.push(icon.id);
 }
 c.description="LibraryGoldFree22 · 단독 아이콘 22×22px · 메뉴 36px · 텍스트 13px. 기존 28px 버전과 별도 원본.";
 const checks=rows.map(row=>{const icon=iconOf(row),label=row.children.find(n=>n.type==="TEXT"&&n.name==="Label");return {id:row.id,iconId:icon.id,iconW:icon.width,iconH:icon.height,rowH:row.height,labelFont:label.fontSize,labelX:label.x,centerDifference:Math.abs(icon.y+icon.height/2-label.y-label.height/2)};});
 sides.push({id:c.id,name:c.name,w:c.width,h:c.height,rows:checks});
}
physical(set);section.resizeWithoutConstraints(2320,1500);mutated.push(section.id);
function label(value,x,y){const t=figma.createText();section.appendChild(t);t.fontName={family:"Pretendard JP",style:"Medium"};t.fontSize=16;t.characters=value;t.leadingTrim="NONE";t.fills=[{type:"SOLID",color:{r:.85,g:.8,b:.66}}];t.x=x;t.y=y;created.push(t.id);}
label("추가 · 아이콘 22×22px / 메뉴 36px / 텍스트 13px",64,780);label("LibraryGoldFree22 · 22px 추가안",1660,64);
return {createdNodeIds:created,mutatedNodeIds:mutated,navSetId:nav.id,sidebarSetId:set.id,sidebars:sides,navStates:nav.children.map(c=>({id:c.id,name:c.name,iconW:iconOf(c).width,iconH:iconOf(c).height,rowH:c.height})),
 summary:{sidebarThemes:sides.length,all14Menus:sides.every(s=>s.rows.length===14),all22:sides.every(s=>s.rows.every(r=>r.iconW===22&&r.iconH===22)),allOriginalTypography:sides.every(s=>s.rows.every(r=>r.rowH===36&&r.labelFont===13&&r.centerDifference<.01)),existingNavUnchanged:sig(sourceNav)===beforeNav,existingSidebarUnchanged:sig(sourceSidebars)===beforeSidebar,userExampleUnchanged:example?sig(example)===beforeExample:true}};

