import {run} from './ae-client.mjs';
const M='TITAN_MASTER_20S',D='DEVICE_iPad10_3D';
const root=new URL('./',import.meta.url).pathname.replace(/^\//,'');
const ivory=[0.961,0.953,0.933],ink=[0.137,0.153,0.173],orange=[1,0.47,0.04];
const ops=[];const op=(operation,args)=>ops.push({operation,args});
const set=(layer,property,value,comp=M)=>op('property.set',{comp,layer,property,value});
const ex=(layer,property,expression,comp=M)=>op('expression.set',{comp,layer,property,expression});
const props=(layer,p,comp=M)=>op('layer.set_props',{comp,layer,props:p});
const tr=(layer,p,comp=M)=>op('transform.set',{comp,layer,...p});
const key=(layer,property,f,value,comp=M)=>op('keyframe.add',{comp,layer,property,time:f/30,value});
const ff='C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/Presets/Text/';
const presetSpecs=[['S01_TITAN',2,'3D Text/3D Basic Position Z Cascade In.ffx'],['S02_Core_systems',39,'Animate In/Slide Up By Word.ffx'],['S02_Built',66,'Animate In/Slide Up By Word.ffx'],['S02_in_house',93,'Animate In/Slide Up By Word.ffx'],['S03_Casino_Fill',117,'Animate In/Slide Up By Word.ffx']];
for(const [layer,f,path] of presetSpecs){op('timeline.set_time',{comp:M,time:f/30});op('layer.apply_preset',{comp:M,layer,path:ff+path});}
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}}]});ops.length=0;
// Native Adobe preset animators retained; only their timing, span and displacement are customized.
const specs=[['S01_Meet','Animator 1',0,10,[0,42,0]],['S01_TITAN','Animator 1',2,10,[0,0,220]],['S02_Core_systems','Slide Up By Word',39,46,[-160,0,0]],['S02_Built','Slide Up By Word',66,73,[0,90,0]],['S02_in_house','Slide Up By Word',93,100,[230,0,0]],['S03_CAT_Fill','Slide Up By Word',114,122,[520,0,0]],['S03_Casino_Fill','Slide Up By Word',117,124,[380,0,0]]];
for(const [layer,anim,a,b,pos] of specs){
 const selector=['Text','Animators',anim,'Selectors','Range Selector 1'];
 for(const index of [2,1])op('keyframe.remove',{comp:M,layer,property:[...selector,'ADBE Text Percent Offset'],keyIndex:index});
 set(layer,[...selector,'ADBE Text Percent Start'],0);set(layer,[...selector,'ADBE Text Percent End'],layer==='S01_Meet'?45:65);
 key(layer,[...selector,'ADBE Text Percent Offset'],a,-100);key(layer,[...selector,'ADBE Text Percent Offset'],b,100);
 op('keyframe.set_easing',{comp:M,layer,property:[...selector,'ADBE Text Percent Offset'],keyIndex:2,inSpeed:0,outSpeed:0,inInfluence:65,outInfluence:33});
 set(layer,['Text','Animators',anim,'Properties','ADBE Text Position 3D'],pos);
 if(layer==='S01_Meet')set(layer,['Text','Animators',anim,'Properties','ADBE Text Rotation X'],65);
 props(layer,{motionBlur:true});
}
const common='var f=time*30;function p(a,b){return Math.max(0,Math.min(1,(f-a)/(b-a)));}function s(x){return x*x*(3-2*x);}';
for(const [layer,pos] of [['S01_Meet',[680,685]],['S01_TITAN',[1100,685]]]){
 ex(layer,['Transform','Position'],common+`var q=s(p(31,44));[${pos[0]}+1000*q,${pos[1]}-180*q,0];`);
 ex(layer,['Transform','Opacity'],common+'100*(1-s(p(33,43)));');
}
ex('S01_TITAN_Outline',['Transform','Position'],common+'[42-34*s(p(0,30))+480*s(p(31,44)),635+35*(1-s(p(0,14)))-90*s(p(31,44))];');
ex('S01_TITAN_Outline',['Transform','Opacity'],common+'85*(1-s(p(32,44)));');
op('mask.add',{comp:M,layer:'S01_TITAN_Outline',name:'Soft_lower_letter_edge'});
op('mask.set_path',{comp:M,layer:'S01_TITAN_Outline',maskIndex:1,vertices:[[-500,-1100],[3000,-1100],[3000,-150],[-500,-150]]});
op('mask.set_props',{comp:M,layer:'S01_TITAN_Outline',maskIndex:1,feather:[0,130]});
for(const [layer,pos] of [['S02_Core_systems',[700,430]],['S02_Built',[700,591]],['S02_in_house',[1138,591]]]){
 ex(layer,['Transform','Position'],common+`[${pos[0]}-1800*s(p(108,118)),${pos[1]}];`);
 ex(layer,['Transform','Opacity'],common+'100*(1-s(p(111,118)));');
}
ex('S02_BUILT_Outline',['Transform','Position'],common+'[-85+65*(1-s(p(68,80)))-320*s(p(108,120)),800];');
ex('S02_BUILT_Outline',['Transform','Opacity'],common+'75*s(p(68,75))*(1-s(p(108,120)));');
op('mask.add',{comp:M,layer:'S02_BUILT_Outline',name:'Clear_foreground_copy'});
op('mask.set_path',{comp:M,layer:'S02_BUILT_Outline',maskIndex:1,vertices:[[720,-490],[2000,-490],[2000,-140],[720,-140]]});
op('mask.set_props',{comp:M,layer:'S02_BUILT_Outline',maskIndex:1,mode:'Subtract',feather:[120,60]});
// Wipes have a moving edge; the three reference PNGs are never output layers.
ex('BG_Charcoal_Reveal',['Transform','Position'],common+'[1200+2400*(1-s(p(31,44))),512];');
op('layer.create_solid',{comp:M,name:'BG03_Ivory_Frame_Wipe',color:ivory});props('BG03_Ivory_Frame_Wipe',{inPoint:108/30,outPoint:5.7});
ex('BG03_Ivory_Frame_Wipe',['Transform','Position'],common+'[1200+2400*(1-s(p(108,124))),512];');
for(const n of ['S03_CAT_Fill','S03_Casino_Fill'])ex(n,['Transform','Opacity'],common+'100*(1-s(p(132,138)));');
for(const n of ['S03_CAT_Outline','S03_Casino_Outline'])ex(n,['Transform','Opacity'],common+'100*s(p(132,138));');
props('S03_Casino_Fill',{inPoint:117/30});props('S03_Casino_Outline',{inPoint:132/30});props('S03_CAT_Outline',{inPoint:132/30});
op('layer.create_text',{comp:M,name:'S03_CAT_Outline_OnDevice',text:'CAT VILLAGE'});
op('text.set_style',{comp:M,layer:'S03_CAT_Outline_OnDevice',font:'Pretendard-Bold',fontSize:370,fillColor:ivory,strokeColor:ivory,applyFill:false,applyStroke:true,strokeWidth:2,tracking:-20,justification:'left',autoKernType:'metric'});
tr('S03_CAT_Outline_OnDevice',{position:[108,539],anchorPoint:[0,0]});props('S03_CAT_Outline_OnDevice',{inPoint:132/30,outPoint:5.7});
ex('S03_CAT_Outline_OnDevice',['Transform','Opacity'],common+'100*s(p(132,138));');
op('mask.add',{comp:M,layer:'S03_CAT_Outline_OnDevice',name:'Device_overlap_stroke_only'});
op('mask.set_path',{comp:M,layer:'S03_CAT_Outline_OnDevice',maskIndex:1,vertices:[[518,-440],[1666,-440],[1666,387],[518,387]]});
// A single open path carries the same orange endpoint from the first arc into the third frame.
op('layer.create_shape',{comp:M,name:'SHARED_LINE_01_to_03'});tr('SHARED_LINE_01_to_03',{position:[0,0],anchorPoint:[0,0]});
op('shape.add_group',{comp:M,layer:'SHARED_LINE_01_to_03',name:'Continuous_Path'});
op('shape.add_path',{comp:M,layer:'SHARED_LINE_01_to_03',groupIndex:1,vertices:[[460,750],[1440,431]],closed:false});
op('shape.add_stroke',{comp:M,layer:'SHARED_LINE_01_to_03',groupIndex:1,color:[...ink,1],width:3.2});
const pathExpr=common+`
function mix(a,b,q){return [a[0]+(b[0]-a[0])*q,a[1]+(b[1]-a[1])*q];}
function bez(t){var u=1-t;return [u*u*u*460+3*u*u*t*635+3*u*t*t*1060+t*t*t*1440,u*u*u*750+3*u*u*t*338+3*u*t*t*256+t*t*t*431];}
var pts=[];var i,t,q;
if(f<44){var drawn=s(p(0,10)),m=s(p(31,44));for(i=0;i<=48;i++){t=i/48;pts.push(mix(bez(t*drawn),[708+1102*t,638],m));}}
else if(f<74){q=s(p(47,65));for(i=0;i<=48;i++){t=i/48;pts.push([708+1102*t*(1-q),638]);}}
else if(f<108){q=s(p(74,101));pts=[[708,638],[708+1102*q,638]];}
else if(f<114){q=s(p(108,114));pts=[[708,638],[1810,638],[1810,638-478*q]];}
else if(f<124){q=s(p(114,124));pts=[[708,638],[1810,638],[1810,160],[1810-1432*q,160]];}
else if(f<131){q=s(p(124,131));pts=[[708,638],[1810,638],[1810,160],[378,160],[378,160+590*q]];}
else if(f<138){q=s(p(131,138));pts=[[708,638],[1810,638],[1810,160],[378,160],[378,750],[378+1662*q,750]];}
else{q=s(p(164,170));pts=[[708,638],[1810,638],[1810,160],[378,160],[378,750],[2040,750],[2040+80*q,750+80*q*q]];}
createPath(pts,[],[],false);`;
ex('SHARED_LINE_01_to_03',['Contents','Continuous_Path','Path 1','Path'],pathExpr);
ex('SHARED_LINE_01_to_03',['Contents','Continuous_Path','Stroke 1','Color'],common+'var q=s(p(31,44));[0.137+0.863*q,0.153+0.317*q,0.173-0.133*q,1];');
props('SHARED_LINE_01_to_03',{outPoint:5.7});
op('layer.create_shape',{comp:M,name:'SHARED_DOT_ENDPOINT'});op('shape.add_group',{comp:M,layer:'SHARED_DOT_ENDPOINT',name:'Dot'});op('shape.add_ellipse',{comp:M,layer:'SHARED_DOT_ENDPOINT',groupIndex:1,size:[42,42]});op('shape.add_fill',{comp:M,layer:'SHARED_DOT_ENDPOINT',groupIndex:1,color:[...orange,1]});
ex('SHARED_DOT_ENDPOINT',['Transform','Position'],'var L=thisComp.layer("SHARED_LINE_01_to_03");var p=L.content("Continuous_Path").content("Path 1").path.points();L.toComp(p[p.length-1]);');props('SHARED_DOT_ENDPOINT',{outPoint:5.7});
// Thin outer arc provides the reference composition without competing with the copy.
op('layer.create_shape',{comp:M,name:'OUTER_ARC_Ivory_Scenes'});tr('OUTER_ARC_Ivory_Scenes',{position:[0,0],anchorPoint:[0,0]});op('shape.add_group',{comp:M,layer:'OUTER_ARC_Ivory_Scenes',name:'Arc'});
op('shape.add_path',{comp:M,layer:'OUTER_ARC_Ivory_Scenes',groupIndex:1,vertices:[[-70,270],[940,1055]],outTangents:[[85,560],[0,0]],inTangents:[[0,0],[-550,0]],closed:false});op('shape.add_stroke',{comp:M,layer:'OUTER_ARC_Ivory_Scenes',groupIndex:1,color:[...ink,1],width:3});
ex('OUTER_ARC_Ivory_Scenes',['Transform','Opacity'],common+'100*((1-s(p(31,44)))+s(p(114,124)));');props('OUTER_ARC_Ivory_Scenes',{outPoint:5.7});
// Geometry keeps uniform scale; real perspective depth and 3D Y rotation carry the approach.
ex('iPad10_MODEL',['Transform','Position'],common+'var q=1-Math.pow(1-p(114,135),3);[1200+110*(1-q),512+100*(1-q),4500*(1-q)];',D);
ex('iPad10_MODEL',['Transform','Y Rotation'],common+'var q=1-Math.pow(1-p(114,135),3);55*(1-q);',D);
ex('iPad10_MODEL',['Transform','Z Rotation'],common+'var q=1-Math.pow(1-p(114,135),3);-7*(1-q);',D);
tr('iPad10_MODEL',{scale:[900,900,900]},D);
// Move bottom-to-top explicitly; keep frame path behind the model and all product text in front.
const stacking=['BG_Ivory','BG_Charcoal_Reveal','S01_TITAN_Outline','S02_BUILT_Outline','S01_Meet','S01_TITAN','S02_Core_systems','S02_Built','S02_in_house','BG03_Ivory_Frame_Wipe','OUTER_ARC_Ivory_Scenes','SHARED_LINE_01_to_03','SHARED_DOT_ENDPOINT','S03_iPad_REAL_3D','S03_CAT_Fill','S03_Casino_Fill','S03_CAT_Outline','S03_CAT_Outline_OnDevice','S03_Casino_Outline'];
for(const layer of stacking)op('layer.move',{comp:M,layer,toIndex:1});
op('comp.set_props',{comp:M,props:{motionBlur:true,shutterAngle:120,shutterPhase:-60,workAreaStart:0,workAreaDuration:5.7}});
const markers=[[0,'01 Meet TITAN'],[39,'02a Core systems'],[66,'02b Built'],[93,'02c in-house'],[114,'03 CAT VILLAGE / Casino Slot'],[171,'06 Sportsbook - RESERVED NOT BUILT'],[228,'07 Operations / refined - RESERVED'],[258,'08 Sudden odds shift - RESERVED'],[279,'09 Bets auto-blocked - RESERVED'],[315,'10 Limit changes - RESERVED'],[336,'11 Effective next round - RESERVED'],[381,'12 Partner earnings - RESERVED'],[420,'13 Auto-calculated - RESERVED'],[456,'14 In the back office - RESERVED'],[480,'15 Recorded - RESERVED'],[531,'16 TITAN SOLUTION / loop - RESERVED']];
for(const [f,comment] of markers)op('marker.add_comp',{comp:M,time:f/30,comment});
op('timeline.set_active_comp',{comp:M});op('timeline.set_time',{comp:M,time:155/30});
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_save_project'},{name:'ae_render_frame',args:{compNameOrId:M,time:155/30,outPath:root+'qa/motion-pass1-F155.png'}},{name:'ae_render_frame',args:{compNameOrId:M,time:20/30,outPath:root+'qa/motion-pass1-F020.png'}}]});
