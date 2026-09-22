'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { Check, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoPresentation from './logo-presentation.json';
import { priceText, selectionId, sportMenu, type Match, type Selection } from './demo-data';
import { trackerDemo, type TrackerEvent, type TrackerStat } from './tracker-demo';

export function SportsLogo({src,variant,alt=''}:{src:string;variant:'sport'|'league'|'team'|'menu';alt?:string}) {
  const item=(logoPresentation as Record<string,{width:number;height:number;left:number;top:number;backing:boolean;slotWidth:number}>)[src];
  return <span className={`logo-slot logo-${variant}${item?.backing?' logo-backed':''}`} style={variant==='league'&&item?{width:item.slotWidth}:undefined}><img src={src} alt={alt} data-ab-sport-icon={variant==='menu'||variant==='sport'?'neutralized':undefined} style={item?{width:`${item.width}%`,height:`${item.height}%`,left:`${item.left}%`,top:`${item.top}%`}:undefined}/></span>;
}
type Toggle=(match:Match,m:number,p:number)=>void;
type OddsProps={match:Match;selected:Selection[];toggle:Toggle};
const statusText=(match:Match)=>match.completed?'종료':match.state==='in'?match.statusDetail:'예정';

export function TeamRow({match}:{match:Match}) {
  return <span className="ab-team-row">
    <span className="ab-team ab-team-home"><SportsLogo src={match.home.logo} variant="team" alt=""/><strong title={`${match.home.name} / ${match.home.originalName}`}>{match.home.name}</strong></span>
    <span className="ab-team-center"><small>VS</small>{match.state==='pre'?<span className="ab-scheduled">예정</span>:<span className="ab-score" aria-label={`홈 ${match.score[0]} 대 원정 ${match.score[1]}`}><b>{match.score[0]??'–'}</b><span>:</span><b>{match.score[1]??'–'}</b></span>}</span>
    <span className="ab-team ab-team-away"><strong title={`${match.away.name} / ${match.away.originalName}`}>{match.away.name}</strong><SportsLogo src={match.away.logo} variant="team" alt=""/></span>
  </span>;
}
function OddsRow({match,marketIndex,selected,toggle}:{marketIndex:number}&OddsProps) {
  const market=match.markets[marketIndex];
  return <div className="ab-odds" style={{gridTemplateColumns:`repeat(${market.picks.length},minmax(0,1fr))`}} role="group" aria-label={`${match.home.name} ${market.name}`}>
    {market.picks.map((pick,p)=>{const id=selectionId(match,marketIndex,p);return <Button key={id} className="ab-odd" type="button" data-pick={id} aria-label={`${match.home.name} ${market.name} ${pick.label} ${priceText(pick.price)}${pick.locked?' 잠김':''}`} aria-pressed={selected.some(s=>s.id===id)} disabled={pick.locked} onClick={()=>toggle(match,marketIndex,p)}><span>{pick.label}</span><strong>{priceText(pick.price)}</strong>{pick.locked?<LockKeyhole aria-label="잠김"/>:<Check className="ab-pick-check" aria-hidden="true"/>}</Button>})}
  </div>;
}
export function BettingCard({match,selected,toggle,inspected,onInspect}:OddsProps&{inspected:boolean;onInspect:()=>void}) {
  return <article className="ab-match" data-match={match.id} data-state={match.state} data-tracker-selected={inspected}>
    <button className="ab-match-inspect" type="button" aria-pressed={inspected} aria-label={`${match.home.name} 대 ${match.away.name}, ${statusText(match)}, 경기 상세 보기`} onClick={onInspect}>
      <span className="ab-match-meta"><SportsLogo src={match.sportLogo} variant="sport"/><SportsLogo src={match.leagueLogo} variant="league"/><span className="ab-league" title={match.league}>{match.league}</span><time dateTime={match.startUtc}>{match.timeLabel}</time><span className="ab-status" data-live={match.state==='in'}>{match.state==='in'?'LIVE · ':''}{statusText(match)}</span></span>
      <TeamRow match={match}/>
    </button>
    <div className="ab-card-market"><span className="ab-market-caption">{match.markets[0].name}<small>{match.markets[0].rule}</small></span><OddsRow match={match} marketIndex={0} selected={selected} toggle={toggle}/></div>
  </article>;
}

const phases=[{side:'home',label:'공격 전개',x:44,y:24,direction:1},{side:'home',label:'측면 공격',x:67,y:15,direction:1},{side:'away',label:'볼 점유',x:65,y:39,direction:-1},{side:'away',label:'역습 전개',x:38,y:36,direction:-1}] as const;
function FootballPitch({phase,active,label}:{phase:typeof phases[number];active:boolean;label:string}) {
  const {x,y,direction}=phase,tip=x+direction*10;
  return <div className="ab-pitch"><svg viewBox="0 0 100 64" role="img" aria-label={`축구 경기장, ${label}`}>
    <rect width="100" height="64" fill="#23432d"/>{[0,2,4,6,8].map(n=><rect key={n} x={n*10} width="10" height="64" fill="#294c33"/>)}
    <g fill="none" stroke="#b8ccb9" strokeWidth=".4" opacity=".7"><rect x="4" y="4" width="92" height="56"/><path d="M50 4V60"/><circle cx="50" cy="32" r="8"/><path d="M4 17H18V47H4 M96 17H82V47H96 M4 25H9V39H4 M96 25H91V39H96 M18 25Q26 32 18 39 M82 25Q74 32 82 39 M4 28H1.5V36H4 M96 28H98.5V36H96"/></g>
    <g fill="#b8ccb9" opacity=".7"><circle cx="50" cy="32" r=".55"/><circle cx="13.5" cy="32" r=".55"/><circle cx="86.5" cy="32" r=".55"/></g>
    {active&&<><path d={`M${x} ${y}H${tip} M${tip-direction*3} ${y-2}L${tip} ${y}L${tip-direction*3} ${y+2}`} stroke="#ff9a65" fill="none" strokeWidth="1.2"/><g className="ab-pitch-ball" style={{transform:`translate(${x}px,${y}px)`}}><circle r="2.6" fill="#ff641f" opacity=".25"/><circle r="1.25" fill="#f5f4f4" stroke="#111" strokeWidth=".3"/></g></>}
  </svg><span className="ab-pitch-phase">{label}</span></div>;
}
function Stats({stats,match}:{stats:TrackerStat[];match:Match}) {
  return <div className="ab-stats" aria-label={`${match.home.name} 대 ${match.away.name} 통계`}><div className="ab-stat-teamnames"><span title={match.home.name}>홈 · {match.home.name}</span><span title={match.away.name}>원정 · {match.away.name}</span></div>{stats.map(stat=>{const total=(stat.home??0)+(stat.away??0);return <div className="ab-stat" key={stat.label}><div><strong>{stat.home===null?'–':`${stat.home}${stat.unit??''}`}</strong><span>{stat.label}</span><strong>{stat.away===null?'–':`${stat.away}${stat.unit??''}`}</strong></div><div className="ab-stat-bars" data-empty={total===0} aria-hidden="true"><span style={{width:total?`${(stat.home??0)/total*100}%`:'50%'}}/><span/></div></div>})}{match.state==='pre'&&<p className="ab-muted">경기 시작 전 · 통계 대기</p>}</div>;
}
function EventStrip({events,match,minute}:{events:TrackerEvent[];match:Match;minute:number}) {
  const duration=Math.max(90,minute);
  return <div className="ab-event-strip" aria-label="홈 원정 경기 타임라인"><div className="ab-time-scale"><span>전반</span><span>45′ · 후반</span><span>{duration}′</span></div>{(['home','away'] as const).map(side=><div className="ab-event-lane" key={side}><span>{side==='home'?'홈':'원정'}</span><div className="ab-event-track"><span className="ab-event-progress" style={{width:`${minute/duration*100}%`}}/>{events.filter(event=>event.side===side).map((event,i)=><span key={`${side}-${i}`} className={`ab-event-marker ab-event-${event.kind}`} style={{left:`${event.time/duration*100}%`}} title={`${event.time}분 ${match[side].name} ${event.label}`}>{event.kind==='goal'?'●':'▪'}</span>)}</div></div>)}</div>;
}
type TrackerTab='match'|'stats'|'timeline';
const tabs=[{id:'match',label:'경기'},{id:'stats',label:'통계'},{id:'timeline',label:'타임라인'}] as const;
function Tracker({match}:{match:Match}) {
  const [tab,setTab]=useState<TrackerTab>('match'),[step,setStep]=useState(0);
  const demo=trackerDemo(match),live=match.state==='in'&&!match.completed,football=match.sport==='soccer';
  useEffect(()=>{
    if(!live||tab!=='match')return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer:ReturnType<typeof setInterval>|undefined;
    function sync(){if(timer)clearInterval(timer);timer=undefined;if(!document.hidden&&!reduced.matches)timer=setInterval(()=>setStep(value=>(value+1)%4),4000);}
    sync();document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
    return()=>{if(timer)clearInterval(timer);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);};
  },[match.id,live,tab]);
  const phase=phases[(demo.seed+step)%4];
  const phaseLabel=match.state==='pre'?'경기 시작 대기':match.completed?'경기 종료':`${match[phase.side].name} · ${phase.label}`;
  function tabKey(event:KeyboardEvent<HTMLButtonElement>,index:number){const next=event.key==='ArrowRight'?(index+1)%3:event.key==='ArrowLeft'?(index+2)%3:event.key==='Home'?0:event.key==='End'?2:null;if(next===null)return;event.preventDefault();setTab(tabs[next].id);event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role=tab]')[next]?.focus();}
  return <section className="ab-tracker" data-tracker-match={match.id} data-tracker-step={step} aria-label={`${match.home.name} 대 ${match.away.name} 매치 트래커`}>
    <div className="ab-tracker-heading"><span><SportsLogo src={match.leagueLogo} variant="league"/>{match.league}</span><small>DEMO</small></div>
    <div className="ab-scoreboard"><div className="ab-scoreboard-status"><span data-live={live}>{live?'LIVE · ':''}{statusText(match)}</span><time dateTime={match.startUtc}>{match.timeLabel} KST</time></div><TeamRow match={match}/></div>
    {football&&<EventStrip events={demo.events} match={match} minute={demo.minute}/>}
    <div className="ab-tracker-content" role="tabpanel" id={`ab-tracker-${tab}`} aria-labelledby={`ab-tab-${tab}`} tabIndex={0}>
      {tab==='match'?(football?<FootballPitch phase={phase} active={live} label={phaseLabel}/>:<div className="ab-sport-overview"><div className="ab-sport-state"><SportsLogo src={match.sportLogo} variant="sport"/><div><strong>{sportMenu.find(s=>s.id===match.sport)?.name}</strong><span>{statusText(match)}</span></div><span>{live?'진행 스냅샷':match.completed?'최종 기록':'시작 대기'}</span></div><Stats stats={demo.stats} match={match}/>{live&&<div className="ab-live-phase"><span className="ab-phase-dots" aria-hidden="true">{phases.map((_,i)=><i key={i} data-active={step===i}/>)}</span><span>{match.sport==='baseball'?`${match.statusDetail} · ${['투구 준비','타석 대기','수비 정렬','다음 투구 준비'][step]}`:statusText(match)} · 데모 상황</span></div>}</div>):tab==='stats'?<Stats stats={demo.stats} match={match}/>:<div className="ab-timeline"><h3>경기 타임라인</h3>{football&&demo.events.length?<ol>{demo.events.map((event,i)=><li key={i}><time>{event.time}′</time><span>{event.side==='home'?'홈':'원정'} · {match[event.side].name}</span><b>{event.label}</b></li>)}</ol>:<p>{match.state==='pre'?'경기 시작 전입니다.':`${statusText(match)} · ${match.home.name} ${match.score[0]} : ${match.score[1]} ${match.away.name}`}</p>}<small>{match.state==='pre'?`${match.timeLabel} KST 예정`:'득점은 원본 기록을 유지합니다.'}</small></div>}
    </div>
    <div className="ab-tracker-tabs" role="tablist" aria-label="트래커 보기">{tabs.map((item,i)=><button key={item.id} type="button" id={`ab-tab-${item.id}`} role="tab" aria-selected={tab===item.id} aria-controls={`ab-tracker-${tab}`} tabIndex={tab===item.id?0:-1} onClick={()=>setTab(item.id)} onKeyDown={event=>tabKey(event,i)}>{item.label}</button>)}</div>
    <p className="ab-demo-note">{match.state==='pre'?'일정·배당 데모 · 실시간 피드 없음':'점수는 수집 기록 · 보완 통계·상황은 데모'}</p>
  </section>;
}
const filters=[['all','전체'],['result','승패'],['handicap','핸디캡'],['totals','오버언더'],['special','스페셜']] as const;
type MarketFilter=typeof filters[number][0];
const marketCategory=(index:number):MarketFilter=>index===0?'result':index===1?'totals':index===2?'handicap':'special';
export function MatchDetail({match,selected,toggle}:OddsProps) {
  const [filter,setFilter]=useState<MarketFilter>('all');
  return <div className="ab-detail" data-detail-match={match.id}><Tracker key={match.id} match={match}/><section className="ab-detail-markets" aria-label={`${match.home.name} 대 ${match.away.name} 세부 마켓`}><div className="ab-market-filters" role="group" aria-label="세부 마켓 필터">{filters.filter(([id])=>id==='all'||match.markets.some((_,i)=>marketCategory(i)===id)).map(([id,label])=><button key={id} type="button" aria-pressed={filter===id} onClick={()=>setFilter(id)}>{id==='result'&&match.sport==='soccer'?'승무패':label}</button>)}</div><div className="ab-market-panels">{match.markets.map((market,m)=>filter==='all'||filter===marketCategory(m)?<section key={market.key??market.name} className="ab-market-panel" data-market-index={m}><h3>{market.name}{market.line&&<b>{market.line}</b>}<small>{market.rule}</small></h3><OddsRow match={match} marketIndex={m} selected={selected} toggle={toggle}/></section>:null)}</div></section></div>;
}
