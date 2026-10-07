import {chromium} from 'file:///C:/Users/User/AppData/Local/npm-cache/_npx/705bc6b22212b352/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('.',import.meta.url)),browser=await chromium.launch({headless:true}),ctx=await browser.newContext({viewport:{width:1920,height:994}}),page=await ctx.newPage();
try{
 await page.goto('http://127.0.0.1:5418/',{waitUntil:'networkidle'});
 const evidence=await page.locator('.mc-user-actions img.mc-ui-icon,.mc-quick-action.secondary img.mc-ui-icon').evaluateAll(images=>{
  const luminance=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0),background=luminance([255,250,240]);
  return images.map(img=>{
   const samples=[90,85,80,75,70,65].map(brightness=>{
    const canvas=document.createElement('canvas');canvas.width=img.clientWidth;canvas.height=img.clientHeight;const ctx=canvas.getContext('2d');
    ctx.filter=`brightness(${brightness}%) contrast(101%) saturate(104%)`;ctx.drawImage(img,0,0,canvas.width,canvas.height);const rgba=ctx.getImageData(0,0,canvas.width,canvas.height).data,ratios=[];
    for(let i=0;i<rgba.length;i+=4)if(rgba[i+3]>=230){const foreground=luminance([...rgba.slice(i,i+3)]);ratios.push((background+.05)/(foreground+.05))}
    ratios.sort((a,b)=>a-b);
    return {brightness,opaquePixels:ratios.length,min:ratios[0],median:ratios[Math.floor(ratios.length/2)],max:ratios.at(-1),fractionAtLeast3:ratios.filter(r=>r>=3).length/ratios.length};
   });
   return {src:img.getAttribute('src'),size:img.clientWidth,originalFilter:getComputedStyle(img).filter,samples,classification:'Gold highlights are multicolor; numerical ranges document inspection, not a uniform-color accessibility claim'};
  });
 });
 await fs.writeFile(out+'service-icon-contrast-candidates.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence.map(e=>({src:e.src,medians:e.samples.map(s=>[s.brightness,+s.median.toFixed(2)])}))));
}finally{await ctx.close();await browser.close()}
