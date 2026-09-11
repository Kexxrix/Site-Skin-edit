import {run,pathRoot} from './ae-client.mjs';
const comp='SCREEN_iPhone17_VIDEO_CONTAIN',layer='RECORDING_RED_DOT_MASK';
const x=385,y=94,r=26,k=r*0.5522847498;
const ops=[
 {operation:'layer.create_solid',args:{comp,name:layer,color:[0,0,0],width:1206,height:2622}},
 {operation:'mask.add',args:{comp,layer,name:'Only_Red_Recording_Dot'}},
 {operation:'mask.set_path',args:{comp,layer,maskIndex:1,vertices:[[x+r,y],[x,y+r],[x-r,y],[x,y-r]],inTangents:[[0,-k],[k,0],[0,k],[-k,0]],outTangents:[[0,k],[-k,0],[0,-k],[k,0]],closed:true}},
 {operation:'mask.set_props',args:{comp,layer,maskIndex:1,mode:'Add',feather:[2,2],opacity:100}},
 {operation:'layer.set_props',args:{comp,layer,props:{comment:'User requested hiding only the red recording dot. Original video and other status-bar UI preserved. Source-comp center (385,94), radius 26px, feather 2px.',locked:true}}}
];
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_save_project'},{name:'ae_do',args:{operation:'project.open',args:{path:pathRoot+'TITAN-Production-v002.aep',save:false}}},...[182,219].flatMap(f=>[{name:'ae_render_frame',args:{compNameOrId:comp,time:f/30,outPath:pathRoot+'qa/phone-dot-masked-contain-F'+f+'.png'}},{name:'ae_render_frame',args:{compNameOrId:'SCENE06_SPORTSBOOK',time:f/30,outPath:pathRoot+'qa/phone-dot-masked-F'+f+'.png'}}]) ]});
