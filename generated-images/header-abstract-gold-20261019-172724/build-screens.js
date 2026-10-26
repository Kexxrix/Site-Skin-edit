
const p=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(p);
const NAME='16 · 07B AbstractGold · 헤더 이미지 오버레이 · 1920';
if(p.children.some(n=>n.name===NAME))throw Error('Abstract comparison already exists');
const sources=[];for(const id of ['574:41902','574:43010'])sources.push(await figma.getNodeByIdAsync(id));
function all(n){return [n,...n.findAll(()=>true)];}
function semantic(n){return JSON.stringify(all(n).map(c=>[c.name,c.type,c.width,c.height,c.x,c.y,'fills'in c?c.fills:null,c.type==='TEXT'?c.characters:null,c.type==='INSTANCE'?c.mainComponent?.id:null,c.explicitVariableModes]));}
function original(n){return JSON.stringify(all(n).map(c=>[c.id,c.name,c.width,c.height,c.x,c.y,'fills'in c?c.fills:null,c.type==='TEXT'?c.characters:null]));}
const originals=sources.map(original),fonts=new Map();for(const n of sources)for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const section=figma.createSection();p.appendChild(section);section.name=NAME;section.x=100;section.y=Math.max(...p.children.filter(n=>n.id!==section.id&&n.x<5000).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(4048,2144);
const caption=await figma.getNodeByIdAsync('574:41954'),created=[section.id],deleted=[],screens=[];
for(let i=0;i<2;i++){
 const theme=i?'WhiteGold':'BlackGold',source=sources[i],n=source.clone();section.appendChild(n);n.name='07B AbstractGold · '+theme+' · 이미지 오버레이 · 1920';n.x=64+i*2000;n.y=124;
 const label=caption.clone();section.appendChild(label);label.characters='07B AbstractGold · '+theme+' · 헤더 이미지 오버레이';label.name=label.characters;label.x=n.x;label.y=80;created.push(label.id);
 const old=n.children[0],master=await figma.getNodeByIdAsync(i?'599:5389':'599:5379'),header=master.createInstance();n.insertChild(0,header);header.name='Header · 07B AbstractGold · R6';header.resize(1920,88);header.layoutSizingHorizontal='FILL';header.layoutSizingVertical='HUG';deleted.push(old.id);old.remove();
 const allNodes=all(n),types={};for(const c of allNodes)types[c.type]=(types[c.type]||0)+1;
 const imageNames=[],index=new Map(),images=allNodes.filter(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>{if(!index.has(c.name)){index.set(c.name,imageNames.length);imageNames.push(c.name);}return [c.id,index.get(c.name),c.type,c.width,c.height];});
 const texture=header.findOne(c=>c.name==='Generated abstract gold / image overlay'),families=[...new Set(n.findAllWithCriteria({types:['TEXT']}).flatMap(t=>t.getStyledTextSegments(['fontName']).map(s=>s.fontName.family)))];
 const checks={width1920:n.width===1920,header88:header.height===88,linked:header.mainComponent.id===master.id,texturePresent:texture.fills.some(f=>f.type==='IMAGE'&&f.imageHash==='84fba3bfba547bf147f18bdf8a48a1c2be4bb749'),bodyUnchanged:semantic(n.children[1])===semantic(source.children[1]),source15Preserved:original(source)===originals[i],editableLayout:n.type==='FRAME'&&types.TEXT>100&&types.INSTANCE>80,fontPreserved:families.length===1&&families[0]==='Pretendard JP'};
 created.push(...allNodes.filter(c=>!c.id.startsWith('I')).map(c=>c.id));
 screens.push({id:n.id,name:n.name,w:n.width,h:n.height,header:header.id,nodeCounts:types,totalDescendants:allNodes.length-1,fonts:families,imageColumns:['id','nameIndex','type','width','height'],imageNames,images,checks});
}
return {createdNodeIds:[...new Set(created)],deletedNodeIds:deleted,mutatedNodeIds:[],section:{id:section.id,x:section.x,y:section.y,w:section.width,h:section.height},screens,allPassed:screens.every(s=>Object.values(s.checks).every(Boolean))};

