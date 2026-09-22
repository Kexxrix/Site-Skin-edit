const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
(async()=>{
const dir=__dirname,expected=JSON.parse(fs.readFileSync(dir+'/expected-assets.json')),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const pageResponse=await fetch(expected.url,{headers:{'cache-control':'no-cache'}}),html=await pageResponse.text();
const page={status:pageResponse.status,url:pageResponse.url,title:html.match(/<title>(.*?)<\/title>/)?.[1],initialRows:(html.match(/<article[^>]*data-match=/g)||[]).length,siriusBrand:html.includes('/branding/sirius-wordmark.png'),favicon:html.includes('/branding/sirius-symbol.png'),oldVisibleBrand:html.includes('MERCURY')};
const assets=[];for(let i=0;i<expected.assets.length;i+=4){assets.push(...await Promise.all(expected.assets.slice(i,i+4).map(async item=>{const r=await fetch(expected.url+item.path),bytes=Buffer.from(await r.arrayBuffer());return {...item,status:r.status,contentType:r.headers.get('content-type'),publicSha256:sha(bytes),bytes:bytes.length,match:sha(bytes)===item.sha256};})));}
const cssPaths=[...new Set([...html.matchAll(/href="([^\"]+\.css)"/g)].map(m=>m[1]).filter(p=>p.startsWith('/')))];
const styles=[];for(const p of cssPaths){const r=await fetch(expected.url+p),bytes=Buffer.from(await r.arrayBuffer()),local=path.resolve(dir,'../../../site/dist/client','.'+p);styles.push({path:p,status:r.status,sha256:sha(bytes),buildSha256:sha(fs.readFileSync(local)),match:sha(bytes)===sha(fs.readFileSync(local))});}
const report={checkedAt:new Date().toISOString(),anonymous:true,authorizationOrCookies:false,sourceId:expected.sourceId,page,assets,styles,pass:page.status===200&&page.title==='SIRIUS · 스포츠'&&page.initialRows===18&&!page.oldVisibleBrand&&assets.every(a=>a.status===200&&a.match)&&styles.length>0&&styles.every(s=>s.status===200&&s.match)};
fs.writeFileSync(dir+'/anonymous-http.json',JSON.stringify(report,null,2));console.log(JSON.stringify({page,assets:assets.length,styles:styles.length,pass:report.pass}));if(!report.pass)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
