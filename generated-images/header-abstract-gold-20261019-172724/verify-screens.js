
const p=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(p);
const screens=[];
for(const id of ['600:43118','600:43762']){
 const n=await figma.getNodeByIdAsync(id),all=n.findAll(()=>true),counts={};for(const c of all)counts[c.type]=(counts[c.type]||0)+1;
 const names=[],map=new Map();const images=all.filter(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>{if(!map.has(c.name)){map.set(c.name,names.length);names.push(c.name);}return [c.id,map.get(c.name),c.type,c.width,c.height];});
 const shell=n.children[1],main=shell.children[1],nativeRoles={header:n.children[0].type,sidebar:shell.children[0].children[0].type,banners:main.children[0].children.map(c=>c.type),gateway:main.children[1].type,sports:main.children[2].type,live:main.children[3].type,slots:main.children[4].type,partners:main.children[5].type};
 const checks={screenFrame:n.type==='FRAME',editableNativeStructure:nativeRoles.header==='INSTANCE'&&nativeRoles.sidebar==='INSTANCE'&&nativeRoles.banners.every(t=>t==='INSTANCE')&&nativeRoles.sports==='FRAME',headerImageBehindUi:n.children[0].children[0].name==='Generated abstract gold / image overlay',noWholeScreenRaster:!n.fills.some(f=>f.type==='IMAGE'),header88:n.children[0].height===88,width1920:n.width===1920};
 screens.push({id,name:n.name,totalDescendants:all.length,nodeCounts:counts,nativeRoles,imageColumns:['id','nameIndex','type','width','height'],imageNames:names,images,checks});
}
return {screens,allPassed:screens.every(s=>Object.values(s.checks).every(Boolean))};

