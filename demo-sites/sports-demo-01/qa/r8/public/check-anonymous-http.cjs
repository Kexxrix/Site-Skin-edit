const fs=require('fs'),path=require('path'),crypto=require('crypto');
const site=path.resolve(__dirname,'../../../site'),base='https://mercury.kexxadrix.chatgpt.site/';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
  const htmlResponse=await fetch(base,{signal:AbortSignal.timeout(20000)}),html=await htmlResponse.text();
  const cssPath='/_next/static/css/index.BRM1po-v.css';
  const assets=JSON.parse(fs.readFileSync(path.join(__dirname,'../implementation/asset-mapping.json'))).map(a=>({urlPath:'/'+path.relative(path.join(site,'public'),a.destination).replaceAll('\\','/'),sha256:a.sha256}));
  assets.push({urlPath:cssPath,sha256:sha(fs.readFileSync(path.join(site,'dist/client',cssPath)))});
  const results=await Promise.allSettled(assets.map(async a=>{const response=await fetch(new URL(a.urlPath,base),{signal:AbortSignal.timeout(20000)}),bytes=Buffer.from(await response.arrayBuffer());return {path:a.urlPath,status:response.status,type:response.headers.get('content-type'),bytes:bytes.length,sha256:sha(bytes),matches:sha(bytes)===a.sha256};}));
  const report={checkedAt:new Date().toISOString(),url:base,anonymous:true,html:{status:htmlResponse.status,cssReferenced:html.includes(cssPath),progressCards:(html.match(/data-state="in"/g)||[]).length,photoBanners:(html.match(/class="photo-banner photo-banner-/g)||[]).length},assets:results,allPassed:htmlResponse.status===200&&html.includes(cssPath)&&results.every(r=>r.status==='fulfilled'&&r.value.status===200&&r.value.matches)};
  fs.writeFileSync(path.join(__dirname,'anonymous-http.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(!report.allPassed)process.exitCode=1;
})();
