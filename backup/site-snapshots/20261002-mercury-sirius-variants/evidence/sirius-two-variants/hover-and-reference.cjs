const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{for(const [theme,port] of [['white',5392],['deepblue',5393]]){
 const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto('http://127.0.0.1:'+port+'/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 const casino=p.locator('[data-slm-menu="casino"]'),european=p.locator('[data-slm-menu="european"]');const base=(await casino.boundingBox()).height;assert.equal(await p.locator('[data-slm-menu]').count(),6);
 await casino.hover();await p.waitForFunction(()=>document.querySelector('[data-slm-menu="casino"]').dataset.expanded==='true');await p.waitForTimeout(400);const expanded=(await casino.boundingBox()).height;assert(Math.abs(expanded-base-72)<1);
 await p.mouse.move(950,50);await p.waitForFunction(()=>document.querySelector('[data-slm-menu="european"]').dataset.expanded==='true');
 const profile=p.locator('.sr-user-head .sr-small-action');await profile.hover();const profileStyle=await profile.evaluate(e=>({color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}));assert.equal(profileStyle.width,72);assert.equal(profileStyle.height,28);
 await p.mouse.move(950,50);await p.evaluate(()=>document.querySelector('.sr-body > aside:last-child').scrollTop=9999);await p.waitForTimeout(400);await p.screenshot({path:path.join(__dirname,`local-${theme}-reference-state.png`)});
 fs.writeFileSync(path.join(__dirname,`local-${theme}-hover.json`),JSON.stringify({theme,accordion:{count:6,base,expanded,delta:expanded-base,restored:true},profileStyle,status:'passed'},null,2));console.log(JSON.stringify({theme,status:'passed',accordionDelta:expanded-base}));await p.close();
}}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
