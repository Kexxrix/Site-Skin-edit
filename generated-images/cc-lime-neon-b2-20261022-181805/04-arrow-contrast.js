const page=await figma.getNodeByIdAsync("919:7490");await figma.setCurrentPageAsync(page);figma.skipInvisibleInstanceChildren=false;
const top=await figma.getNodeByIdAsync("937:1783"),mutatedNodeIds=[];
for(const v of top.findAll(n=>n.type==="VECTOR"&&n.name==="Arrow right")){
 v.strokes=v.strokes.map(p=>p.type==="SOLID"?{...p,color:{r:7/255,g:17/255,b:11/255},boundVariables:undefined}:p);mutatedNodeIds.push(v.id);
}
return{mutatedNodeIds,arrowCount:mutatedNodeIds.length,shapeUnchanged:true,color:"#07110B"};
