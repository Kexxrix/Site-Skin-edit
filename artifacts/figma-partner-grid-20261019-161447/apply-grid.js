
const p=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(p);
const specs=[{screen:'574:41902',old:'574:41953',master:'587:5377',theme:'BlackGold'},{screen:'574:43010',old:'574:43061',master:'587:5436',theme:'WhiteGold'}],created=[],deleted=[],out=[];
function images(n){return n.findAll(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>c.fills.find(f=>f.type==='IMAGE').imageHash).sort();}
for(const s of specs){
 const root=await figma.getNodeByIdAsync(s.screen),old=await figma.getNodeByIdAsync(s.old),parent=old.parent,master=await figma.getNodeByIdAsync(s.master),before=images(old);
 const fonts=new Map();for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 const n=master.createInstance();parent.insertChild(parent.children.findIndex(c=>c.id===old.id),n);n.name='Partners · Flexible centered grid · '+s.theme;n.resize(old.width,master.height);n.layoutSizingHorizontal='FILL';n.layoutSizingVertical='HUG';
 deleted.push(old.id);old.remove();created.push(n.id);
 const grid=n.children[0],rows=grid.children,logos=rows.flatMap(r=>[...r.children]).filter(l=>l.visible),after=images(n);
 const checks={linked:n.mainComponent?.id===master.id,outerFill:n.layoutSizingHorizontal==='FILL',autoHeight:n.layoutSizingVertical==='HUG',gridFill:grid.layoutSizingHorizontal==='FILL',rowFill:rows.every(r=>r.layoutSizingHorizontal==='FILL'),rowAutoHeight:rows.every(r=>r.layoutSizingVertical==='HUG'),allSlots128x48:logos.every(l=>l.width===128&&l.height===48),centered:rows.every(r=>{const v=r.children.filter(l=>l.visible);return Math.abs(v[0].x-(r.width-v.slice(-1)[0].x-v.slice(-1)[0].width))<0.01;}),secondRowOneLess:rows[0].children.filter(l=>l.visible).length-rows[1].children.filter(l=>l.visible).length===1,imagesPreserved:JSON.stringify(before)===JSON.stringify(after),insidePage:Math.abs(root.height-(root.children[0].height+parent.parent.height))<0.01};
 out.push({screen:root.id,theme:s.theme,instance:n.id,master:master.id,w:n.width,h:n.height,visibleLogoCount:logos.length,rowCounts:rows.map(r=>r.children.filter(l=>l.visible).length),imageNodes:n.findAll(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>({id:c.id,name:c.name,w:c.width,h:c.height})),screenHeight:root.height,checks});
}
return {createdNodeIds:created,mutatedNodeIds:[],deletedNodeIds:deleted,screens:out,allPassed:out.every(s=>Object.values(s.checks).every(Boolean))};

