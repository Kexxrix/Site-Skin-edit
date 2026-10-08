import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {chromium} from 'file:///C:/Users/User/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright/index.mjs';
const out=path.dirname(fileURLToPath(import.meta.url)),mode=process.argv[2]||'before';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1935,height:932}});
const blockedExternal=[],errors=[],failures=[],mutations=[];
await context.route('**/*',route=>{
  const url=new URL(route.request().url());
  if(['http:','https:'].includes(url.protocol)&&url.origin!=='http://127.0.0.1:5418'){
    blockedExternal.push(url.href);return route.abort();
  }
  return route.continue();
});
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
page.on('requestfailed',r=>{if(r.url().startsWith('http://127.0.0.1:5418'))failures.push({url:r.url(),reason:r.failure()?.errorText});});
page.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))mutations.push({url:r.url(),method:r.method()});});
const properties=el=>{
  const s=getComputedStyle(el),r=el.getBoundingClientRect();
  return {text:el.textContent.trim(),fill:s.backgroundColor,image:s.backgroundImage,color:s.color,shadow:s.boxShadow,border:s.borderColor,outline:s.outline,font:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,width:r.width,height:r.height,filter:s.filter};
};
const style=selector=>page.locator(selector).first().evaluate(properties);
async function park(){await page.mouse.move(1934,931);await page.evaluate(()=>document.activeElement?.blur());await page.waitForTimeout(220);}
async function states(selector){
  const el=page.locator(selector).first();await park();const normal=await el.evaluate(properties);
  await el.hover();await page.waitForTimeout(220);const hover=await el.evaluate(properties);
  await park();await page.keyboard.press('Tab');await el.focus();await page.waitForTimeout(220);
  assert.ok(await el.evaluate(e=>e.matches(':focus-visible')));const focus=await el.evaluate(properties);
  await park();return {normal,hover,focus};
}
const results={mode,viewport:{width:1935,height:932},browser:'Browser plugin not available; isolated Playwright context',noCssInjection:true,unchanged:{},selected:{},checks:[]};
try {
  const response=await page.goto('http://127.0.0.1:5418/',{waitUntil:'networkidle'});
  assert.equal(response.status(),200);assert.equal(await page.title(),'MERCURY · 화이트');
  assert.equal(await page.locator('vite-error-overlay,nextjs-portal,#skin-editor,.skin-picker-choices').count(),0);
  assert.equal(await page.locator('.mc-card').count(),61);
  results.badges=await page.locator('.mc-shell .mc-badge').evaluateAll((els,fn)=>els.map(el=>(new Function('return ('+fn+')'))()(el)),properties.toString());
  assert.deepEqual(results.badges.map(x=>x.text).sort(),['BET','LIVE','LV.0','SPORTS']);
  results.cardSizes=await page.locator('.mc-card').evaluateAll(els=>els.map(e=>({id:e.getAttribute('data-match-id'),w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
  results.images=await page.locator('.mc-shell img').evaluateAll(es=>es.map(e=>({src:e.getAttribute('src'),naturalWidth:e.naturalWidth,w:e.clientWidth,h:e.clientHeight,filter:getComputedStyle(e).filter})));
  assert.ok(results.images.every(x=>x.naturalWidth>0));
  for(const [name,selector] of [['sportCount','.mc-sport-tab[aria-pressed=true] .mc-sport-count'],['marketCount','.mc-market-open'],['headerBadge','.mc-menu-badge'],['service','.mc-quick-action.primary'],['ordinary','.mc-user-actions button'],['inspected','.mc-card[data-inspected=true]']]) results.unchanged[name]=await style(selector);
  for(const [name,selector] of [['sport','.mc-sport-tab[aria-pressed=true]'],['market','.mc-market-tabs button[aria-pressed=true]']]) results.selected[name]=await states(selector);
  const odd=page.locator('.mc-list-pane .mc-odd:not(:disabled)').first();
  await odd.click();assert.equal(await page.locator('.mc-slip-selection').count(),1);
  results.selected.odds=await states('.mc-list-pane .mc-odd[aria-pressed=true]');
  await odd.click();assert.equal(await page.locator('.mc-slip-selection').count(),0);
  if(mode==='after') {
    const before=JSON.parse(fs.readFileSync(path.join(out,'before.json'),'utf8'));
    const ok=(name)=>results.checks.push({name,pass:true});
    results.badges.forEach((b,i)=>{
      assert.equal(b.fill,'rgb(54, 49, 43)');assert.equal(b.color,'rgb(245, 232, 197)');
      assert.equal(b.image,'none');assert.equal(b.shadow,'rgb(128, 108, 73) 0px 0px 0px 1px inset');
      // The unused CSS border color inherits currentColor; the visible edge is the inset shadow.
      for(const key of ['text','font','fontSize','fontWeight','width','height','filter']) assert.deepEqual(b[key],before.badges[i][key],b.text+' '+key);
    });ok('All four badges use approved charcoal, gold text and muted gold inset edge with original geometry');
    results.badgeBorders=await page.locator('.mc-shell .mc-badge').evaluateAll(es=>es.map(e=>({width:getComputedStyle(e).borderTopWidth,style:getComputedStyle(e).borderTopStyle})));
    assert.ok(results.badgeBorders.every(b=>b.width==='0px'),JSON.stringify(results.badgeBorders));
    assert.deepEqual(results.unchanged,before.unchanged);ok('Sport and market counts, header chips, services, ordinary controls and card outlines unchanged');
    const priorResults=JSON.parse(fs.readFileSync(path.join(out,'../../qa-results/independent-20261007-0750/ui-results.json'),'utf8')).results;
    const references={sport:priorResults.find(x=>x.name==='selected sport normal hover focus keep independent fill text border').evidence,market:priorResults.find(x=>x.name.startsWith('selected market uses approved')).evidence,odds:priorResults.find(x=>x.name.startsWith('selected odds normal hover focus')).evidence};
    for(const group of ['sport','market','odds']) for(const state of ['normal','hover','focus']) {
      for(const [priorKey,currentKey] of Object.entries({bg:'fill',gradient:'image',color:'color',border:'border',shadow:'shadow',filter:'filter',font:'font'})) assert.deepEqual(results.selected[group][state][currentKey],references[group][state][priorKey],group+' '+state+' '+currentKey);
      for(const key of ['width','height','fontSize','fontWeight','text']) assert.deepEqual(results.selected[group][state][key],before.selected[group][state][key]);
    }
    results.selectedReference='Approved v6 settled states in qa-results/independent-20261007-0750/ui-results.json, also reused by b425 QA. Initial before odds colors were captured during the existing 160ms transition and are not a settled-color reference.';
    ok('Selected sport, market and odds retain approved settled normal/hover/keyboard-focus styles and previous geometry');
    assert.deepEqual(results.cardSizes,before.cardSizes);ok('All 61 match card dimensions unchanged');
    assert.deepEqual(results.images,before.images);ok('All image paths, loaded dimensions and filters unchanged');
    ok('Odds selection and removal update the slip without transaction requests');
    await park();await page.screenshot({path:path.join(out,'after-desktop.png')});
    await page.locator('.mc-sports-summary').screenshot({path:path.join(out,'after-sports.png')});
    await page.locator('.mc-user').screenshot({path:path.join(out,'after-account.png')});
    await page.setViewportSize({width:900,height:932});
    await page.locator('.mc-sports-summary .mc-badge').scrollIntoViewIfNeeded();
    const narrow=await style('.mc-sports-summary .mc-badge');
    assert.equal(narrow.fill,'rgb(54, 49, 43)');assert.equal(narrow.width,results.badges.find(b=>b.text==='SPORTS').width);
    ok('Narrow viewport retains badge dimensions and existing fixed desktop layout');
  } else {
    await page.locator('.mc-sports-summary').screenshot({path:path.join(out,'before-sports.png')});
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);assert.deepEqual(mutations,[]);
  results.checks.push({name:'No app exceptions, failed local assets or mutating requests',pass:true});
  results.blockedExternal=[...new Set(blockedExternal)];results.errors=errors;results.failures=failures;results.mutations=mutations;
  fs.writeFileSync(path.join(out,mode+'.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify({mode,pass:results.checks.length,fail:0,badges:results.badges.map(b=>({text:b.text,fill:b.fill,color:b.color})),images:results.images.length,blockedExternal:results.blockedExternal}));
} catch(error) {
  fs.writeFileSync(path.join(out,mode+'-failure.json'),JSON.stringify({...results,error:error.stack,errors,failures,mutations},null,2));
  throw error;
} finally {await context.close();await browser.close();}
