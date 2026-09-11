import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const json=async p=>JSON.parse(await readFile(new URL(p,import.meta.url),'utf8'));
const manifest=await json('../source-manifest.json');
const sources=[];
for(const source of [...manifest.sourceFiles,...manifest.references.map(r=>({path:r.destination,bytes:r.bytes,sha256:r.sha256}))]){
 const path=source.path.replace(/\\+/g,'/'),data=await readFile(path),sha256=createHash('sha256').update(data).digest('hex');
 sources.push({path,bytes:data.length,sha256,unchanged:data.length===source.bytes&&sha256===source.sha256.toLowerCase()});
}
const artifacts=[];
for(const name of ['TITAN-TwoScene-v004-Baseline.aep','TITAN-TwoScene-v004-review-01.aep','TITAN-TwoScene-v004-review-01.mp4','TITAN-TwoScene-v004-Final.aep','TITAN-TwoScene-v004-before-review02.aep','TITAN-TwoScene-v004-review-02.aep','TITAN-TwoScene-v004-review-02.mp4']){
 const path=root+name,data=await readFile(path);
 artifacts.push({name,path,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')});
}
const mp4=root+'TITAN-TwoScene-v004-review-02.mp4';
const probe=spawnSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',mp4],{encoding:'utf8'});
if(probe.status!==0)throw Error(probe.stderr);
const metadata=JSON.parse(probe.stdout),v=metadata.streams.find(x=>x.codec_type==='video');
const formatPass=v.codec_name==='h264'&&v.pix_fmt==='yuv420p'&&v.width===2400&&v.height===1024&&v.r_frame_rate==='30/1'&&v.avg_frame_rate==='30/1'&&Number(v.nb_frames)===240&&Number(metadata.format.duration)===8&&v.sample_aspect_ratio==='1:1'&&v.display_aspect_ratio==='75:32'&&metadata.streams.every(x=>x.codec_type!=='audio');
const decode=spawnSync('ffmpeg',['-v','error','-i',mp4,'-f','null','-'],{encoding:'utf8'});
if(decode.status!==0)throw Error(decode.stderr);
const frames=[0,5,12,15,24,30,39,50,51,61,72,82,93,110,116,123,124,130,144,154,155,160,166,167,168,170,174,180,185,190,198,204,210,214,225,239];
await mkdir(root+'review-02-frames');
const expression=frames.map(n=>`eq(n,${n})`).join('+').replaceAll(',',String.fromCharCode(92)+',');
const extract=spawnSync('ffmpeg',['-v','error','-n','-i',mp4,'-vf',`select=${expression}`,'-fps_mode','vfr','-start_number','0',root+'review-02-frames/frame-%03d.png'],{encoding:'utf8'});
if(extract.status!==0)throw Error(extract.stderr);
const frameIndex=frames.map((frame,index)=>({file:`frame-${String(index).padStart(3,'0')}.png`,frame,time:frame/30}));
await writeFile(root+'review-02-frames/index.json',JSON.stringify(frameIndex,null,2),{flag:'wx'});
const easing=await json('./EASING-VERIFICATION-review02.json');
const check={createdAt:new Date().toISOString(),status:'technical_checks_complete_visual_playback_pending',sourceFiles:sources,sourcePreservationPassed:sources.every(x=>x.unchanged),artifacts,metadata,formatPass,fullDecode:{exitCode:decode.status,stderr:decode.stderr},frameExtraction:{exitCode:extract.status,count:frames.length,indexPath:root+'review-02-frames/index.json'},easing:{allPassed:easing.allPassed,directMaxNormalizedError:Math.max(...easing.cases.map(x=>x.maxNormalizedError)),dotNormalizedError:easing.dot.maxNormalizedError,dotDistancePixels:easing.dot.maxPathDistancePixels},visualApproval:'pending_user',siteAdoption:'not_requested'};
await writeFile(root+'VERIFICATION-technical-review02.json',JSON.stringify(check,null,2),{flag:'wx'});
console.log(JSON.stringify({formatPass,decodeExitCode:decode.status,sourcePreservationPassed:check.sourcePreservationPassed,sourceCount:sources.length,easing:check.easing,frames:frames.length,output:artifacts.at(-1)},null,2));
