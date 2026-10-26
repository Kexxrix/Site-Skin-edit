
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
const section=await figma.getNodeByIdAsync('573:4952'),specs=[{id:'435:52814',theme:'BlackGold',counts:[8,7,8],x:40},{id:'435:52884',theme:'WhiteGold',counts:[9,8,7],x:1720}];
if(section.children.some(n=>n.name.startsWith('P17/07BRoomy/Partners/')))throw new Error('Scoped partner grid exists; inspect before retry');
function nodes(n){return 'children'in n?[n,...n.findAll(()=>true)]:[n];}
function digest(n){return JSON.stringify(nodes(n).map(c=>[c.id,c.name,c.x,c.y,c.width,c.height,'fills'in c?c.fills:null]));}
const vars=await figma.variables.getLocalVariablesAsync('FLOAT');
function gapToken(value){return vars.find(v=>v.variableCollectionId==='VariableCollectionId:435:14044'&&/space|gap/i.test(v.name)&&Object.values(v.valuesByMode).every(x=>x===value))||vars.find(v=>/spacing|space|gap/i.test(v.name)&&v.scopes.includes('GAP')&&Object.values(v.valuesByMode).every(x=>x===value));}
const gap8=gapToken(8),gap16=gapToken(16);
const created=[],deleted=[],out=[];
for(const s of specs){
 const source=await figma.getNodeByIdAsync(s.id),before=digest(source),c=source.clone();section.appendChild(c);c.name='P17/07BRoomy/Partners/'+s.theme;c.x=s.x;c.y=3300;
 c.resize(1592,192);c.layoutMode='VERTICAL';c.layoutSizingHorizontal='FIXED';c.layoutSizingVertical='HUG';c.primaryAxisSizingMode='AUTO';c.counterAxisSizingMode='FIXED';c.counterAxisAlignItems='CENTER';c.paddingLeft=0;c.paddingRight=0;c.paddingTop=16;c.paddingBottom=16;
 if(gap16){c.setBoundVariable('paddingTop',gap16);c.setBoundVariable('paddingBottom',gap16);}
 const grid=c.children[0];grid.layoutSizingHorizontal='FILL';grid.layoutSizingVertical='HUG';grid.itemSpacing=8;grid.counterAxisAlignItems='CENTER';if(gap8)grid.setBoundVariable('itemSpacing',gap8);
 const rows=grid.children,logos=rows.flatMap(r=>[...r.children]).filter(l=>l.visible),hashesBefore=logos.flatMap(l=>nodes(l).flatMap(n=>'fills'in n&&Array.isArray(n.fills)?n.fills.filter(f=>f.type==='IMAGE').map(f=>f.imageHash):[])).sort();
 if(logos.length!==s.counts.reduce((a,b)=>a+b,0))throw new Error('Unexpected logo inventory');
 let cursor=0;
 for(let i=0;i<rows.length;i++){
  const row=rows[i];row.layoutMode='HORIZONTAL';row.layoutWrap='WRAP';row.itemSpacing=16;row.counterAxisSpacing=8;row.primaryAxisAlignItems='CENTER';row.counterAxisAlignItems='CENTER';row.layoutSizingHorizontal='FILL';row.layoutSizingVertical='HUG';row.primaryAxisSizingMode='FIXED';row.counterAxisSizingMode='AUTO';row.paddingLeft=0;row.paddingRight=0;row.paddingTop=0;row.paddingBottom=0;row.clipsContent=false;
  if(gap16)row.setBoundVariable('itemSpacing',gap16);if(gap8)row.setBoundVariable('counterAxisSpacing',gap8);
  const group=logos.slice(cursor,cursor+s.counts[i]);cursor+=s.counts[i];
  for(const logo of group){
   row.appendChild(logo);logo.resize(128,48);logo.layoutSizingHorizontal='FIXED';logo.layoutSizingVertical='FIXED';
   if('children'in logo)for(const child of logo.children){child.resize(128,48);child.x=0;child.y=0;if('constraints'in child)child.constraints={horizontal:'STRETCH',vertical:'STRETCH'};}
   for(const im of nodes(logo))if('fills'in im&&Array.isArray(im.fills)&&im.fills.some(f=>f.type==='IMAGE'))im.fills=im.fills.map(f=>f.type==='IMAGE'?{...f,scaleMode:'FIT'}:f);
  }
 }
 c.description='Flexible full-width partner logo area, auto height. Uniform 128×48 FIT logo slots; 16px horizontal and 8px vertical gaps; centered rows with wrapping. Inventory '+s.counts.join('/')+'.';
 const hashesAfter=logos.flatMap(l=>nodes(l).flatMap(n=>'fills'in n&&Array.isArray(n.fills)?n.fills.filter(f=>f.type==='IMAGE').map(f=>f.imageHash):[])).sort();
 const fixture=figma.createAutoLayout('VERTICAL');section.appendChild(fixture);fixture.name='Temporary flex validation';fixture.x=40;fixture.y=3600;fixture.resize(1592,100);fixture.layoutSizingVertical='HUG';fixture.fills=[];
 const inst=c.createInstance();fixture.appendChild(inst);inst.layoutSizingHorizontal='FILL';inst.layoutSizingVertical='HUG';
 const flex=[];
 for(const width of [1592,1280,1024]){
  fixture.resize(width,fixture.height);fixture.layoutSizingVertical='HUG';
  const g=inst.children[0],rs=g.children;
  flex.push({containerWidth:width,actualWidth:inst.width,h:inst.height,rows:rs.map(r=>({w:r.width,h:r.height,count:r.children.filter(l=>l.visible).length,wrap:r.layoutWrap,withinBounds:r.children.filter(l=>l.visible).every(l=>l.x>=-0.01&&l.x+l.width<=r.width+0.01)})),followsParent:inst.width===width});
 }
 fixture.remove();deleted.push(fixture.id);
 created.push(...nodes(c).filter(n=>!n.id.startsWith('I')).map(n=>n.id));
 out.push({id:c.id,theme:s.theme,w:c.width,h:c.height,count:logos.length,rows:rows.map(r=>({id:r.id,count:r.children.filter(l=>l.visible).length,w:r.width,h:r.height,gap:r.itemSpacing,firstX:r.children.filter(l=>l.visible)[0].x,lastRight:r.width-r.children.filter(l=>l.visible).slice(-1)[0].x-r.children.filter(l=>l.visible).slice(-1)[0].width})),sameSlotSizes:logos.every(l=>l.width===128&&l.height===48),sourcePreserved:digest(source)===before,imagesPreserved:JSON.stringify(hashesBefore)===JSON.stringify(hashesAfter),flex,flexPass:flex.every(f=>f.followsParent&&f.rows.every(r=>r.withinBounds))});
}
section.resizeWithoutConstraints(section.width,3600);
return {createdNodeIds:[...new Set(created)],mutatedNodeIds:[section.id],deletedNodeIds:deleted,components:out,tokens:{gap8:gap8?.id,gap16:gap16?.id},allPassed:out.every(c=>c.sameSlotSizes&&c.sourcePreserved&&c.imagesPreserved&&c.flexPass&&c.rows[0].count-c.rows[1].count===1)};

