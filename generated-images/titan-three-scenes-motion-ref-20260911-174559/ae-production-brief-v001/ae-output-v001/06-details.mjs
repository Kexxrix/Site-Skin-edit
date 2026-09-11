import {run} from './ae-client.mjs';
const M='TITAN_MASTER_20S',D='DEVICE_iPad10_3D';const ops=[];
for (const [comp,layer,property] of [
 [M,'S01_Meet',['Text','Animators','Animator 1']],
 [M,'S01_Meet',['Text','Animators','Animator 1','Selectors','Range Selector 1']],
 [M,'S03_CAT_Fill',['Text','Animators','Slide Up By Word','Selectors','Range Selector 1','Advanced']],
 [D,'iPad10_MODEL',['Transform']],
 [D,'iPad10_MODEL',['Geometry Options']],
 [D,'Camera_Product',['Transform']],
 [D,'Camera_Product',['Camera Options']]]) ops.push({operation:'property.list',args:{comp,layer,property}});
for (const [layer,anim] of [['S01_Meet','Animator 1'],['S03_CAT_Fill','Slide Up By Word']]) for(const p of ['ADBE Text Percent Start','ADBE Text Percent End','ADBE Text Percent Offset']) ops.push({operation:'property.get',args:{comp:M,layer,property:['Text','Animators',anim,'Selectors','Range Selector 1',p]}});
await run({compact:false,write:false,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true}}}]});
