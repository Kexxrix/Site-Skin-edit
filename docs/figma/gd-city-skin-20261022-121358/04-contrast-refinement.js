
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
const bg=await figma.getNodeByIdAsync('875:5378'),partners=await figma.getNodeByIdAsync('875:5377');
const shade=await figma.variables.getVariableByIdAsync('VariableID:875:5258'),p=figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',shade);
bg.fills=[p,...bg.fills.filter(p=>p.type==='IMAGE')];
const stops=[];for(const [position,id]of [[0,'VariableID:875:5279'],[.5,'VariableID:875:5256'],[1,'VariableID:875:5279']]){const v=await figma.variables.getVariableByIdAsync(id);stops.push({position,color:v.valuesByMode['875:0'],boundVariables:{color:{type:'VARIABLE_ALIAS',id}}});}
partners.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:stops}];
return{createdNodeIds:[],mutatedNodeIds:[bg.id,partners.id],backgroundOpacity:bg.fills[0].opacity,partnerBounds:{w:partners.width,h:partners.height}};

