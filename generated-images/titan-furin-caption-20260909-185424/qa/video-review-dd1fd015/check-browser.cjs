const fs=require('node:fs');const path=require('node:path');
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const b=await chromium.launch({channel:'chrome',headless:true});
const p=await b.newPage({viewport:{width:1000,height:500},deviceScaleFactor:1});
const src='data:video/mp4;base64,'+fs.readFileSync('D:/WebDL/grok-dd1fd015-0a9b-496f-a748-f95391bdd7b5.mp4').toString('base64');
await p.setContent('<style>body{margin:30px;background:#111}video{display:block;width:937.5px;height:400px;object-fit:cover;border-radius:15px}</style><video muted preload="auto" src="'+src+'"></video>');
await p.waitForFunction(()=>document.querySelector('video').readyState>=2);
const meta=await p.locator('video').evaluate(v=>({width:v.videoWidth,height:v.videoHeight,duration:v.duration,display:[v.getBoundingClientRect().width,v.getBoundingClientRect().height]}));
for(const [time,name]of [[0,'start'],[0.5,'edit-start'],[4.5,'edit-end'],[6,'end']]){
await p.locator('video').evaluate(async(v,t)=>{if(Math.abs(v.currentTime-t)>.001){await new Promise(r=>{v.addEventListener('seeked',r,{once:true});v.currentTime=t})}await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));},time);
await p.locator('video').screenshot({path:path.join(__dirname,'at-page-'+name+'.png')});
}
await b.close();
fs.writeFileSync(path.join(__dirname,'browser-video-proof.json'),JSON.stringify({metadata:meta,method:'Actual MP4 decoded in Chrome video element with 937.5 x 400 CSS cover, matching the prior confirmed page container; paused at 0,0.5,4.5,6 seconds. Source video and live website unchanged.'},null,2));
console.log(JSON.stringify(meta));
})().catch(e=>{console.error(e);process.exit(1)});
