
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
const out=[],mutated=[];
for(const id of ["573:5820","573:5832","573:5844","573:5856","573:5868","573:5880"]){
 const c=await figma.getNodeByIdAsync(id);
 const fonts=new Map();for(const t of c.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
 await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 c.resize(c.width,256);c.layoutSizingVertical='FIXED';
 const content=c.children[0],art=content.children.find(n=>n.name==='Artwork'),details=content.children.find(n=>n.name==='Benefit details');
 art.resize(art.width,174);art.layoutSizingHorizontal='FILL';art.layoutSizingVertical='FIXED';
 mutated.push(c.id,art.id);
 out.push({id,h:c.height,innerHeight:content.height,artH:art.height,detailsH:details.height,childrenFit:art.height+details.height<=content.height+0.01});
}
return {createdNodeIds:[],mutatedNodeIds:mutated,banners:out,allFit:out.every(b=>b.childrenFit)};

