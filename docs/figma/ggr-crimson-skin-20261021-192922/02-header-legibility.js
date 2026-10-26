await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
figma.skipInvisibleInstanceChildren=true;
const theme=await figma.getNodeByIdAsync('840:3015'),header=await figma.getNodeByIdAsync('840:3016');
const text=await figma.variables.getVariableByIdAsync('VariableID:840:3645'),light=await figma.variables.getVariableByIdAsync('VariableID:840:3651');
const make=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',v),changed=[];
for(const inst of header.findAll(n=>n.type==='INSTANCE'&&['Login','Anonymous'].includes(n.name))){for(const t of inst.findAllWithCriteria({types:['TEXT']})){for(const seg of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(seg.fontName);t.fills=[make(text)];changed.push(t.id);}}
for(const n of header.findAll(n=>n.type==='VECTOR'||n.type==='TEXT'&&n.name==='Notice label')){
 if(n.type==='TEXT')for(const seg of n.getStyledTextSegments(['fontName']))await figma.loadFontAsync(seg.fontName);
 for(const key of ['fills','strokes'])if(key in n&&Array.isArray(n[key]))n[key]=n[key].map(p=>p.type==='SOLID'&&p.boundVariables?.color?.id==='VariableID:840:3644'?make(light):p);
 changed.push(n.id);
}
figma.currentPage.selection=[theme];figma.viewport.scrollAndZoomIntoView([theme]);
return{mutatedNodeIds:changed,createdNodeIds:[],reason:'Increase black-header auxiliary label and red icon legibility'};
