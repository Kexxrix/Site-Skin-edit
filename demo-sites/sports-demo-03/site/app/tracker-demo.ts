import type { Market, Match } from './demo-data';

// Only missing tracker statistics/events and two extra markets are synthesized.
// Scores, match state, names, dates and the original three markets stay authoritative.
export function fixtureSeed(id:string) {
  let value=0;
  for(const char of id)value=(value*31+char.charCodeAt(0))>>>0;
  return value;
}
export function footballMinute(match:Match) {
  if(match.state==='pre')return 0;
  if(match.completed)return 90;
  const minute=match.statusDetail.match(/(\d+)(?:['′분]|:\d{2})/);
  return minute?Math.min(120,Number(minute[1])):match.statusDetail.includes('후반')?60:30;
}
export function extraFootballMarkets(id:string):Market[] {
  const seed=fixtureSeed(id);
  return [
    {key:'first-half-result',source:'local-demo',name:'전반 승무패',rule:'전반 45분 · 데모',picks:[{key:'home',label:'홈',price:(210+(seed%7)*10)/100},{key:'draw',label:'무',price:(205+(seed%5)*10)/100},{key:'away',label:'원정',price:(280+(seed%9)*10)/100}]},
    {key:'first-scoring-team',source:'local-demo',name:'첫 득점 팀',rule:'정규시간 · 데모',picks:[{key:'home',label:'홈',price:(185+(seed%5)*10)/100},{key:'none',label:'득점 없음',price:8+(seed%9)/10},{key:'away',label:'원정',price:2.125}]},
  ];
}
export type TrackerEvent={side:'home'|'away';time:number;label:string;kind:'goal'|'card'|'status'};
export type TrackerStat={label:string;home:number|null;away:number|null;unit?:string};
export function trackerDemo(match:Match) {
  const seed=fixtureSeed(match.id+match.sport),scheduled=match.state==='pre';
  const numeric=(value:string)=>/^\d+$/.test(value)?Number(value):null;
  const home=numeric(match.score[0]),away=numeric(match.score[1]);
  const minute=footballMinute(match);
  let stats:TrackerStat[];
  const events:TrackerEvent[]=[];
  if(match.sport==='soccer') {
    const possession=43+seed%15;
    const hs=home===null?null:home+2+seed%4,as=away===null?null:away+1+(seed>>>3)%4;
    stats=[{label:'점유율',home:possession,away:100-possession,unit:'%'},{label:'슈팅',home:hs===null?null:hs+3+seed%4,away:as===null?null:as+2+seed%3},{label:'유효 슈팅',home:hs,away:as},{label:'코너킥',home:2+seed%5,away:1+(seed>>>4)%5}];
    if(!scheduled) {
      for(const [side,goals] of [['home',home],['away',away]] as const) {
        for(let i=0;i<(goals??0);i++)events.push({side,time:Math.max(1,Math.floor(minute*(i+1)/((goals??0)+1))),label:'골',kind:'goal'});
      }
      if(minute>15)events.push({side:seed%2?'home':'away',time:Math.floor(minute*.42),label:'경고',kind:'card'});
    }
  } else if(match.sport==='baseball') {
    stats=[{label:'득점',home,away},{label:'안타',home:home===null?null:home+2+seed%4,away:away===null?null:away+2+(seed>>>2)%4},{label:'실책',home:seed%2,away:(seed>>>3)%2}];
  } else if(match.sport==='basketball') {
    stats=[{label:'득점',home,away},{label:'리바운드',home:home===null?null:Math.floor(home*.36)+seed%5,away:away===null?null:Math.floor(away*.36)+(seed>>>2)%5},{label:'3점 성공',home:home===null?null:Math.floor(home/12),away:away===null?null:Math.floor(away/12)}];
  } else if(match.sport==='hockey') {
    stats=[{label:'득점',home,away},{label:'유효 슈팅',home:home===null?null:home+12+seed%9,away:away===null?null:away+12+(seed>>>3)%9}];
  } else {
    stats=[{label:'득점',home,away},{label:'공격 야드',home:home===null?null:home*9+seed%25,away:away===null?null:away*9+(seed>>>2)%25}];
  }
  if(scheduled)stats=stats.map(stat=>({...stat,home:null,away:null}));
  return {stats,events:events.sort((a,b)=>a.time-b.time),minute,seed};
}
