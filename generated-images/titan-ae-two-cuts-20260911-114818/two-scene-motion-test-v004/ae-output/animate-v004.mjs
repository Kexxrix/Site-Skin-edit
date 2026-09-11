import {run,outDir} from './ae-client.mjs';
const main=330,ipad=356,ops=[];
const op=(operation,args)=>ops.push({operation,args});
const expr=(comp,layer,property,expression)=>op('expression.set',{comp,layer,property,expression});
const tr=n=>['Transform',n];
const names=['V004_Staggered_Back','V004_e1_Back','V004_e2_Back','V004_t_Back'];
const ends=['M_SETTLED','E1_SETTLED','E2_SETTLED','T_SETTLED'];
for(let i=0;i<4;i++){
 const path=['Text','Animators',names[i],'Properties'];
 op('property.add',{comp:main,layer:'C01_TXT_MEET',property:path,matchName:'ADBE Text Opacity'});
 expr(main,'C01_TXT_MEET',[...path,'Opacity'],`var end=thisComp.marker.key('${ends[i]}').time;var d=thisComp.marker.key('M_SETTLED').time-thisComp.marker.key('M_START').time;time<end-d-0.00001?0:100;`);
}
for(const [layer,inPoint]of [['C01_ARC',24/30],['C01_DOT',51/30],['C01_TXT_TITAN',39/30]])op('layer.set_props',{comp:main,layer,props:{inPoint,outPoint:4.1}});
op('property.set',{comp:main,layer:'C02_TYPE_RECOIL_CTRL',property:['Effects','Text Push px','Slider'],value:190});
expr(main,'C02_TYPE_RECOIL_CTRL',tr('Position'),`function at(n){return thisComp.marker.key(n).time;}\nfunction unit(a,b){return Math.max(0,Math.min(1,(time-a)/(b-a)));}\nvar amount=effect('Text Push px')('Slider');var x=0;\nif(time>=at('CONTACT')&&time<at('PUSH_MAX')){var u=unit(at('CONTACT'),at('PUSH_MAX'));x=-amount*(1-Math.pow(1-u,5));}\nelse if(time>=at('PUSH_MAX')){var u=unit(at('PUSH_MAX'),at('TYPE_HOME'));var c=1.70158;var e=1+(c+1)*Math.pow(u-1,3)+c*Math.pow(u-1,2);x=-amount+amount*e;}\n[x,0];`);
const clock=`var master=comp('TITAN_TwoScenes_8s_v004');function at(n){return master.marker.key(n).time-master.marker.key('C02_BG_READY').time;}\nfunction unit(a,b){return Math.max(0,Math.min(1,(time-a)/(b-a)));}\n`;
expr(ipad,'DEVICE_iPad_VIEW',tr('Position'),clock+`var x=65;\nif(time>=at('IPAD_ENTER')&&time<at('CONTACT')){var u=unit(at('IPAD_ENTER'),at('CONTACT'));x=65+(-8.3-65)*u*u;}\nelse if(time>=at('CONTACT')&&time<at('PUSH_MAX')){var u=unit(at('CONTACT'),at('PUSH_MAX'));x=-8.3-15*(1-Math.pow(1-u,5));}\nelse if(time>=at('PUSH_MAX')){var u=unit(at('PUSH_MAX'),at('IPAD_SETTLED'));x=-23.3+23.3*(1-Math.pow(1-u,3));}\n[x,0,0];`);
expr(ipad,'DEVICE_iPad_VIEW',tr('Y Rotation'),clock+`var u=unit(at('PUSH_MAX'),at('IPAD_SETTLED'));-30*(1-Math.pow(1-u,3));`);
expr(ipad,'DEVICE_iPad_VIEW',tr('Z Rotation'),clock+`var u=unit(at('PUSH_MAX'),at('IPAD_SETTLED'));-3*(1-Math.pow(1-u,3));`);
op('comp.info',{comp:main});
await run({write:true,label:'animate',calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true}}},{name:'ae_save_project',args:{path:outDir+'TITAN-TwoScene-v004-Working.aep'}},...[[127,0.6,'baseline-c01'],[127,2.5,'baseline-c02'],[330,0.4,'first-meet-f012'],[330,3.1,'first-c01-settle'],[356,1.5,'first-ipad-front'],[330,167/30,'first-contact'],[330,174/30,'first-push'],[330,239/30,'first-final']].map(([compNameOrId,time,name])=>({name:'ae_render_frame',args:{compNameOrId,time,outPath:outDir+name+'.png'}}))]});
