import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const taskRoot=path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)),'..');
const root=path.join(taskRoot,'comparison-stable');
await fs.mkdir(root);
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1920,height:1080}});
const page=await context.newPage();page.setDefaultTimeout(10000);
const luminance=rgb=>rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
const rgb=value=>value.match(/[\d.]+/g).slice(0,3).map(Number);
const contrast=(a,b)=>{const x=luminance(rgb(a)),y=luminance(rgb(b));return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const measure=async locator=>locator.evaluate(e=>{
 const cs=getComputedStyle(e),label=e.querySelector('.ab5-odd-label'),value=e.querySelector('.ab5-odd-value'),l=getComputedStyle(label),v=getComputedStyle(value),r=e.getBoundingClientRect();
 return {id:e.dataset.selectionId,text:e.innerText,selected:e.getAttribute('aria-pressed'),hover:e.matches(':hover'),focusVisible:e.matches(':focus-visible'),background:cs.backgroundColor,backgroundImage:cs.backgroundImage,opacity:cs.opacity,
  label:{color:l.color,fontSize:l.fontSize,fontWeight:l.fontWeight,lineHeight:l.lineHeight},value:{color:v.color,fontSize:v.fontSize,fontWeight:v.fontWeight,lineHeight:v.lineHeight},bounds:{x:r.x,y:r.y,w:r.width,h:r.height}};
});
const rows=[];
try{
 await page.goto('http://127.0.0.1:5384/',{waitUntil:'networkidle'});await page.locator('.ab5-shell').waitFor();await page.evaluate(()=>document.fonts.ready);
 const list=page.locator('.ab5-list-scroll .ab5-odd:not(:disabled)').first();const id=await list.getAttribute('data-selection-id');const detail=page.locator(`.ab5-market-scroll .ab5-odd[data-selection-id="${id}"]`);
 const source=await page.evaluate(()=>({title:document.title,text:document.body.innerText,selectionIds:Array.from(document.querySelectorAll('[data-selection-id]'),e=>e.dataset.selectionId),
  icons:Array.from(document.querySelectorAll('[data-graphite-icon]'),e=>({src:e.getAttribute('src'),w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height,filter:getComputedStyle(e).filter,opacity:getComputedStyle(e).opacity})),
  unrelatedColors:{balance:getComputedStyle(document.querySelector('.ab5-balance-value')).color,payoutToken:getComputedStyle(document.body).getPropertyValue('--ab-ink-accent')},
  fonts:Array.from(document.fonts).map(f=>({family:f.family,weight:f.weight,status:f.status})),geometry:Array.from(document.querySelectorAll('.ab5-header,.ab5-center,.ab5-rail,.ab5-odd'),e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};})}));
 await fs.writeFile(path.join(root,'before-browser.json'),JSON.stringify(source,null,2));await page.screenshot({path:path.join(root,'before-default-1920.png')});
 const snap=async(variant,state,locator,surface)=>{
   await locator.evaluate(async e=>{getComputedStyle(e).backgroundColor;await new Promise(requestAnimationFrame);await Promise.allSettled(e.getAnimations({subtree:true}).map(a=>a.finished));});
   const record=await measure(locator);record.label.contrast=contrast(record.label.color,record.background);record.value.contrast=contrast(record.value.color,record.background);
   const file=`${variant}-${state}-${surface}.png`;await locator.screenshot({path:path.join(root,file)});rows.push({variant,state,surface,file,...record});
 };
 await page.mouse.move(2,100);await snap('before','normal',list,'list');await snap('before','normal',detail,'detail');
 await list.hover();await snap('before','hover',list,'list');await detail.hover();await snap('before','hover',detail,'detail');
 await list.click();await page.mouse.move(2,100);await page.evaluate(()=>document.activeElement?.blur());await snap('before','selected',list,'list');await snap('before','selected',detail,'detail');
 await page.screenshot({path:path.join(root,'before-selected-1920.png')});
 for(const [variant,color] of [['white','#ffffff'],['graphite','#2b2b27']]){
  const sheet=await page.addStyleTag({content:`.aldebaran-white .ab5-shell .ab5-odd[aria-pressed="true"]:not(:disabled),.aldebaran-white .ab5-shell .ab5-odd[aria-pressed="true"]:not(:disabled) :is(.ab5-odd-value,.ab5-odd-label){color:${color}!important;}`});
  await page.mouse.move(2,100);await page.evaluate(()=>document.activeElement?.blur());await snap(variant,'selected',list,'list');await snap(variant,'selected',detail,'detail');
  await list.hover();await snap(variant,'selected-hover',list,'list');await detail.hover();await snap(variant,'selected-hover',detail,'detail');
  await page.mouse.move(2,100);
  for(const [surface,locator] of [['list',list],['detail',detail]]){await locator.focus();await page.keyboard.press('ArrowRight');await snap(variant,'selected-focus',locator,surface);await locator.hover();await snap(variant,'selected-focus-hover',locator,surface);await page.mouse.move(2,100);}
  await sheet.evaluate(e=>e.remove());
 }
 await fs.writeFile(path.join(root,'comparison-measurements.json'),JSON.stringify({url:page.url(),id,rows,backgroundChanges:0,liveCodeChangedDuringComparison:false},null,2));
 const board=await context.newPage();const states=['selected','selected-hover','selected-focus','selected-focus-hover'];
 const cells=[];
 for(const state of states)for(const variant of ['white','graphite']){
  const pair=rows.filter(r=>r.variant===variant&&r.state===state);
  const imgs=await Promise.all(pair.map(async r=>`<p>${r.surface}: ${r.value.fontSize}/${r.value.fontWeight} · ${r.value.contrast.toFixed(2)}:1 · ${r.backgroundImage}</p><img src="data:image/png;base64,${(await fs.readFile(path.join(root,r.file))).toString('base64')}"/>`));
  cells.push(`<section><h3>${variant} / ${state}</h3>${imgs.join('')}</section>`);
 }
 await board.setViewportSize({width:880,height:1120});await board.setContent(`<style>body{margin:20px;background:#eee;font:14px Arial;color:#222}h1{font-size:20px;margin:0 0 10px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}section{background:white;padding:12px}h3,p{margin:4px 0 8px}img{display:block;max-width:none}</style><h1>Same odds / native size / unchanged orange background</h1><p>White #fff vs graphite #2b2b27; list+detail; selected / hover / keyboard focus</p><div class="grid">${cells.join('')}</div>`);
 await board.screenshot({path:path.join(root,'selected-ink-comparison.png'),fullPage:true});await board.close();
 console.log(JSON.stringify(rows.map(r=>({variant:r.variant,state:r.state,surface:r.surface,background:r.background,gradient:r.backgroundImage,fg:r.value.color,contrast:r.value.contrast,font:r.value.fontSize+'/'+r.value.fontWeight,focus:r.focusVisible}))));
}finally{await context.close();await browser.close();}
