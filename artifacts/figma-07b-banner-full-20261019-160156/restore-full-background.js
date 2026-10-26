
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
const ids=['573:5820','573:5832','573:5844','573:5856','573:5868','573:5880'];
const shadeSource=(await figma.getNodeByIdAsync('449:4147')).children[0].children.find(n=>n.name==='Shade');
const fonts=new Map(),masters=[];
for(const id of ids){const c=await figma.getNodeByIdAsync(id);masters.push(c);for(const t of c.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);}
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const mutated=[],created=[],banners=[];
for(const c of masters){
 const content=c.children[0],art=content.children.find(n=>n.name==='Artwork'),copy=content.children.find(n=>n.name==='Benefit details'||n.name==='Copy');
 const tag=art.children.find(n=>n.name==='Tag')||copy.children.find(n=>n.name==='Tag');
 const beforeImages=art.fills.filter(f=>f.type==='IMAGE').map(f=>f.imageHash),beforeText=c.findAllWithCriteria({types:['TEXT']}).map(t=>t.characters).sort();
 art.layoutPositioning='ABSOLUTE';art.resize(content.width,content.height);art.x=0;art.y=0;art.constraints={horizontal:'STRETCH',vertical:'STRETCH'};
 art.fills=art.fills.map(f=>f.type==='IMAGE'?{...f,scaleMode:'FILL',imageTransform:[[1,0,0],[0,1,0]]}:f);
 let shade=content.children.find(n=>n.name==='Shade');
 if(!shade){shade=shadeSource.clone();content.insertChild(1,shade);created.push(shade.id);}
 shade.layoutPositioning='ABSOLUTE';shade.resize(content.width,content.height);shade.x=0;shade.y=0;shade.constraints={horizontal:'STRETCH',vertical:'STRETCH'};
 copy.name='Copy';copy.layoutPositioning='ABSOLUTE';copy.layoutMode='VERTICAL';copy.resize(300,content.height);copy.x=0;copy.y=0;copy.constraints={horizontal:'MIN',vertical:'STRETCH'};copy.primaryAxisSizingMode='FIXED';copy.counterAxisSizingMode='FIXED';copy.primaryAxisAlignItems='SPACE_BETWEEN';copy.counterAxisAlignItems='MIN';copy.paddingLeft=14;copy.paddingRight=14;copy.paddingTop=14;copy.paddingBottom=14;copy.itemSpacing=8;copy.fills=[];
 copy.insertChild(0,tag);tag.layoutPositioning='AUTO';tag.layoutSizingHorizontal='HUG';tag.layoutSizingVertical='HUG';
 c.description='256px full-image benefit banner with overlaid tag, editable title, description and action; 6px radius. Background FILL preserves aspect ratio and crops to the card.';
 mutated.push(c.id,content.id,art.id,copy.id,tag.id,shade.id);
 const afterText=c.findAllWithCriteria({types:['TEXT']}).map(t=>t.characters).sort();
 banners.push({id:c.id,w:c.width,h:c.height,r:c.cornerRadius,image:{w:art.width,h:art.height,mode:art.fills.find(f=>f.type==='IMAGE').scaleMode},copy:{x:copy.x,y:copy.y,w:copy.width,h:copy.height},preservedImages:JSON.stringify(beforeImages)===JSON.stringify(art.fills.filter(f=>f.type==='IMAGE').map(f=>f.imageHash)),preservedText:JSON.stringify(beforeText)===JSON.stringify(afterText),noDetailsStrip:!content.children.some(n=>n.name==='Benefit details'),fillsWholeCard:art.width===content.width&&art.height===content.height});
}
return {createdNodeIds:created,mutatedNodeIds:[...new Set(mutated)],banners,allPassed:banners.every(b=>b.fillsWholeCard&&b.preservedImages&&b.preservedText&&b.noDetailsStrip&&b.h===256&&b.r===6)};

