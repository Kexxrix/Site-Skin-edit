import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)),'..');
const resume=process.argv[2]==='resume';
const prior=resume?JSON.parse(await fs.readFile(path.join(root,'interaction-qa.json'),'utf8')):null;
if(prior)await fs.writeFile(path.join(root,'interaction-qa-attempt1.json'),JSON.stringify(prior,null,2),{flag:'wx'});
const checks=prior?prior.checks:[],consoleErrors=[],warnings=[],pageErrors=[],failedRequests=[],httpErrors=[];
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1920,height:1080}});
const page=await context.newPage();
page.setDefaultTimeout(10000);
page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
page.on('pageerror',e=>pageErrors.push(String(e)));
page.on('requestfailed',r=>failedRequests.push({url:r.url(),failure:r.failure()}));
page.on('response',r=>{if(r.status()>=400)httpErrors.push({url:r.url(),status:r.status()});});
const capture=async name=>page.screenshot({path:path.join(root,name+'.png')});
const pass=(name,evidence)=>checks.push({name,status:'passed',evidence});
const nativeStyle=async locator=>locator.evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {filter:s.filter,mask:s.maskImage,opacity:s.opacity,width:r.width,height:r.height,src:e.getAttribute('src')};});
let failure=null;
try {
 await page.goto('http://127.0.0.1:5384/',{waitUntil:'networkidle',timeout:60000});
 await page.locator('.ab5-shell').waitFor();
 await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.title(),'ALDEBARAN · 스포츠');assert.equal(page.url(),'http://127.0.0.1:5384/');
 assert(await page.locator('.ab5-center').innerText());assert.equal(await page.locator('vite-error-overlay').count(),0);
 if(!resume){
 pass('page identity / meaningful screen / no framework overlay',{url:page.url(),title:await page.title()});
 const sourceRecord=JSON.parse(await fs.readFile(path.join(root,'asset-copy-record.json'),'utf8'));
 const network=[];
 for(const asset of sourceRecord){const url='/icons/aldebaran-simple-v3-20261006/'+path.basename(asset.target);const response=await context.request.get('http://127.0.0.1:5384'+url);assert.equal(response.status(),200);const bytes=await response.body();const sha=crypto.createHash('sha256').update(bytes).digest('hex');assert.equal(sha,asset.sha256);network.push({url,status:200,bytes:bytes.length,sha256:sha});}
 pass('18 approved PNG HTTP 200 and exact source hash',network);
 const roles=await page.locator('img[src^="/icons/aldebaran-simple-v3-20261006/"]').evaluateAll(images=>Array.from(new Set(images.map(i=>i.getAttribute('src')))));
 assert.equal(roles.length,18);pass('all 18 roles present in existing initial slots',roles);
 const tab=page.locator('.ab5-sport-tab[data-sport="soccer"]');
 const normal=await nativeStyle(tab.locator('img'));await tab.hover();const hover=await nativeStyle(tab.locator('img'));
 for(const style of [normal,hover]){assert.equal(style.opacity,'1');assert.equal(style.filter,'none');assert.equal(style.mask,'none');assert.equal(style.width,24);}
 await capture('hover-soccer');pass('normal/hover sports keep native color and opacity',{normal,hover});
 const counts={};
 for(const id of ['soccer','basketball','baseball','volleyball','hockey','formula1','boxing','mma','motorsports','all']){
  const control=page.locator(`.ab5-sport-tab[data-sport="${id}"]`);const expected=Number(await control.locator('.ab5-sport-count').innerText());
  await control.click();assert.equal(await control.getAttribute('aria-pressed'),'true');
  const actual=await page.locator('.ab5-list-scroll [data-match-id]').count();assert.equal(actual,expected,id+' match count');
  const style=await nativeStyle(control.locator('img'));assert.equal(style.opacity,'1');assert.equal(style.filter,'none');
  if(expected===0)assert(await page.locator('.ab5-list-scroll .ab5-empty').isVisible());
  counts[id]={expected,actual,style};
  if(id==='mma')await capture('empty-mma-selected');
 }
 pass('10 sports filters, selected native art, empty states',counts);
 const search=page.getByRole('textbox',{name:'해외형 스포츠 검색',exact:true});await search.fill('바이에른');
 await page.waitForFunction(()=>document.querySelectorAll('.ab5-list-scroll [data-match-id]').length===1);
 assert.match(await page.locator('.ab5-list-scroll').innerText(),/바이에른/);pass('search results and reset',{query:'바이에른',matches:1});await search.fill('');
 const market=page.locator('.ab5-market-tabs button').filter({hasText:'핸디캡'});await market.click();assert.equal(await market.getAttribute('aria-pressed'),'true');
 await page.locator('.ab5-market-tabs button').getByText('전체',{exact:true}).click();pass('market filter',{selected:'핸디캡',reset:'전체'});
 const selection=page.locator('.ab5-list-scroll button[data-selection-id]:not(:disabled)').first();const selectedId=await selection.getAttribute('data-selection-id');await selection.click();
 await page.locator(`.ab5-slip-selection[data-selection="${selectedId}"]`).waitFor();
 assert.equal(await selection.getAttribute('aria-pressed'),'true');assert.equal(await page.locator('.ab5-bet-submit').isDisabled(),true);
 await page.getByRole('textbox',{name:'베팅 금액',exact:true}).fill('5000');
 assert.equal(await page.locator('.ab5-bet-submit').isDisabled(),true);
 const disabled=await nativeStyle(page.locator('.ab5-bet-submit img'));assert.equal(disabled.opacity,'0.48');assert.equal(disabled.filter,'none');
 pass('selection/stake calculation and GUEST disabled submit',{selectedId,disabled,slipText:await page.locator('.ab5-slip-selections').innerText(),payout:await page.locator('.ab5-payout-value').innerText()});
 await capture('selection-guest-disabled');
 }else{
  await page.locator('.ab5-list-scroll button[data-selection-id]:not(:disabled)').first().click();
  await page.getByRole('textbox',{name:'베팅 금액',exact:true}).fill('5000');
 }
 await page.locator('.ab5-slip-head').getByRole('button',{name:'전체삭제',exact:true}).click();await page.locator('.ab5-slip-empty').waitFor();assert.equal(await page.locator('.ab5-slip-selection').count(),0);pass('selection clear restores new empty-slip ticket',{});
 await page.getByRole('textbox',{name:'베팅 금액',exact:true}).fill('');
 await page.locator('.ab5-menu').getByRole('button',{name:'국내형 스포츠',exact:true}).click();assert.equal(await page.locator('.ab5-center').getAttribute('data-mode'),'domestic');
 await page.locator('.ab5-menu').getByRole('button',{name:/해외형 스포츠/}).click();assert.equal(await page.locator('.ab5-center').getAttribute('data-mode'),'european');pass('domestic/european navigation preserved',{});
 const close=async()=>{await page.getByRole('dialog').getByRole('button',{name:'닫기',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});};
 for(const label of ['공지사항','이벤트게시판','출석체크','고객센터']){
  await page.locator('.ab5-notice-links').getByRole('button',{name:label,exact:true}).click();const dialog=page.getByRole('dialog');await dialog.waitFor();assert(await dialog.innerText());
  if(label==='고객센터')await capture('support-dialog');
  if(label==='출석체크'){
   await dialog.getByRole('button',{name:'오늘 출석하기',exact:true}).click();assert.equal(await dialog.getByRole('button',{name:'오늘 출석 완료',exact:true}).isDisabled(),true);
   const style=await nativeStyle(dialog.locator('[data-aldebaran-icon-v3="action-attendance"]'));assert.equal(style.filter,'none');assert.equal(style.opacity,'1');pass('isolated attendance checked/disabled state',{style});await capture('attendance-checked');
  }
  pass('service opens '+label,{title:await dialog.locator('[data-slot="dialog-title"]').innerText()});await close();
 }
 await page.locator('.ab5-user-actions').getByRole('button',{name:'쪽지',exact:true}).click();assert.match(await page.getByRole('dialog').innerText(),/쪽지함/);await close();pass('message action preserved',{});
 await page.locator('.ab5-user-actions').getByRole('button',{name:'베팅내역',exact:true}).click();assert.match(await page.getByRole('dialog').innerText(),/베팅내역이 없습니다/);await close();pass('existing history role preserved',{});
 for(const label of ['충전','환전']){await page.locator('.ab5-quick').getByRole('button',{name:label,exact:true}).click();assert.match(await page.getByRole('dialog').innerText(),label==='충전'?/충전/:/환전/);await close();pass('read-only '+label+' dialog; no submission',{});}
 const disabledMenu=page.locator('.ab5-menu button:disabled');assert.equal(await disabledMenu.count(),8);pass('8 disabled GNB unchanged',{count:8});
 const layouts=[];
 for(const viewport of [{width:1366,height:900},{width:390,height:844}]){
  await page.setViewportSize(viewport);await capture('viewport-'+viewport.width);
  const dimensions=await page.evaluate(()=>({screen:innerWidth,width:document.querySelector('.ab5-shell').getBoundingClientRect().width,scrollWidth:document.documentElement.scrollWidth,images:Array.from(document.images).filter(i=>!i.complete||i.naturalWidth===0).length}));
  assert.equal(dimensions.width,1920);assert.equal(dimensions.images,0);
  await page.evaluate(()=>window.scrollTo(99999,0));const scrollX=await page.evaluate(()=>window.scrollX);assert.equal(scrollX,1920-viewport.width);await capture('viewport-'+viewport.width+'-right');layouts.push({viewport,...dimensions,scrollX});
  await page.evaluate(()=>window.scrollTo(0,0));
 }
 pass('narrow viewport retains fixed1920 horizontal layout',layouts);
 await page.setViewportSize({width:1920,height:1080});await capture('final-1920');
 const missing=await page.evaluate(()=>Array.from(document.images).filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));assert.equal(missing.length,0);assert.equal(pageErrors.length,0);assert.equal(httpErrors.length,0);
 const localFailures=failedRequests.filter(r=>r.url.startsWith('http://127.0.0.1'));assert.equal(localFailures.length,0);
 assert(consoleErrors.every(e=>e==='Failed to load resource: net::ERR_NETWORK_ACCESS_DENIED'));
 pass('app/PNG runtime health',{pageErrors,httpErrors,localFailures,consoleErrors,knownBaselineExternalFailures:failedRequests});
}catch(e){failure=String(e.stack||e);console.error(failure);await capture('qa-failure').catch(()=>{});}
finally{
 const report={flow:'white5384 -> existing icons/filters/services/selection states -> correct native-color rendering; no transaction submissions',
 browserAvailability:'Browser plugin not available; existing Playwright + isolated headless Chrome allowed by user',
 context:'new nonpersistent context; no user profile/storage used',url:'http://127.0.0.1:5384/',checks,failure,
 prior_passed_checks_reused:prior?.checks.length||0,prior_script_locator_issue:prior?.failure||null,
 pageErrors,consoleErrors,warnings,failedRequests,httpErrors,transactionsSubmitted:0};
 await fs.writeFile(path.join(root,'interaction-qa.json'),JSON.stringify(report,null,2));
 await context.close();await browser.close();console.log(JSON.stringify({passed:checks.length,failure,pageErrors,warnings,httpErrors,failedRequests}));
}
if(failure)process.exitCode=1;
