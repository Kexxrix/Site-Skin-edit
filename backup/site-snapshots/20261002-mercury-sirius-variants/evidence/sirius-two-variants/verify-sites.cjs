const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const out=__dirname;
const phase=process.argv[2]||'local';
const targets=phase==='public'?[['white','https://sirius.kexxadrix.chatgpt.site/'],['deepblue','https://sirius-2.kexxadrix.chatgpt.site/']]:[['white','http://127.0.0.1:5392/'],['deepblue','http://127.0.0.1:5393/']];
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{for(const [theme,url] of targets){
  const context=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const page=await context.newPage(),errors=[],failed=[],bad=[];
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()})});
  const r=await page.goto(url,{waitUntil:'networkidle',timeout:90000});assert.equal(r.status(),200);
  await page.locator('.sr-card').first().waitFor();await page.evaluate(()=>document.fonts.ready);
  const initial=await page.evaluate(()=>{
   const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
   const style=s=>{const c=getComputedStyle(document.querySelector(s));return {background:c.backgroundColor,color:c.color,font:c.fontFamily}};
   const bar=rect('.sr-sportbar'),tabs=rect('.sr-sport-tabs');
   return {title:document.title,header:rect('.sr-header'),body:rect('.sr-body'),shell:rect('.sr-shell'),center:rect('.sr-center'),panels:[...document.querySelectorAll('.sr-body > *')].map(e=>({y:e.getBoundingClientRect().y,width:e.getBoundingClientRect().width})),logo:rect('.sr-wordmark-crop'),summary:rect('.sr-slip-summary'),summaryRows:[...document.querySelectorAll('.sr-summary-row')].map(e=>({height:e.getBoundingClientRect().height,font:getComputedStyle(e).fontSize})),bar,tabs,tabCenterDelta:tabs.y+tabs.height/2-bar.y-bar.height/2,tabCount:document.querySelectorAll('.sr-sport-tab').length,games:document.querySelectorAll('.sr-card').length,banners:[...document.querySelectorAll('.sr-mini-banner')].map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})),age:document.querySelector('.sr-mini-banner:last-child').textContent,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),headerStyle:style('.sr-header'),shellStyle:style('.sr-shell'),fontReady:document.fonts.check('16px "Pretendard JP"'),frameworkOverlay:!!document.querySelector('vite-error-overlay,nextjs-portal')};
  });
  assert.equal(initial.header.height,110);assert.equal(initial.body.y,110);assert.equal(initial.shell.width,1920);assert.equal(initial.center.width,1244);assert(initial.panels.every(x=>x.y===117));assert.equal(initial.logo.width,218);assert.equal(initial.tabCount,10);assert.equal(initial.games,61);assert(Math.abs(initial.tabCenterDelta)<1);assert.equal(initial.banners.length,6);assert(initial.age.includes('19'));assert.equal(initial.brokenImages.length,0);assert.equal(initial.frameworkOverlay,false);assert.equal(initial.fontReady,true);
  await page.screenshot({path:path.join(out,`${phase}-${theme}-1920.png`),fullPage:false});
  const first=page.locator('.sr-card').first();const firstOdd=first.locator('.sr-odd').filter({has:page.locator('.sr-odd-value',{hasText:/^1\.56$/})}).first();await firstOdd.click();await page.locator('#stake').fill('10000');
  const summary=()=>page.locator('.sr-summary-row').allTextContents();
  const single=await summary();assert(single[0].includes('1.56'));assert(single[1].includes('15,600'));assert(await page.locator('.sr-bet-submit').isDisabled());
  const second=page.locator('.sr-card').filter({has:page.locator('.sr-odd-value',{hasText:/^1\.51$/})}).first();await second.locator('.sr-odd').filter({has:page.locator('.sr-odd-value',{hasText:/^1\.51$/})}).first().click();
  const double=await summary();assert(double[0].includes('2.36'));assert(double[1].includes('23,556'));assert(await page.locator('.sr-bet-submit').isDisabled());
  await page.locator('.sr-slip-summary').screenshot({path:path.join(out,`${phase}-${theme}-calculation.png`)});
  await page.locator('.sr-delete').click();assert.equal(await page.locator('.sr-slip-selection').count(),0);
  await page.locator('.sr-header-utilities').getByRole('button',{name:'고객센터',exact:true}).click();await page.getByRole('dialog').waitFor();assert((await page.getByRole('dialog').textContent()).includes('고객센터'));await page.getByRole('button',{name:'닫기',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});
  await page.locator('.sr-reset').click();await page.mouse.move(950,100);
  await page.setViewportSize({width:1366,height:900});await page.waitForTimeout(350);
  const narrow=await page.evaluate(()=>({viewport:innerWidth,scroll:document.querySelector('.sirius-site').scrollWidth,shell:document.querySelector('.sr-shell').getBoundingClientRect().width}));assert.equal(narrow.shell,1920);assert(narrow.scroll>=1920);
  await page.screenshot({path:path.join(out,`${phase}-${theme}-1366-left.png`)});await page.evaluate(()=>document.querySelector('.sirius-site').scrollTo(1920,0));await page.waitForTimeout(150);await page.screenshot({path:path.join(out,`${phase}-${theme}-1366-right.png`)});
  const result={theme,url,phase,initial,single,double,narrow,errors,failed,bad,browser:'Chrome Playwright; Browser plugin not available',status:'passed'};
  fs.writeFileSync(path.join(out,`${phase}-${theme}-verification.json`),JSON.stringify(result,null,2));
  assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(bad.length,0,JSON.stringify(bad));assert.equal(failed.filter(x=>x.error!=='net::ERR_ABORTED').length,0,JSON.stringify(failed));
  console.log(JSON.stringify({theme,phase,status:'passed',title:initial.title,header:initial.header.height,games:initial.games,errors:errors.length,bad:bad.length,single:single.slice(0,2),double:double.slice(0,2)}));await context.close();
 }}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
