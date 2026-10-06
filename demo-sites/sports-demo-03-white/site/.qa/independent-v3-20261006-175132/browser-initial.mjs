import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const q=path.dirname(fileURLToPath(import.meta.url));
const errors=[],requests=[],http=[],consoleLog=[];
const b=await chromium.launch({channel:'chrome',headless:true});
const c=await b.newContext({viewport:{width:1920,height:1080}});
const p=await c.newPage();
p.on('pageerror',e=>errors.push(String(e)));p.on('requestfailed',r=>requests.push({url:r.url(),error:r.failure()}));p.on('response',r=>{if(r.status()>=400)http.push({url:r.url(),status:r.status()})});p.on('console',m=>{if(['error','warning'].includes(m.type()))consoleLog.push({type:m.type(),text:m.text()})});
try{
await p.goto('http://127.0.0.1:5384/',{waitUntil:'networkidle',timeout:60000});await p.locator('.ab5-shell').waitFor();await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:path.join(q,'01-current-1920.png')});
const data=await p.evaluate(()=>({title:document.title,url:location.href,bodyClass:document.body.className,dimensions:{viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth},stylesheets:[...document.styleSheets].map(s=>({href:s.href,owner:s.ownerNode.outerHTML.slice(0,300)})),icons:[...document.querySelectorAll('img[src*="aldebaran-simple-v3"]')].map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),par=e.parentElement,pr=par.getBoundingClientRect();return {src:e.getAttribute('src'),class:e.className,parent:par.className,label:par.innerText,key:e.dataset.aldebaranIconV3,rect:r.toJSON(),parentRect:pr.toJSON(),loaded:e.complete&&e.naturalWidth>0,filter:s.filter,mask:s.maskImage,opacity:s.opacity,objectFit:s.objectFit}}),buttons:[...document.querySelectorAll('button')].slice(0,100).map(e=>({class:e.className,text:e.innerText,aria:e.getAttribute('aria-label'),disabled:e.disabled,pressed:e.getAttribute('aria-pressed')})),inputs:[...document.querySelectorAll('input')].map(e=>({placeholder:e.placeholder,aria:e.getAttribute('aria-label')})),broken:[...document.images].filter(e=>!e.complete||e.naturalWidth===0).map(e=>e.src)}));
data.errors=errors;data.failedRequests=requests;data.httpErrors=http;data.console=consoleLog;fs.writeFileSync(path.join(q,'browser-initial.json'),JSON.stringify(data,null,2));
console.log(JSON.stringify({...data,stylesheets:data.stylesheets.map(s=>({href:s.href,owner:s.owner.slice(0,100)}))},null,2));
}finally{await c.close();await b.close()}
