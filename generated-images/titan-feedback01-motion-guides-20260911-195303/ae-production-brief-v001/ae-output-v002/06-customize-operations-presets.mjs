import {run,pathRoot} from './ae-client.mjs';
const comp='SCENE07_OPERATIONS',root=['ADBE Text Properties','ADBE Text Animators',1],selector=[...root,'ADBE Text Selectors',1],advanced=[...selector,'ADBE Text Range Advanced'],anim=[...root,'ADBE Text Animator Properties'];
const ops=[],op=(operation,args)=>ops.push({operation,args}),set=(layer,property,value)=>op('property.set',{comp,layer,property,value}),expr=(layer,property,expression)=>op('expression.set',{comp,layer,property,expression});
const quint=(a,b)=>`var u=clamp((time*30-${a})/${b-a},0,1);var q=u*u*u*(10+u*(-15+6*u));`;
for(const [layer,key] of [['S07_Operations','ADBE Text Percent Start'],['S07_refined','ADBE Text Percent Offset']]){
 for(const keyIndex of [2,1])op('keyframe.remove',{comp,layer,property:[...selector,key],keyIndex});
 for(const [k,v]of [['ADBE Text Percent Start',0],['ADBE Text Percent End',100],['ADBE Text Percent Offset',0]])set(layer,[...selector,k],v);
 for(const [k,v]of [['ADBE Text Range Units',1],['ADBE Text Range Type2',3],['ADBE Text Range Shape',1],['ADBE Text Selector Smoothness',100]])set(layer,[...advanced,k],v);
}
set('S07_Operations',[...anim,'ADBE Text Position 3D'],[180,0,0]);
set('S07_Operations',[...anim,'ADBE Text Opacity'],0);
expr('S07_Operations',[...advanced,'ADBE Text Selector Max Amount'],quint(228,232)+'100*(1-q);');
set('S07_refined',[...advanced,'ADBE Text Selector Max Amount'],100);
expr('S07_refined',[...anim,'ADBE Text Scale 3D'],quint(230,234)+'[138-38*q,100,100];');
expr('S07_refined',[...anim,'ADBE Text Opacity'],quint(230,234)+'100*q;');
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_render_frame',args:{compNameOrId:comp,time:242/30,outPath:pathRoot+'qa/operations-customized-F242.png'}},{name:'ae_do',args:{operation:'batch.run',args:{ops:['S07_Operations','S07_refined'].map(layer=>({operation:'layer.bounds',args:{comp,layer,time:242/30}}))}}},{name:'ae_save_project'}]});
