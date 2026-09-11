const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs/promises');
const root='E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1200,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  await page.goto('https://titan-solution-t01.pages.dev/',{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForLoadState('networkidle',{timeout:12000}).catch(()=>{});
  await page.evaluate(()=>document.fonts.ready);
  const inspect=()=>page.evaluate(()=>({
   url:location.href,title:document.title,scroll:{x:scrollX,y:scrollY},
   images:[...document.querySelectorAll('img')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {src:e.currentSrc||e.src,alt:e.alt,class:e.className,loaded:e.complete,natural:[e.naturalWidth,e.naturalHeight],rect:{x:r.x,y:r.y,width:r.width,height:r.height},display:s.display,visibility:s.visibility,opacity:s.opacity,ancestor:e.parentElement.outerHTML.slice(0,600)}}),
   nav:[...document.querySelectorAll('button')].filter(e=>/LIVE CASINO|SLOT GAME|FEATURED PICKS|NOTICE/.test(e.innerText)).map(e=>({text:e.innerText,outer:e.outerHTML.slice(0,1200)})),
   backgroundElements:[...document.querySelectorAll('main,section,[class*="character"],[class*="Character"],[class*="hero"],[class*="Hero"]')].map(e=>({tag:e.tagName,class:e.className,background:getComputedStyle(e).backgroundImage,style:e.getAttribute('style')}))
  }));
  const initial=await inspect();
  await page.waitForTimeout(5000);
  const afterAnimation=await inspect();
  await fs.writeFile(root+'/qa/capture-cat-character-inspection.json',JSON.stringify({initial,afterAnimation},null,2));
  console.log(JSON.stringify({initial,afterAnimation}));
  await context.close();
 }finally{await browser.close()}
})();
