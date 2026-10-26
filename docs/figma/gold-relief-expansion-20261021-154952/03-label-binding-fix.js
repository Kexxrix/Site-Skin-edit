await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("737:3542"));
const ids=["759:6682","759:6686","759:6691","759:6695"];const result=[];
for(const id of ids){const n=await figma.getNodeByIdAsync(id);for(const s of n.getStyledTextSegments(["fontName"]))await figma.loadFontAsync(s.fontName);n.componentPropertyReferences={characters:"Label#749:0"};result.push({id,refs:n.componentPropertyReferences});}
const examples=[];for(const id of ["759:6705","759:6748","759:6797","759:6840"]){const n=await figma.getNodeByIdAsync(id);examples.push({id,values:n.componentProperties,rendered:n.findAllWithCriteria({types:["TEXT"]}).map(t=>t.characters)});}
return{mutatedNodeIds:ids,bindings:result,examples};
