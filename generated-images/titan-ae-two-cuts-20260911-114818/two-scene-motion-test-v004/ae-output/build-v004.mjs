import { run, outDir } from './ae-client.mjs';
import { readFile, writeFile } from 'node:fs/promises';
const baseline = JSON.parse(await readFile(new URL('./log-baseline-catalog-2026-09-11T07-32-11-574Z.json', import.meta.url), 'utf8'));
const original = baseline.results.find(x=>x.call.name==='ae_layer_info' && x.call.args.compNameOrId===127).response.result.layers;
const originalIpad = baseline.results.find(x=>x.call.name==='ae_layer_info' && x.call.args.compNameOrId===163).response.result.layers;
const main=330, ipad=356, iphone=373, screen=389;
const mainName='TITAN_TwoScenes_8s_v004';
const ops=[];
const op=(operation,args)=>ops.push({operation,args});
const prop=(comp,layer,property,value)=>op('property.set',{comp,layer,property,value});
const expr=(comp,layer,property,expression)=>op('expression.set',{comp,layer,property,expression});
const tr=n=>['ADBE Transform Group',n];
function clear(comp,layer,property,p){
  if(p?.expression)op('expression.remove',{comp,layer,property});
  for(let i=p?.keyframes?.length||0;i>0;i--)op('keyframe.remove',{comp,layer,property,keyIndex:i});
}
function constant(comp,source,layer,name,value){const p=source.find(x=>x.name===layer)?.transformGroup?.properties.find(x=>x.matchName===name);clear(comp,layer,tr(name),p);prop(comp,layer,tr(name),value);}
const events={M_START:0,M_SETTLED:24,E1_SETTLED:29,E2_SETTLED:34,T_SETTLED:39,ARC_FULL:51,C01_SETTLED:93,WIPE_START:111,C02_BG_READY:123,LETTERING_DONE:154,IPAD_ENTER:155,CONTACT:167,PUSH_MAX:174,TYPE_HOME:210,IPAD_SETTLED:214};
for(const [comment,frame]of Object.entries(events))op('marker.add_comp',{comp:main,time:frame/30,comment});
for(const [comp,duration]of [[main,8],[ipad,4],[iphone,4.1],[screen,4]]){
 op('comp.set_props',{comp,props:{duration,workAreaStart:0,workAreaDuration:duration}});
 if(comp!==main)op('layer.set_props',{comp,layer:'all',props:{outPoint:duration}});
}
op('layer.replace_source',{comp:main,layer:'C01_DEVICE_IPHONE',item:iphone,fixExpressions:false});
op('layer.replace_source',{comp:main,layer:'C02_DEVICE_IPAD',item:ipad,fixExpressions:false});
op('layer.replace_source',{comp:ipad,layer:'SCREEN_iPad10_VIDEO_SOURCE',item:screen,fixExpressions:false});
for(const l of original){
 if(l.name.startsWith('REF'))continue;
 if(l.name.startsWith('C01_'))op('layer.set_props',{comp:main,layer:l.name,props:{outPoint:4.1}});
 if(['C02_UNDERLINE','C02_TXT_CORE','C02_TXT_BUILT','C02_TXT_IN_HOUSE'].includes(l.name))op('layer.set_props',{comp:main,layer:l.name,props:{startTime:3,inPoint:4.1,outPoint:8}});
}
op('layer.set_props',{comp:main,layer:'C02_BG_CHARCOAL_WIPE',props:{inPoint:3.7,outPoint:8}});
op('keyframe.shift',{comp:main,layer:'C02_BG_CHARCOAL_WIPE',property:tr('ADBE Position'),pivot:0.8,scale:4/3,offset:2.9});
// Keep the one native Meet document, its kerning and measured baseline.
constant(main,original,'C01_TXT_MEET','ADBE Position',[764.5947265625,560]);
constant(main,original,'C01_TXT_MEET','ADBE Opacity',100);
const base=['Text','Animators'];
const names=['V004_Staggered_Back','V004_e1_Back','V004_e2_Back','V004_t_Back'];
const distances=[620,460,330,230];
const startEvents=['M_START','M_START','M_START','M_START'];
const endEvents=['M_SETTLED','E1_SETTLED','E2_SETTLED','T_SETTLED'];
for(let i=0;i<4;i++){
 if(i>0){op('property.add',{comp:main,layer:'C01_TXT_MEET',property:base,matchName:'ADBE Text Animator',name:names[i]});op('property.add',{comp:main,layer:'C01_TXT_MEET',property:[...base,names[i],'Selectors'],matchName:'ADBE Text Expressible Selector',name:'Letter_Back_Amount'});}
 op('property.add',{comp:main,layer:'C01_TXT_MEET',property:[...base,names[i],'Properties'],matchName:'ADBE Text Position 3D'});
 expr(main,'C01_TXT_MEET',[...base,names[i],'Selectors','Letter_Back_Amount','Amount'],`textIndex === ${i+1} ? 100 : 0;`);
 expr(main,'C01_TXT_MEET',[...base,names[i],'Properties','ADBE Text Position 3D'],`var end=thisComp.marker.key('${endEvents[i]}').time;\nvar duration=thisComp.marker.key('M_SETTLED').time-thisComp.marker.key('M_START').time;\nvar u=Math.max(0,Math.min(1,(time-end+duration)/duration));\nvar c=1.70158;var e=1+(c+1)*Math.pow(u-1,3)+c*Math.pow(u-1,2);\n[0,${distances[i]}*(1-e),0];`);
}
// Full pre-existing cubic arc, uniformly scaled about its design center.
const arc=original.find(l=>l.name==='C01_ARC');
const trim=arc.contentsGroup.groups[0].groups[0].groups.find(g=>g.name==='Trim Paths 1').properties.find(p=>p.name==='End');
const trimPath=['Contents','Arc','Contents','Trim Paths 1','End'];
clear(main,'C01_ARC',trimPath,trim);prop(main,'C01_ARC',trimPath,100);
prop(main,'C01_ARC',tr('ADBE Anchor Point'),[675,494]);
op('layer.set_props',{comp:main,layer:'C01_ARC',props:{inPoint:24/30}});
const arcEase="var a=thisComp.marker.key('M_SETTLED').time;var b=thisComp.marker.key('ARC_FULL').time;var u=Math.max(0,Math.min(1,(time-a)/(b-a)));var e=1-Math.pow(1-u,5);\n";
expr(main,'C01_ARC',tr('ADBE Position'),arcEase+'[815+(675-815)*e,511+(494-511)*e];');
expr(main,'C01_ARC',tr('ADBE Scale'),arcEase+'var s=27+73*e;[s,s];');
// The dot follows the exact existing Shape Path, not a circle approximation.
constant(main,original,'C01_DOT','ADBE Position',[0,0]);
constant(main,original,'C01_DOT','ADBE Opacity',100);
op('layer.set_props',{comp:main,layer:'C01_DOT',props:{inPoint:51/30}});
const quad="var u=Math.max(0,Math.min(1,(time-a)/(b-a)));var e=u<0.5?2*u*u:1-Math.pow(-2*u+2,2)/2;\n";
expr(main,'C01_DOT',tr('ADBE Position'),"var a=thisComp.marker.key('ARC_FULL').time;var b=thisComp.marker.key('C01_SETTLED').time;"+quad+"var L=thisComp.layer('C01_ARC');var p=L.content('Arc').content('Path 1').path.pointOnPath(e);L.toComp(p);");
constant(main,original,'C01_TXT_TITAN','ADBE Position',[1373.48754882812,492]);
constant(main,original,'C01_TXT_TITAN','ADBE Scale',[100,100]);
constant(main,original,'C01_TXT_TITAN','ADBE Rotate Z',0);
constant(main,original,'C01_TXT_TITAN','ADBE Opacity',100);
op('layer.set_props',{comp:main,layer:'C01_TXT_TITAN',props:{inPoint:39/30}});
expr(main,'C01_TXT_TITAN',tr('ADBE Position'),"var a=thisComp.marker.key('T_SETTLED').time;var b=thisComp.marker.key('C01_SETTLED').time;"+quad+'[2720+(1373.48754882812-2720)*e,492];');
// One identity parent adds recoil without touching the inherited local lettering keys.
op('layer.create_null',{comp:main,name:'C02_TYPE_RECOIL_CTRL'});
prop(main,'C02_TYPE_RECOIL_CTRL',tr('ADBE Anchor Point'),[0,0]);
prop(main,'C02_TYPE_RECOIL_CTRL',tr('ADBE Position'),[0,0]);
op('layer.set_props',{comp:main,layer:'C02_TYPE_RECOIL_CTRL',props:{outPoint:8}});
op('effect.add',{comp:main,layer:'C02_TYPE_RECOIL_CTRL',matchName:'ADBE Slider Control',name:'Text Push px'});
op('property.list',{comp:main,layer:'C02_TYPE_RECOIL_CTRL',property:['Effects','Text Push px']});
for(const layer of ['C02_UNDERLINE','C02_TXT_CORE','C02_TXT_BUILT','C02_TXT_IN_HOUSE'])op('layer.set_parent',{comp:main,layer,parentLayer:'C02_TYPE_RECOIL_CTRL',jump:true});
// Extend mapped native GLB branch and start video at scene-two local time.
op('layer.set_props',{comp:main,layer:'C02_DEVICE_IPAD',props:{startTime:4.1,inPoint:155/30,outPoint:8}});
constant(main,original,'C02_DEVICE_IPAD','ADBE Opacity',100);
op('layer.move',{comp:main,layer:'C02_DEVICE_IPAD',toIndex:4});
for(const [name,value]of [['ADBE Position',[0,0,0]],['ADBE Scale',[100,100,100]],['ADBE Rotate Y',0],['ADBE Rotate Z',0]])constant(ipad,originalIpad,'DEVICE_iPad_VIEW',name,value);
op('layer.set_enabled',{comp:ipad,layer:'SCREEN_iPad10_VIDEO_SOURCE',enabled:false});
op('comp.info',{comp:main});
await run({write:true,label:'build-structure',calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:120000}}]});
await writeFile(new URL('./timeline-plan.json',import.meta.url),JSON.stringify({fps:30,duration:8,frames:240,events,letterDistances:distances,ids:{main,ipad,iphone,screen}},null,2),{flag:'wx'});
