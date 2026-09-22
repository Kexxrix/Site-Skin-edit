const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root='E:/codexwork/Site-Skin-edit/TEMP/Sports-Images',site=path.resolve(__dirname,'../../../site');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'metadata/manifest.json')));
const old=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../r6/implementation/data-provenance.json'))).games;
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const copied=new Map(),rejected=[];
function asset(item){
 if(!item)throw Error('Missing required mapped asset');
 const src=path.join(root,item.normalized_path),existing=path.join(site,'public/sports/r6',item.id+'.png');
 const dest=fs.existsSync(existing)?existing:path.join(site,'public/sports/r7',item.id+'.png');
 fs.mkdirSync(path.dirname(dest),{recursive:true});if(fs.existsSync(dest)&&hash(dest)!==hash(src))throw Error('Collision '+dest);
 if(!fs.existsSync(dest))fs.copyFileSync(src,dest);if(hash(src)!==hash(dest))throw Error('Copy mismatch');
 const url='/'+path.relative(path.join(site,'public'),dest).replaceAll('\\','/');
 copied.set(url,{id:item.id,url,source:src,target:dest,sha256:hash(dest),sourceTeamId:item.source_team_id,sourceUrl:item.source_url});return url;
}
const leagueSpecs={mlb:['baseball','MLB'],nba:['basketball','NBA 프리시즌'],nhl:['hockey','NHL 프리시즌'],wnba:['basketball','WNBA'],nfl:['american-football','NFL'],'premier-league':['soccer','프리미어리그'],mls:['soccer','MLS'],bundesliga:['soccer','분데스리가'],'ligue-1':['soccer','리그 1']};
const sources=['collection-latest.json','collection-weekend.json'].flatMap(f=>JSON.parse(fs.readFileSync(path.join(__dirname,f))));
const records=new Map(old.map(g=>[g.id,g]));const labels=new Map(old.flatMap(g=>[g.home,g.away].map(t=>[g.leagueKey+':'+t.id,t.name])));
for(const source of sources){
 const data=JSON.parse(fs.readFileSync(source.file)),[sport,league]=leagueSpecs[source.key];
 if(hash(source.file)!==source.sha256)throw Error('Source hash mismatch');
 for(const event of data.events){
  const c=event.competitions[0],home=c.competitors.find(t=>t.homeAway==='home'),away=c.competitors.find(t=>t.homeAway==='away');
  if(!home?.team||!away?.team||home.team.id===away.team.id){rejected.push({event:event.id,reason:'Not a two-team fixture'});continue;}
  const team=t=>{const m=manifest.find(a=>a.category==='teams'&&a.group===source.key&&String(a.source_team_id)===String(t.team.id));if(!m)throw Error(`Missing ${source.key} team ${t.team.id}`);return {id:t.team.id,name:labels.get(source.key+':'+t.team.id)||t.team.shortDisplayName||t.team.displayName,originalName:t.team.displayName,logo:asset(m)};};
  const status=event.status.type,id='record-'+event.id,previous=records.get(id);
  const d=new Date(new Date(event.date).getTime()+9*3600000),pad=n=>String(n).padStart(2,'0');
  try {records.set(id,{id,sourceEventId:event.id,section:previous?.section||'',sport,league,leagueKey:source.key,home:team(home),away:team(away),leagueLogo:asset(manifest.find(a=>a.category==='leagues'&&a.key===source.key)),sportLogo:asset(manifest.find(a=>a.category==='sports'&&a.key===(sport==='hockey'?'ice-hockey':sport))),state:status.state,completed:status.completed,statusCode:status.name,statusDetail:status.detail,score:status.state==='pre'?['–','–']:[String(home.score),String(away.score)],startUtc:event.date,timeLabel:`${pad(d.getUTCMonth()+1)}.${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`,timeZone:'Asia/Seoul',sourceUrl:event.links?.find(l=>l.rel?.includes('summary'))?.href||event.links?.[0]?.href,sourceCollectedDate:source.collectedAt.slice(0,10),sourceFileMtimeUtc:source.collectedAt,sourceSha256:source.sha256,sourceFile:path.relative(path.resolve(__dirname,'../../..'),source.file).replaceAll('\\','/'),sourceMode:'static-collection',oddsMode:'demo'});}catch(error){rejected.push({event:event.id,reason:String(error)});}
 }
}
const games=[...records.values()],sections=['live','soon','popular'],counts=Object.fromEntries(sections.map(s=>[s,games.filter(g=>g.section===s).length]));
// Preserve original fixture IDs/order; evenly distribute supplemental unique fixtures.
for(const g of games.filter(g=>!g.section).sort((a,b)=>a.startUtc.localeCompare(b.startUtc)||a.id.localeCompare(b.id))){const s=sections.reduce((a,b)=>counts[a]<=counts[b]?a:b);g.section=s;counts[s]++;}
for(const g of games){if(!g.sourceUrl||!g.home.logo||!g.away.logo||!g.startUtc)throw Error('Incomplete fixture '+g.id);}
if(games.length<60||new Set(games.map(g=>g.sourceEventId)).size!==games.length)throw Error('Insufficient or duplicate fixtures');
fs.writeFileSync(path.join(site,'app/match-records.json'),JSON.stringify(games,null,2)+'\n');
fs.writeFileSync(path.join(__dirname,'asset-mapping.json'),JSON.stringify([...copied.values()],null,2)+'\n');
fs.writeFileSync(path.join(__dirname,'data-provenance.json'),JSON.stringify({checkedAt:new Date().toISOString(),games:games.length,uniqueFixtures:new Set(games.map(g=>g.sourceEventId)).size,sections:counts,leagues:Object.fromEntries(Object.keys(leagueSpecs).map(k=>[k,games.filter(g=>g.leagueKey===k).length])),states:Object.fromEntries(['pre','in','post'].map(s=>[s,games.filter(g=>g.state===s).length])),rejected,sources,records:games},null,2)+'\n');
console.log(JSON.stringify({games:games.length,sections:counts,rejected,assets:copied.size}));
