const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const root = 'E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303';
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const results = await Promise.all(['02','03','04'].map(async id => {
    const context = await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
    const page = await context.newPage();
    await page.goto(`https://titan-solution-t${id}.pages.dev/`,{waitUntil:'networkidle'});
    const result = await page.evaluate(() => {
      const box = e => { const r=e.getBoundingClientRect(), s=getComputedStyle(e); return { tag:e.tagName, id:e.id, class:e.className, text:e.innerText?.slice(0,100), rect:{x:r.x,y:r.y,width:r.width,height:r.height}, css:{width:s.width,minWidth:s.minWidth,maxWidth:s.maxWidth,display:s.display,overflowX:s.overflowX} }; };
      return {url:location.href,meta:[...document.querySelectorAll('meta[name="viewport"]')].map(e=>e.content), width:innerWidth,clientWidth:document.documentElement.clientWidth,visualViewport:{width:visualViewport.width,height:visualViewport.height,scale:visualViewport.scale},body:box(document.body),roots:[...document.body.children].map(box),main:[...document.querySelectorAll('main,section,h1,h2,h3')].map(box),cssLinks:[...document.querySelectorAll('link[rel="stylesheet"]')].map(l=>l.href)};
    });
    await context.close();
    console.log(JSON.stringify({id,...result}));
    return {id,...result};
  }));
  await fs.writeFile(root+'/qa/capture-layout-check.json',JSON.stringify(results,null,2));
  await browser.close();
})();
