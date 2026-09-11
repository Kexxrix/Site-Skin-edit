import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync('../source-manifest.json','utf8'));
const asset=role=>manifest.assets.find(a=>a.role===role).path;
const old=JSON.parse(fs.readFileSync(asset('base_final_native_project_record'),'utf8'));
const current=JSON.parse(fs.readFileSync('qa/base-current-native-project.json','utf8'));
const unsaved=JSON.parse(fs.readFileSync('qa/preserved-unsaved-project.json','utf8'));
const excluded=[];
function norm(v,p=''){
 if(Array.isArray(v))return v.map((x,i)=>norm(x,p+'/'+i));
 if(!v||typeof v!=='object')return v;
 const result={};
 const dynamic=!!v.expression || (v.keyframes?.length>0) || (v.keys?.length>0) || (v.numKeys>0);
 for(const [k,x] of Object.entries(v)){
   if(k==='value' && dynamic){excluded.push(p+'/value');continue;}
   result[k]=norm(x,p+'/'+k);
 }
 return result;
}
function diff(a,b,p='',out=[]){
 if(typeof a==='number'&&typeof b==='number'&&Math.abs(a-b)<1e-7)return out;
 if(JSON.stringify(a)===JSON.stringify(b))return out;
 if(a&&b&&typeof a==='object'&&typeof b==='object')for(const k of new Set([...Object.keys(a),...Object.keys(b)]))diff(a[k],b[k],p+'/'+k,out);
 else out.push({path:p,before:a,after:b});
 return out;
}
function compare(a,b){const result=[];for(const item of a.items)diff(norm(item,item.name),norm(b.items.find(x=>x.id===item.id),item.name),item.name,result);for(const item of b.items)if(!a.items.some(x=>x.id===item.id))result.push({added:item.id,name:item.name});return result;}
const structural=compare(old,current),unsavedStructural=compare(current,unsaved);
const raw=(p,f)=>execFileSync('ffmpeg.exe',['-v','error','-nostdin','-i',p,...(f===undefined?[]:['-vf',`select=eq(n\\,${f})`]),'-frames:v','1','-f','rawvideo','-pix_fmt','rgb24','pipe:1'],{maxBuffer:64*1024*1024});
function metrics(a,b){if(a.length!==b.length)throw Error('Frame dimensions differ');let changed=0,sum=0,squares=0,max=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);if(d)changed++;sum+=d;squares+=d*d;max=Math.max(max,d);}return{identical:changed===0,changed_channels:changed,total_channels:a.length,mae:sum/a.length,max_channel_difference:max,psnr_db:squares===0?null:10*Math.log10(255*255/(squares/a.length))};}
const frames=[];
for(const f of [0,39,70,100,114,124,135,155,163,170]){
 const suffix=String(f).padStart(3,'0');
 const p='qa/before-F'+suffix+'.png';
 const prior=path.join(path.dirname(asset('base_final_native_project_record')),'final-F'+suffix+'.png');
 const now=raw(p);
 const trueNative=path.join(path.dirname(prior),'final-reopened-F'+suffix+'.png');
 const entry={frame:f,historical_review_png:prior,historical_review_png_origin:'Extracted H.264 review frame, not a native AE PNG',current_native_png:p,historical_review_vs_current_native:metrics(raw(prior),now),baseline_h264_vs_current_native:metrics(raw(asset('base_mp4'),f),now),...(fs.existsSync(trueNative)?{historical_native_png:trueNative,native_before_vs_historical_native:metrics(raw(trueNative),now)}:{})};
 frames.push(entry);console.log(JSON.stringify(entry));
}
const result={checked_at:new Date().toISOString(),scope:'Before any added content: preserve changed source and compare to prior final native record and MP4',source_aep_sha256:createHash('sha256').update(fs.readFileSync(asset('base_aep'))).digest('hex'),historical_report_sha256:manifest.base_aep_discrepancy.historical_reported_sha256,byte_identical_to_historical:false,ignored_only_evaluated_dynamic_values:[...new Set(excluded)],numeric_tolerance:1e-7,structural_differences:structural,unsaved_vs_disk_structural_differences:unsavedStructural,frames,historical_binary_change_cause:'Not determined; serialized authored content and native frame comparison are reported separately, not a claim that the AEP binaries are identical.'};
fs.writeFileSync('qa/baseline-comparison.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({structural,unsavedStructural,nativeComparisons:frames.filter(f=>f.native_before_vs_historical_native)}));
