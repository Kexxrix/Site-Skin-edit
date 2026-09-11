import {run,outDir} from './ae-client.mjs';
import {writeFile} from 'node:fs/promises';
const originals=[1,32,114,277,261,163,151,84,127];
const layerRead=id=>({name:'ae_layer_info',args:{compNameOrId:id,layerIndex:'all'}});
const readCalls=()=>[...originals.map(layerRead),{name:'ae_do',args:{operation:'project.get_settings',args:{}}}];
// Save every current QA edit before switching files; never save into Baseline.
await run({write:true,label:'save-final',calls:[{name:'ae_project_info'},{name:'ae_save_project',args:{path:outDir+'TITAN-TwoScene-v004-Final.aep'}}]});
const finalBefore=await run({label:'final-before-originals',calls:readCalls()});
const baseline=await run({write:true,label:'baseline-originals',calls:[{name:'ae_do',args:{operation:'project.open',args:{path:outDir+'TITAN-TwoScene-v004-Baseline.aep',save:false}}},...readCalls()]});
const finalAfter=await run({write:true,label:'final-reopened',calls:[{name:'ae_do',args:{operation:'project.open',args:{path:outDir+'TITAN-TwoScene-v004-Final.aep',save:false}}},...readCalls(),{name:'ae_project_info'},{name:'ae_do',args:{operation:'marker.list',args:{comp:330}}}]});
function stable(v){
 if(Array.isArray(v))return v.map(stable);
 if(v&&typeof v==='object'){
  const result={};for(const [k,x]of Object.entries(v)){
   if(k==='value'&&(v.keyframes?.length||v.expression))continue;
   if(k==='file'||k==='numItems')continue;
   result[k]=stable(x);
  }return result;
 }if(typeof v==='number')return Math.round(v*1e7)/1e7;return v;
}
const preservation=originals.map(id=>{
 const find=rs=>rs.find(x=>x.call.name==='ae_layer_info'&&x.call.args.compNameOrId===id).response.result;
 return {compId:id,compName:find(baseline).compName,unchanged:JSON.stringify(stable(find(baseline)))===JSON.stringify(stable(find(finalAfter))),reopenStable:JSON.stringify(stable(find(finalBefore)))===JSON.stringify(stable(find(finalAfter)))};
});
const settings=rs=>rs.find(x=>x.call.args?.operation==='project.get_settings').response.result;
const projectSettingsPreserved=JSON.stringify(stable(settings(baseline)))===JSON.stringify(stable(settings(finalAfter)));
const checks=[];
for(const comp of [330,405])for(const frame of [166,167,174,210,214])checks.push({operation:'property.get',args:{comp,layer:'C02_TYPE_RECOIL_CTRL',property:['Transform','Position'],time:frame/30}});
for(const [comp,time,layers]of [[127,.6,['C01_TXT_MEET','C01_TXT_TITAN']],[330,3.1,['C01_TXT_MEET','C01_TXT_TITAN']],[127,2.5,['C02_TXT_CORE','C02_TXT_BUILT','C02_TXT_IN_HOUSE']],[330,7.5,['C02_TXT_CORE','C02_TXT_BUILT','C02_TXT_IN_HOUSE']]])for(const layer of layers)checks.push({operation:'layer.bounds',args:{comp,layer,time}});
const inspected=await run({label:'final-editability-bounds',calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops:checks,stopOnError:true}}}]});
await writeFile(new URL('./PRESERVATION-AND-EDITABILITY.json',import.meta.url),JSON.stringify({method:'Compare live baseline and final original layer/property trees, ignore only evaluated values of animated/expression properties, round numeric comparisons to 1e-7, omit current file and item count for project settings.',preservation,projectSettingsPreserved,allOriginalsPreserved:preservation.every(x=>x.unchanged&&x.reopenStable),checks,results:inspected[0].response.result.results},null,2),{flag:'wx'});
await run({write:true,label:'reopened-keyframes',calls:[...[[330,3.1,'reopened-c01-settle'],[330,167/30,'reopened-contact'],[330,239/30,'reopened-final']].map(([compNameOrId,time,name])=>({name:'ae_render_frame',args:{compNameOrId,time,outPath:outDir+name+'.png'}})),{name:'ae_layer_info',args:{compNameOrId:330,layerIndex:'all'}},{name:'ae_layer_info',args:{compNameOrId:356,layerIndex:'all'}}]});
console.log(JSON.stringify({preservation,projectSettingsPreserved},null,2));
