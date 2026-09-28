import type {Match,Market} from './demo-data';
export {selectionId} from './demo-data';

export function marketGroups(match:Match){
  const groups=new Map<string,{id:string;name:string;category:NonNullable<Market['category']>;rows:number[]}>();
  match.markets.forEach((market,index)=>{
    const id=market.group??(index===0?'result':index===1?'totals':index===2?'handicap':market.key!);
    const category=market.category??(index===0||market.key==='first-half-result'?'result':index===1?'totals':index===2?'handicap':'other');
    const current=groups.get(id);
    if(current)current.rows.push(index);else groups.set(id,{id,name:index===1?'언더 / 오버':market.name,category,rows:[index]});
  });
  // The same result / handicap / totals order in cards and detail.
  const priority=(rows:number[])=>rows.includes(0)?0:rows.includes(2)?1:rows.includes(1)?2:3;
  return [...groups.values()].sort((a,b)=>priority(a.rows)-priority(b.rows));
}

const countries:Record<string,[string,string]>={mlb:['미국','🇺🇸'],nba:['미국','🇺🇸'],wnba:['미국','🇺🇸'],nfl:['미국','🇺🇸'],mls:['미국','🇺🇸'],nhl:['북미','🇺🇸'],bundesliga:['독일','🇩🇪'],'premier-league':['잉글랜드','🇬🇧'],'la-liga':['스페인','🇪🇸'],'serie-a':['이탈리아','🇮🇹'],'ligue-1':['프랑스','🇫🇷']};
export const countryFor=(match:Match)=>countries[match.leagueKey]??['국제','🌐'];
export const matchesQuery=(match:Match,query:string)=>`${match.home.name} ${match.away.name} ${match.home.originalName} ${match.away.originalName} ${match.league} ${match.leagueKey} ${countryFor(match)[0]}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
