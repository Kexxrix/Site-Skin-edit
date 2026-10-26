await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
const bg=await figma.getNodeByIdAsync('829:3120'),pic=bg.fills.find(p=>p.type==='IMAGE');if(!pic||pic.imageHash!=='a427112015bdc2469c3f625220f5cc14f90ae26d')throw Error('Background upload mismatch');
const collection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:829:2450'),modeId='829:0',all=await Promise.all(collection.variableIds.map(id=>figma.variables.getVariableByIdAsync(id))),created=[];
function rgba(hex,a){return{r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255,a};}
function color(name,hex,a){const full='color/'+name+'/a'+Math.round(a*1000);let v=all.find(q=>q.name===full);if(!v){v=figma.variables.createVariable(full,collection,'COLOR');v.scopes=['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'];v.setValueForMode(modeId,rgba(hex,a));v.setVariableCodeSyntax('WEB','var(--zxc-'+name.replace(/[A-Z]/g,x=>'-'+x.toLowerCase())+'-a'+Math.round(a*1000)+')');created.push(v.id);}return v;}
const stops=[[0,'overlayTop','#0c161e',.34],[.48,'overlayMid','#0e1a24',.24],[.84,'overlayBottom','#0a121a',.44],[1,'page','#101820',1]].map(([position,name,hex,a])=>({position,color:rgba(hex,a),boundVariables:{color:{type:'VARIABLE_ALIAS',id:color(name,hex,a).id}}}));
const pageVar=await figma.variables.getVariableByIdAsync('VariableID:829:3099');
const base=figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:16/255,g:24/255,b:32/255}},'color',pageVar);
bg.name='ZXC · Milky Way background';bg.fills=[base,{...pic,blendMode:'LUMINOSITY',opacity:1},{type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:stops}];
return{mutatedNodeIds:[bg.id],createdVariableIds:created,imageHash:pic.imageHash,blendMode:'LUMINOSITY',size:[bg.width,bg.height]};
