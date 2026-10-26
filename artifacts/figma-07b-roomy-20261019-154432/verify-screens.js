
const p=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(p);
const result=[];
for(const id of ['574:41902','574:43010']){
 const n=await figma.getNodeByIdAsync(id),shell=n.children[1],main=shell.children[1],side=shell.children[0].children[0],header=n.children[0],band=header.children[0];
 const all=n.findAll(()=>true),types={},fontSet=new Set();
 for(const c of all)types[c.type]=(types[c.type]||0)+1;
 for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fontSet.add(s.fontName.family);
 const imageNames=[],nameIndex=new Map();
 const images=all.filter(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>{
  if(!nameIndex.has(c.name)){nameIndex.set(c.name,imageNames.length);imageNames.push(c.name);}
  return [c.id,nameIndex.get(c.name),c.type,c.width,c.height];
 });
 const rows=side.findAllWithCriteria({types:['INSTANCE']}).filter(c=>c.mainComponent?.parent?.id==='573:4953'),icons=rows.map(r=>r.children.find(c=>c.type==='INSTANCE'&&Object.values(c.componentPropertyReferences).some(v=>String(v).startsWith('Icon#'))));
 const cards=main.findAllWithCriteria({types:['INSTANCE']}).filter(c=>!c.id.startsWith('I')&&c.mainComponent?.name.startsWith('P17/07BRoomy/')||(!c.id.startsWith('I')&&['573:6046','573:6059'].includes(c.mainComponent?.parent?.id)));
 const banners=main.children[0].children;
 const quick=band.children.find(c=>c.name==='Quick links'),accounts=band.children.find(c=>c.name==='Member access').children;
 const checks={
  full1920:n.width===1920,
  all14Rows44:rows.length===14&&rows.every(c=>c.height===44),
  allIcons22:icons.every(c=>c.width===22&&c.height===22),
  text13:rows.every(c=>c.findOne(x=>x.type==='TEXT').fontSize===13),
  headingRemoved:!side.findOne(c=>c.type==='TEXT'&&(c.characters==='전체 메뉴'||c.characters==='14')),
  allCardsR6:cards.length===30&&cards.every(c=>c.cornerRadius===6),
  headerControlsR6:quick.cornerRadius===6&&accounts.every(c=>c.cornerRadius===6),
  noCapsulesInHeader:accounts.every(c=>c.height===44)&&quick.height===44,
  banners256AndFullImage:banners.length===3&&banners.every(b=>b.height===256&&b.findOne(c=>c.name==='Artwork').fills.find(f=>f.type==='IMAGE').scaleMode==='FIT'),
  fontFamily:[...fontSet].length===1&&fontSet.has('Pretendard JP'),
  noWholeUiRaster:!n.fills.some(f=>f.type==='IMAGE')&&images.every(i=>i[3]<1920&&i[4]<n.height/2),
  sidebarBannerAligned:Math.abs(side.absoluteTransform[1][2]-main.children[0].absoluteTransform[1][2])<0.01
 };
 result.push({id,name:n.name,w:n.width,h:n.height,descendants:all.length,nodeCounts:types,fonts:[...fontSet],cardCount:cards.length,checks,accountText:accounts.map(c=>c.findOne(t=>t.type==='TEXT').characters),imageColumns:['id','nameIndex','type','width','height'],imageNames,images});
}
return {screens:result,allPassed:result.every(s=>Object.values(s.checks).every(Boolean))};

