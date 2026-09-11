const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs/promises');
const root='E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
  const context=await browser.newContext({viewport:{width:1200,height:900},deviceScaleFactor:1});
  const page=await context.newPage();const messages=[];
  page.on('console',message=>{if(['warning','error'].includes(message.type()))messages.push({type:message.type(),text:message.text()})});
  await page.goto('https://titan-solution-t01.pages.dev/',{waitUntil:'networkidle',timeout:45000});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(3500);
  const state=await page.evaluate(()=>({
    activeMenu:document.querySelector('button[data-menu][aria-pressed="true"]')?.getAttribute('data-menu'),
    scenes:[...document.querySelectorAll('.hades-designer-art__scene')].map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),c=e.querySelector('canvas');return {class:e.className,opacity:s.opacity,visibility:s.visibility,zIndex:s.zIndex,rect:{x:r.x,y:r.y,width:r.width,height:r.height},canvas:c?{width:c.width,height:c.height,display:getComputedStyle(c).display,opacity:getComputedStyle(c).opacity,dataUrlLength:c.toDataURL().length}:null}})
  }));
  const screenshot=root+'/sources/cat-village-tablet-character.png';
  await fs.access(screenshot).then(()=>{throw new Error('Output exists')},()=>{});
  await page.screenshot({path:screenshot,fullPage:false});
  console.log(JSON.stringify({screenshot,state,messages}));
  await fs.writeFile(root+'/qa/capture-cat-character-render.json',JSON.stringify({screenshot,state,messages,viewport:{width:1200,height:900},engine:'Headless Chrome with software ANGLE/SwiftShader; no page DOM or CSS changes',waitAfterLoadMs:3500},null,2));
  await context.close();
 }finally{await browser.close()}
})();
