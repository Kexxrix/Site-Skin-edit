import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)),'..');
const stage=process.argv[2]||'before';
const errors=[],warnings=[],failedRequests=[],httpErrors=[];
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1920,height:1080}});
const page=await context.newPage();
page.on('pageerror',e=>errors.push(String(e)));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
page.on('requestfailed',r=>failedRequests.push({url:r.url(),failure:r.failure()}));
page.on('response',r=>{if(r.status()>=400)httpErrors.push({url:r.url(),status:r.status()});});
try {
 await page.goto('http://127.0.0.1:5384/',{waitUntil:'networkidle',timeout:60000});
 await page.locator('.ab5-shell').waitFor({timeout:60000});
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:path.join(root,stage+'-1920.png')});
 const data=await page.evaluate(()=>{
  const geometry=selector=>Array.from(document.querySelectorAll(selector),e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {class:e.className,role:e.getAttribute('aria-label'),x:r.x,y:r.y,w:r.width,h:r.height,font:s.fontFamily,fontSize:s.fontSize,gap:s.gap,padding:s.padding};});
  return {title:document.title,bodyClass:document.body.className,text:document.body.innerText,fontsStatus:document.fonts.status,
   geometry:geometry('.ab5-header,.ab5-center,.ab5-rail,.ab5-sport-tab,.ab5-quick-action,.ab5-user-actions button,.ab5-notice-links button,.ab5-bet-submit'),
   icons:Array.from(document.querySelectorAll('[data-graphite-icon]'),e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {key:e.dataset.graphiteIcon,src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0,w:r.width,h:r.height,filter:s.filter,mask:s.maskImage,opacity:s.opacity,parent:e.parentElement.className};}),
   selectionIds:Array.from(document.querySelectorAll('[data-selection-id]'),e=>e.dataset.selectionId),
   brokenImages:Array.from(document.images).filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),
   buttons:Array.from(document.querySelectorAll('button'),e=>({text:e.innerText,aria:e.getAttribute('aria-label'),class:e.className,disabled:e.disabled})).slice(0,100),
   inputs:Array.from(document.querySelectorAll('input'),e=>({placeholder:e.placeholder,type:e.type,aria:e.getAttribute('aria-label')}))};
 });
 data.url=page.url();data.errors=errors;data.warnings=warnings;data.failedRequests=failedRequests;data.httpErrors=httpErrors;
 await fs.writeFile(path.join(root,stage+'-browser.json'),JSON.stringify(data,null,2));
 console.log(JSON.stringify({stage,url:data.url,title:data.title,body:data.bodyClass,icons:data.icons,brokenImages:data.brokenImages,errors,warnings,failedRequests,httpErrors,inputs:data.inputs}));
}finally{await context.close();await browser.close();}
