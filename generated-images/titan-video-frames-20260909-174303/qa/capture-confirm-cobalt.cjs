const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
const crypto=require('node:crypto');
const root='E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303';
const sourceDir=path.join(root,'sources');
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const inspect=async filename=>{
  const absolutePath=path.join(sourceDir,filename),buffer=await fs.readFile(absolutePath);
  if(buffer.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw new Error('Invalid PNG: '+filename);
  return {file:filename,absolutePath,pixelSize:{width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)},bytes:buffer.length,sha256:hash(buffer)};
};
(async()=>{
  const manifestPath=path.join(sourceDir,'capture-manifest.json');
  const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
  const candidate=await inspect('sportsbook-cobalt-desktop-detail-crop.png');
  await fs.copyFile(candidate.absolutePath,path.join(sourceDir,'chosen-sportsbook-phone.png'),fs.constants.COPYFILE_EXCL);
  const chosen=await inspect('chosen-sportsbook-phone.png');
  if(chosen.sha256!==candidate.sha256)throw new Error('Selected file hash mismatch');
  manifest.sportsbook.selectionStatus='accepted_by_user';
  manifest.sportsbook.selectedCandidate='cobalt';
  manifest.sportsbook.chosenFile=chosen.file;
  manifest.sportsbook.selection={userInstruction:'COBALT 실제 경기 목록을 휴대폰 비율로 크롭',confirmedAt:new Date().toISOString(),sourceFile:candidate.file,...chosen,sourceHashMatched:true,mobile_native:false,desktop_detail_crop:true,uiModified:false};
  await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
  console.log(JSON.stringify({event:'selection_confirmed',...manifest.sportsbook.selection}));

  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:910},deviceScaleFactor:2,isMobile:false});
    const page=await context.newPage();
    const response=await page.goto('https://titan-solution-t03.pages.dev/',{waitUntil:'domcontentloaded',timeout:45000});
    await page.waitForLoadState('networkidle',{timeout:12000}).catch(()=>{});
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>window.scrollTo({left:318,top:592,behavior:'instant'}));
    const state=await page.evaluate(()=>({url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight},scroll:{x:scrollX,y:scrollY},mainMinWidth:getComputedStyle(document.querySelector('main')).minWidth}));
    const tallPath=path.join(sourceDir,'cobalt-phone-tall.png');
    await fs.access(tallPath).then(()=>{throw new Error('Tall output already exists')},()=>{});
    await page.screenshot({path:tallPath,fullPage:false});
    const tall=await inspect('cobalt-phone-tall.png');
    const updated=JSON.parse(await fs.readFile(manifestPath,'utf8'));
    updated.sportsbook.tallVariant={...tall,...state,httpStatus:response.status(),requestedViewport:{width:390,height:910},deviceScaleFactor:2,emulation:'narrow desktop browser viewport',mobile_native:false,desktop_detail_crop:true,uiModified:false,capturedAt:new Date().toISOString(),purpose:'Additional taller screen source for code perspective compositing; preserves the original chosen capture.',sameScrollAsChosen:true};
    await fs.writeFile(manifestPath,JSON.stringify(updated,null,2)+'\n');
    console.log(JSON.stringify({event:'tall_capture_completed',...updated.sportsbook.tallVariant}));
    await context.close();
  }finally{await browser.close()}
})();
