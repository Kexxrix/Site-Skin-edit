import {chromium} from 'file:///C:/Users/User/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('.',import.meta.url)),css=await fs.readFile(out+'../../site/app/mercury-white.css','utf8');
const browser=await chromium.launch({headless:true}),ctx=await browser.newContext({viewport:{width:1920,height:994}}),p=await ctx.newPage();
const checks=[],errors=[];p.on('pageerror',e=>errors.push(e.message));
const settle=()=>p.waitForTimeout(250),park=async()=>{await p.mouse.move(1919,993);await settle()};
const props=l=>l.evaluate(e=>{const s=getComputedStyle(e);return {text:e.textContent.trim(),color:s.color,background:s.backgroundColor,gradient:s.backgroundImage,border:s.borderColor,opacity:s.opacity,filter:s.filter,outline:s.outline,focusVisible:e.matches(':focus-visible'),size:s.fontSize,rect:e.getBoundingClientRect().toJSON()}});
const lum=a=>a.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0);
const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number),ratio=(a,b)=>{const [lo,hi]=[lum(rgb(a)),lum(rgb(b))].sort((a,b)=>a-b);return (hi+.05)/(lo+.05)};
const check=async(name,fn)=>{try{checks.push({name,pass:true,evidence:await fn()})}catch(e){checks.push({name,pass:false,error:e.stack})}};
const textCheck=s=>{assert.equal(s.gradient,'none');assert.equal(s.opacity,'1');const contrast=ratio(s.color,s.background);assert.ok(contrast>=4.5,JSON.stringify({...s,contrast}));return {...s,contrast}};
try{
 await p.goto('http://127.0.0.1:5418/',{waitUntil:'networkidle'});await park();
 await check('normal labelled controls and small chips have solid fill and readable text',async()=>{
  const evidence=[];for(const q of ['.mc-quick-action.primary','.mc-quick-action.secondary','.mc-user-actions button','.mc-amount-quick button','.mc-sport-tab:not([aria-pressed="true"])','.mc-market-tabs button:not([aria-pressed="true"])','.mc-market-open','.mc-badge','.mc-sport-count']){
   const list=p.locator(q);for(let i=0;i<await list.count();i++)evidence.push({selector:q,...textCheck(await props(list.nth(i)))})
  }await p.screenshot({path:out+'production-full.png'});await p.locator('.mc-quick').screenshot({path:out+'production-quick.png'});await p.locator('.mc-user').screenshot({path:out+'production-user.png'});return {count:evidence.length,minContrast:Math.min(...evidence.map(e=>e.contrast)),controls:evidence};
 });
 await check('normal odds labels and numbers retain high contrast',async()=>{const odd=p.locator('.mc-list-pane .mc-odd:not(:disabled)').first(),s=textCheck(await props(odd)),value=await props(odd.locator('.mc-odd-value'));const contrast=ratio(value.color,s.background);assert.ok(contrast>=4.5);return {label:s,value:{...value,contrast}}});
 await check('normal service hover stays dark on solid cream and darker border',async()=>{const b=p.locator('.mc-quick-action.primary').first();await b.hover();await settle();const s=textCheck(await props(b));assert.equal(s.background,'rgb(247, 237, 218)');assert.equal(s.border,'rgb(183, 96, 22)');assert.equal(s.filter,'none');await p.locator('.mc-quick').screenshot({path:out+'production-hover.png'});await park();return s});
 await check('selected sports market and odds keep solid apricot and dark text',async()=>{
  const sport=p.locator('.mc-sport-tab[aria-pressed="true"]'),market=p.locator('.mc-market-tabs button[aria-pressed="true"]'),odd=p.locator('.mc-list-pane .mc-odd:not(:disabled)').first();await odd.click();await park();
  const evidence=[];for(const b of [sport,market,odd]){const s=textCheck(await props(b));assert.equal(s.background,'rgb(255, 223, 175)');assert.equal(s.border,'rgb(183, 96, 22)');evidence.push({...s,borderContrast:ratio(s.border,s.background)});assert.ok(evidence.at(-1).borderContrast>=3)}
  assert.equal(await p.locator('.mc-slip-selection').count(),1);await p.screenshot({path:out+'production-selected.png'});return evidence;
 });
 await check('selected hover and focused control preserve fill and visible dark outline',async()=>{
  const odd=p.locator('.mc-list-pane .mc-odd[aria-pressed="true"]').first();const before=textCheck(await props(odd));await odd.hover();await settle();const hover=textCheck(await props(odd));assert.equal(hover.background,before.background);assert.equal(hover.border,before.border);await park();await odd.focus();await p.keyboard.press('Tab');await p.keyboard.press('Shift+Tab');const focused=textCheck(await props(odd));assert.equal(focused.focusVisible,true);assert.match(focused.outline,/rgb\((?:43, 40, 38|0, 0, 0)\) solid 2px/);assert.ok(ratio(focused.outline.split(' solid')[0],focused.background)>=3);await p.locator('.mc-list-pane .mc-card').first().screenshot({path:out+'production-focus.png'});return {before,hover,focused};
 });
 await check('disabled submit is readable distinct solid and still prevents transaction',async()=>{const b=p.locator('.mc-bet-submit');assert.equal(await b.isDisabled(),true);const s=textCheck(await props(b));assert.equal(s.background,'rgb(241, 234, 223)');assert.equal(s.color,'rgb(107, 97, 84)');const m=await props(b.locator('.mc-ui-icon-mask'));assert.equal(m.background,s.color);await b.scrollIntoViewIfNeeded();await p.locator('.mc-slip-summary').screenshot({path:out+'production-disabled.png'});return s});
 await check('left service mask icons use text color with adequate contrast',async()=>{const evidence=[];for(let i=0;i<3;i++){const b=p.locator('.mc-quick-action.primary').nth(i),s=await props(b),icon=await props(b.locator('.mc-ui-icon-mask')),contrast=ratio(icon.background,s.background);assert.equal(icon.background,s.color);assert.ok(contrast>=4.5);evidence.push({text:s.text,maskColor:icon.background,contrast})}return evidence});
 await check('nine gold PNG display filters meet measured median goal; highlights recorded separately',async()=>{
  const icons=await p.locator('.mc-user-actions img.mc-ui-icon,.mc-quick-action.secondary img.mc-ui-icon').evaluateAll(images=>{
   const lum=a=>a.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0),bg=lum([255,250,240]);
   return images.map(e=>{const canvas=document.createElement('canvas');canvas.width=e.clientWidth;canvas.height=e.clientHeight;const c=canvas.getContext('2d');c.filter=getComputedStyle(e).filter;c.drawImage(e,0,0,canvas.width,canvas.height);const pixels=c.getImageData(0,0,canvas.width,canvas.height).data,r=[];for(let i=0;i<pixels.length;i+=4)if(pixels[i+3]>=230)r.push((bg+.05)/(lum([...pixels.slice(i,i+3)])+.05));r.sort((a,b)=>a-b);return {src:e.getAttribute('src'),filter:getComputedStyle(e).filter,min:r[0],median:r[Math.floor(r.length/2)],max:r.at(-1),opaquePixels:r.length}});
  });assert.equal(icons.length,9);assert.ok(icons.every(e=>e.filter==='brightness(0.7) contrast(1.01) saturate(1.04)'&&e.median>=3));return {icons,note:'Gold highlights remain multicolor, so not every pixel reaches 3:1. All icons also have readable text labels.'};
 });
 await check('narrow canvas stays horizontally accessible with same fixed geometry',async()=>{await p.setViewportSize({width:1366,height:994});await p.evaluate(()=>window.scrollTo(1920,0));assert.equal(await p.evaluate(()=>window.scrollX),554);assert.equal(await p.locator('.mc-shell').evaluate(e=>e.getBoundingClientRect().width),1920);await p.screenshot({path:out+'production-narrow-right.png'});return {viewport:1366,canvas:1920,scrollX:554}});
 await check('runtime exceptions absent',async()=>{assert.deepEqual(errors,[]);return {errors}});
}finally{await ctx.close();await browser.close();const r={validationMode:'Approved 697 production build served on 5418; no stylesheet injection',pass:checks.filter(c=>c.pass).length,fail:checks.filter(c=>!c.pass).length,checks};await fs.writeFile(out+'production-state-contrast-results.json',JSON.stringify(r,null,2));console.log(JSON.stringify({pass:r.pass,fail:r.fail,failures:checks.filter(c=>!c.pass)}));if(r.fail)process.exitCode=1}
