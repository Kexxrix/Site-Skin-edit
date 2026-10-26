
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
const bg=await figma.getNodeByIdAsync('875:5378'),v=await figma.variables.getVariableByIdAsync('VariableID:875:5255');
const cover=figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
bg.fills=[cover,...bg.fills.filter(p=>p.type==='IMAGE')];
return{createdNodeIds:[],mutatedNodeIds:[bg.id],fills:bg.fills};

