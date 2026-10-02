'use client';

// oxlint-disable next/no-img-element -- Supplied local PNGs and team identities keep native bytes and dimensions.
// oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Independent scroll areas must remain keyboard reachable.
// oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG flag identity uses the valid image role.

import {useLayoutEffect,useRef,useState,type ReactNode} from 'react';
import {ArrowDownToLine,ArrowUpFromLine,Bell,ChevronDown,Eye,Headphones,History,Info,Gamepad2,LockKeyhole,LogOut,Mail,Radio,Search,Ticket,Trash2,Trophy,X} from 'lucide-react';
import {Switch} from '@/components/ui/switch';
import {matches,sportMenu,priceText,moneyText,DEMO,totalsFor,validateStake,type Match,type Selection,type Receipt} from './demo-data';
import {marketGroups,countryFor,matchesQuery,selectionId} from './sirius-market-view';
import {HeightAccordion,BackToTop} from './match-motion';
import {SiriusLeftBanners} from './sirius-left-banners';
import {SiriusLeftMenu} from './sirius-left-menu';
import './sirius-header-revision.css';

export type Session={loggedIn:boolean;balance:number;history:Receipt[];nickname?:string};
export type Overlay={kind:'info';title:string;body:string}|{kind:'account'|'charge'|'withdraw'|'history'|'confirm'}|{kind:'receipt';receipt:Receipt};
export type Open=(overlay:Overlay)=>void;
type Mode='domestic'|'european';
type ListFilters={query:string;sport:string;league:string};
type Props={selected:Selection[];toggle:(match:Match,m:number,p:number)=>void;session:Session;open:Open;logout:()=>void;stake:string;setStake:(v:string)=>void;stakeTouched:boolean;setStakeTouched:(v:boolean)=>void;remove:(id:string)=>void;clear:()=>void;keep:boolean;setKeep:(v:boolean)=>void;storageError:string};
const menu=[['domestic','국내형 스포츠',Trophy],['european','해외형 스포츠',Trophy],['esports','E 스포츠',Gamepad2],['inplay','인플레이',Radio],['casino','카지노',Ticket],['slots','슬롯',Gamepad2],['minigame','미니게임',Gamepad2],['virtual','가상 스포츠',Trophy],['community','자유게시판',Mail],['results','경기결과',Trophy]] as const;
const notices=[['notice','공지사항'],['event','이벤트게시판'],['attendance','출석체크'],['support','고객센터'],['rules','이용규정']] as const;
const quick=[['deposit','충전'],['withdraw','환전'],['history','베팅내역'],['notice','공지사항'],['support','고객센터'],['rules','스포츠 안내']] as const;
const services=[['deposit','충전'],['withdraw','환전'],['payback','페이백'],['messages','쪽지'],['support','고객센터'],['history','베팅내역']] as const;
const banners=[['support','텔레그램 고객센터','문의 및 제휴 안내','01'],['notice','텔레그램 공식채널','이벤트 및 공지 안내','02'],['rules','SIRIUS 이용안내','서비스 이용 방법','03'],['live-guide','실시간 중계 안내','경기 중계 일정 확인','04'],['lineups','스포츠 라인업','경기별 선수 정보','05'],['age-policy','미성년자 이용불가','만 19세 이상 이용','06']] as const;
const sportTabs=sportMenu;
const filters=[['all','전체'],['result','승무패'],['handicap','핸디캡'],['totals','언더·오버'],['other','기타']] as const;

const uiIcons={deposit:ArrowDownToLine,withdraw:ArrowUpFromLine,history:History,notice:Bell,support:Headphones,rules:Info,event:Ticket,messages:Mail,attendance:Trophy,reset:History,ticket:Ticket};
const rasterIcons=new Set<string>(["attendance", "deposit", "event", "history", "messages", "notice", "reset", "rules", "support", "ticket", "withdraw"]);
function UiIcon({name,masked=false}:{name:string;masked?:boolean}){
  const aliases:Record<string,keyof typeof uiIcons>={payback:'event',guide:'rules'};
  const iconName=aliases[name]??(name in uiIcons?name as keyof typeof uiIcons:'rules');
  const src='/ui/sirius-20261001/'+iconName+'.png';
  if(rasterIcons.has(iconName))return masked?<span className="sr-ui-icon sr-ui-icon-mask" aria-hidden="true" style={{maskImage:'url("'+src+'")',WebkitMaskImage:'url("'+src+'")'}}/>:<img className="sr-ui-icon" src={src} alt="" width="256" height="256"/>;
  const Icon=uiIcons[iconName];
  return <Icon className={'sr-ui-icon'+(masked?' sr-ui-icon-action':'')} aria-hidden="true"/>;
}

function SportIcon({sport}:{sport:typeof sportTabs[number]}){return <span className="sr-sport-icon" data-icon={sport.id}><img src={sport.logo!} alt=""/></span>;}

function CountryFlag({country}:{country:string}){
  return <svg className="sr-country-flag" viewBox="0 0 30 20" role="img" aria-label={country}>{country==='독일'?<><path fill="#151515" d="M0 0h30v7H0z"/><path fill="#cf2435" d="M0 7h30v6H0z"/><path fill="#ffce45" d="M0 13h30v7H0z"/></>:country==='프랑스'?<><path fill="#174389" d="M0 0h10v20H0z"/><path fill="#fff" d="M10 0h10v20H10z"/><path fill="#e4434d" d="M20 0h10v20H20z"/></>:country==='잉글랜드'?<><path fill="#fff" d="M0 0h30v20H0z"/><path fill="#ce2b37" d="M13 0h4v20h-4zM0 8h30v4H0z"/></>:<><path fill="#fff" d="M0 0h30v20H0z"/>{Array.from({length:7},(_,i)=><path key={i} fill="#bf3547" d={`M0 ${i*40/13}h30v${20/13}H0z`}/>)}<path fill="#243e74" d="M0 0h13v10.77H0z"/>{Array.from({length:50},(_,i)=>{const row=Math.floor(i/11)*2+(i%11>=6?1:0),col=i%11>=6?i%11-6:i%11;return <circle key={i} cx={1.05+col*2.15+(row%2?1.075:0)} cy={.9+row*1.12} r=".36" fill="#fff"/>;})}</>}</svg>;
}
function Fold({id,title,children,kind,reveal=0}:{id:string;title:ReactNode;children:ReactNode;kind:'league'|'market';reveal?:number}){
  const [closed,setClosed]=useState(false);
  const [seenReveal,setSeenReveal]=useState(reveal);
  if(seenReveal!==reveal){setSeenReveal(reveal);setClosed(false);}
  return <section className={`sr-${kind}${kind==='market'?'-group':''}`}><button className={`sr-${kind}-head`} onClick={()=>setClosed(v=>!v)} aria-expanded={!closed} aria-controls={id}>{title}<ChevronDown className={closed?'is-closed':''}/></button><HeightAccordion id={id} collapsed={closed}>{children}</HeightAccordion></section>;
}

function OddsRow({match,index,selected,toggle,detail=false}:{match:Match;index:number;selected:Selection[];toggle:Props['toggle'];detail?:boolean}){
  const market=match.markets[index];
  const hasLine=!!market.line;
  const underFirst=market.picks.length===2&&market.picks[0].label==='오버';
  const order=underFirst?[1,0]:market.picks.map((_,i)=>i);
  function odd(p:number,reverse=false){
    const pick=market.picks[p],id=selectionId(match,index,p);
    const label=pick.label==='홈'||/^홈 [−+-]?\d+(?:\.\d+)?$/.test(pick.label)?match.home.name:pick.label==='원정'||/^원정 [−+-]?\d+(?:\.\d+)?$/.test(pick.label)?match.away.name:pick.label;
    const locked=match.completed||pick.locked;
    const name=<span className="sr-odd-label" title={label}>{label}</span>;
    const value=<strong className="sr-odd-value">{locked?<LockKeyhole aria-label="마감"/>:priceText(pick.price)}</strong>;
    return <button key={id} className={`sr-odd ${reverse?'reverse':''}`} data-selection-id={id} data-odds-source={match.sourceKind} data-odds-version={match.datasetVersion} aria-label={`${match.home.name} 대 ${match.away.name} ${market.name} ${market.line??''} ${pick.label} ${priceText(pick.price)}`} aria-pressed={selected.some(s=>s.id===id)} disabled={locked} onClick={()=>toggle(match,index,p)}>{reverse?<>{value}{name}</>:<>{name}{value}</>}</button>;
  }
  const lineBetween=hasLine&&order.length===2;
  return <div className={`sr-market-row ${lineBetween?(detail?'sr-row-line':'sr-row-three'):order.length===3?'sr-row-three':'sr-row-two'}${order.length>3?' sr-row-many':''}`} data-market-index={index} data-market-id={market.canonicalId}>
    {hasLine&&!lineBetween&&<div className="sr-many-line"><span className="sr-market-line">기준 {market.line}</span></div>}
    {lineBetween?<>{odd(order[0])}<div className={detail?'sr-line-box':'sr-market-center'}>{!detail&&<span className="sr-market-name sr-ellipsis">{market.name}</span>}<b className="sr-market-line">{market.line}</b></div>{odd(order[1],true)}</>:order.map((p,i)=>odd(p,order.length<=3&&i===order.length-1))}
  </div>;
}

function TeamEmblem({team}:{team:Match['home']}){
  const [failed,setFailed]=useState(false);
  const initials=(team.originalName||team.name).split(/\s+/).map(word=>word[0]).join('').slice(0,2).toUpperCase();
  return team.logo&&!failed?<img className="sr-team-emblem" src={team.logo} alt="" width="28" height="28" draggable={false} onError={()=>setFailed(true)}/>:<span className="sr-team-emblem sr-team-initials" aria-hidden="true">{initials}</span>;
}
function MatchCard({match,inspected,inspect,selected,toggle,detailEntry}:{match:Match;inspected:boolean;inspect:()=>void;selected:Selection[];toggle:Props['toggle'];detailEntry:boolean}){
  const teams=<><span className="sr-team"><TeamEmblem key={match.home.logo} team={match.home}/><span className="sr-ellipsis" title={match.home.name}>{match.home.name}</span></span><span className="sr-score-box"><span className="sr-score">VS</span></span><span className="sr-team"><span className="sr-ellipsis" title={match.away.name}>{match.away.name}</span><TeamEmblem key={match.away.logo} team={match.away}/></span></>;
  // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- The named inspect button provides the same action for keyboard users; background click is a pointer convenience.
  return <article className="sr-card" data-match-id={match.id} data-inspected={detailEntry&&inspected} onClick={detailEntry?event=>{if(event.target instanceof Element&&!event.target.closest('button,a,input,[role="button"]'))inspect();}:undefined} onKeyDown={detailEntry?event=>{if(event.target===event.currentTarget&&(event.key==='Enter'||event.key===' ')){event.preventDefault();inspect();}}:undefined}>
    <div className="sr-card-meta"><time className="sr-card-time" dateTime={match.startUtc}>{match.timeLabel}</time><span className="sr-card-league" title={match.league}>{match.league}</span>{detailEntry&&inspected&&<span className="sr-inspected-label"><Eye aria-hidden="true"/><span>열람 중</span></span>}{detailEntry&&<button className="sr-market-open" onClick={inspect} aria-label={`${match.home.name} 전체 마켓 ${match.markets.length}개 보기`}><span className="sr-market-open__count">{String(match.markets.length)+'+'}</span></button>}</div>
    {detailEntry?<button className="sr-card-inspect" aria-label={`${match.home.name} 대 ${match.away.name} 경기 보기`} aria-pressed={inspected} onClick={inspect}>{teams}</button>:<div className="sr-card-inspect">{teams}</div>}
    <div className="sr-primary-markets">{[0,2,1].map(index=><OddsRow key={index} match={match} index={index} selected={selected} toggle={toggle}/>)}</div>
  </article>;
}

function Slip(props:Props&{mode:Mode}){
  const {selected,session,stake,setStake,stakeTouched,setStakeTouched,open,remove,clear,keep,setKeep}=props;
  const checked=validateStake(stake,session.balance),total=totalsFor(selected,checked.value);
  const reason=!selected.length?'경기의 배당을 먼저 선택해 주세요.':!session.loggedIn?'로그인 후 이용할 수 있습니다.':checked.error;
  function amount(value:number,replace=false){const previous=/^\d+$/.test(stake)&&Number.isSafeInteger(Number(stake))?Number(stake):0;setStake(String(Math.min(replace?value:previous+value,DEMO.maxStake,session.balance)));setStakeTouched(true);}
  const summary=[['총 배당',`${total.displayOdds} 배`],['총 당첨금',`${moneyText(total.potential)} 원`],['최소 배당','제한 없음'],['최대 배당','제한 없음'],['최소 베팅금액',`${moneyText(DEMO.minStake)} 원`],['최대 베팅금액',`${moneyText(DEMO.maxStake)} 원`],['최대 당첨금액','제한 없음']];
  return <section className="sr-rail-card sr-slip" aria-label="베팅슬립">
    <div className="sr-slip-head"><label className="sr-keep" htmlFor="sr-keep"><Switch id="sr-keep" className="sr-slip-toggle" checked={keep} onCheckedChange={setKeep} aria-label="슬립 유지"/>슬립 유지</label><button className="sr-delete" disabled={!selected.length} onClick={clear}><Trash2/>전체삭제</button></div>
    <div className="sr-folder"><span>{props.mode==='domestic'?'국내형':'해외형'} 폴더선택</span><strong>{selected.length}폴더</strong></div>
    {!selected.length?<div className="sr-slip-empty"><UiIcon name="ticket"/><strong>선택된 베팅내역이 없습니다</strong><small>경기를 선택하여 배팅을 시작하세요</small></div>:<div className="sr-slip-selections" aria-live="polite">{selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return <article key={s.id} className="sr-slip-selection" data-selection={s.id}><div><span>{match.league}</span><button className="icon-button" aria-label={`${match.home.name} 선택 제거`} onClick={()=>remove(s.id)}><X/></button></div><strong>{match.home.name} vs {match.away.name}</strong><p>{market.name} {market.line}<small className="sr-slip-market-rule">{market.rule}</small></p><div><span>{pick.label}</span><b>{priceText(pick.price)}</b></div></article>;})}</div>}
    <section className="sr-amount"><div className="sr-amount-head"><label htmlFor="stake"><span className="sr-badge">BET</span> 베팅 금액</label><button className="sr-reset" onClick={()=>{setStake('');setStakeTouched(false);}}><UiIcon name="reset"/>초기화</button></div><div className="sr-amount-input"><input id="stake" aria-label="베팅 금액" inputMode="numeric" autoComplete="off" value={/^\d+$/.test(stake)?moneyText(stake):stake} placeholder="0" onChange={e=>{setStake(e.target.value.replaceAll(',',''));setStakeTouched(true);}} aria-invalid={stakeTouched&&!!checked.error} aria-describedby="sr-stake-hint"/><span>원</span></div><div className="sr-amount-quick">{[5000,10000,50000,100000,1000000].map(v=><button key={v} onClick={()=>amount(v)}>+ {moneyText(v)}</button>)}<button onClick={()=>amount(DEMO.maxStake,true)}>MAX</button></div></section>
    <div className="sr-slip-summary">{summary.map(([label,value])=><div className="sr-summary-row" key={label}><span>{label}</span><strong data-total-odds={label==='총 배당'?'':undefined}>{label==='총 당첨금'?<><span className={selected.length>0&&checked.value>0?'sr-payout-value':undefined}>{moneyText(total.potential)}</span> 원</>:value}</strong></div>)}</div>
    <button className="sr-bet-submit" disabled={!!reason} onClick={()=>open({kind:'confirm'})}><UiIcon name="ticket" masked/>베팅하기</button><p className="sr-slip-hint" id="sr-stake-hint">{stakeTouched&&checked.error?checked.error:reason||'선택한 경기와 금액을 확인해 주세요.'}</p>
  </section>;
}

export function SiriusSurface(props:Props){
  const {session,open,logout,selected,toggle}=props;
  const [mode,setMode]=useState<Mode>('european');
  const [listFilters,setListFilters]=useState<Record<Mode,ListFilters>>({european:{query:'',sport:'all',league:''},domestic:{query:'',sport:'all',league:''}});
  const {query,sport,league}=listFilters[mode];
  function updateFilters(change:Partial<ListFilters>,target:Mode=mode){setListFilters(value=>({...value,[target]:{...value[target],...change}}));}
  const setSport=(sport:string)=>updateFilters({sport}),setLeague=(league:string)=>updateFilters({league});
  const [selectedMatchId,setSelectedMatchId]=useState<string|null>(matches[0]?.id??null);
  const [filter,setFilter]=useState('all'),[expandedSport,setExpandedSport]=useState(''),[expandedCountry,setExpandedCountry]=useState('');
  const [revealedLeague,setRevealedLeague]=useState({key:'',revision:0});
  const listRef=useRef<HTMLElement>(null),marketsRef=useRef<HTMLElement>(null),popularTarget=useRef<string|null>(null);
  const scrollPositions=useRef({domestic:0,european:0,details:0});
  const modeMatches=matches;
  const searched=modeMatches.filter(m=>matchesQuery(m,query));
  const filtered=searched.filter(m=>(sport==='all'||m.sport===sport)&&(!league||m.leagueKey===league));
  const emptySport=sport!=='all'&&!modeMatches.some(m=>m.sport===sport);
  const europeanFilters=listFilters.european;
  const europeanMatches=mode==='european'?filtered:matches.filter(m=>matchesQuery(m,europeanFilters.query)&&(europeanFilters.sport==='all'||m.sport===europeanFilters.sport)&&(!europeanFilters.league||m.leagueKey===europeanFilters.league));
  const match=europeanMatches.find(m=>m.id===selectedMatchId)??europeanMatches[0];
  if(selectedMatchId!==(match?.id??null)){setSelectedMatchId(match?.id??null);setFilter('all');}
  useLayoutEffect(()=>{scrollPositions.current.details=0;marketsRef.current?.scrollTo({top:0});},[selectedMatchId]);
  useLayoutEffect(()=>{
    if(listRef.current)listRef.current.scrollTop=scrollPositions.current[mode];
    if(marketsRef.current)marketsRef.current.scrollTop=scrollPositions.current.details;
  },[mode]);
  useLayoutEffect(()=>{if(!popularTarget.current)return;const card=listRef.current?.querySelector<HTMLElement>(`[data-match-id="${popularTarget.current}"]`);if(card){const list=listRef.current!,rect=card.getBoundingClientRect(),bounds=list.getBoundingClientRect();if(rect.top<bounds.top)list.scrollTop+=rect.top-bounds.top;else if(rect.bottom>bounds.bottom)list.scrollTop+=rect.bottom-bounds.bottom;popularTarget.current=null;}},[selectedMatchId,league,query,mode,revealedLeague.revision]);
  function inspect(id:string){if(id===selectedMatchId)return;setSelectedMatchId(id);setFilter('all');}
  function chooseSport(id:string){setSport(id);setLeague('');}
  function navigate(id:string){
    if(id==='european'||id==='domestic'){
      if(id===mode)return;
      scrollPositions.current[mode]=listRef.current?.scrollTop??0;
      if(mode==='european')scrollPositions.current.details=marketsRef.current?.scrollTop??0;
      setMode(id);return;
    }
    if(id==='deposit')open({kind:'charge'});else if(id==='withdraw')open({kind:'withdraw'});else if(id==='history')open({kind:'history'});else if(id==='account'||id==='profile')open({kind:'account'});else {const label=[...menu,...notices,...services].find(item=>item[0]===id)?.[1]??'이용 안내';open({kind:'info',title:label,body:id==='support'?'배당 선택과 금액 계산은 스포츠 가이드에서 확인하실 수 있습니다. 베팅내역에서 선택한 경기와 금액을 확인하세요.':id==='event'?'이벤트 소식은 공지사항에서 확인하세요.':label+' 서비스는 준비 중입니다.'});}
  }
  function popular(m:Match){popularTarget.current=m.id;navigate('european');updateFilters({query:'',sport:m.sport,league:m.leagueKey},'european');setSelectedMatchId(m.id);setFilter('all');setRevealedLeague(v=>({key:m.leagueKey,revision:v.revision+1}));}
  const orderedMatches=mode==='domestic'?[...filtered.filter(m=>m.sport==='soccer'),...filtered.filter(m=>m.sport!=='soccer')]:filtered;
  const leagues=new Map<string,Match[]>();orderedMatches.forEach(m=>leagues.set(m.leagueKey,[...(leagues.get(m.leagueKey)??[]),m]));
  const groups=match?marketGroups(match):[];
  return <div className="sr-shell">
    <header className="sr-header sr-header-revision">
      <div className="sr-header-top">
        <button className="sr-brand" aria-label="SIRIUS 스포츠 홈" onClick={()=>navigate('european')}><span className="sr-wordmark-crop"><img src="/branding/sirius-header-gold-20261002/wordmark.png" alt="SIRIUS" width="1971" height="798"/></span></button>
        <nav className="sr-header-utilities" aria-label="공지 및 이용 안내">{notices.map(([id,label])=><button key={id} className={id==='notice'?'sr-header-news':undefined} aria-label={label} onClick={()=>navigate(id)}><img className="sr-ui-icon sr-header-image-icon" src={'/ui/sirius-header-blue-20261001/'+id+'.png'} alt="" width="256" height="256"/><span>{label}</span></button>)}</nav>
        <nav className="sr-mainnav" aria-label="주요 카테고리">{menu.map(([id,label])=><button key={id} aria-current={mode===id?'page':undefined} onClick={()=>navigate(id)}><span>{label}</span></button>)}</nav>
        <div className="sr-header-account">{session.loggedIn?<><span>{session.nickname??'SIRIUS 회원'}</span><button onClick={logout}><LogOut/>로그아웃</button></>:<><button onClick={()=>open({kind:'account'})}>로그인</button><button className="sr-signup" onClick={()=>open({kind:'account'})}>회원가입</button></>}</div>
      </div>
    </header>
    <div className="sr-body">
      <aside className="sr-rail sr-scroll sr-left" aria-label="스포츠 바로가기" tabIndex={0}><div className="sr-left-stack">
        <section className="sr-service-dock" aria-label="빠른 서비스">{quick.map(([id,label])=><button key={id} onClick={()=>navigate(id)}><UiIcon name={id}/><span>{label}</span></button>)}</section>
        <SiriusLeftMenu mode={mode} onNavigate={navigate} assets={{domestic:'/banners/sirius-left-accordion-20261001/domestic-compact-native-v01.webp',european:'/banners/sirius-left-accordion-20261001/european-compact-native-v01.webp',esports:'/banners/sirius-left-accordion-20261001/esports-compact-native-v02-clean.webp',inplay:'/banners/sirius-left-accordion-20261001/inplay-compact-native-v01.webp',casino:'/banners/sirius-left-accordion-20261001/casino-compact-native-v01.webp',slots:'/banners/sirius-left-accordion-20261001/slots-room-native-v03-small.webp'}}/>
        <section className="sr-browse"><div className="sr-browse-heading"><h2><Search aria-hidden="true"/>경기 탐색</h2><button onClick={()=>updateFilters({query:'',sport:'all',league:''})}><History aria-hidden="true"/>초기화</button></div><div className="sr-browse-searches">{(['european','domestic'] as const).map(target=><form key={target} className="sr-search-row" data-current={target===mode} onSubmit={e=>{e.preventDefault();navigate(target);}}><span className="sr-search-mode" aria-hidden="true">{target==='european'?'해외형':'국내형'}</span><input aria-label={target==='european'?'해외형 스포츠 검색':'국내형 스포츠 검색'} placeholder="팀 / 리그 검색" value={listFilters[target].query} onChange={e=>{updateFilters({query:e.target.value},target);navigate(target);}}/>{listFilters[target].query?<button aria-label={target==='european'?'해외형 검색어 지우기':'국내형 검색어 지우기'} type="button" onClick={()=>{updateFilters({query:''},target);navigate(target);}}><X/></button>:<button aria-label={target==='european'?'해외형 검색 결과':'국내형 검색 결과'} type="submit"><Search/></button>}</form>)}</div><ul className="sr-sport-tree">{sportTabs.slice(1).map(s=>{const items=searched.filter(m=>m.sport===s.id),countries=[...new Set(items.map(m=>countryFor(m)[0]))];return <li key={s.id}><button className="sr-sport-row" aria-expanded={expandedSport===s.id} aria-pressed={sport===s.id} onClick={()=>{setExpandedSport(expandedSport===s.id?'':s.id);setExpandedCountry('');chooseSport(s.id);}}><span><SportIcon sport={s}/>{s.name}</span><span><b>{items.length}</b><ChevronDown/></span></button>{expandedSport===s.id&&countries.map(country=><div className="sr-browse-country" key={country}><button className="sr-sport-subrow sr-country" aria-expanded={expandedCountry===country} onClick={()=>setExpandedCountry(expandedCountry===country?'':country)}><span><CountryFlag country={country}/> {country}</span><ChevronDown/></button>{expandedCountry===country&&[...new Set(items.filter(m=>countryFor(m)[0]===country).map(m=>m.leagueKey))].map(key=><button className="sr-sport-subrow sr-league-link" aria-pressed={league===key} key={key} onClick={()=>{setSport(s.id);setLeague(key);}}><span className="sr-browse-league-name">{items.find(m=>m.leagueKey===key)!.league}</span><b>{items.filter(m=>m.leagueKey===key).length}</b></button>)}</div>)}</li>;})}</ul></section>
        <SiriusLeftBanners onOpen={id=>navigate(id==='events'?'event':id)}/>
        <section className="sr-latest"><h2>주요 경기</h2><div className="sr-latest-list">{matches.slice(0,5).map(m=><button key={m.id} className="sr-latest-row" onClick={()=>popular(m)}><time>{m.timeLabel.slice(-5)}</time><img src={m.sportLogo} alt=""/><span><span>{m.home.name}</span><span>{m.away.name}</span></span></button>)}</div></section>
      </div></aside>
      <main className="sr-center" data-mode={mode} aria-label={mode==='domestic'?'국내형 스포츠':'해외형 스포츠'}><div className="sr-center-surface"><div className="sr-sportbar"><div className="sr-sport-tabs" aria-label="스포츠 종목">{sportTabs.map(s=><button key={s.id} className="sr-sport-tab" data-sport={s.id} aria-pressed={sport===s.id} onClick={()=>chooseSport(s.id)}><SportIcon sport={s}/><span className="sr-sport-label">{s.id==='all'?'전체':s.name}</span><span className="sr-sport-count">{searched.filter(m=>s.id==='all'||m.sport===s.id).length}</span></button>)}</div></div><div className={`sr-center-grid ${mode==='domestic'?'sr-domestic':''}`}>
        <section className="sr-pane sr-list-pane" aria-label="경기 목록"><section className="sr-list-scroll sr-scroll" ref={listRef} aria-label="리그별 경기 목록" tabIndex={0}>{[...leagues].map(([key,items])=><Fold key={key} id={`league-${key}`} kind="league" reveal={revealedLeague.key===key?revealedLeague.revision:0} title={<span className="sr-league-label"><CountryFlag country={countryFor(items[0])[0]}/>{countryFor(items[0])[0]} ({items[0].league})<small>{items.length}</small></span>}><div className="sr-event-list">{items.map(m=><MatchCard key={m.id} match={m} inspected={m.id===match?.id} detailEntry={mode==='european'} inspect={()=>inspect(m.id)} selected={selected} toggle={toggle}/>)}</div></Fold>)}{!filtered.length&&<div className="sr-empty"><Search/><strong>{emptySport?'등록된 경기가 없습니다.':'검색 결과가 없습니다'}</strong><span>현재 조건에 맞는 경기가 없습니다.</span><button className="sr-small-action" onClick={()=>updateFilters({query:'',sport:'all',league:''})}>검색·필터 초기화</button></div>}</section><BackToTop scrollRef={listRef}/></section>
        {mode==='european'&&<section className="sr-pane" aria-label="선택 경기 세부 베팅" data-detail-match={match?.id??''}><div className="sr-match-heading"><h1 className="sr-match-title">{match?`${match.home.name} vs ${match.away.name}`:emptySport?'경기 없음':'선택할 경기가 없습니다'}</h1>{match&&<span className="sr-match-start">{match.timeLabel}</span>}</div><div className="sr-detail-panel"><div className="sr-market-tabs" role="group" aria-label="마켓 종류">{filters.map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><section className="sr-market-scroll sr-scroll" ref={marketsRef} aria-label="세부 마켓 목록" tabIndex={0}>{match?groups.filter(g=>filter==='all'||g.category===filter).map(group=><Fold key={`${match.id}-${group.id}`} id={`detail-${match.id}-${group.id}`} kind="market" title={<span title={group.name}>{group.name}<small>{group.rows.length>1?`${group.rows.length} 라인`:''}</small></span>}><div className="sr-market-rule">{match.markets[group.rows[0]].rule}</div><div className="sr-market-rows">{group.rows.map(index=><OddsRow key={selectionId(match,index,0)} match={match} index={index} selected={selected} toggle={toggle} detail/>)}</div></Fold>):<div className="sr-empty"><Ticket/><strong>{emptySport?'경기 없음':'표시할 상세 마켓이 없습니다'}</strong><span>다른 검색어나 종목을 선택해 주세요.</span></div>}{match&&filter!=='all'&&!groups.some(g=>g.category===filter)&&<div className="sr-empty"><Ticket/><strong>해당 종류의 마켓이 없습니다</strong></div>}{match&&<p className="sr-data-note">{match.markets.length}개 마켓 · {groups.length}개 그룹</p>}</section></div></section>}
      </div></div></main>
      <aside className="sr-rail sr-scroll" aria-label="계정과 베팅슬립" tabIndex={0}><div className="sr-right-stack"><section className="sr-rail-card sr-user"><div className="sr-user-head"><span className="sr-badge">LV.0</span><strong>{session.loggedIn?(session.nickname??'SIRIUS 회원'):'GUEST'}</strong><button className="sr-small-action" onClick={()=>navigate('profile')}>정보수정</button></div><div className="sr-balances"><div className="sr-balance-row"><span>보유머니</span><strong className="sr-balance-value">{moneyText(session.balance)} <small>원</small></strong></div><div className="sr-balance-row"><span>보너스 전환</span><button className="sr-small-action" onClick={()=>navigate('bonus')}>전환</button></div></div><div className="sr-user-actions">{services.map(([id,label])=><button key={id} aria-label={label} onClick={()=>navigate(id)}><UiIcon name={id}/>{label}</button>)}</div></section><Slip {...props} mode={mode}/>{props.storageError&&<output className="sr-slip-hint">{props.storageError}</output>}<section className="sr-rail-card sr-banner-stack" aria-label="이용 안내 배너">{banners.map(([id,label,description])=><button key={id} className="sr-mini-banner" aria-label={label} onClick={()=>navigate(id)}><img className="sr-mini-banner-art" src={'/assets/right-banners/sirius-20261002/'+id+'-v01-object.png'} alt="" width="90" height="53"/><span><strong>{label}</strong><small>{description}</small></span></button>)}</section></div></aside>
    </div>
  </div>;
}
