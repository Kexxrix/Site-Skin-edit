await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("693:3254"));

function normalize(v){if(typeof v==='number')return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(normalize);if(v&&typeof v==='object'){const o={};for(const k of Object.keys(v).sort())o[k]=normalize(v[k]);return o;}return v;}
function renderSnapshot(n,ignoreRootXY=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:n.opacity};if(!ignoreRootXY){r.x=n.x;r.y=n.y;}for(const k of ['fills','strokes','effects','cornerRadius','layoutMode','layoutSizingHorizontal','layoutSizingVertical','paddingLeft','paddingRight','paddingTop','paddingBottom','itemSpacing','clipsContent','overflowDirection'])if(k in n&&typeof n[k]!=='symbol')r[k]=n[k];if(n.type==='TEXT'){r.characters=n.characters;r.fonts=n.getStyledTextSegments(['fontName','fontSize','lineHeight','letterSpacing']);r.leadingTrim=n.leadingTrim;}if('children'in n)r.children=n.children.map(c=>renderSnapshot(c));return normalize(r);}
function digest(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}

const ids=["693:3446","693:3503","693:4772","693:4826"],mutated=[],before=[],checks=[];
const roots=await Promise.all(ids.map(id=>figma.getNodeByIdAsync(id)));
const fonts=new Map();for(const root of roots)for(const t of root.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
for(const root of roots){
 const main=root.findOne(n=>n.type==="FRAME"&&n.name.startsWith("Main content"));
 const instances=root.findAllWithCriteria({types:["INSTANCE"]}).filter(n=>!n.id.startsWith("I"));
 const beforeInstanceState=instances.map(n=>({id:n.id,main:n.mainComponent?.id,hash:digest(renderSnapshot(n,true))}));
 const nativeLeaves=main.findAll(n=>n.type==="TEXT"||n.type==="RECTANGLE").filter(n=>!n.id.startsWith("I"));
 const leafBefore=nativeLeaves.map(n=>({id:n.id,hash:digest(renderSnapshot(n,true))}));
 const headerHash=digest(renderSnapshot(root.children[0],true));
 const sidebar=root.findAll(n=>n.type==="INSTANCE"&&["652:6043","652:6078"].includes(n.mainComponent?.id))[0];
 const sidebarHash=digest(renderSnapshot(sidebar,true));
 before.push({id:root.id,mainId:main.id,pageH:root.height,mainH:main.height,gap:main.itemSpacing,sections:main.children.filter(n=>n.type==="FRAME"&&n.layoutMode==="VERTICAL").map(n=>({id:n.id,name:n.name,gap:n.itemSpacing}))});
 if(main.itemSpacing!==16){main.itemSpacing=16;mutated.push(main.id);}
 const gateway=main.children.find(n=>n.type==="FRAME"&&n.name==="콘텐츠 바로가기 / Section");
 const hero=gateway?.children.find(n=>n.type==="FRAME"&&n.name==="Video hero · Benefits + film");
 if(hero){const width=hero.width,h=hero.height;main.insertChild(0,hero);hero.resize(width,h);hero.layoutSizingHorizontal="FILL";hero.layoutSizingVertical="FIXED";mutated.push(main.id,gateway.id,hero.id);}
 const sections=main.children.filter(n=>n.type==="FRAME"&&n.layoutMode==="VERTICAL"&&n.children.some(c=>c.type==="TEXT"&&c.name.endsWith("/ Heading")||c.type==="INSTANCE"&&c.mainComponent?.id==="660:6333"));
 for(const s of sections){if(s.itemSpacing!==8){s.itemSpacing=8;mutated.push(s.id);}}
 const afterInstanceState=instances.map(n=>({id:n.id,main:n.mainComponent?.id,hash:digest(renderSnapshot(n,true))}));
 const leafAfter=nativeLeaves.map(n=>({id:n.id,hash:digest(renderSnapshot(n,true))}));
 const sectionChecks=sections.map(s=>{const heading=s.children[0],content=s.children[1];return{id:s.id,name:s.name,gap:s.itemSpacing,measuredGap:content.y-heading.y-heading.height};});
 const mainGaps=main.children.slice(1).map((n,i)=>({before:main.children[i].name,after:n.name,gap:n.y-main.children[i].y-main.children[i].height}));
 checks.push({id:root.id,mainId:main.id,mainGap:main.itemSpacing,mainGaps,sectionChecks,mainW:main.width,mainH:main.height,pageH:root.height,padding:[main.paddingTop,main.paddingRight,main.paddingBottom,main.paddingLeft],fullPageVisible:!root.clipsContent&&root.overflowDirection==="NONE",instancesPreserved:JSON.stringify(beforeInstanceState)===JSON.stringify(afterInstanceState),leafContentPreserved:JSON.stringify(leafBefore)===JSON.stringify(leafAfter),headerPreserved:headerHash===digest(renderSnapshot(root.children[0],true)),sidebarPreserved:sidebarHash===digest(renderSnapshot(sidebar,true)),heroParent:hero?.parent.id});
}
return{createdNodeIds:[],mutatedNodeIds:[...new Set(mutated)],before,checks,allPassed:checks.every(c=>c.mainGap===16&&c.mainGaps.every(g=>Math.abs(g.gap-16)<.001)&&c.sectionChecks.length===4&&c.sectionChecks.every(s=>s.gap===8&&Math.abs(s.measuredGap-8)<.001)&&c.instancesPreserved&&c.leafContentPreserved&&c.headerPreserved&&c.sidebarPreserved&&c.fullPageVisible)};
