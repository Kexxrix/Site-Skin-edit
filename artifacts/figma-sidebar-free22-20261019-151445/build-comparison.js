figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("347:553"));
const source=await figma.getNodeByIdAsync("552:35871");if(figma.currentPage.children.some(n=>n.name==="13 · LibraryGoldFree · 28px / 22px 비교"))throw Error("22px comparison already exists");
const fontMap={};for(const t of source.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fontMap[JSON.stringify(s.fontName)]=s.fontName;await Promise.all(Object.values(fontMap).map(f=>figma.loadFontAsync(f)));
function sig(n){return JSON.stringify([n.id,n.x,n.y,n.width,n.height,n.children.map(c=>[c.id,c.x,c.y,c.width,c.height])]);}const before=sig(source),created=[];
const section=figma.createSection();figma.currentPage.appendChild(section);section.name="13 · LibraryGoldFree · 28px / 22px 비교";section.x=100;section.y=Math.max(...figma.currentPage.children.filter(n=>n.id!==section.id&&n.x<4400).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(1268,1380);section.fills=[{type:"SOLID",color:{r:.13,g:.13,b:.13}}];created.push(section.id);
function label(value,y,size){const t=figma.createText();section.appendChild(t);t.fontName={family:"Pretendard JP",style:"Medium"};t.fontSize=size;t.characters=value;t.leadingTrim="NONE";t.fills=[{type:"SOLID",color:{r:.86,g:.82,b:.71}}];t.x=64;t.y=y;created.push(t.id);}
label("LibraryGoldFree · 기존 28px / 추가 22×22px",32,24);label("아이콘 크기만 축소 · 메뉴 36px / 텍스트 13px / 간격·색상 유지",76,16);
const review=source.clone();section.appendChild(review);review.name="사이드바 아이콘 크기 비교 · 28px / 22px";review.x=64;review.y=124;
const choices=[{label:"블랙 골드 · 기존 28px",main:"551:4707",size:28},{label:"블랙 골드 · 추가 22px",main:"558:4858",size:22},{label:"화이트 골드 · 기존 28px",main:"551:4372",size:28},{label:"화이트 골드 · 추가 22px",main:"558:4819",size:22}],results=[];
for(const [i,col]of review.children.entries()){
 const d=choices[i],t=col.children.find(n=>n.type==="TEXT"),sidebar=col.children.find(n=>n.type==="INSTANCE");
 for(const s of t.getStyledTextSegments(["fontName"]))await figma.loadFontAsync(s.fontName);
 col.name=d.label;t.characters=d.label;sidebar.swapComponent(await figma.getNodeByIdAsync(d.main));sidebar.removeOverrides();sidebar.name=d.label;sidebar.resize(232,1120);
 const icons=sidebar.findAll(n=>n.type==="INSTANCE"&&Object.values(n.componentPropertyReferences).some(v=>String(v).startsWith("Icon#")));
 results.push({id:sidebar.id,label:d.label,main:d.main,count:icons.length,expected:d.size,allCorrect:icons.length===14&&icons.every(n=>n.width===d.size&&n.height===d.size)});
}
function physical(n){created.push(n.id);if(n.type!=="INSTANCE"&&"children"in n)for(const c of n.children)physical(c);}physical(review);
return {createdNodeIds:created,mutatedNodeIds:[],sectionId:section.id,reviewFrameId:review.id,instances:results,summary:{allCorrect:results.every(r=>r.allCorrect),originalReviewPreserved:sig(source)===before}};

