import fs from 'node:fs';
import {run,pathRoot} from './ae-client.mjs';
const M='TITAN_MASTER_20S',C='SCENE08_SHIFT_NATIVE',W='SCENE08_WHOLE_OVERLAY_180DEG';
if (!process.argv.includes('--resume-after-guides')) {
const current=await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops:[
{operation:'project.import_file',args:{path:'E:/codexwork/Site-Skin-edit/generated-images/titan-feedback01-motion-guides-20260911-195303/results/04-sportsbook-no-repeated-arc-v002.png',name:'GUIDE_06_SPORTSBOOK_FINAL'}},
{operation:'project.import_file',args:{path:'E:/codexwork/Site-Skin-edit/generated-images/titan-scenes-04-06-guides-20260911-192815/results/05-operations-refined-snap.png',name:'GUIDE_07_OPERATIONS_FINAL'}},
{operation:'project.import_file',args:{path:'E:/codexwork/Site-Skin-edit/generated-images/titan-scenes-04-06-guides-20260911-192815/results/06-bets-auto-blocked-stop.png',name:'GUIDE_08_AUTO_BLOCKED_FINAL'}}],stopOnError:true}}}]});
const guides=current[0].response.result.results;
const guideOps=guides.flatMap((g,i)=>{
const comp=['SCENE06_SPORTSBOOK','SCENE07_OPERATIONS',C][i];
return [{operation:'layer.create_footage',args:{comp,sourceItemId:g.id,name:g.name}},{operation:'property.set',args:{comp,layer:g.name,property:['ADBE Transform Group','ADBE Scale'],value:[125,125,100]}},{operation:'layer.set_props',args:{comp,layer:g.name,props:{enabled:false,guideLayer:true,locked:true}}}];});
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops:guideOps,stopOnError:true}}},{name:'ae_save_project'},{name:'ae_do',args:{operation:'project.open',args:{path:pathRoot+'TITAN-Production-v002.aep',save:false}}},{name:'ae_project_export_json',args:{outPath:pathRoot+'qa/final-native-project.json'}}]});
}
await run({write:false,compact:true,calls:[{name:'ae_comp_info',args:{nameOrId:[M,'DEVICE_iPhone17_3D','SCREEN_iPhone17_VIDEO_CONTAIN','SCENE06_SPORTSBOOK','SCENE07_OPERATIONS',C,W]}},{name:'ae_do',args:{operation:'batch.run',args:{ops:[{operation:'footage.list_missing',args:{}},{operation:'font.list_missing',args:{}},{operation:'font.list_used',args:{}},{operation:'render.status',args:{}}],stopOnError:true}}}]});
const checks=[],add=(category,comp,layer,property,frames)=>{for(const f of frames)checks.push({category,frame:f,comp,layer,property});};
const T='ADBE Transform Group';
add('shared_dot',M,'SHARED_DOT_ENDPOINT',[T,'ADBE Position'],[163,164,170,171,174,177,180,182,220,222]);
add('scroll',M,'SCROLL_CAT_TO_SPORTSBOOK_F171_180',[T,'ADBE Position'],[163,164,170,171,174,177,180,182]);
for(const key of ['ADBE Position','ADBE Scale','ADBE Opacity'])add('whole_overlay',W,'S08_ALL_CONTENT_NATIVE_ZOOM',[T,key],[250,251,252,254,256,258,260,261]);
for(const key of ['ADBE Position','ADBE Scale'])add('operations_fixed',M,'S07_OPERATIONS_FIXED_CONTAINER',[T,key],[250,252,258,260]);
for(const layer of['S08_LEFT_RAIL_MOTION','S08_RIGHT_RAIL_MOTION'])add('rail_hold',C,layer,[T,'ADBE Position'],[250,260,262,267,273,278,279,280,287,314]);
for(const word of['Sudden','odds','shift'])add('word_reveal',C,'S08_Condition_'+word,['ADBE Text Properties','ADBE Text Animators',1,'ADBE Text Selectors',1,'ADBE Text Range Advanced','ADBE Text Selector Max Amount'],[260,261,262,263,267]);
add('bets_position',C,'S08_Bets',[T,'ADBE Position'],[278,279,280,284,287,314]);
const samples=await run({write:false,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops:checks.map(c=>({operation:'property.get',args:{comp:c.comp,layer:c.layer,property:c.property,time:c.frame/30}})),stopOnError:true},timeoutMs:90000}}]});
fs.writeFileSync('qa/native-property-samples.json',JSON.stringify(checks.map((c,i)=>({...c,result:samples[0].response.result.results[i]})),null,2));
const protectedFrames=[0,39,70,100,114,124,135,155,163];
const boundaryFrames=[164,170,171,174,177,180,182,200,219,220,222,225,228,232,234,242,249,250,251,252,254,256,258,260,262,267,273,278,279,280,284,287,314];
await run({write:false,compact:true,calls:[...protectedFrames,...boundaryFrames].map(f=>({name:'ae_render_frame',args:{compNameOrId:M,time:f/30,outPath:pathRoot+'qa/final-native-F'+String(f).padStart(3,'0')+'.png'}}))});
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops:[
{operation:'render.add_to_queue',args:{comp:M}},
{operation:'render.set_output',args:{renderTemplate:'Best Settings',outputTemplate:'H.264 - Match Render Settings - 40 Mbps',outputPath:pathRoot+'TITAN-Review-v002.mp4',timeSpanStart:0,timeSpanDuration:10.5,skipFrames:0,logType:'errorsAndSettings'}},
{operation:'render.set_om_settings',args:{settings:{'Output Audio':'Off'}}}],stopOnError:true}}},{name:'ae_save_project'},{name:'ae_do',args:{operation:'render.start',timeoutMs:600000}},{name:'ae_save_project'},{name:'ae_do',args:{operation:'render.status'}}]});
