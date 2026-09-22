const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = 'E:/codexwork/Site-Skin-edit/TEMP/Sports-Images';
const site = 'E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site';
const qa = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(root,'metadata/manifest.json'),'utf8'));
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const copied = new Map();
function asset(item) {
  if (!item) throw Error('Required asset missing');
  const src = path.join(root,item.normalized_path);
  const dest = path.join(site,'public/sports/r6',item.id+'.png');
  fs.mkdirSync(path.dirname(dest),{recursive:true});
  if (fs.existsSync(dest) && hash(dest)!==hash(src)) throw Error('Asset collision: '+dest);
  if (!fs.existsSync(dest)) fs.copyFileSync(src,dest);
  if (hash(src)!==hash(dest)) throw Error('Asset copy hash mismatch');
  copied.set(item.id,{id:item.id,source:src,target:dest,sha256:hash(dest),sourceTeamId:item.source_team_id,sourceUrl:item.source_url});
  return '/sports/r6/'+item.id+'.png';
}
const specs = [
  ['mlb','baseball','live','MLB','탬파베이 레이스','애슬레틱스'],
  ['nba','basketball','live','NBA 프리시즌','토론토 랩터스','마이애미 히트'],
  ['nhl','hockey','live','NHL 프리시즌','토론토 메이플리프스','몬트리올 캐네이디언스'],
  ['wnba','basketball','soon','WNBA','애틀랜타 드림','코네티컷 선'],
  ['nfl','american-football','soon','NFL','버펄로 빌스','디트로이트 라이언스'],
  ['bundesliga','soccer','soon','분데스리가','바이에른 뮌헨','우니온 베를린'],
  ['premier-league','soccer','popular','프리미어리그','브렌트퍼드','첼시'],
  ['mls','soccer','popular','MLS','뉴욕 시티 FC','뉴욕 레드불스'],
  ['ligue-1','soccer','popular','리그 1','AS 모나코','RC 랑스'],
];
const format = date => {
  const d = new Date(new Date(date).getTime()+9*3600000);
  return `${String(d.getUTCMonth()+1).padStart(2,'0')}.${String(d.getUTCDate()).padStart(2,'0')} ${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;
};
const games = specs.map(([key,sport,section,league,homeName,awayName])=>{
  const sourceFile=path.join(root,`metadata/sources/espn-${key}-scoreboard.json`);
  const data=JSON.parse(fs.readFileSync(sourceFile,'utf8'));
  const event=data.events[0],competition=event.competitions[0];
  const home=competition.competitors.find(t=>t.homeAway==='home');
  const away=competition.competitors.find(t=>t.homeAway==='away');
  const teamAsset=t=>asset(manifest.find(m=>m.category==='teams'&&m.group===key&&String(m.source_team_id)===String(t.team.id)));
  const sportKey=sport==='hockey'?'ice-hockey':sport;
  const sportImage=manifest.find(m=>m.category==='sports'&&m.key===sportKey);
  const sourceMtime=fs.statSync(sourceFile).mtime.toISOString();
  const status=event.status.type;
  return {id:'record-'+event.id,sourceEventId:event.id,section,sport,league,leagueKey:key,
    home:{id:home.team.id,name:homeName,originalName:home.team.displayName,logo:teamAsset(home)},
    away:{id:away.team.id,name:awayName,originalName:away.team.displayName,logo:teamAsset(away)},
    leagueLogo:asset(manifest.find(m=>m.category==='leagues'&&m.key===key)),sportLogo:asset(sportImage),
    state:status.state,completed:status.completed,statusCode:status.name,statusDetail:status.detail,
    score:status.state==='pre'?['–','–']:[String(home.score),String(away.score)],startUtc:event.date,
    timeLabel:format(event.date),timeZone:'Asia/Seoul',sourceUrl:event.links.find(l=>l.rel?.includes('summary'))?.href||event.links[0].href,
    sourceCollectedDate:'2026-09-16',sourceFileMtimeUtc:sourceMtime,sourceSha256:hash(sourceFile),
    sourceFile:`metadata/sources/espn-${key}-scoreboard.json`,sourceMode:'static-collection',oddsMode:'demo'};
});
const sportMenu=[['all','전체 스포츠','trophy'],['soccer','축구','soccer'],['basketball','농구','basketball'],['baseball','야구','baseball'],['american-football','미식축구','american-football'],['hockey','아이스하키','ice-hockey'],['volleyball','배구','volleyball'],['tennis','테니스','tennis'],['esports','E스포츠','esports']].map(([id,name,key])=>({id,name,logo:id==='all'?null:asset(manifest.find(m=>m.category==='sports'&&m.key===key))}));
fs.writeFileSync(path.join(site,'app/match-records.json'),JSON.stringify(games,null,2)+'\n');
fs.writeFileSync(path.join(site,'app/sport-menu.json'),JSON.stringify(sportMenu,null,2)+'\n');
fs.writeFileSync(path.join(qa,'asset-mapping.json'),JSON.stringify([...copied.values()],null,2));
fs.writeFileSync(path.join(qa,'data-provenance.json'),JSON.stringify({checkedAt:new Date().toISOString(),note:'Only selected stored scoreboards and mapped logos used; statuses describe Sep 16 collection, not current live state. Extra ESPN browsing was not adopted.',games},null,2));
console.log(JSON.stringify({games:games.length,assets:copied.size,sections:Object.fromEntries(['live','soon','popular'].map(id=>[id,games.filter(g=>g.section===id).length]))}));

