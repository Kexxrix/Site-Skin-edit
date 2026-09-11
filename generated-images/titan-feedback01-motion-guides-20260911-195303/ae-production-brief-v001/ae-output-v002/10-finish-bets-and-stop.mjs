import {run,pathRoot} from './ae-client.mjs';
const comp='SCENE08_SHIFT_NATIVE',layer='S08_Bets',root=['ADBE Text Properties','ADBE Text Animators',1],sel=[...root,'ADBE Text Selectors',1],adv=[...sel,'ADBE Text Range Advanced'];
const ops=[],op=(operation,args)=>ops.push({operation,args});
for(const keyIndex of [2,1])op('keyframe.remove',{comp,layer,property:[...sel,'ADBE Text Percent Start'],keyIndex});
for(const [k,value]of[['ADBE Text Percent Start',0],['ADBE Text Percent End',100],['ADBE Text Percent Offset',0]])op('property.set',{comp,layer,property:[...sel,k],value});
for(const [k,value]of[['ADBE Text Range Type2',3],['ADBE Text Range Shape',1],['ADBE Text Selector Smoothness',100]])op('property.set',{comp,layer,property:[...adv,k],value});
op('property.set',{comp,layer,property:[...root,'ADBE Text Animator Properties','ADBE Text Scale 3D'],value:[118,118,100]});
const q='var u=clamp((time*30-279)/5,0,1);var q=u*u*u*(10+u*(-15+6*u));';
op('expression.set',{comp,layer,property:[...adv,'ADBE Text Selector Max Amount'],expression:q+'100*(1-q);'});
op('expression.set',{comp,layer,property:['ADBE Transform Group','ADBE Position'],expression:q+'[550,520+60*(1-q),0];'});
op('text.set_style',{comp,layer:'S08_auto-blocked',fontSize:223});
op('expression.set',{comp,layer:'S08_auto-blocked',property:['ADBE Mask Parade',1,'ADBE Mask Shape'],expression:'var u=clamp((time*30-281)/6,0,1);var q=u*u*u*(10+u*(-15+6*u));var r=sourceRectAtTime(time,false);var right=-10+(r.left+r.width+20)*q;createPath([[-10,-300],[right,-300],[right,50],[-10,50]],[],[],true);'});
// Forward shutter samples ensure the instant rail HOLD at F279 is not contaminated by pre-stop samples.
op('comp.set_props',{comp,props:{shutterAngle:180,shutterPhase:0}});
op('comp.set_props',{comp:'SCENE08_WHOLE_OVERLAY_180DEG',props:{shutterAngle:180,shutterPhase:0}});
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true}}},{name:'ae_save_project'},...[252,256,260,267,279,284,287].map(f=>({name:'ae_render_frame',args:{compNameOrId:'TITAN_MASTER_20S',time:f/30,outPath:pathRoot+'qa/shift-customized-F'+f+'.png'}}))]});
