import fs from 'node:fs';
import {run,pathRoot} from './ae-client.mjs';
const M='TITAN_MASTER_20S',base=JSON.parse(fs.readFileSync('qa/base-current-native-project.json','utf8')).items.find(i=>i.id===1);
const line=base.layers.find(l=>l.name==='SHARED_LINE_01_to_03');
const original=line.contentsGroup.groups[0].groups[0].groups[0].properties.find(p=>p.matchName==='ADBE Vector Shape').expression;
const scroll='var u=clamp((time*30-171)/9,0,1);var q=u*u*u*(10+u*(-15+6*u));[0,-1024*q,0];';
const curve=`if(time*30<164){\n${original}\n}else{
var f=time*30;function mix(a,b,t){return a+(b-a)*t;}function sm(a,b){var u=clamp((f-a)/(b-a),0,1);return u*u*(3-2*u);}function quint(a,b){var u=clamp((f-a)/(b-a),0,1);return u*u*u*(10+u*(-15+6*u));}
var pts=[[2500,160],[378,160],[378,750],[2040,750]],ins=[[0,0],[0,0],[0,0],[0,0]],outs=[[0,0],[0,0],[0,0],[0,0]];
function partial(a,b,c,d,t){var ab=mix(a,b,t),bc=mix(b,c,t),cd=mix(c,d,t),abc=mix(ab,bc,t),bcd=mix(bc,cd,t),end=mix(abc,bcd,t);outs[outs.length-1]=ab-a;pts.push(end);ins.push(abc-end);outs.push([0,0]);}
partial([2040,750],[2084.18278,750],[2120,785.81722],[2120,830],sm(164,170));
if(f>=171){var distance=(930+Math.PI*60)*quint(171,180);var dy=Math.min(930,distance);pts.push([2120,830+dy]);ins.push([0,0]);outs.push([0,0]);if(distance>930)partial([2120,1760],[2120,1826.27417],[2173.72583,1880],[2240,1880],Math.min(1,(distance-930)/(Math.PI*60)));}
createPath(pts,ins,outs,false);
}`;
const ops=[],op=(operation,args)=>ops.push({operation,args});
op('layer.create_null',{comp:M,name:'SCROLL_CAT_TO_SPORTSBOOK_F171_180'});
op('property.set',{comp:M,layer:'SCROLL_CAT_TO_SPORTSBOOK_F171_180',property:['ADBE Transform Group','ADBE Anchor Point'],value:[0,0,0]});
op('expression.set',{comp:M,layer:'SCROLL_CAT_TO_SPORTSBOOK_F171_180',property:['ADBE Transform Group','ADBE Position'],expression:scroll});
const oldNames=base.layers.filter(l=>/^(S03_|OUTER_ARC_Ivory|BG03_Ivory)/.test(l.name)).map(l=>l.name);
for(const layer of [...oldNames,'SHARED_LINE_01_to_03']){
 op('layer.set_parent',{comp:M,layer,parentLayer:'SCROLL_CAT_TO_SPORTSBOOK_F171_180',jump:true});
 op('layer.set_props',{comp:M,layer,props:{outPoint:(layer==='SHARED_LINE_01_to_03'?228:181)/30}});
}
op('expression.set',{comp:M,layer:'SHARED_LINE_01_to_03',property:['ADBE Root Vectors Group',1,'ADBE Vectors Group','ADBE Vector Shape - Group','ADBE Vector Shape'],expression:curve});
op('layer.set_props',{comp:M,layer:'SHARED_DOT_ENDPOINT',props:{outPoint:228/30}});
op('expression.set',{comp:M,layer:'SHARED_DOT_ENDPOINT',property:['ADBE Root Vectors Group',1,'ADBE Vectors Group','ADBE Vector Shape - Ellipse','ADBE Vector Ellipse Size'],expression:'var u=clamp((time*30-220)/2,0,1);var q=u*u*(3-2*u);[42+168*q,42];'});
op('layer.create_footage',{comp:M,sourceItemId:115,name:'S06_SPORTSBOOK_SCROLL_IN'});
op('layer.set_props',{comp:M,layer:'S06_SPORTSBOOK_SCROLL_IN',props:{inPoint:171/30,outPoint:228/30,audioEnabled:false,motionBlur:true}});
op('property.set',{comp:M,layer:'S06_SPORTSBOOK_SCROLL_IN',property:['ADBE Transform Group','ADBE Position'],value:[1200,1536,0]});
op('layer.set_parent',{comp:M,layer:'S06_SPORTSBOOK_SCROLL_IN',parentLayer:'SCROLL_CAT_TO_SPORTSBOOK_F171_180',jump:true});
op('layer.move',{comp:M,layer:'S06_SPORTSBOOK_SCROLL_IN',toIndex:11});
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_save_project'},...[163,170,174,177,182,200].map(f=>({name:'ae_render_frame',args:{compNameOrId:M,time:f/30,outPath:pathRoot+'qa/scroll-initial-F'+String(f).padStart(3,'0')+'.png'}}))]});
