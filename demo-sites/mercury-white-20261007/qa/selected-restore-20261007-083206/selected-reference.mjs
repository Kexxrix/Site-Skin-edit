import {chromium} from 'file:///C:/Users/User/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';import {fileURLToPath} from 'node:url';import assert from 'node:assert/strict';
const out=fileURLToPath(new URL('.',import.meta.url)),raw=await fs.readFile(out+'../../input/mercury-palette_98.json','utf8');
const b=await chromium.launch({headless:true}),c=await b.newContext({viewport:{width:2306,height:994}});await c.addInitScript(raw=>localStorage.setItem('mercury-skin-lab:palette:v1',raw),raw);const p=await c.newPage();
const props=l=>l.evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {color:s.color,background:s.backgroundColor,gradient:s.backgroundImage,border:s.borderColor,shadow:s.boxShadow,outline:s.outline,filter:s.filter,font:s.fontFamily,size:s.fontSize,width:r.width,height:r.height}});
const park=async()=>{await p.mouse.move(1925,993);await p.waitForTimeout(250)};
const evidence={source:'Existing c5 editor in fresh isolated context with exact approved v6, equivalent to f9 selected styling; personal browser/storage untouched',groups:{}};
try{await p.goto('http://127.0.0.1:5417/',{waitUntil:'networkidle'});await p.waitForFunction(()=>document.querySelector('#skin-color-chipGradientTop')?.value==='#ffdb9e');assert.equal(await p.evaluate(()=>localStorage.getItem('mercury-skin-lab:palette:v1')),raw);
const odd=p.locator('.mc-list-pane .mc-odd:not(:disabled)').first();await odd.click();await park();
for(const [name,selector] of [['sport','.mc-sport-tab[aria-pressed="true"]'],['market','.mc-market-tabs button[aria-pressed="true"]'],['odds','.mc-list-pane .mc-odd[aria-pressed="true"]']]){
 const l=p.locator(selector).first();await park();await p.evaluate(()=>document.activeElement?.blur());const normal=await props(l);await l.hover();await p.waitForTimeout(250);const hover=await props(l);await park();await l.focus();await p.keyboard.press('Tab');await p.keyboard.press('Shift+Tab');assert.ok(await l.evaluate(e=>e.matches(':focus-visible')));const focus=await props(l);evidence.groups[name]={normal,hover,focus};
}
await park();await p.locator('.mc-sportbar').screenshot({path:out+'f9-reference-sports.png'});await p.locator('.mc-list-pane .mc-card').first().screenshot({path:out+'f9-reference-odds.png'});await fs.writeFile(out+'f9-selected-reference.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence));
}finally{await c.close();await b.close()}
