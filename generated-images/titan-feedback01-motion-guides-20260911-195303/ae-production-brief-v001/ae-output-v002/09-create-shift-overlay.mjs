import {run,pathRoot} from './ae-client.mjs';
const C='SCENE08_SHIFT_NATIVE',W='SCENE08_WHOLE_OVERLAY_180DEG',M='TITAN_MASTER_20S';
const created=await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops:[C,W].map(name=>({operation:'comp.create',args:{name,width:2400,height:1024,fps:30,duration:20}})),stopOnError:true}}}]});
const [cid,wid]=created[0].response.result.results.map(x=>x.id);
const ops=[],op=(operation,args)=>ops.push({operation,args});
const prop=(comp,layer,key,value)=>op('property.set',{comp,layer,property:['ADBE Transform Group',key],value});
const expr=(comp,layer,key,expression)=>op('expression.set',{comp,layer,property:['ADBE Transform Group',key],expression});
const purple=[0.557,0.576,0.965],ink=[0.07,0.085,0.10],ivory=[0.965,0.957,0.937],orange=[1,0.47,0.04];
const railColors=[[0.137,0.153,0.173],ivory,orange];
const movement='var f=time*30;var d=14*clamp(f-262,0,5)+36*clamp(f-267,0,6)+60*clamp(f-273,0,6);';
function rect(name,x,y,w,h,color){op('layer.create_shape',{comp:C,name});prop(C,name,'ADBE Position',[x+w/2,y+h/2,0]);op('shape.add_group',{comp:C,layer:name,name:'Native_Rectangle'});op('shape.add_rect',{comp:C,layer:name,groupIndex:1,size:[w,h]});op('shape.add_fill',{comp:C,layer:name,groupIndex:1,color:[...color,1]});op('layer.set_props',{comp:C,layer:name,props:{motionBlur:true}});}
for(const comp of[C,W])op('comp.set_props',{comp,props:{motionBlur:true,shutterAngle:180,shutterPhase:-90}});
rect('S08_Full_Perwinkle_Background',0,0,2400,1024,purple);
for(const side of ['LEFT','RIGHT']){
 const parent='S08_'+side+'_RAIL_MOTION',x=side==='LEFT'?0:1980;
 op('layer.create_null',{comp:C,name:parent});prop(C,parent,'ADBE Anchor Point',[0,0,0]);
 expr(C,parent,'ADBE Position',movement+(side==='LEFT'?'[0,646-d,0];':'[0,-646+d,0];'));
 for(let j=-4;j<=5;j++){
  const phase=((j+(side==='LEFT'?0:2))%3+3)%3,y=55+j*300;
  const tile=`S08_${side}_Cell_${j+4}`,label=tile+'_SHIFT';
  rect(tile,x,y,420,300,railColors[phase]);
  op('layer.set_parent',{comp:C,layer:tile,parentLayer:parent,jump:true});
  op('layer.create_text',{comp:C,name:label,text:'SHIFT'});
  op('text.set_style',{comp:C,layer:label,font:'Pretendard-Black',fontSize:300,horizontalScale:0.60,justification:'center',applyFill:false,applyStroke:true,strokeColor:phase===1?ink:ivory,strokeWidth:2,tracking:-25});
  prop(C,label,'ADBE Position',[x+205,y+249,0]);
  op('layer.set_props',{comp:C,layer:label,props:{motionBlur:true}});
  op('layer.set_parent',{comp:C,layer:label,parentLayer:parent,jump:true});
 }
}
// These native foreground planes clip the rails while remaining inside the same whole-scene container.
rect('S08_Center_Native_Panel',420,0,1560,1024,purple);
rect('S08_Rails_Top_Crop',0,0,2400,55,purple);
rect('S08_Rails_Bottom_Crop',0,955,2400,69,purple);
rect('S08_Left_Divider',414,0,12,1024,ink);
rect('S08_Right_Divider',1974,0,12,1024,ink);
const words=['Sudden','odds','shift'];
for(let n=0;n<words.length;n++){
 const name='S08_Condition_'+words[n],start=261+n;
 op('layer.create_text',{comp:C,name,text:words[n]});
 op('text.set_style',{comp:C,layer:name,font:'Pretendard-ExtraBold',fontSize:66,fillColor:ink,applyFill:true,applyStroke:false,tracking:-20});
 prop(C,name,'ADBE Position',[550,286,0]);
 if(n>0)expr(C,name,'ADBE Position',`var L=thisComp.layer('S08_Condition_${words[n-1]}');[L.position[0]+L.sourceRectAtTime(9,false).width+18,286,0];`);
 op('layer.set_props',{comp:C,layer:name,props:{inPoint:start/30,motionBlur:true}});
 op('text.add_animator',{comp:C,layer:name,name:'aftr_wordReveal_4frames_stagger1',properties:{'ADBE Text Position 3D':[0,80,0],'ADBE Text Opacity':0},selector:'range',rangeStart:0,rangeEnd:100,rangeOffset:0});
 const adv=['ADBE Text Properties','ADBE Text Animators',1,'ADBE Text Selectors',1,'ADBE Text Range Advanced'];
 for(const[key,value]of[['ADBE Text Range Type2',3],['ADBE Text Levels Max Ease',20],['ADBE Text Levels Min Ease',100]])op('property.set',{comp:C,layer:name,property:[...adv,key],value});
 op('expression.set',{comp:C,layer:name,property:[...adv,'ADBE Text Selector Max Amount'],expression:`var u=clamp((time*30-${start})/4,0,1);100*(1-u*u*u*(10+u*(-15+6*u)));`});
}
op('layer.create_text',{comp:C,name:'S08_Bets',text:'Bets'});
op('text.set_style',{comp:C,layer:'S08_Bets',font:'Pretendard-Black',fontSize:285,fillColor:ink,applyFill:true,applyStroke:false,tracking:-25});
prop(C,'S08_Bets','ADBE Position',[550,520,0]);
op('layer.set_props',{comp:C,layer:'S08_Bets',props:{inPoint:279/30,motionBlur:true}});
op('timeline.set_time',{comp:C,time:279/30});
op('layer.apply_preset',{comp:C,layer:'S08_Bets',path:'C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/Presets/Text/Scale/Scale In By Word.ffx'});
op('layer.create_text',{comp:C,name:'S08_auto-blocked',text:'auto-blocked'});
op('text.set_style',{comp:C,layer:'S08_auto-blocked',font:'Pretendard-Black',fontSize:245,fillColor:ink,applyFill:true,applyStroke:false,tracking:-40});
prop(C,'S08_auto-blocked','ADBE Position',[550,706,0]);
op('layer.set_props',{comp:C,layer:'S08_auto-blocked',props:{inPoint:281/30,motionBlur:true}});
op('mask.add',{comp:C,layer:'S08_auto-blocked',name:'Six_Frame_Left_To_Right_Reveal'});
op('mask.set_path',{comp:C,layer:'S08_auto-blocked',maskIndex:1,vertices:[[-10,-300],[1600,-300],[1600,50],[-10,50]],closed:true});
op('expression.set',{comp:C,layer:'S08_auto-blocked',property:['ADBE Mask Parade',1,'ADBE Mask Shape'],expression:'var u=clamp((time*30-281)/6,0,1);var q=u*u*u*(10+u*(-15+6*u));var right=-10+1610*q;createPath([[-10,-300],[right,-300],[right,50],[-10,50]],[],[],true);'});
op('layer.create_footage',{comp:W,sourceItemId:cid,name:'S08_ALL_CONTENT_NATIVE_ZOOM'});
op('layer.set_props',{comp:W,layer:'S08_ALL_CONTENT_NATIVE_ZOOM',props:{collapseTransformation:true,motionBlur:true,audioEnabled:false}});
// Reverse rail phase from the desired final guide layout: initial visible left cell is y=101..401.
// Its actual centre is (210,251); use the permitted anchor recalculation to guarantee full-frame coverage.
prop(W,'S08_ALL_CONTENT_NATIVE_ZOOM','ADBE Anchor Point',[210,251,0]);
const q='var u=clamp((time*30-252)/8,0,1);var q=u*u*u*(10+u*(-15+6*u));';
expr(W,'S08_ALL_CONTENT_NATIVE_ZOOM','ADBE Position',q+'[1200-990*q,512-261*q,0];');
expr(W,'S08_ALL_CONTENT_NATIVE_ZOOM','ADBE Scale',q+'[600-500*q,600-500*q,100];');
expr(W,'S08_ALL_CONTENT_NATIVE_ZOOM','ADBE Opacity','100*clamp((time*30-250)/2,0,1);');
op('layer.create_footage',{comp:M,sourceItemId:wid,name:'S08_WHOLE_SCENE_OVERLAY_CONTAINER'});
op('layer.set_props',{comp:M,layer:'S08_WHOLE_SCENE_OVERLAY_CONTAINER',props:{inPoint:250/30,outPoint:315/30,audioEnabled:false,motionBlur:false}});
op('comp.set_work_area',{comp:M,start:0,duration:10.5});
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:90000}},{name:'ae_save_project'},{name:'ae_do',args:{operation:'property.list',args:{comp:C,layer:'S08_Bets',property:['ADBE Text Properties','ADBE Text Animators']}}},{name:'ae_render_frame',args:{compNameOrId:M,time:287/30,outPath:pathRoot+'qa/shift-initial-F287.png'}}]});
