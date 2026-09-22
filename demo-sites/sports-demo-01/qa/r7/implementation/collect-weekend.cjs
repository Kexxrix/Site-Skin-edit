const fs=require('fs'),path=require('path'),crypto=require('crypto');
const feeds=[['premier-league','eng.1'],['mls','usa.1'],['bundesliga','ger.1'],['ligue-1','fra.1']];
(async()=>{
 const report=await Promise.all(feeds.map(async([key,code])=>{
  const file=path.join(__dirname,'sources',`espn-${key}-20260919.json`),url=`https://site.web.api.espn.com/apis/site/v2/sports/soccer/${code}/scoreboard?dates=20260919&limit=100`;
  let body;if(fs.existsSync(file))body=fs.readFileSync(file,'utf8');else {const r=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`${key} ${r.status}`);body=await r.text();JSON.parse(body);fs.writeFileSync(file,body);}
  return {key,url,file,collectedAt:fs.statSync(file).mtime.toISOString(),events:JSON.parse(body).events.length,sha256:crypto.createHash('sha256').update(body).digest('hex')};
 }));fs.writeFileSync(path.join(__dirname,'collection-weekend.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
})();
