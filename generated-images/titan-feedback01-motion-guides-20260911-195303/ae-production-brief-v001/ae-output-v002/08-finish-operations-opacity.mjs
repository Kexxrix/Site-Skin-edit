import {run,pathRoot} from './ae-client.mjs';
const comp='SCENE07_OPERATIONS';
const ops=[['S07_Operations',228],['S07_refined',230]].map(([layer,f])=>({operation:'expression.set',args:{comp,layer,property:['ADBE Transform Group','ADBE Opacity'],expression:`var u=clamp((time*30-${f})/4,0,1);100*u*u*u*(10+u*(-15+6*u));`}}));
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true}}},{name:'ae_render_frame',args:{compNameOrId:comp,time:242/30,outPath:pathRoot+'qa/operations-customized-F242.png'}},{name:'ae_do',args:{operation:'batch.run',args:{ops:['S07_Operations','S07_refined'].map(layer=>({operation:'layer.bounds',args:{comp,layer,time:242/30}}))}}},{name:'ae_save_project'}]});
