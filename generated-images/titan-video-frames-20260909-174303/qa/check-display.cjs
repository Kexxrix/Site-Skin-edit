const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const shots=[
['01 TABLET','derived/01-tablet-start-character.png'],
['02 PHONE','derived/02-phone-start.png'],
['03 RECORDS','results/03-ledger-start.png'],
['04 PRODUCTS','derived/04-products-start.png']
];
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1940,height:1100},deviceScaleFactor:1});
 const markup='<style>*{box-sizing:border-box}body{margin:20px;background:#17191e;color:#fff;font:15px Arial,sans-serif}.row{display:grid;grid-template-columns:938px 938px;gap:18px;margin-bottom:24px}.label{height:28px}.full{display:block;width:938px;height:528px;object-fit:contain;background:#111}.wide{display:block;width:938px;height:400px;object-fit:cover;background:#111;border-radius:16px}.note{font-size:14px;color:#b6bac4;margin-top:12px}</style>'+
 shots.map(([id,file],i)=>{const src='data:image/png;base64,'+fs.readFileSync(path.join(root,file)).toString('base64');return '<section class="row" id="row-'+i+'"><div><div class="label">'+id+' | Full source (approximately 16:9)</div><img class="full" src="'+src+'"></div><div><div class="label">938 x 400 | Centered cover preview</div><img class="wide" id="wide-'+i+'" src="'+src+'"><div class="note">'+(i===1?'Phone tips are cropped by centered cover; actual match cards remain visible.':'Main subject remains within the wide frame.')+'</div></div></section>';}).join('');
 await page.setContent(markup);
 await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(im=>im.decode())));
 const dimensions=await page.locator('img').evaluateAll(imgs=>imgs.map(im=>({naturalWidth:im.naturalWidth,naturalHeight:im.naturalHeight,displayWidth:im.getBoundingClientRect().width,displayHeight:im.getBoundingClientRect().height,complete:im.complete})));
 await page.screenshot({path:path.join(__dirname,'display-proof.png'),fullPage:true});
 for(let i=0;i<shots.length;i++)await page.locator('#wide-'+i).screenshot({path:path.join(__dirname,'wide-scene-'+(i+1)+'.png')});
 fs.writeFileSync(path.join(__dirname,'display-proof.json'),JSON.stringify({browser:'Chrome via bundled Playwright',sourceUnmodified:true,dimensions,wideCropCaveat:'Scene 02 phone top and bottom tips are clipped under centered cover at 938x400; full source is complete. No website changes.'},null,2));
 await browser.close();
 console.log(JSON.stringify({imagesDecoded:dimensions.length,fullScreenshot:'qa/display-proof.png',wideScreenshots:4}));
})().catch(e=>{console.error(e);process.exit(1)});

