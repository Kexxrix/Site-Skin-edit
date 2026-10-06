import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const q=path.dirname(fileURLToPath(import.meta.url));
const candidate='E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3';
const beforeCSS=fs.readFileSync(candidate+'/application-20261006-v1/before-source/app/aldebaran-white.css','utf8');
const oldCapture=JSON.parse(fs.readFileSync(candidate+'/application-20261006-v1/before-browser.json','utf8'));
const assetAudit=JSON.parse(fs.readFileSync(path.join(q,'static-start.json'),'utf8'));
const results={started:new Date().toISOString(),target:'http://127.0.0.1:5384/',isolation:'headless channel chrome; fresh non-persistent contexts; no user profile or storage',checks:[],states:[],layouts:[],pageErrors:[],console:[],failedRequests:[],httpErrors:[],blockedMutations:[]};
const write=()=>fs.writeFileSync(path.join(q,'browser-suite.json'),JSON.stringify(results,null,2));
const check=(name,pass,evidence)=>{results.checks.push({name,status:pass?'PASS':'FAIL',evidence});console.log(JSON.stringify({name,status:pass?'PASS':'FAIL',evidence}));write();};
const b=await chromium.launch({channel:'chrome',headless:true});
const c=await b.newContext({viewport:{width:1920,height:1080}});
await c.route('**/*',async r=>{if(!['GET','HEAD'].includes(r.request().method())){results.blockedMutations.push({url:r.request().url(),method:r.request().method()});await r.abort();}else await r.continue();});
const p=await c.newPage();
function listen(page,label){page.on('pageerror',e=>results.pageErrors.push({label,error:String(e)}));page.on('console',m=>{if(['warning','error'].includes(m.type()))results.console.push({label,type:m.type(),text:m.text()})});page.on('requestfailed',r=>results.failedRequests.push({label,url:r.url(),failure:r.failure()}));page.on('response',r=>{if(r.status()>=400)results.httpErrors.push({label,url:r.url(),status:r.status()})});}
listen(p,'current');
async function ready(page){await page.goto(results.target,{waitUntil:'networkidle',timeout:60000});await page.locator('.ab5-shell').waitFor();await page.evaluate(()=>document.fonts.ready);}
async function snapshot(page){return page.evaluate(()=>{
 const geo=sel=>[...document.querySelectorAll(sel)].map((e,i)=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {i,class:e.className,role:e.getAttribute('aria-label'),x:r.x,y:r.y,w:r.width,h:r.height,font:s.fontFamily,fontSize:s.fontSize,gap:s.gap,padding:s.padding,text:e.innerText}});
 const icon= e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),button=e.closest('button'),br=button?.getBoundingClientRect();let ancestors=[];for(let a=e;a&&a!==document.body;a=a.parentElement){const cs=getComputedStyle(a);if(cs.filter!=='none'||cs.maskImage!=='none'||cs.opacity!=='1')ancestors.push({class:a.className,filter:cs.filter,mask:cs.maskImage,opacity:cs.opacity});}return {key:e.dataset.graphiteIcon,v3:e.dataset.aldebaranIconV3,src:e.getAttribute('src'),class:e.className,parent:e.parentElement.className,buttonClass:button?.className,label:button?.innerText||e.parentElement.innerText,loaded:e.complete&&e.naturalWidth>0,w:r.width,h:r.height,x:r.x,y:r.y,filter:s.filter,mask:s.maskImage,opacity:s.opacity,objectFit:s.objectFit,ancestors,outsideButton:br? r.left<br.left-.5||r.right>br.right+.5||r.top<br.top-.5||r.bottom>br.bottom+.5:false};};
 return {text:document.body.innerText,viewport:{w:innerWidth,h:innerHeight},scrollWidth:document.documentElement.scrollWidth,scrollX,geometry:geo('.ab5-header,.ab5-center,.ab5-rail,.ab5-sport-tab,.ab5-quick-action,.ab5-user-actions button,.ab5-notice-links button,.ab5-bet-submit'),major:geo('.ab5-header,.ab5-body,.ab5-center,.ab5-center-grid,.ab5-pane,.ab5-rail,.ab5-sportbar,.ab5-quick,.ab5-user,.ab5-slip,.ab5-slip-empty,.ab5-card'),icons:[...document.querySelectorAll('[data-graphite-icon]')].map(icon),selectionIds:[...document.querySelectorAll('[data-selection-id]')].map(e=>e.dataset.selectionId),odds:[...document.querySelectorAll('.ab5-odd-value')].map(e=>({text:e.textContent,color:getComputedStyle(e).color})),brokenImages:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src)};
 });}
async function state(locator,role,phase){const d=await locator.evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect(),im=e.querySelector('img'),is=im&&getComputedStyle(im),ir=im?.getBoundingClientRect();return {text:e.innerText,disabled:e.disabled,pressed:e.getAttribute('aria-pressed'),expanded:e.getAttribute('aria-expanded'),focusVisible:e.matches(':focus-visible'),color:s.color,background:s.backgroundColor,border:s.borderColor,outline:s.outline,rect:r.toJSON(),icon:im?{src:im.getAttribute('src'),loaded:im.complete&&im.naturalWidth>0,filter:is.filter,opacity:is.opacity,mask:is.maskImage,rect:ir.toJSON()}:null};});results.states.push({role,phase,...d});write();return d;}
async function compareLayout(width,height){
 await p.setViewportSize({width,height});await p.evaluate(()=>window.scrollTo(0,0));const current=await snapshot(p);
 const ref=await c.newPage();listen(ref,'baseline-reconstruction-'+width);
 await ref.setViewportSize({width,height});await ref.route('**/app/aldebaran-white.css*',r=>r.fulfill({status:200,contentType:'text/css',body:beforeCSS}));await ready(ref);
 await ref.evaluate(()=>{const functionMap={deposit:'deposit',withdraw:'withdraw',support:'support',notice:'notice',gift:'gift',attendance:'attendance',messages:'messages',ticket:'ticket'};document.querySelectorAll('img[src*="aldebaran-simple-v3"]').forEach(e=>{const k=e.dataset.graphiteIcon;e.src='/icons/graphite-20261002/'+(functionMap[k]||k)+'.png';delete e.dataset.aldebaranIconV3;});});
 await ref.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));const baseline=await snapshot(ref);
 const majorDiff=current.major.flatMap((e,i)=>{const f=baseline.major[i];const fields=['x','y','w','h','font','fontSize','gap','padding'];const dif=fields.filter(k=>e[k]!==f?.[k]);return dif.length?[{i,class:e.class,fields:dif,before:f,after:e}]:[]});
 const expectedChanges=current.geometry.flatMap((e,i)=>{const f=baseline.geometry[i];const dif=['x','y','w','h','font','fontSize','gap','padding'].filter(k=>e[k]!==f?.[k]);return dif.length?[{i,class:e.class,fields:dif,before:f,after:e}]:[]});
 results.layouts.push({method:'current server, read-only browser CSS response replaced by exact before-source CSS and old PNG src restored in isolated reference page; TSX behavior unchanged per source diff',width,height,current,baseline,majorDiff,expectedChanges});
 check('layout-'+width,majorDiff.length===0&&current.scrollWidth===baseline.scrollWidth&&JSON.stringify(current.selectionIds)===JSON.stringify(baseline.selectionIds)&&current.text===baseline.text,{majorDiff,scrollWidths:[baseline.scrollWidth,current.scrollWidth],expectedChanges:expectedChanges.map(e=>({class:e.class,fields:e.fields})),sameText:current.text===baseline.text,sameSelectionIds:JSON.stringify(current.selectionIds)===JSON.stringify(baseline.selectionIds)});
 if(width===1920){const originalDiff=current.geometry.flatMap((e,i)=>{const f=oldCapture.geometry[i];const fields=['x','y','w','h','font','fontSize','gap','padding'].filter(k=>e[k]!==f?.[k]);return fields.length?[{i,class:e.class,fields}]:[]});results.savedBaselineComparison={sameText:current.text===oldCapture.text,sameSelectionIds:JSON.stringify(current.selectionIds)===JSON.stringify(oldCapture.selectionIds),geometryDifferences:originalDiff};write();}
 if(width===1366){await p.evaluate(()=>window.scrollTo(document.documentElement.scrollWidth-innerWidth,0));await p.screenshot({path:path.join(q,'04-current-1366-right.png')});check('narrow-horizontal-navigation',await p.evaluate(()=>scrollX===554),{rightScrollX:await p.evaluate(()=>scrollX)});}
 await ref.close();return current;
}
try{
 await ready(p);const initial=await snapshot(p);results.initial=initial;
 const unique=[...new Set(initial.icons.filter(i=>i.src.includes('aldebaran-simple-v3')).map(i=>i.src.split('/').pop()))];
 check('all-18-roles-render',unique.length===18,{unique,renderedV3Instances:initial.icons.filter(i=>i.src.includes('aldebaran-simple-v3')).length});
 check('loading-alpha-and-native-colors',initial.brokenImages.length===0&&initial.icons.filter(i=>i.src.includes('aldebaran-simple-v3')).every(i=>i.loaded&&i.filter==='none'&&i.mask==='none'&&(i.opacity==='1'||i.buttonClass==='ab5-bet-submit')),{broken:initial.brokenImages,alteringAncestors:initial.icons.filter(i=>i.ancestors.length)});
 check('icon-button-bounds',initial.icons.every(i=>!i.outsideButton),{outside:initial.icons.filter(i=>i.outsideButton)});
 results.httpAssetHashes=[];
 for(const a of assetAudit.assets){const response=await c.request.get(results.target+'icons/aldebaran-simple-v3-20261006/'+a.name);const bytes=await response.body();const hash=crypto.createHash('sha256').update(bytes).digest('hex');results.httpAssetHashes.push({name:a.name,status:response.status(),hash,expected:a.sha256,bytes:bytes.length});}
 check('18-http-asset-hashes',results.httpAssetHashes.every(a=>a.status===200&&a.hash===a.expected),{count:results.httpAssetHashes.length});
 await compareLayout(1920,1080);
 const counts={all:61,soccer:32,basketball:6,baseball:16,volleyball:0,hockey:7,formula1:0,boxing:0,mma:0,motorsports:0};
 for(const [sport,n] of Object.entries(counts)){
  const button=p.locator('.ab5-sport-tab[data-sport="'+sport+'"]');await p.mouse.move(0,100);await state(button,sport,'normal');await button.hover();await state(button,sport,'hover');await p.keyboard.press('Tab');await button.focus();const focus=await state(button,sport,'focus');
  await button.click();await p.waitForFunction(({sport,n})=>document.querySelector('.ab5-sport-tab[data-sport="'+sport+'"]').getAttribute('aria-pressed')==='true'&&document.querySelectorAll('.ab5-list-pane [data-match-id]').length===n,{sport,n});const selected=await state(button,sport,'selected');
  check('sport-'+sport,selected.pressed==='true'&&focus.focusVisible&&selected.icon.loaded&&selected.icon.filter==='none'&&selected.icon.opacity==='1'&&await p.locator('.ab5-sport-tab[aria-pressed="true"]').count()===1,{expectedCards:n,actualCards:await p.locator('.ab5-list-pane [data-match-id]').count(),focusVisible:focus.focusVisible});
  if(sport==='mma')await p.screenshot({path:path.join(q,'02-mma-selected-empty.png')});
 }
 await p.locator('.ab5-sport-tab[data-sport="all"]').click();
 for(const role of ['action-deposit','action-withdraw','action-support','action-notice','action-gift','action-attendance','action-message']){
  const button=p.locator('button').filter({has:p.locator('[data-aldebaran-icon-v3="'+role+'"]')}).last();await p.mouse.move(0,100);const normal=await state(button,role,'normal');await button.hover();const hover=await state(button,role,'hover');await p.keyboard.press('Tab');await button.focus();const focus=await state(button,role,'focus');
  check('function-states-'+role,normal.icon.loaded&&hover.icon.opacity==='1'&&focus.icon.filter==='none'&&focus.focusVisible,{focusVisible:focus.focusVisible,dimensions:[normal.icon.rect.width,normal.icon.rect.height],disabled:normal.disabled});
 }
 const disabled=p.locator('.ab5-bet-submit');const ticket=await state(disabled,'state-empty-slip','disabled');check('disabled-bet-ticket',ticket.disabled&&ticket.icon.opacity==='0.48'&&ticket.icon.loaded,{ticket});
 for(const [selector,label,title] of [
 ['.ab5-quick-action','충전','충전'],['.ab5-quick-action','환전','환전 안내'],['.ab5-quick-action','고객센터','고객센터'],
 ['.ab5-notice-links button','공지사항','공지사항'],['.ab5-notice-links button','이벤트게시판','이벤트게시판'],['.ab5-notice-links button','출석체크','출석체크'],
 ['.ab5-user-actions button','쪽지','쪽지함'],['.ab5-user-actions button','페이백','페이백'],['.ab5-user-actions button','베팅내역','내 베팅내역'],['.ab5-notice-links button','이용규정','이용규정']]){
  const trigger=p.locator(selector).filter({hasText:new RegExp('^'+label+'$')});await trigger.click();const dialog=p.getByRole('dialog');await dialog.waitFor();const actual=await dialog.locator('[data-slot="dialog-title"]').innerText();
  const detail=await dialog.evaluate(e=>({text:e.innerText,images:[...e.querySelectorAll('img')].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0,w:i.getBoundingClientRect().width,h:i.getBoundingClientRect().height,filter:getComputedStyle(i).filter,opacity:getComputedStyle(i).opacity})),rect:e.getBoundingClientRect().toJSON()}));results.states.push({role:label,phase:'popup-read-only',...detail});
  check('popup-'+label,actual===title&&detail.images.every(i=>i.loaded),{actual,images:detail.images});
  if(label==='고객센터')await p.screenshot({path:path.join(q,'03-support-popup.png')});
  await dialog.getByRole('button',{name:'닫기',exact:true}).click();await dialog.waitFor({state:'hidden'});
 }
 const soccerTree=p.locator('.ab5-sport-row').filter({hasText:'축구'});await soccerTree.click();const country=p.locator('.ab5-country').first();await country.click();const league=p.locator('.ab5-league-link').first();await league.click();check('sports-country-league-filter',await league.getAttribute('aria-pressed')==='true',{country:await country.innerText(),league:await league.innerText(),cards:await p.locator('.ab5-list-pane [data-match-id]').count()});
 await p.locator('.ab5-sport-tab[data-sport="all"]').click();
 const search=p.getByRole('textbox',{name:'해외형 스포츠 검색',exact:true});await search.fill('QA_NO_MATCH_20261006');await p.locator('.ab5-list-pane .ab5-empty').waitFor();check('preserved-empty-search',await p.locator('.ab5-list-pane [data-graphite-icon="empty-search"]').getAttribute('src')==='/icons/graphite-20261002/empty-search.png',{text:await p.locator('.ab5-list-pane .ab5-empty').innerText()});await search.fill('');
 const odds=p.locator('.ab5-list-pane .ab5-odd:not(:disabled)').first();const id=await odds.getAttribute('data-selection-id');const value=Number(await odds.locator('.ab5-odd-value').innerText());await odds.click();await p.getByRole('textbox',{name:'베팅 금액',exact:true}).fill('5000');
 const calculated=await p.locator('.ab5-slip-summary').innerText();const payout=await p.locator('.ab5-payout-value').innerText();const total=await p.locator('[data-total-odds]').innerText();check('selection-calculation-without-submit',payout===Math.floor(value*5000).toLocaleString('en-US')&&await disabled.isDisabled()&&await p.locator('[data-selection="'+id+'"]').count()===1,{id,value,stake:5000,total,payout,calculated,betDisabled:await disabled.isDisabled()});
 await p.locator('.ab5-delete').click();await p.locator('.ab5-reset').click();
 await p.locator('.ab5-menu-item').filter({hasText:'국내형 스포츠'}).click();check('domestic-mode',await p.locator('.ab5-center').getAttribute('data-mode')==='domestic',{mode:await p.locator('.ab5-center').getAttribute('data-mode')});await p.locator('.ab5-menu-item').filter({hasText:'해외형 스포츠'}).click();
 // Reload restores the same initial inspection target and empty slip in this isolated context.
 await p.reload({waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 await compareLayout(1366,900);await compareLayout(390,844);await p.setViewportSize({width:1920,height:1080});await p.evaluate(()=>window.scrollTo(0,0));
 results.final=await snapshot(p);
 check('no-local-runtime-or-network-errors',results.pageErrors.length===0&&results.failedRequests.filter(x=>x.url.startsWith(results.target)).length===0&&results.httpErrors.filter(x=>x.url.startsWith(results.target)).length===0&&results.final.brokenImages.length===0,{pageErrors:results.pageErrors,localFailures:results.failedRequests.filter(x=>x.url.startsWith(results.target)),localHttpErrors:results.httpErrors.filter(x=>x.url.startsWith(results.target)),broken:results.final.brokenImages,externalFailures:results.failedRequests.filter(x=>!x.url.startsWith(results.target)),externalHttpErrors:results.httpErrors.filter(x=>!x.url.startsWith(results.target))});
 check('no-transaction-submission',results.blockedMutations.length===0&&await p.locator('.ab5-slip-selection').count()===0,{blocked:results.blockedMutations,storage:await p.evaluate(()=>Object.fromEntries(Object.entries(localStorage)))});
 results.finished=new Date().toISOString();write();
}catch(e){results.suiteError=String(e);write();console.log('SUITE ERROR',String(e));process.exitCode=1;}
finally{await c.close();await b.close();}
