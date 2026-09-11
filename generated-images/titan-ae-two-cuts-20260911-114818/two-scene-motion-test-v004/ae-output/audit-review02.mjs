import {run,outDir} from './ae-client.mjs';
import {readFile,writeFile} from 'node:fs/promises';
const originals=[1,32,114,277,261,163,151,84,127];
const readLayer=id=>({name:'ae_layer_info',args:{compNameOrId:id,layerIndex:'all'}});
const records=await run({label:'review02-audit',calls:[...originals.map(readLayer),readLayer(330),readLayer(356),readLayer(458),readLayer(485),{name:'ae_comp_info',args:{nameOrId:[458,485,389]}},{name:'ae_do',args:{operation:'marker.list',args:{comp:458}}},{name:'ae_do',args:{operation:'footage.list_missing',args:{}}}]});
const baseline=JSON.parse(await readFile(new URL('./log-baseline-originals-2026-09-11T07-53-34-899Z.json',import.meta.url),'utf8')).results;
function stable(v,ignoreIdentity=false){
 if(Array.isArray(v))return v.map(x=>stable(x,ignoreIdentity));
 if(v&&typeof v==='object'){
  const r={};for(const [k,x]of Object.entries(v)){
   if(k==='value'&&(v.keyframes?.length||v.expression))continue;
   if(ignoreIdentity&&['id','compName','index'].includes(k))continue;
   r[k]=stable(x,ignoreIdentity);
  }return r;
 }return typeof v==='number'?Math.round(v*1e7)/1e7:v;
}
const layers=(data,id)=>data.find(x=>x.call.name==='ae_layer_info'&&x.call.args.compNameOrId===id).response.result;
const preservation=originals.map(id=>({compId:id,name:layers(baseline,id).compName,unchanged:JSON.stringify(stable(layers(baseline,id)))===JSON.stringify(stable(layers(records,id)))}));
const firstRead=JSON.parse(await readFile(new URL('./log-reopened-keyframes-2026-09-11T07-53-52-851Z.json',import.meta.url),'utf8')).results;
const review01Preserved=[330,356].map(id=>({compId:id,unchanged:JSON.stringify(stable(layers(firstRead,id)))===JSON.stringify(stable(layers(records,id)))}));
const oldMain=layers(records,330).layers,newMain=layers(records,458).layers;
const unchangedTypeAndGraphics=['C01_TXT_MEET','C01_TXT_TITAN','C01_ARC','C01_DOT','C02_TXT_CORE','C02_TXT_BUILT','C02_TXT_IN_HOUSE','C02_UNDERLINE','C02_TYPE_RECOIL_CTRL'].map(name=>({name,unchanged:JSON.stringify(stable(oldMain.find(x=>x.name===name),true))===JSON.stringify(stable(newMain.find(x=>x.name===name),true))}));
const model=layers(records,485).layers.find(x=>x.name==='DEVICE_iPad10_MODEL');
const screen=layers(records,485).layers.find(x=>x.name==='SCREEN_iPad10_VIDEO_SOURCE');
const noOldDeviceKeys=layers(records,485).layers.find(x=>x.name==='DEVICE_iPad_VIEW').transformGroup.properties.every(p=>!p.keyframes?.length);
const result={preservation,review01Preserved,unchangedTypeAndGraphics,allPassed:preservation.every(x=>x.unchanged)&&review01Preserved.every(x=>x.unchanged)&&unchangedTypeAndGraphics.every(x=>x.unchanged),iphoneExcluded:newMain.find(x=>x.name==='C01_DEVICE_IPHONE').enabled===false,modelType:model.type,screenSource:{enabled:screen.enabled,sourceId:screen.sourceId,sourceName:screen.sourceName},noOldDeviceKeys,missingFootage:records.at(-1).response.result};
await writeFile(outDir+'PRESERVATION-review02.json',JSON.stringify(result,null,2),{flag:'wx'});
console.log(JSON.stringify(result,null,2));
await run({write:true,label:'review02-preserve-final-and-prepare-playback',calls:[{name:'ae_do',args:{operation:'timeline.set_active_comp',args:{comp:458}}},{name:'ae_do',args:{operation:'timeline.set_time',args:{comp:458,time:3.1}}},{name:'ae_save_project',args:{path:outDir+'TITAN-TwoScene-v004-review-02.aep'}},{name:'ae_do',args:{operation:'project.import_file',args:{path:outDir+'TITAN-TwoScene-v004-review-02.mp4',name:'QA_PLAYBACK_Review02_MP4'}}},{name:'ae_do',args:{operation:'comp.create',args:{name:'QA_PLAYBACK_Review02_8s_30fps',width:2400,height:1024,fps:30,duration:8}}}]});
