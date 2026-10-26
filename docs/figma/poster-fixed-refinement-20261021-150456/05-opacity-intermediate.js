await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("737:3542"));
const specs=[["749:666",.62,.12],["749:687",.62,.12],["749:708",.62,.12],["749:791",.4,null],["749:813",.4,null],["749:835",.4,null],["749:571",.62,.35],["749:578",.82,.7],["749:587",.7,null]];
const result=[];
for(const[id,fillAlpha,strokeAlpha]of specs){const n=await figma.getNodeByIdAsync(id);n.fills=n.fills.map(p=>({...p,opacity:fillAlpha}));if(strokeAlpha!==null)n.strokes=n.strokes.map(p=>({...p,opacity:strokeAlpha}));result.push({id,name:n.name,fillOpacity:n.fills.map(p=>p.opacity),strokeOpacity:n.strokes.map(p=>p.opacity)});}
return{mutatedNodeIds:specs.map(s=>s[0]),paintCheck:result};
