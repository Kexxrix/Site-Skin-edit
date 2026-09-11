import {run} from './ae-client.mjs';
const root=new URL('./',import.meta.url).pathname.replace(/^\//,'');const M='TITAN_MASTER_20S';
const ops=[
{operation:'layer.move',args:{comp:M,layer:'S01_Line_Continuation',toIndex:9}},
{operation:'layer.move',args:{comp:M,layer:'S02_Subtle_Frame',toIndex:19}},
...['S03_CAT_Outline','S03_Casino_Outline','S03_Casino_Fill'].map(layer=>({operation:'layer.set_props',args:{comp:M,layer,props:{outPoint:5.7}}})),
{operation:'shape.add_rounded_corners',args:{comp:M,layer:'SHARED_LINE_01_to_03',groupIndex:1,radius:24}},
{operation:'timeline.set_time',args:{comp:M,time:155/30}},
{operation:'render.add_to_queue',args:{comp:M}},
{operation:'render.set_output',args:{queueIndex:2,renderTemplate:'Best Settings',outputTemplate:'H.264 - Match Render Settings - 40 Mbps',outputPath:root+'TITAN-Scenes01-03-v001.mp4',timeSpanStart:0,timeSpanDuration:5.7,skipFrames:0,logType:'errorsAndSettings'}},
{operation:'render.set_om_settings',args:{queueIndex:2,settings:{'Output Audio':'Off'}}}
];
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_save_project'},{name:'ae_do',args:{operation:'project.open',args:{path:root+'TITAN-Production-Scenes01-03-v001.aep',save:false}}},{name:'ae_render_frame',args:{compNameOrId:M,time:155/30,outPath:root+'qa/final-reopened-F155.png'}},{name:'ae_do',args:{operation:'render.start',timeoutMs:600000}},{name:'ae_save_project'},{name:'ae_project_export_json',args:{outPath:root+'qa/final-native-project.json'}}]});
