const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const base='https://mercury.kexxadrix.chatgpt.site';
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 try{
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const errors=[],warnings=[],failedResponses=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)failedResponses.push({url:r.url(),status:r.status()});});
  await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const state=await page.evaluate(()=>({title:document.title,url:location.href,overlay:!!document.querySelector('vite-error-overlay, nextjs-portal'),
   primary:[...document.querySelectorAll('.mc-quick-action.primary')].map(el=>({text:el.innerText,mask:getComputedStyle(el.querySelector('.mc-ui-icon')).maskImage,color:getComputedStyle(el.querySelector('.mc-ui-icon')).backgroundColor})),
   newUi:[...document.querySelectorAll('.mc-ui-icon[src^="/icons/sirius-20261001/"]')].map(el=>({source:el.getAttribute('src'),loaded:el.complete&&el.naturalWidth>0,filter:getComputedStyle(el).filter})),
   sports:[...document.querySelectorAll('.mc-sport-tab')].map(el=>({id:el.dataset.sport,source:el.querySelector('img').getAttribute('src'),count:el.querySelector('.mc-sport-count').innerText})),
   logo:document.querySelector('.mc-brand img').getAttribute('src'),
   missing:[...document.images].filter(el=>!el.complete||!el.naturalWidth).map(el=>el.src)}));
  assert.equal(state.title,'MERCURY · 스포츠');assert.equal(state.overlay,false);assert.equal(state.missing.length,0);
  const old=['충전01','환전02','고객센터02'];
  assert.equal(state.primary.length,3);
  for(let i=0;i<3;i++){assert.equal(state.primary[i].color,'rgb(23, 23, 23)');assert(decodeURI(state.primary[i].mask).includes('Icon_Image_'+old[i]+'.png'));}
  assert(state.newUi.length>0&&state.newUi.every(i=>i.loaded&&i.filter==='none'));
  assert.equal(state.sports.length,10);assert.equal(state.sports[0].count,'61');
  assert(state.sports.every(i=>i.source.startsWith('/sports/sirius-20261001/')));
  assert.equal(state.logo,'/branding/mercury-wordmark_v3.png');
  const assets=JSON.parse(fs.readFileSync(path.join(__dirname,'../20261001-mercury-sirius-icons-local/asset-mapping.json'),'utf8'));
  state.assets=[];
  for(const a of assets){const r=await page.request.get(base+a.url);assert.equal(r.status(),200);const hash=crypto.createHash('sha256').update(await r.body()).digest('hex');assert.equal(hash,a.sha256);state.assets.push({id:a.id,sourceHashMatch:true,status:r.status()});}
  const cdp=await page.context().newCDPSession(page),shot=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,clip:{x:0,y:0,width:1920,height:1080,scale:1}});
  fs.writeFileSync(path.join(__dirname,'public-v25.png'),Buffer.from(shot.data,'base64'));
  await page.screenshot({path:path.join(__dirname,'public-v25-buttons.png'),clip:{x:16,y:212,width:305,height:46}});
  await page.locator('.mc-quick-action.primary').nth(2).click();const dialog=page.getByRole('dialog');await dialog.waitFor({state:'visible'});assert((await dialog.innerText()).includes('고객센터'));await dialog.getByRole('button',{name:'닫기',exact:true}).click();await dialog.waitFor({state:'hidden'});
  state.interaction='customer support dialog opens and closes';state.errors=errors;state.warnings=warnings;state.failedResponses=failedResponses;
  state.result=errors.length||failedResponses.length?'assets_verified_with_console_or_network_errors':'passed';
  fs.writeFileSync(path.join(__dirname,'public-verification.json'),JSON.stringify(state,null,2));
  console.log(JSON.stringify({result:state.result,assets:state.assets.length,primary:state.primary,errors,warnings,failedResponses}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
