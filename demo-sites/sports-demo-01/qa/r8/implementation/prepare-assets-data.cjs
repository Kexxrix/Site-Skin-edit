const fs=require('fs'),path=require('path'),crypto=require('crypto');
const project=path.resolve(__dirname,'../../..'),site=path.join(project,'site');
const input=path.join(project,'input/mercury-mvp-r8-package/MERCURY_MVP_R8/assets');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const mappings=[];
for(const folder of ['sports-icons','banners'])for(const name of fs.readdirSync(path.join(input,folder)).filter(n=>n.endsWith('.png'))){
  const from=path.join(input,folder,name),to=path.join(site,'public',folder==='banners'?'banners/r8':'sports/r8',name);
  fs.mkdirSync(path.dirname(to),{recursive:true});if(fs.existsSync(to))throw Error('Destination exists: '+to);
  fs.copyFileSync(from,to);if(sha(fs.readFileSync(from))!==sha(fs.readFileSync(to)))throw Error('Copy mismatch');
  mappings.push({source:from,destination:to,sha256:sha(fs.readFileSync(to))});
}
fs.writeFileSync(path.join(__dirname,'asset-mapping.json'),JSON.stringify(mappings,null,2));
const records=JSON.parse(fs.readFileSync(path.join(site,'app/match-records.json')));
const snapshots={};
for(const result of JSON.parse(fs.readFileSync(path.join(__dirname,'progress-collection.json')))){
  if(result.status!=='fulfilled')throw Error('Source unavailable');
  const src=result.value,data=JSON.parse(fs.readFileSync(path.join(__dirname,'sources',src.file)));
  const fixture=records.find(r=>r.sourceEventId===src.id),competitors=data.header.competitions[0].competitors;
  for(const side of ['home','away'])if(competitors.find(c=>c.homeAway===side)?.id!==fixture[side].id)throw Error('Team mismatch');
  const play=data.plays.find(p=>p.period?.number===7&&p.type?.type==='start-inning'&&p.period.type==='Top');
  if(!play||!play.wallclock||!Number.isInteger(play.homeScore)||!Number.isInteger(play.awayScore))throw Error('No authentic progress play');
  snapshots[fixture.id]={state:'in',completed:false,statusCode:'STATUS_IN_PROGRESS',statusDetail:'7회초',score:[String(play.homeScore),String(play.awayScore)],sourceMode:'static-progress-snapshot',sourceUrl:src.url,sourceCollectedDate:src.collectedAt.slice(0,10),sourceFileMtimeUtc:src.collectedAt,sourceSha256:src.sha256,sourceFile:'qa/r8/implementation/sources/'+src.file,progressSource:{eventId:src.id,playId:play.id,wallclock:play.wallclock,period:play.period,text:play.text,homeTeamId:fixture.home.id,awayTeamId:fixture.away.id,originalEventState:'post',isCurrentFeed:false,replay:false,stoppedSnapshot:true,scoreOrder:['home','away']}};
}
fs.writeFileSync(path.join(site,'app/live-snapshots.json'),JSON.stringify(snapshots,null,2)+'\n');
fs.writeFileSync(path.join(__dirname,'data-provenance.json'),JSON.stringify({baselineCount:records.length,retainedIds:records.map(r=>r.id),localScoreboards:{count:25,progressCount:0},snapshots,sportsCoverage:'3 MLB snapshots; existing 77 fixtures preserved; 2-sport preference not met',animation:'LIVE dot only; no automatic score/clock/odds changes'},null,2));
console.log(JSON.stringify({assets:mappings.length,snapshots:Object.keys(snapshots)}));
