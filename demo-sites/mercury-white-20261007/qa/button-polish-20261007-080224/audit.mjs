import {chromium} from 'file:///C:/Users/User/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('.',import.meta.url)),url=process.argv[2]||'http://127.0.0.1:5418/',prefix=process.argv[3]||'before';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1920,height:994}}),page=await context.newPage();
const errors=[],failures=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failures.push({url:r.url(),reason:r.failure()?.errorText}));
try {
 await page.goto(url,{waitUntil:'networkidle'});await page.mouse.move(1919,993);await page.waitForTimeout(400);
 const data=await page.evaluate(()=>{
  const css=e=>{const s=getComputedStyle(e);return {color:s.color,background:s.backgroundColor,gradient:s.backgroundImage,border:s.borderColor,opacity:s.opacity,filter:s.filter,shadow:s.boxShadow,font:s.fontFamily,size:s.fontSize,rect:e.getBoundingClientRect().toJSON()}};
  return {title:document.title,url:location.href,controls:[...document.querySelectorAll('.mc-quick-action,.mc-user-actions button,.mc-sport-tab,.mc-market-tabs button,.mc-amount-quick button,.mc-bet-submit,.mc-small-action,.mc-reset,.mc-market-open,.mc-badge,.mc-sport-count')].map(e=>({class:e.className,text:e.textContent.trim(),disabled:e.disabled,pressed:e.getAttribute('aria-pressed'),css:css(e),children:[...e.querySelectorAll('.mc-ui-icon,.mc-odd-value')].map(i=>({tag:i.tagName,src:i.getAttribute('src'),css:css(i)}))})),images:[...document.querySelectorAll('.mc-shell img')].map(e=>({src:e.getAttribute('src'),naturalWidth:e.naturalWidth,width:e.clientWidth,height:e.clientHeight,filter:getComputedStyle(e).filter})),geometry:Object.fromEntries(['.mc-shell','.mc-header','.mc-body','.mc-left','.mc-center','.mc-right','.mc-list-pane','.mc-detail-pane'].map(q=>[q,document.querySelector(q)?.getBoundingClientRect().toJSON()]))};
 });
 await page.screenshot({path:out+prefix+'-full.png'});await page.locator('.mc-quick').screenshot({path:out+prefix+'-quick.png'});await page.locator('.mc-user').screenshot({path:out+prefix+'-user.png'});
 await fs.writeFile(out+prefix+'-audit.json',JSON.stringify({...data,errors,failures},null,2));
 console.log(JSON.stringify({title:data.title,controls:data.controls.length,images:data.images.length,errors,fontsBlocked:failures.filter(r=>r.reason==='net::ERR_NETWORK_ACCESS_DENIED').length}));
} finally {await context.close();await browser.close()}
