
const p=await figma.getNodeByIdAsync('347:553');
await figma.setCurrentPageAsync(p);
const sectionName='14 · 07B 브론즈 · 22px 사이드바 · 1920';
if(p.children.some(n=>n.name===sectionName)) throw new Error('Target comparison already exists; read it before retrying');
const specs=[
 {theme:'BlackGold',source:'540:32369',sidebar:'558:4858',caption:'540:33027',x:64},
 {theme:'WhiteGold',source:'540:33101',sidebar:'558:4819',caption:'540:33785',x:2064}
];
function nodes(n){return [n,...n.findAll(()=>true)];}
function snapshot(n){return JSON.stringify(nodes(n).map(c=>({
 id:c.id,name:c.name,type:c.type,x:c.x,y:c.y,w:c.width,h:c.height,
 text:c.type==='TEXT'?c.characters:undefined,
 font:c.type==='TEXT'?c.getStyledTextSegments(['fontName','fontSize']):undefined,
 fills:'fills'in c?c.fills:undefined,strokes:'strokes'in c?c.strokes:undefined,
 effects:'effects'in c?c.effects:undefined,variables:c.boundVariables,modes:c.explicitVariableModes,
 main:c.type==='INSTANCE'?c.mainComponent?.id:undefined,
 children:'children'in c?c.children.map(x=>x.id):undefined
})));
}
function semantic(n){return JSON.stringify(nodes(n).map(c=>({
 name:c.name,type:c.type,x:c.x,y:c.y,w:c.width,h:c.height,
 text:c.type==='TEXT'?c.characters:undefined,
 fills:'fills'in c?c.fills:undefined,strokes:'strokes'in c?c.strokes:undefined,
 effects:'effects'in c?c.effects:undefined,variables:c.boundVariables,modes:c.explicitVariableModes,
 main:c.type==='INSTANCE'?c.mainComponent?.id:undefined
})));
}
const resolved=[];
for(const s of specs){
 const source=await figma.getNodeByIdAsync(s.source), sidebar=await figma.getNodeByIdAsync(s.sidebar),caption=await figma.getNodeByIdAsync(s.caption);
 resolved.push({...s,source,sidebar,caption,before:snapshot(source),sidebarBefore:snapshot(sidebar)});
}
const fonts=new Map();
for(const s of resolved)for(const root of [s.source,s.sidebar,s.caption]){
 const texts=root.type==='TEXT'?[root]:root.findAllWithCriteria({types:['TEXT']});
 for(const t of texts)for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
}
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const leftNodes=p.children.filter(n=>n.x<5000);
const section=figma.createSection();section.name=sectionName;p.appendChild(section);
section.x=100;section.y=Math.max(...leftNodes.map(n=>n.y+n.height))+400;
section.resizeWithoutConstraints(4048,2112);
const created=[section.id],deleted=[],screens=[];
for(const s of resolved){
 const title=s.caption.clone();section.appendChild(title);title.characters='07B · 브론즈 가로 흐름 · '+s.theme+' · 아이콘 22px';title.name=title.characters;title.x=s.x;title.y=80;
 created.push(title.id);
 const screen=s.source.clone();section.appendChild(screen);
 screen.name='07B · 브론즈 가로 흐름 · '+s.theme+' · LibraryGoldFree22 · 1920';screen.x=s.x;screen.y=124;
 const shell=screen.children[1],rail=shell.children[0],old=rail.children[0],main=shell.children[1],header=screen.children[0];
 const oldSize={w:old.width,h:old.height};
 const instance=s.sidebar.createInstance();rail.insertChild(0,instance);
 instance.name='Sidebar · LibraryGoldFree22 · '+s.theme;
 instance.resize(oldSize.w,oldSize.h);instance.layoutSizingHorizontal='FILL';instance.layoutSizingVertical='FIXED';
 deleted.push(old.id);old.remove();
 const rows=instance.findAllWithCriteria({types:['INSTANCE']}).filter(n=>{
  const mc=n.mainComponent;return mc&&mc.parent&&mc.parent.id==='558:4749';
 });
 const icons=rows.map(row=>{
  const icon=row.children.find(c=>c.type==='INSTANCE'&&Object.values(c.componentPropertyReferences).some(v=>String(v).startsWith('Icon#')));
  return {row:row.id,icon:icon?.id,w:icon?.width,h:icon?.height,label:row.findOne(n=>n.type==='TEXT')?.name};
 });
 const sourceHeader=s.source.children[0],sourceMain=s.source.children[1].children[1];
 const all=nodes(screen);created.push(...all.filter(n=>!n.id.startsWith('I')).map(n=>n.id));
 const fontFamilies=[...new Set(screen.findAllWithCriteria({types:['TEXT']}).flatMap(t=>t.getStyledTextSegments(['fontName']).map(seg=>seg.fontName.family)))];
 const counts={};for(const n of all)counts[n.type]=(counts[n.type]||0)+1;
 const checks={
  width1920:screen.width===1920,
  headerUnchanged:semantic(header)===semantic(sourceHeader),
  mainContentUnchanged:semantic(main)===semantic(sourceMain),
  sourceScreenPreserved:snapshot(s.source)===s.before,
  sidebarMasterPreserved:snapshot(s.sidebar)===s.sidebarBefore,
  sidebarLinked:instance.mainComponent?.id===s.sidebar.id,
  all14Icons22:icons.length===14&&icons.every(i=>i.w===22&&i.h===22),
  bannerTopAligned:Math.abs((shell.y+rail.y+instance.y)-(shell.y+main.y+main.children[0].y))<0.01,
  fontPreserved:fontFamilies.length===1&&fontFamilies[0]==='Pretendard JP'
 };
 screens.push({id:screen.id,name:screen.name,theme:s.theme,w:screen.width,h:screen.height,headerId:header.id,sidebarId:instance.id,sidebarMaster:instance.mainComponent.id,sidebarSize:{w:instance.width,h:instance.height},icons,fontFamilies,nodeCounts:counts,totalDescendants:all.length-1,checks});
}
return {createdNodeIds:[...new Set(created)],mutatedNodeIds:[],deletedNodeIds:deleted,section:{id:section.id,name:section.name,x:section.x,y:section.y,w:section.width,h:section.height},screens,allChecksPassed:screens.every(s=>Object.values(s.checks).every(Boolean))};

