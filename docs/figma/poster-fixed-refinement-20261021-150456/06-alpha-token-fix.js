await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("737:3542"));
const collection=await figma.variables.getVariableCollectionByIdAsync("VariableCollectionId:737:3524");
const defs=[["ink62","749:666","fills",.62],["ink40","749:791","fills",.4],["ink82","749:578","fills",.82],["white12","749:666","strokes",.12],["white35","749:571","strokes",.35],["gold70","749:578","strokes",.7]],vars={};
const createdVariables=[],mutated=[];
for(const[key,id,field,a]of defs){const n=await figma.getNodeByIdAsync(id),color=n[field][0].color;
const v=figma.variables.createVariable("poster-fixed/alpha/"+key,collection,"COLOR");v.scopes=field==="strokes"?["STROKE_COLOR"]:["FRAME_FILL","SHAPE_FILL"];for(const m of collection.modes)v.setValueForMode(m.modeId,{...color,a});vars[key]=v;createdVariables.push({id:v.id,name:v.name,alpha:a});}
const specs=[["749:666","ink62","white12"],["749:687","ink62","white12"],["749:708","ink62","white12"],["749:791","ink40",null],["749:813","ink40",null],["749:835","ink40",null],["749:571","ink62","white35"],["749:578","ink82","gold70"],["749:587","gold70",null]];
for(const[id,f,s]of specs){const n=await figma.getNodeByIdAsync(id);n.fills=n.fills.map(p=>figma.variables.setBoundVariableForPaint({...p,opacity:1},"color",vars[f]));if(s)n.strokes=n.strokes.map(p=>figma.variables.setBoundVariableForPaint({...p,opacity:1},"color",vars[s]));mutated.push(id);}
const checks=[];for(const id of ["749:666","I750:2355;749:666","I750:3891;749:791"]){const n=await figma.getNodeByIdAsync(id);checks.push({id,fills:n.fills,strokes:n.strokes});}
return{mutatedNodeIds:mutated,createdVariables,checks};
