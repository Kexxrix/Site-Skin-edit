if(figma.root.children.some(p=>/^19\s*[·.]/.test(p.name))) throw Error('Page 19 already exists; inspect before retrying');
const sourcePage=figma.root.children.find(p=>p.id==='347:553');
await figma.setCurrentPageAsync(sourcePage);
const originalTopIds=sourcePage.children.map(n=>n.id);
const specs=[
{sourceId:'613:48091',pair:0,column:0},
{sourceId:'613:48766',pair:0,column:1},
{sourceId:'624:45881',pair:1,column:0},
{sourceId:'632:45883',pair:1,column:1}
];
const sources=[];
for(const s of specs){const n=await figma.getNodeByIdAsync(s.sourceId); if(!n||n.type!=='FRAME')throw Error('Source frame missing: '+s.sourceId);sources.push(n);}
const fonts=new Map();
for(const n of sources)for(const t of n.findAllWithCriteria({types:['TEXT']}))
for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);}
function fingerprint(root){
const props=['type','name','width','height','visible','locked','opacity','fills','strokes','effects','strokeWeight','cornerRadius','layoutMode','paddingLeft','paddingRight','paddingTop','paddingBottom','itemSpacing','layoutSizingHorizontal','layoutSizingVertical','clipsContent','explicitVariableModes'];
function one(n,top){const d={};for(const k of props)if(k in n){const v=n[k];if(typeof v!=='symbol')d[k]=v;}if(!top){d.x=n.x;d.y=n.y;}if(n.type==='TEXT'){d.characters=n.characters;d.text=n.getStyledTextSegments(['fontName','fontSize','fills','lineHeight','letterSpacing']);}if('children'in n)d.children=n.children.map(c=>one(c,false));return d;}
return hashString(JSON.stringify(one(root,true)));
}
const before=sources.map(n=>({id:n.id,parentId:n.parent.id,x:n.x,y:n.y,signature:fingerprint(n)}));
const page=figma.createPage();page.name='19 · 07B Gold Flow03 · 최종 화면 모음';page.backgrounds=JSON.parse(JSON.stringify(sourcePage.backgrounds));
const sectionNames=['01 · Gold Flow 03 · 교차 흐름 · 다크 / 화이트','02 · 동영상 + 상단 배너 · 다크 / 화이트'];
const sections=[];
for(let i=0;i<2;i++){
 const section=figma.createSection();page.appendChild(section);section.name=sectionNames[i];
 const old=await figma.getNodeByIdAsync(i===0?'613:45330':'624:45880');
 section.fills=JSON.parse(JSON.stringify(old.fills));
 sections.push(section);
}
const copies=[];
for(let i=0;i<specs.length;i++){
 const spec=specs[i],source=sources[i],copy=source.clone();sections[spec.pair].appendChild(copy);
 copy.x=64+2000*spec.column;copy.y=64;
 copies.push({sourceId:source.id,copyId:copy.id,name:copy.name,width:copy.width,height:copy.height,parentId:copy.parent.id});
}
const heights=[sources[0].height+128,sources[2].height+128];
for(let i=0;i<sections.length;i++){sections[i].resizeWithoutConstraints(4048,heights[i]);sections[i].x=100;sections[i].y=i===0?100:100+heights[0]+160;}
const after=sources.map(n=>({id:n.id,parentId:n.parent.id,x:n.x,y:n.y,signature:fingerprint(n)}));
const sourceUnchanged=JSON.stringify(before)===JSON.stringify(after)&&JSON.stringify(originalTopIds)===JSON.stringify(sourcePage.children.map(n=>n.id));
const createdNodeIds=[page.id,...sections.map(n=>n.id)];
for(const row of copies){const n=await figma.getNodeByIdAsync(row.copyId);createdNodeIds.push(n.id,...n.findAll().filter(c=>!c.id.startsWith('I')).map(c=>c.id));}
return {createdNodeIds:[...new Set(createdNodeIds)],mutatedNodeIds:[],page:{id:page.id,name:page.name},sections:sections.map(n=>({id:n.id,name:n.name,x:n.x,y:n.y,width:n.width,height:n.height,screenCount:n.children.length})),copies,sourceBefore:before,sourceAfter:after,sourceUnchanged,fontsLoaded:[...fonts.values()],physicalCreatedCount:new Set(createdNodeIds).size};
