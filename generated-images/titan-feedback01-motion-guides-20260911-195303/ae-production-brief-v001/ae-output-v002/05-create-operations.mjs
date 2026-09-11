import {run,pathRoot} from './ae-client.mjs';
const C='SCENE07_OPERATIONS',M='TITAN_MASTER_20S';
const create=await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'comp.create',args:{name:C,width:2400,height:1024,fps:30,duration:20}}}]});
const id=create[0].response.result.id;
const ops=[],op=(operation,args)=>ops.push({operation,args});
const prop=(layer,key,value)=>op('property.set',{comp:C,layer,property:['ADBE Transform Group',key],value});
const expr=(layer,key,expression)=>op('expression.set',{comp:C,layer,property:['ADBE Transform Group',key],expression});
const q=(a,b)=>`var u=clamp((time*30-${a})/${b-a},0,1);var q=u*u*u*(10+u*(-15+6*u));`;
const charcoal=[0.137,0.153,0.173],ivory=[0.965,0.957,0.937],orange=[1,0.47,0.04];
function polygon(name,verts,color){op('layer.create_shape',{comp:C,name});prop(name,'ADBE Position',[0,0,0]);op('shape.add_group',{comp:C,layer:name,name:'Native_Plane'});op('shape.add_path',{comp:C,layer:name,groupIndex:1,vertices:verts,closed:true});op('shape.add_fill',{comp:C,layer:name,groupIndex:1,color:[...color,1]});op('layer.set_props',{comp:C,layer:name,props:{motionBlur:true}});}
op('comp.set_props',{comp:C,props:{motionBlur:true,shutterAngle:180,shutterPhase:-90}});
polygon('S07_Charcoal_Cover_Connected',[[0,0],[2400,0],[2400,1024],[0,1024]],charcoal);
expr('S07_Charcoal_Cover_Connected','ADBE Position',q(222,228)+'[2400*(1-q),0,0];');
for(const row of ['Upper','Lower'])for(const index of [-1,0,1]){
 const name=`S07_OPERATIONS_${row}_${index+1}`;
 op('layer.create_text',{comp:C,name,text:'OPERATIONS'});
 op('text.set_style',{comp:C,layer:name,font:'Pretendard-Black',fontSize:440,applyFill:false,applyStroke:true,strokeColor:[0.67,0.69,0.69],strokeWidth:1.45,tracking:-35});
 op('layer.set_props',{comp:C,layer:name,props:{inPoint:228/30,motionBlur:true}});
 const speed=row==='Upper'?-24:18,baseline=row==='Upper'?258:1055;
 expr(name,'ADBE Position',`var f=clamp(time*30,228,252);var period=sourceRectAtTime(time,false).width+80;[80+${index}*period+${speed}*(f-228),${baseline},0];`);
}
polygon('S07_Central_Charcoal_Plane',[[548,217],[1342,220],[1332,255],[2400,258],[2400,480],[2176,480],[2089,638],[1901,638],[1849,735],[0,735],[0,400],[449,400]],charcoal);
expr('S07_Central_Charcoal_Plane','ADBE Position',q(222,234)+'[1600*(1-q),0,0];');
polygon('S07_Ivory_Upper_Plane',[[0,123],[854,126],[806,217],[547,217],[449,400],[0,400]],ivory);
expr('S07_Ivory_Upper_Plane','ADBE Position',q(224,234)+'[-900*(1-q),-110*(1-q),0];');
polygon('S07_Ivory_Right_Continuation',[[2176,480],[2400,480],[2400,667],[1888,667],[1901,638],[2089,638]],ivory);
expr('S07_Ivory_Right_Continuation','ADBE Position',q(224,234)+'[600*(1-q),-110*(1-q),0];');
polygon('S07_Orange_Ribbon_Lower',[[1888,667],[2400,667],[2400,852],[1518,848],[1580,735],[1849,735]],orange);
expr('S07_Orange_Ribbon_Lower','ADBE Position',q(222,234)+'[650*(1-q),121*(1-q),0];');
polygon('S07_Orange_Ribbon_Thin_Continuation',[[0,734],[1580,734],[1580,738],[0,738]],orange);
expr('S07_Orange_Ribbon_Thin_Continuation','ADBE Position',q(222,234)+'[2400*(1-q),118*(1-q),0];');
for(const [name,text,font,size,pos,color,italic,start] of [
 ['S07_Operations','Operations,','Pretendard-ExtraBold',210,[660,429,0],ivory,false,228],
 ['S07_refined','refined','Pretendard-Black',332,[650,687,0],orange,true,230]
]){
 op('layer.create_text',{comp:C,name,text});
 op('text.set_style',{comp:C,layer:name,font,fontSize:size,fillColor:color,applyFill:true,applyStroke:false,fauxItalic:italic,tracking:-25});
 prop(name,'ADBE Position',pos);
 op('layer.set_props',{comp:C,layer:name,props:{inPoint:start/30,motionBlur:true}});
 op('timeline.set_time',{comp:C,time:start/30});
 op('layer.apply_preset',{comp:C,layer:name,path:'C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/Presets/Text/Animate In/'+(italic?'Stretch In Each Word.ffx':'Straight In By Word.ffx')});
}
op('layer.create_footage',{comp:M,sourceItemId:id,name:'S07_OPERATIONS_FIXED_CONTAINER'});
op('layer.set_props',{comp:M,layer:'S07_OPERATIONS_FIXED_CONTAINER',props:{inPoint:222/30,outPoint:260/30,audioEnabled:false}});
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_layer_info',args:{compNameOrId:C,layerIndex:[1,2],includeProperties:true}},{name:'ae_render_frame',args:{compNameOrId:C,time:242/30,outPath:pathRoot+'qa/operations-initial-F242.png'}},{name:'ae_save_project'}]});
