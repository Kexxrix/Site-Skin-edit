import {chromium} from 'file:///C:/Users/User/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('.',import.meta.url)),raw=await fs.readFile(out+'../input/mercury-palette_98.json','utf8');
const b=await chromium.launch({headless:true}),ctx=await b.newContext({viewport:{width:2306,height:994}});
await ctx.addInitScript(raw=>localStorage.setItem('mercury-skin-lab:palette:v1',raw),raw);
const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
 await p.goto('http://127.0.0.1:5417/',{waitUntil:'networkidle'});await p.waitForFunction(()=>document.querySelector('#skin-color-chipGradientTop')?.value==='#ffdb9e');
 assert.equal(await p.evaluate(()=>localStorage.getItem('mercury-skin-lab:palette:v1')),raw);await p.mouse.move(1924,990);await p.waitForTimeout(400);
 const reference=await p.evaluate(()=>{
 const sels={shell:'.mc-shell',header:'.mc-header',body:'.mc-body',left:'.mc-left',sportbar:'.mc-sportbar',league:'.mc-league-label',card:'.mc-card',market:'.mc-market-pane',right:'.mc-right',level:'.mc-user-head .mc-badge',sports:'.mc-sports-summary .mc-badge',menu:'.mc-menu-badge',marketChip:'.mc-market-open',selectedCount:'.mc-sport-tab[aria-pressed="true"] .mc-sport-count',selectedSport:'.mc-sport-tab[aria-pressed="true"]',headerButton:'.mc-auth button',normalOdds:'.mc-odd:not(.is-selected)'};
 const css=Object.fromEntries(Object.entries(sels).map(([k,sel])=>{const e=document.querySelector(sel);if(!e)return [k,null];const s=getComputedStyle(e);return [k,{color:s.color,bg:s.backgroundImage,backgroundColor:s.backgroundColor,border:s.borderColor,filter:s.filter,font:s.fontFamily,fontSize:s.fontSize,rect:e.getBoundingClientRect().toJSON()}]}));
 const images=[...document.querySelectorAll('.mc-shell img')].map(e=>({src:e.getAttribute('src'),naturalWidth:e.naturalWidth,width:e.clientWidth,height:e.clientHeight,filter:getComputedStyle(e).filter}));return {css,images,title:document.title};
 });assert.deepEqual(errors,[]);await p.locator('.mc-shell').screenshot({path:out+'editor-approved-reference.png'});await fs.writeFile(out+'editor-approved-reference.json',JSON.stringify({source:'Fresh isolated headless context of existing c5 editor with approved v6 input, not attached PNG',inputBytes:Buffer.byteLength(raw),...reference,errors},null,2));console.log('Approved editor reference captured; personal storage/browser untouched.');
}finally{await b.close();}
