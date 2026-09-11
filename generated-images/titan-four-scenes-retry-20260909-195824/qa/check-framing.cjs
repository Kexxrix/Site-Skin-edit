const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const base=path.resolve(__dirname,'..');
const names=['01-development-planning.png','02-customer-support.png','03-technical-meeting.png','04-idea-meeting.png'];
const labels=['01 Development / planning','02 Customer support','03 Technical meeting','04 Idea meeting'];
const sources=names.map((name,index)=>{const source=path.join(base,'results',name);const data=fs.readFileSync(source);return{name,label:labels[index],source,sha256:crypto.createHash('sha256').update(data).digest('hex'),uri:'data:image/png;base64,'+data.toString('base64')};});
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 try{
  const page=await browser.newPage({deviceScaleFactor:1});
  const results=[];
  const adjustedOnly=process.argv.includes('--adjusted');
  const sizes=adjustedOnly?[{sourceViewport:1024,width:236.5,height:400,canvasWidth:1120,adjusted:true}]:[{sourceViewport:1440,width:312.5,height:400,canvasWidth:1440},{sourceViewport:1024,width:236.5,height:400,canvasWidth:1120}];
  for(const size of sizes){
   await page.setViewportSize({width:size.canvasWidth,height:510});
   await page.setContent('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#090909;color:#ddd;font-family:Arial,sans-serif}body{padding:24px}h1{margin:0 0 20px;font-size:18px;font-weight:500}.row{display:flex;gap:24px}.item{flex:none;width:'+size.width+'px}.label{font-size:13px;margin-bottom:10px;line-height:18px}.slot{width:'+size.width+'px;height:'+size.height+'px;overflow:hidden;border-radius:12px;background:#090909}.slot img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%}</style></head><body><h1>QA only | Site viewport '+size.sourceViewport+'px | Photo slot '+size.width+' x '+size.height+'px | object-fit: cover; 50% 50%</h1><div class="row">'+sources.map(s=>'<div class="item"><div class="label">'+s.label+'</div><div class="slot"><img src="'+s.uri+'" alt="'+s.label+'"></div></div>').join('')+'</div></body></html>');
   if(size.adjusted){
    await page.locator('img').evaluateAll(imgs=>{imgs[0].style.objectPosition='20% 50%';imgs[2].style.objectPosition='70% 50%';});
    await page.locator('h1').evaluate(el=>{el.textContent='QA suggestion only | 1024px site viewport | 236.5 x 400px slots | 01: 20% 50%; 03: 70% 50%; others centered';});
   }
   await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
   const actual=await page.evaluate(()=>({slots:[...document.querySelectorAll('.slot')].map((slot,index)=>{const r=slot.getBoundingClientRect(),img=slot.querySelector('img'),style=getComputedStyle(img);return{index:index+1,bounds:{x:r.x,y:r.y,width:r.width,height:r.height},naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,complete:img.complete,objectFit:style.objectFit,objectPosition:style.objectPosition};}),overflow:document.documentElement.scrollWidth>innerWidth}));
   const screenshot=path.join(__dirname,'slots-'+size.sourceViewport+(size.adjusted?'-adjusted':'')+'.png');
   if(fs.existsSync(screenshot))throw new Error('Screenshot already exists: '+screenshot);
   await page.screenshot({path:screenshot,fullPage:false});
   results.push({sourceViewport:size.sourceViewport,qaSuggestionOnly:!!size.adjusted,requestedSlot:{width:size.width,height:size.height},screenshot,...actual});
  }
  const sourceUnchanged=sources.every(s=>crypto.createHash('sha256').update(fs.readFileSync(s.source)).digest('hex')===s.sha256);
  const result={method:'Standalone headless Chrome page.setContent with inline CSS and unmodified image data URLs; no website changes.',background:'#090909',sourceUnchanged,sources:sources.map(({name,source,sha256})=>({name,source,sha256})),results};
  const reportPath=path.join(__dirname,'browser-framing.json');
  if(adjustedOnly&&fs.existsSync(reportPath)){const previous=JSON.parse(fs.readFileSync(reportPath,'utf8'));result.results=[...previous.results,...result.results];}
  fs.writeFileSync(reportPath,JSON.stringify(result,null,2));
  console.log(JSON.stringify(result,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
