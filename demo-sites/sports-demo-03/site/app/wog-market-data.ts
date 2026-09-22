import type { Match, Market } from './demo-data';

/** Supplemental, stable local prices; never presented as a live provider feed. */
export function expandedMarkets(match: Match): Market[] {
  const seed=Array.from(match.id).reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,0);
  const football=match.sport==='soccer',baseball=match.sport==='baseball',basketball=match.sport==='basketball',hockey=match.sport==='hockey';
  const period=baseball?'첫 5이닝':basketball?'1쿼터':hockey?'1피리어드':match.sport==='volleyball'?'1세트':football?'전반':'전반';
  const periodKey=baseball?'first-five-innings':basketball?'first-quarter':hockey?'first-period':match.sport==='volleyball'?'first-set':'first-half';
  const periodEnded=match.completed||(match.state==='in'&&baseball&&Number(match.statusDetail.match(/\d+/)?.[0]??0)>5);
  const result:Market[]=[];
  function add(key:string,name:string,category:Market['category'],labels:string[],line?:string,group=key,locked=match.completed){
    const salt=Array.from(key+(line??'')).reduce((n,c)=>n+c.charCodeAt(0),seed)%19;
    const values=labels.length===3?[1.68+salt*.035,3.2+salt*.06,2.6+salt*.075]:[1.68+salt*.017,2.14-salt*.013];
    result.push({key,name,category,group,line,rule:'로컬 데모 · '+(key.startsWith(periodKey)?period:'전체 경기'),source:'local-demo',picks:labels.map((label,i)=>({label,key:labels.length===3?['home','draw','away'][i]:['first','second'][i],price:Number(values[i].toFixed(3)),locked}))});
  }
  const total=Number(match.markets[1].line),handicap=Number(match.markets[2].line?.match(/[\d.]+/)?.[0]??1.5);
  for(const offset of [-1,1]){
    const line=Number((-handicap+offset).toFixed(1));
    add('full-handicap','핸디캡','handicap',['홈','원정'],String(line),'handicap');
    add('full-total','언더 / 오버','totals',['언더','오버'],String(Math.max(.5,total+offset)),'totals');
  }
  add('full-odd-even','총 득점 홀 / 짝','other',['홀','짝']);
  const periodTotal=baseball?Math.max(.5,Math.floor(total*.55)+.5):basketball?Math.floor(total/4)+.5:hockey?.5:football?.5:match.sport==='volleyball'?45.5:Math.floor(total/2)+.5;
  // Football R4 already supplies a first-half result market.
  if(!football)add(periodKey+'-result',period+' 승패','result',['홈','원정'],undefined,undefined,periodEnded);
  for(const offset of [0,1,2])add(periodKey+'-total',period+' 언더 / 오버','totals',['언더','오버'],String(periodTotal+offset),periodKey+'-total',periodEnded);
  for(const side of ['home','away'] as const){
    const name=side==='home'?'홈팀':'원정팀';
    const teamTotal=football?.5:baseball?Math.floor(total/2)+.5:Math.floor(total/2)+.5;
    for(const offset of [0,1])add('full-'+side+'-total',name+' 득점 언더 / 오버','totals',['언더','오버'],String(teamTotal+offset),'full-'+side+'-total');
  }
  if(football)add('both-teams-score','양 팀 득점','other',['예','아니오']);
  if(baseball){
    add('remaining-innings-result','잔여 이닝 승패','result',['홈','원정']);
    for(const line of [1.5,2.5,3.5])add('remaining-innings-total','잔여 이닝 언더 / 오버','totals',['언더','오버'],String(line),'remaining-innings-total');
  }
  return result;
}

export function marketGroups(match:Match){
  const groups=new Map<string,{id:string;name:string;category:NonNullable<Market['category']>;rows:number[]}>();
  match.markets.forEach((market,index)=>{
    const id=market.group??(index===0?'result':index===1?'totals':index===2?'handicap':market.key!);
    const category=market.category??(index===0||market.key==='first-half-result'?'result':index===1?'totals':index===2?'handicap':'other');
    const current=groups.get(id);
    if(current)current.rows.push(index);else groups.set(id,{id,name:index===1?'언더 / 오버':market.name,category,rows:[index]});
  });
  // The same result / handicap / totals order in cards and detail.
  const priority:Record<string,number>={result:0,handicap:1,totals:2};
  return [...groups.values()].sort((a,b)=>(priority[a.id]??3)-(priority[b.id]??3));
}

const countries:Record<string,[string,string]>={mlb:['미국','🇺🇸'],nba:['미국','🇺🇸'],wnba:['미국','🇺🇸'],nfl:['미국','🇺🇸'],mls:['미국','🇺🇸'],nhl:['북미','🇺🇸'],bundesliga:['독일','🇩🇪'],'premier-league':['잉글랜드','🇬🇧'],'la-liga':['스페인','🇪🇸'],'serie-a':['이탈리아','🇮🇹'],'ligue-1':['프랑스','🇫🇷']};
export const countryFor=(match:Match)=>countries[match.leagueKey]??['국제','🌐'];
export const matchesQuery=(match:Match,query:string)=>`${match.home.name} ${match.away.name} ${match.home.originalName} ${match.away.originalName} ${match.league} ${match.leagueKey} ${countryFor(match)[0]}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
