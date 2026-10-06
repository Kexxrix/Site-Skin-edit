import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)),'..');
const lum=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
const rgb=c=>c.match(/[\d.]+/g).slice(0,3).map(Number);
const contrast=(a,b)=>{const x=lum(rgb(a)),y=lum(rgb(b));return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const browser=await chromium.launch({channel:'chrome',headless:true}),context=await browser.newContext({viewport:{width:1920,height:1080}}),page=await context.newPage();
page.setDefaultTimeout(10000);
const errors=[],warnings=[],failed=[],httpErrors=[],checks=[],rows=[];
function monitor(p){p.on('pageerror',e=>errors.push(String(e)));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});p.on('requestfailed',r=>failed.push(r.url()));p.on('response',r=>{if(r.status()>=400)httpErrors.push({url:r.url(),status:r.status()});});}monitor(page);
const pass=(name,evidence)=>checks.push({name,passed:true,evidence});
const settled=locator=>locator.evaluate(async e=>{getComputedStyle(e).color;await new Promise(requestAnimationFrame);await Promise.allSettled(e.getAnimations({subtree:true}).map(a=>a.finished));});
const inspect=locator=>locator.evaluate(e=>{
 const s=getComputedStyle(e),r=e.getBoundingClientRect();let bg=e;while(bg&&getComputedStyle(bg).backgroundColor==='rgba(0, 0, 0, 0)')bg=bg.parentElement;
 return {text:e.innerText,color:s.color,bg:bg?getComputedStyle(bg).backgroundColor:'rgb(255, 255, 255)',backgroundImage:bg?getComputedStyle(bg).backgroundImage:'none',fontSize:s.fontSize,fontWeight:s.fontWeight,w:r.width,h:r.height};
});
const pair=async(state,control,surface)=>{
 await settled(control);const value=await inspect(control.locator('.ab5-odd-value')),label=await inspect(control.locator('.ab5-odd-label'));
 value.contrast=contrast(value.color,value.bg);label.contrast=contrast(label.color,label.bg);
 assert(value.contrast>=4.5);assert(label.contrast>=4.5);assert.equal(value.backgroundImage,'none');
 const selected=(await control.getAttribute('aria-pressed'))==='true';assert.equal(value.color,selected?'rgb(43, 43, 39)':'rgb(65, 67, 63)');
 if(selected)assert.equal(label.color,value.color);
 const file=`after-${state}-${surface}.png`;await control.screenshot({path:path.join(root,file)});rows.push({state,surface,value,label,file});
};
let failure=null;
try{
 await page.goto('http://127.0.0.1:5384/',{waitUntil:'networkidle'});await page.locator('.ab5-shell').waitFor();await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.title(),'ALDEBARAN · 스포츠');assert.equal(await page.locator('vite-error-overlay').count(),0);
 const before=JSON.parse(await fs.readFile(path.join(root,'comparison-stable/before-browser.json'),'utf8'));
 const after=await page.evaluate(()=>({title:document.title,text:document.body.innerText,selectionIds:Array.from(document.querySelectorAll('[data-selection-id]'),e=>e.dataset.selectionId),
  icons:Array.from(document.querySelectorAll('[data-graphite-icon]'),e=>({src:e.getAttribute('src'),w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height,filter:getComputedStyle(e).filter,opacity:getComputedStyle(e).opacity})),
  unrelatedColors:{balance:getComputedStyle(document.querySelector('.ab5-balance-value')).color,payoutToken:getComputedStyle(document.body).getPropertyValue('--ab-ink-accent')},
  fonts:Array.from(document.fonts).map(f=>({family:f.family,weight:f.weight,status:f.status})),geometry:Array.from(document.querySelectorAll('.ab5-header,.ab5-center,.ab5-rail,.ab5-odd'),e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};})}));
 for(const name of ['text','selectionIds','icons','unrelatedColors','geometry'])assert.deepEqual(after[name],before[name],name+' preserved');
 await fs.writeFile(path.join(root,'after-browser.json'),JSON.stringify(after,null,2));pass('initial geometry/text/selectionIDs/icons/account meaning-color preserved',{});
 const defaults=await page.locator('.ab5-odd:not(:disabled):not([aria-pressed="true"]) .ab5-odd-value').evaluateAll(elements=>elements.map(e=>({text:e.textContent,color:getComputedStyle(e).color,inline:e.getAttribute('style')})));
 assert(defaults.length>100);assert(defaults.every(r=>r.color==='rgb(65, 67, 63)'&&!r.inline));pass('all initial list+detail odds graphite;no inline or nested brown residue',{count:defaults.length});
 const list=page.locator('.ab5-list-scroll .ab5-odd:not(:disabled)').first(),id=await list.getAttribute('data-selection-id'),detail=page.locator(`.ab5-market-scroll .ab5-odd[data-selection-id="${id}"]`);
 await page.mouse.move(2,100);await pair('normal',list,'list');await pair('normal',detail,'detail');await page.screenshot({path:path.join(root,'after-default-1920.png')});
 await list.hover();await pair('hover',list,'list');await detail.hover();await pair('hover',detail,'detail');
 await list.click();await page.mouse.move(2,100);await page.evaluate(()=>document.activeElement?.blur());await pair('selected',list,'list');await pair('selected',detail,'detail');
 const slip=await inspect(page.locator('.ab5-slip-selection b'));assert.equal(slip.color,'rgb(65, 67, 63)');slip.contrast=contrast(slip.color,slip.bg);assert(slip.contrast>=4.5);
 const total=await inspect(page.locator('[data-total-odds]'));assert.equal(total.color,'rgb(65, 67, 63)');total.contrast=contrast(total.color,total.bg);assert(total.contrast>=4.5);pass('selected slip odds + total odds neutral graphite',{slip,total});
 await page.screenshot({path:path.join(root,'after-selected-1920.png')});
 await list.hover();await pair('selected-hover',list,'list');await detail.hover();await pair('selected-hover',detail,'detail');await page.mouse.move(2,100);
 for(const [surface,control] of [['list',list],['detail',detail]]){await control.focus();await page.keyboard.press('ArrowRight');assert.equal(await control.evaluate(e=>e.matches(':focus-visible')),true);await pair('selected-focus',control,surface);await control.hover();await pair('selected-focus-hover',control,surface);await page.mouse.move(2,100);}
 pass('native14px numbers/12px labels;normal/hover/selected/focus/combined states',rows);
 await page.getByRole('textbox',{name:'베팅 금액',exact:true}).fill('5000');assert.equal(await page.locator('.ab5-bet-submit').isDisabled(),true);
 assert.equal(await page.locator('.ab5-payout-value').evaluate(e=>getComputedStyle(e).color),'rgb(163, 68, 30)');pass('GUEST submit disabled;money accent preserved',{});
 for(const sport of ['basketball','baseball','hockey','mma','all']){await page.locator(`.ab5-sport-tab[data-sport="${sport}"]`).click();const values=await page.locator('.ab5-odd:not(:disabled):not([aria-pressed="true"]) .ab5-odd-value').evaluateAll(es=>es.map(e=>getComputedStyle(e).color));assert(values.every(c=>c==='rgb(65, 67, 63)'));}
 await page.locator('.ab5-menu').getByRole('button',{name:'국내형 스포츠',exact:true}).click();assert.equal(await page.locator('.ab5-center').getAttribute('data-mode'),'domestic');
 const domestic=await page.locator('.ab5-odd:not(:disabled):not([aria-pressed="true"]) .ab5-odd-value').evaluateAll(es=>es.map(e=>getComputedStyle(e).color));assert(domestic.every(c=>c==='rgb(65, 67, 63)'));
 await page.locator('.ab5-menu').getByRole('button',{name:/해외형 스포츠/}).click();pass('other sports,empty state,and domestic odds use same scoped color',{});
 await page.locator('.ab5-slip-head').getByRole('button',{name:'전체삭제',exact:true}).click();await page.locator('.ab5-slip-empty').waitFor();pass('selection clear preserved',{});
 for(const viewport of [{width:1366,height:900},{width:390,height:844}]){await page.setViewportSize(viewport);assert.equal(await page.locator('.ab5-shell').evaluate(e=>e.getBoundingClientRect().width),1920);await page.screenshot({path:path.join(root,`after-${viewport.width}.png`)});}pass('fixed1920 layout preserved at1366 and390',{});
 // Seed only an isolated test context;open confirmation/history,never submit a transaction.
 const fixtureContext=await browser.newContext({viewport:{width:1920,height:1080}});
 await fixtureContext.addInitScript(()=>{localStorage.setItem('aldebaran-frame-r1-v1',JSON.stringify({loggedIn:true,balance:1000000,history:[{id:'qa-existing-history-fixture',createdAt:'2026-10-06T00:00:00Z',stake:5000,odds:'1.56',potential:'7800',picks:[{match:'QA 기존 경기',market:'승패',pick:'홈',price:'1.56'}]}]}));});
 const fp=await fixtureContext.newPage();monitor(fp);await fp.goto('http://127.0.0.1:5384/',{waitUntil:'networkidle'});await fp.locator('.ab5-shell').waitFor();
 await fp.locator('.ab5-list-scroll .ab5-odd:not(:disabled)').first().click();await fp.getByRole('textbox',{name:'베팅 금액',exact:true}).fill('5000');await fp.locator('.ab5-bet-submit').click();await fp.getByRole('dialog').waitFor();
 const confirm=[];for(const selector of ['.confirm-picks b','.dialog-total .ab5-summary-odds']){const v=await inspect(fp.locator(selector));assert.equal(v.color,'rgb(65, 67, 63)');v.contrast=contrast(v.color,v.bg);assert(v.contrast>=4.5);confirm.push(v);}
 await fp.screenshot({path:path.join(root,'after-confirmation-no-submit.png')});await fp.getByRole('dialog').getByRole('button',{name:'닫기',exact:true}).click();
 await fp.locator('.ab5-user-actions').getByRole('button',{name:'베팅내역',exact:true}).click();await fp.getByRole('dialog').waitFor();
 const history=[];for(const selector of ['.history-pick b','.history-totals .ab5-summary-odds']){const v=await inspect(fp.locator(selector));assert.equal(v.color,'rgb(65, 67, 63)');v.contrast=contrast(v.color,v.bg);assert(v.contrast>=4.5);history.push(v);}
 assert.equal(await fp.locator('.history-totals>strong').evaluate(e=>getComputedStyle(e).color),'rgb(163, 68, 30)');await fp.screenshot({path:path.join(root,'after-history-fixture.png')});
 pass('confirmation/history odds scopes;money accents and strings retained;no submission',{confirm,history,fixture:'Isolated localStorage only'});await fixtureContext.close();
 assert.equal(httpErrors.length,0);assert(failed.every(url=>url.startsWith('https://use.typekit.net/')));assert(errors.every(e=>e==='Failed to load resource: net::ERR_NETWORK_ACCESS_DENIED'));assert.equal(warnings.length,0);
 pass('runtime/PNG health;known preexisting Adobe network restriction only',{errors,failed,httpErrors});
 const board=await context.newPage();const cells=[];
 for(const state of ['normal','hover','selected'])for(const variant of ['before','after']){const imgs=[];for(const surface of ['list','detail']){
  const file=variant==='before'?path.join(root,'comparison-stable',`before-${state}-${surface}.png`):path.join(root,`after-${state}-${surface}.png`);
  imgs.push(`<p>${surface}</p><img src="data:image/png;base64,${(await fs.readFile(file)).toString('base64')}"/>`);}
  cells.push(`<section><h3>${variant} / ${state}</h3>${imgs.join('')}</section>`);}
 await board.setViewportSize({width:880,height:840});await board.setContent(`<style>body{margin:20px;background:#eee;font:14px Arial;color:#222}h1{font-size:20px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}section{padding:12px;background:white}h3,p{margin:4px 0 8px}img{display:block}</style><h1>Same odds 1.56 / before and applied / native size</h1><p>Only odds ink changes;orange background and selected graphite unchanged.</p><div class="grid">${cells.join('')}</div>`);await board.screenshot({path:path.join(root,'odds-before-after.png'),fullPage:true});await board.close();
}catch(e){failure=String(e.stack||e);console.error(failure);await page.screenshot({path:path.join(root,'qa-failure.png')}).catch(()=>{});}
finally{await fs.writeFile(path.join(root,'odds-QA.json'),JSON.stringify({url:'http://127.0.0.1:5384/',checks,rows,failure,errors,warnings,failed,httpErrors,transactionsSubmitted:0,isolatedContextsOnly:true},null,2));await context.close();await browser.close();console.log(JSON.stringify({passed:checks.length,failure,errors,warnings,httpErrors}));}
if(failure)process.exitCode=1;
