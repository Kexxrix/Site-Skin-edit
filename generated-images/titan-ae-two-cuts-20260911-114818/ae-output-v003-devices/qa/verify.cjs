const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const sharp=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const qa=__dirname,out=path.dirname(qa);
const read=n=>JSON.parse(fs.readFileSync(path.join(qa,n),'utf8'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const prop=(l,n)=>l.transformGroup.properties.find(p=>p.matchName===n);
const bbox=(data,x0,y0,x1,y1,predicate)=>{
 let minX=2400,minY=1024,maxX=-1,maxY=-1,count=0;
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=(y*2400+x)*4;if(predicate(data,i)){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);count++;}}
 return{minX,minY,maxX,maxY,width:maxX-minX+1,height:maxY-minY+1,pixels:count};
};
const raw=async file=>(await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true}));
(async()=>{
 const before=read('project-before.json'),after=read('project-after.json');
 const preservation=before.items.map(a=>({id:a.id,name:a.name,unchanged:JSON.stringify(a)===JSON.stringify(after.items.find(b=>b.id===a.id))}));
 assert(preservation.every(p=>p.unchanged),'Pre-existing project item changed');
 const originalFiles=read('session-start.json').sourceFiles.map(s=>{const b=fs.readFileSync(s.path),h=hash(b);assert.equal(h,s.sha256);assert.equal(b.length,s.bytes);return{path:s.path,bytes:b.length,sha256:h,unchanged:true};});
 const comp=after.items.find(i=>i.id===127),old=before.items.find(i=>i.id===84),get=n=>comp.layers.find(l=>l.name===n);
 assert.deepEqual([comp.width,comp.height,comp.pixelAspect,comp.frameRate,comp.duration],[2400,1024,1,30,3]);
 assert.equal(comp.layers.length,14);assert.equal(comp.motionBlur,false);
 const expected=[['C01_TXT_MEET','Meet','Pretendard-Regular'],['C01_TXT_TITAN','TITAN','Pretendard-SemiBold'],['C02_TXT_CORE','Core systems','Pretendard-Medium'],['C02_TXT_BUILT','Built','Pretendard-Bold'],['C02_TXT_IN_HOUSE','in-house','Pretendard-Medium']];
 for(const[n,t,font]of expected){
  const l=get(n),ol=old.layers.find(x=>x.name===n);
  assert.equal(l.text,t);assert.equal(l.font,font);assert.deepEqual(l.textGroup,ol.textGroup);
  for(const k of prop(l,'ADBE Scale').keyframes||[])assert.equal(k.value[0],k.value[1]);
  assert.equal(l.textGroup.groups.find(g=>g.matchName==='ADBE Text Animators').groups.length,0);
 }
 assert.equal(comp.layers.filter(l=>l.type==='TextLayer').length,5);
 assert.equal(comp.layers.filter(l=>l.type==='ShapeLayer').length,3);
 for(const name of ['REF_CUT_01','REF_CUT_02']){assert.equal(get(name).enabled,false);assert.equal(get(name).locked,true);}
 for(const l of comp.layers.filter(l=>l.name.startsWith('C01_')))assert.equal(l.outPoint,1.1);
 assert.equal(get('C02_BG_CHARCOAL_WIPE').inPoint,.8);
 assert.deepEqual(get('C02_BG_CHARCOAL_WIPE').transformGroup,old.layers.find(l=>l.name==='C02_BG_CHARCOAL_WIPE').transformGroup);
 assert(get('C01_DEVICE_IPHONE').index>get('C01_TXT_MEET').index&&get('C01_DEVICE_IPHONE').index<get('C01_BG_IVORY').index);
 assert(get('C02_DEVICE_IPAD').index>get('C02_TXT_CORE').index&&get('C02_DEVICE_IPAD').index<get('C02_BG_CHARCOAL_WIPE').index);
 for(const name of ['C01_DEVICE_IPHONE','C02_DEVICE_IPAD'])assert.equal(get(name).threeDLayer,false);
 const devices=after.items.filter(i=>i.id===151||i.id===163).map(d=>{
  assert.deepEqual([d.width,d.height,d.frameRate,d.duration],[2400,1024,30,3]);
  assert.equal(d.layers.filter(l=>l.type==='ThreeDModelLayer').length,1);
  const camera=d.layers.find(l=>l.type==='CameraLayer');assert(camera);
  assert(camera.transformGroup.properties.every(p=>!p.keyframes?.length));
  const model=d.layers.find(l=>l.type==='ThreeDModelLayer');
  assert.equal(prop(model,'ADBE Rotate X').value,90);
  assert.deepEqual(prop(model,'ADBE Position').value,[0,0,0]);
  const control=d.layers.find(l=>l.name.endsWith('_VIEW'));assert.equal(control.threeDLayer,true);
  assert.equal(model.parentIndex,control.index);
  return{name:d.name,model:model.name,type:model.type,baseScale:prop(model,'ADBE Scale').value,camera:camera.name,fixedCamera:true,control:control.name,positionKeys:prop(control,'ADBE Position').keyframes,scaleKeys:prop(control,'ADBE Scale').keyframes,yawKeys:prop(control,'ADBE Rotate Y').keyframes,rollKeys:prop(control,'ADBE Rotate Z').keyframes};
 });
 const delivery=read('native-delivery-state.json').result.results;
 assert.deepEqual(delivery.slice(0,3).map(r=>r.renderer),['ADBE Advanced 3d','ADBE Calder','ADBE Calder']);
 assert.equal(delivery[3].numItems,0);assert.equal(delivery[3].rendering,false);
 const propertyTests=read('property-tests-final.json');assert.equal(propertyTests.length,119);assert(propertyTests.every(t=>t.pass));
 const renderLog=fs.readFileSync(path.join(qa,'render-v02-stdout.log'),'utf8');
 assert(!/ERROR|WARNING|missing/i.test(renderLog));assert(renderLog.includes('End: 00089')&&renderLog.includes('Duration: 00090'));
 // This run's stdout stops at F88. Completion is established below by 90 fresh, decodable PNGs, including F89, and the MP4 full-decode test.
 assert.equal(fs.readFileSync(path.join(qa,'render-v02-stderr.log'),'utf8').trim(),'');
 const names=fs.readdirSync(path.join(out,'render-frames-v02')).filter(n=>/^TITAN-v003-\d{3}\.png$/.test(n)).sort();
 assert.equal(names.length,90);const frames=[],frameData=new Map(),deviceBoxes=[],gaps=[];
 for(let f=0;f<90;f++){
  assert.equal(names[f],'TITAN-v003-'+String(f).padStart(3,'0')+'.png');
  const file=path.join(out,'render-frames-v02',names[f]),bytes=fs.readFileSync(file),{data,info}=await raw(file);
  assert.deepEqual([info.width,info.height,info.channels],[2400,1024,4]);
  for(let i=3;i<data.length;i+=4)assert.equal(data[i],255,'Nonopaque F'+f);
  if([0,33,34].includes(f)){const c=f===0?[245,243,238]:[36,38,42];for(let i=0;i<data.length;i+=4)assert(data[i]===c[0]&&data[i+1]===c[1]&&data[i+2]===c[2],'Nonuniform F'+f);}
  frames.push({frame:f,bytes:bytes.length,sha256:hash(bytes),pixelSha256:hash(data),width:info.width,height:info.height,opaque:true});
  if([18,75].includes(f))frameData.set(f,data);
  if(f>=55&&f<=64){
   const device=bbox(data,1850,0,2400,1024,(a,i)=>Math.max(Math.abs(a[i]-36),Math.abs(a[i+1]-38),Math.abs(a[i+2]-42))>8);
   const text=bbox(data,1100,480,1850,650,(a,i)=>a[i]>65&&Math.max(Math.abs(a[i]-a[i+1]),Math.abs(a[i+1]-a[i+2]))<9);
   const u=(f-55)/9,offset=120*Math.pow(1-u,3);
   const blur=f<=57?14+(9-14)*(f-55)/2:f<=61?9*(61-f)/4:0;
   const conservativeTextRight=1742.447241932154+offset+blur;
   const gap=device.minX-conservativeTextRight;
   assert(gap>=60,'Device / text clearance F'+f);
   gaps.push({frame:f,deviceLeft:device.minX,textPixelRight:text.pixels?text.maxX:null,textPixelGap:text.pixels?device.minX-text.maxX:null,conservativeTextRight,conservativeGap:gap,blurLength:blur});
  }
 }
 for(let f=14;f<=24;f++)assert.equal(frames[f].pixelSha256,frames[14].pixelSha256,'Cut1 hold changed F'+f);
 for(let f=64;f<90;f++)assert.equal(frames[f].pixelSha256,frames[64].pixelSha256,'Cut2 hold changed F'+f);
 const comparisons=[];
 for(const f of [18,75]){
  const current=frameData.get(f),prior=(await raw(path.join(out,'../ae-output-v002/frames/frame-'+String(f).padStart(3,'0')+'.png'))).data;
  let changed=0,maxDelta=0;for(let y=0;y<1024;y++)for(let x=0;x<1800;x++){const i=(y*2400+x)*4;let d=0;for(let c=0;c<4;c++)d=Math.max(d,Math.abs(current[i+c]-prior[i+c]));if(d)changed++;maxDelta=Math.max(maxDelta,d);}
  assert.equal(changed,0,'Settled typography/reference region changed');
  comparisons.push({frame:f,region:[0,0,1800,1024],changedPixels:changed,maxChannelDelta:maxDelta,pixelIdentical:true});
 }
 const phone=bbox(frameData.get(18),1750,0,2400,1024,(a,i)=>Math.max(Math.abs(a[i]-245),Math.abs(a[i+1]-243),Math.abs(a[i+2]-238))>8);
 assert(phone.minX>=1820&&phone.maxX<=2340&&phone.minY>=90&&phone.maxY<=950&&phone.height>=720&&phone.height<=820);
 const phoneGap=phone.minX-1635.4052734375;assert(phoneGap>=100);
 const pad=bbox(frameData.get(75),1850,0,2400,1024,(a,i)=>Math.max(Math.abs(a[i]-36),Math.abs(a[i+1]-38),Math.abs(a[i+2]-42))>8);
 assert(pad.minX>=1850);
 const padRaw=(await raw(path.join(qa,'ipad-final-full-075.png'))).data;
 const fullPad=bbox(padRaw,0,0,2400,1024,(a,i)=>a[i+3]>8);assert(fullPad.width>=820&&fullPad.width<=900&&fullPad.height>=560&&fullPad.height<=650);
 let fullAlpha=0,visibleAlpha=0;for(let y=0;y<1024;y++)for(let x=0;x<2400;x++){const alpha=padRaw[(y*2400+x)*4+3]/255;fullAlpha+=alpha;if(x+1096<2400)visibleAlpha+=alpha;}
 const visibleRatio=visibleAlpha/fullAlpha;assert(visibleRatio>.5);
 const mp4=path.join(out,'TITAN-TwoCuts-Devices-Kinetic-3s-v003.mp4');
 const probeRun=spawnSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',mp4],{encoding:'utf8',windowsHide:true});assert.equal(probeRun.status,0);
 const probe=JSON.parse(probeRun.stdout),stream=probe.streams[0];
 assert.equal(probe.streams.length,1);assert.equal(stream.codec_type,'video');assert.equal(stream.codec_name,'h264');
 assert.deepEqual([stream.width,stream.height,stream.pix_fmt,stream.avg_frame_rate,stream.nb_frames,stream.display_aspect_ratio,stream.sample_aspect_ratio],[2400,1024,'yuv420p','30/1','90','75:32','1:1']);
 assert.equal(Number(probe.format.duration),3);
 const decode=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-i',mp4,'-map','0:v:0','-f','null','NUL'],{encoding:'utf8',windowsHide:true});
 assert.equal(decode.status,0);assert.equal(decode.stderr.trim(),'');
 const outputs=['TITAN-TwoCuts-Devices-Kinetic-3s-v003.aep','TITAN-TwoCuts-Devices-Kinetic-3s-v003.mp4','frames-final/F018.png','frames-final/F075.png'].map(n=>{const b=fs.readFileSync(path.join(out,n));return{path:n,bytes:b.length,sha256:hash(b)};});
 assert.equal(outputs[0].sha256,'4a9dc134c061b0d64eebddefb0e2b36b45750abeeb1dc6851e541d01ac585b1a','Rendered AEP changed');
 const selected=fs.readdirSync(path.join(out,'frames-final')).filter(n=>/^F\d{3}\.png$/.test(n)).map(n=>{const f=Number(n.slice(1,4));assert.equal(hash(fs.readFileSync(path.join(out,'frames-final',n))),frames[f].sha256);return{file:n,sourceFrame:f,identicalCopy:true};});
 console.log(JSON.stringify({status:'passed',aeVersion:after.aeVersion,comp:{name:comp.name,width:2400,height:1024,fps:30,duration:3,frames:90,pixelAspect:1},originalProjectItems:preservation,originalFiles,textContent:'5 native TextLayers; original TextDocument and typography content preserved',renderer:{master:'Classic 3D',devices:'Advanced 3D',interactiveQueueUnchanged:true},devices,propertyTests:{total:119,passed:119,maxError:Math.max(...propertyTests.map(t=>t.error))},frameChecks:{count:90,allOpaque:true,F00:'uniform #F5F3EE',F33:'uniform #24262A',F34:'uniform #24262A; opacity zero on start keys',cut1Hold:'F14-F24 pixel-identical',cut2Hold:'F64-F89 pixel-identical',renderWarnings:0,renderErrors:0},settledComparisons:comparisons,deviceLayout:{phone:{...phone,textGap:phoneGap},ipad:{visible:pad,full:fullPad,alphaAreaVisibleFraction:visibleRatio,visibleAreaPercent:visibleRatio*100,finalTextGap:pad.minX-1742.447241932154},inHouseEntryGaps:gaps,minConservativeGap:Math.min(...gaps.map(g=>g.conservativeGap)),conservativeGapMethod:'Device left from rendered pixels; in-house sourceRect right plus specified cubic-out offset plus full blur length as safety envelope'},media:{probe,fullDecode:{exitCode:decode.status,stderr:decode.stderr}},outputs,selectedFrames:selected,frames},null,2));
})().catch(e=>{console.error(e.stack);process.exit(1)});
