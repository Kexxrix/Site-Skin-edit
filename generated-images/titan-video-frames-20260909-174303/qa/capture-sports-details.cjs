const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const crypto = require('node:crypto');
const path = require('node:path');
const root = 'E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303';
const candidates = [
  {id:'aures',url:'https://titan-solution-t02.pages.dev/',selector:'#live'},
  {id:'cobalt',url:'https://titan-solution-t03.pages.dev/',selector:'#live-sports'},
  {id:'lumiere',url:'https://titan-solution-t04.pages.dev/',selector:'section[class*="_sportsSection_"]'},
];
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const results = await Promise.all(candidates.map(async candidate => {
    const context = await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:false});
    const page = await context.newPage();
    try {
      const response = await page.goto(candidate.url,{waitUntil:'networkidle',timeout:45000});
      await page.evaluate(()=>document.fonts.ready);
      const navigation = await page.evaluate(()=>({
        links:[...document.querySelectorAll('a[href]')].map(e=>({text:e.innerText.trim(),href:e.getAttribute('href')})),
        iframes:[...document.querySelectorAll('iframe')].map(e=>({src:e.getAttribute('src'),title:e.title})),
        mobileControls:[...document.querySelectorAll('a,button')].filter(e=>/mobile|모바일|mobile view|phone/i.test(e.innerText+' '+(e.getAttribute('aria-label')||'')+' '+(e.getAttribute('href')||''))).map(e=>({text:e.innerText,href:e.getAttribute('href')}))
      }));
      const scrollState = await page.evaluate(({selector,id})=>{
        const section = document.querySelector(selector);
        if(!section)throw new Error('Observed sports section not found');
        let scrollContainer = null;
        if(id==='lumiere') {
          scrollContainer=section.closest('section[class*="_mainContent_"]');
          scrollContainer.scrollTop = section.offsetTop - scrollContainer.offsetTop - 8;
        }
        const rect=section.getBoundingClientRect();
        window.scrollTo({left:Math.max(0,rect.left+scrollX-2),top:id==='lumiere'?0:Math.max(0,rect.top+scrollY-8),behavior:'instant'});
        return {requestedSelector:selector,window:{x:scrollX,y:scrollY},internal:scrollContainer?{selector:'section[class*="_mainContent_"]',x:scrollContainer.scrollLeft,y:scrollContainer.scrollTop}:null};
      },candidate);
      const visible = await page.evaluate(()=>({
        documentViewport:{width:innerWidth,height:innerHeight},
        windowScroll:{x:scrollX,y:scrollY},
        visibleText:[...document.querySelectorAll('h2,h3,button')].filter(e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth}).map(e=>e.innerText.trim()).filter(Boolean),
      }));
      const screenshot=path.join(root,'sources',`sportsbook-${candidate.id}-desktop-detail-crop.png`);
      await fs.access(screenshot).then(()=>{throw new Error('Output already exists')},()=>{});
      await page.screenshot({path:screenshot,fullPage:false});
      const buffer=await fs.readFile(screenshot);
      const result={...candidate,httpStatus:response.status(),navigation,requestedViewport:{width:390,height:844},deviceScaleFactor:2,pixelSize:{width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)},mobile_native:false,desktop_detail_crop:true,uiModified:false,scrollState,...visible,screenshot,bytes:buffer.length,sha256:crypto.createHash('sha256').update(buffer).digest('hex')};
      console.log(JSON.stringify(result));
      return result;
    }catch(error){const result={...candidate,error:String(error)};console.log(JSON.stringify(result));return result}
    finally{await context.close()}
  }));
  await fs.writeFile(path.join(root,'qa','capture-sports-details.json'),JSON.stringify(results,null,2));
  await browser.close();
})();
