const fs=require('fs'),path=require('path'),crypto=require('crypto');
const dir=path.join(__dirname,'sources');fs.mkdirSync(dir,{recursive:true});
const feeds=[['mlb','baseball','mlb'],['nfl','football','nfl'],['premier-league','soccer','eng.1'],['mls','soccer','usa.1'],['bundesliga','soccer','ger.1'],['ligue-1','soccer','fra.1'],['nba','basketball','nba'],['wnba','basketball','wnba'],['nhl','hockey','nhl']];
(async()=>{
 const results=await Promise.allSettled(feeds.map(async([key,sport,code])=>{
  const url=`https://site.web.api.espn.com/apis/site/v2/sports/${sport}/${code}/scoreboard?limit=100`;
  const file=path.join(dir,`espn-${key}-latest.json`);
  if(fs.existsSync(file)){const body=fs.readFileSync(file,'utf8');return {key,url,file,collectedAt:fs.statSync(file).mtime.toISOString(),events:JSON.parse(body).events.length,sha256:crypto.createHash('sha256').update(body).digest('hex')};}
  const response=await fetch(url,{signal:AbortSignal.timeout(30000),headers:{'User-Agent':'SportsAssetResearch/1.0'}});
  if(!response.ok)throw Error(`${key}: HTTP ${response.status}`);
  const body=await response.text(),data=JSON.parse(body);
  if(!Array.isArray(data.events))throw Error('Missing events: '+key);
  fs.writeFileSync(file,body);
  return {key,url,file,collectedAt:new Date().toISOString(),events:data.events.length,sha256:crypto.createHash('sha256').update(body).digest('hex')};
 }));
 const report=results.map(r=>r.status==='fulfilled'?r.value:{error:String(r.reason)});
 fs.writeFileSync(path.join(__dirname,'collection-latest.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
})();
