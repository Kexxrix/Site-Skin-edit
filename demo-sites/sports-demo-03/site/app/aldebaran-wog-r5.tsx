'use client';

import {useLayoutEffect,useRef,useState,type ReactNode} from 'react';
import {ArrowDownToLine,ArrowUpFromLine,CalendarCheck,ChevronDown,ChevronRight,Compass,Gamepad2,Gift,Headphones,Info,LockKeyhole,LogOut,Mail,Megaphone,Monitor,Radio,RotateCcw,Search,Send,Ticket,Trash2,Trophy,Users,X} from 'lucide-react';
import {Switch} from '@/components/ui/switch';
import {matches,prematchMatches,sportMenu,selectionId,priceText,moneyText,DEMO,totalsFor,validateStake,type Match,type Selection,type Receipt} from './demo-data';
import {marketGroups,countryFor,matchesQuery} from './wog-market-data';
import {HeightAccordion,BackToTop} from './match-motion';

export type Session={loggedIn:boolean;balance:number;history:Receipt[];nickname?:string};
export type Overlay={kind:'info';title:string;body:string}|{kind:'account'|'charge'|'withdraw'|'history'|'confirm'}|{kind:'receipt';receipt:Receipt}|{kind:'view';view:string;query?:string};
export type Open=(overlay:Overlay)=>void;
type Mode='domestic'|'european';
type ListFilters={query:string;sport:string;league:string};
type Props={selected:Selection[];toggle:(match:Match,m:number,p:number)=>void;session:Session;open:Open;logout:()=>void;stake:string;setStake:(v:string)=>void;stakeTouched:boolean;setStakeTouched:(v:boolean)=>void;remove:(id:string)=>void;clear:()=>void;keep:boolean;setKeep:(v:boolean)=>void;storageError:string};
const menu=[['domestic','국내형 스포츠',Trophy],['european','해외형 스포츠',Trophy],['esports','E 스포츠',Gamepad2],['inplay','인플레이',Radio],['casino','카지노',Ticket],['slots','슬롯',Gamepad2],['minigame','미니게임',Gamepad2],['virtual','가상 스포츠',Trophy],['community','자유게시판',Mail],['results','경기결과',Trophy]] as const;
const notices=[['notice','공지사항',Send],['event','이벤트게시판',Gift],['attendance','출석체크',CalendarCheck],['support','고객센터',Headphones],['rules','이용규정',Info]] as const;
const quick=[['deposit','충전',ArrowDownToLine],['withdraw','환전',ArrowUpFromLine],['support','고객센터',Headphones],['domestic','국내형 스포츠',Trophy],['european','해외형 스포츠',Trophy],['esports','E스포츠',Gamepad2],['inplay','인플레이',Radio],['casino','카지노',Ticket],['slots','슬롯',Gamepad2],['event','이벤트',Gift],['attendance','출석부',CalendarCheck],['notice','공지사항',Megaphone]] as const;
const services=[['deposit','충전',ArrowDownToLine],['withdraw','환전',ArrowUpFromLine],['payback','페이백',Gift],['messages','쪽지',Mail],['support','고객센터',Headphones],['history','베팅내역',RotateCcw]] as const;
const banners=[['support','텔레그램 고객센터','문의 및 제휴 안내',Headphones],['notice','텔레그램 공식채널','이벤트 및 공지 안내',Megaphone],['rules','ALDEBARAN 이용안내','서비스 이용 방법',Compass],['live-guide','실시간 중계 안내','경기 중계 일정 확인',Monitor],['lineups','스포츠 라인업','경기별 선수 정보',Users],['age-policy','미성년자 이용불가','만 19세 이상 이용',Info]] as const;
const tabIds=['all','soccer','basketball','baseball','volleyball','hockey'];
const sportTabs=tabIds.map(id=>sportMenu.find(s=>s.id===id)!);
const filters=[['all','전체'],['result','승무패'],['handicap','핸디캡'],['totals','언더·오버'],['other','기타']] as const;
export const casinoPhoto='/banners/r8/mercury-event-woman.png';
export const slotsPhoto='/banners/r8/mercury-slots-woman.png';

function CountryFlag({country}:{country:string}){
  return <svg className="ab5-country-flag" viewBox="0 0 30 20" role="img" aria-label={country}>{country==='독일'?<><path fill="#151515" d="M0 0h30v7H0z"/><path fill="#cf2435" d="M0 7h30v6H0z"/><path fill="#ffce45" d="M0 13h30v7H0z"/></>:country==='프랑스'?<><path fill="#174389" d="M0 0h10v20H0z"/><path fill="#fff" d="M10 0h10v20H10z"/><path fill="#e4434d" d="M20 0h10v20H20z"/></>:country==='잉글랜드'?<><path fill="#fff" d="M0 0h30v20H0z"/><path fill="#ce2b37" d="M13 0h4v20h-4zM0 8h30v4H0z"/></>:<><path fill="#fff" d="M0 0h30v20H0z"/>{Array.from({length:7},(_,i)=><path key={i} fill="#bf3547" d={`M0 ${i*40/13}h30v${20/13}H0z`}/>)}<path fill="#243e74" d="M0 0h13v10.77H0z"/>{Array.from({length:50},(_,i)=>{const row=Math.floor(i/11)*2+(i%11>=6?1:0),col=i%11>=6?i%11-6:i%11;return <circle key={i} cx={1.05+col*2.15+(row%2?1.075:0)} cy={.9+row*1.12} r=".36" fill="#fff"/>;})}</>}</svg>;
}
function Fold({id,title,children,kind,reveal=0}:{id:string;title:ReactNode;children:ReactNode;kind:'league'|'market';reveal?:number}){
  const [closed,setClosed]=useState(false);
  const [seenReveal,setSeenReveal]=useState(reveal);
  if(seenReveal!==reveal){setSeenReveal(reveal);setClosed(false);}
  return <section className={`ab5-${kind}${kind==='market'?'-group':''}`}><button className={`ab5-${kind}-head`} onClick={()=>setClosed(v=>!v)} aria-expanded={!closed} aria-controls={id}>{title}<ChevronDown className={closed?'is-closed':''}/></button><HeightAccordion id={id} collapsed={closed}>{children}</HeightAccordion></section>;
}

function OddsRow({match,index,selected,toggle,detail=false}:{match:Match;index:number;selected:Selection[];toggle:Props['toggle'];detail?:boolean}){
  const market=match.markets[index];
  const hasLine=!!market.line;
  const underFirst=market.picks.length===2&&market.picks[0].label==='오버';
  const order=underFirst?[1,0]:market.picks.map((_,i)=>i);
  function odd(p:number,reverse=false){
    const pick=market.picks[p],id=selectionId(match,index,p);
    const label=pick.label==='홈'?match.home.name:pick.label==='원정'?match.away.name:pick.label.startsWith('홈 ')?match.home.name:pick.label.startsWith('원정 ')?match.away.name:pick.label;
    const locked=match.completed||pick.locked;
    const name=<span className="ab5-odd-label" title={label}>{label}</span>;
    const value=<strong className="ab5-odd-value">{locked?<LockKeyhole aria-label="마감"/>:priceText(pick.price)}</strong>;
    return <button key={id} className={`ab5-odd ${reverse?'reverse':''}`} data-selection-id={id} aria-label={`${match.home.name} 대 ${match.away.name} ${market.name} ${market.line??''} ${pick.label} ${priceText(pick.price)}`} aria-pressed={selected.some(s=>s.id===id)} disabled={locked} onClick={()=>toggle(match,index,p)}>{reverse?<>{value}{name}</>:<>{name}{value}</>}</button>;
  }
  return <div className={`ab5-market-row ${hasLine?(detail?'ab5-row-line':'ab5-row-three'):order.length===3?'ab5-row-three':'ab5-row-two'}`} data-market-index={index}>{hasLine?<>{odd(order[0])}<div className={detail?'ab5-line-box':'ab5-market-center'}>{!detail&&<span className="ab5-market-name ab5-ellipsis">{market.name}</span>}<b className="ab5-market-line">{market.line}</b></div>{odd(order[1],true)}</>:order.map((p,i)=>odd(p,i===order.length-1))}</div>;
}

function TeamEmblem({team}:{team:Match['home']}){
  const [failed,setFailed]=useState(false);
  const initials=(team.originalName||team.name).split(/\s+/).map(word=>word[0]).join('').slice(0,2).toUpperCase();
  return team.logo&&!failed?<img className="ab5-team-emblem" src={team.logo} alt="" width="28" height="28" onError={()=>setFailed(true)}/>:<span className="ab5-team-emblem ab5-team-initials" aria-hidden="true">{initials}</span>;
}
function MatchCard({match,inspected,inspect,selected,toggle,detailEntry}:{match:Match;inspected:boolean;inspect:()=>void;selected:Selection[];toggle:Props['toggle'];detailEntry:boolean}){
  const teams=<><span className="ab5-team"><TeamEmblem key={match.home.logo} team={match.home}/><span className="ab5-ellipsis" title={match.home.name}>{match.home.name}</span></span><span className="ab5-score-box"><span className="ab5-score">VS</span></span><span className="ab5-team"><span className="ab5-ellipsis" title={match.away.name}>{match.away.name}</span><TeamEmblem key={match.away.logo} team={match.away}/></span></>;
  return <article className="ab5-card" data-match-id={match.id} data-inspected={detailEntry&&inspected}>
    <img className="ab5-card-motif" src={match.sportLogo} alt=""/>
    <div className="ab5-card-meta"><time className="ab5-card-time" dateTime={match.startUtc}>{match.timeLabel}</time><span className="ab5-card-league">{match.league}</span>{detailEntry&&<button className="ab5-market-open" onClick={inspect} aria-label={`${match.home.name} 상세 마켓 ${marketGroups(match).length}개`}>{marketGroups(match).length}<ChevronRight/></button>}</div>
    {detailEntry?<button className="ab5-card-inspect" aria-label={`${match.home.name} 대 ${match.away.name} 경기 보기`} aria-pressed={inspected} onClick={inspect}>{teams}</button>:<div className="ab5-card-inspect">{teams}</div>}
    <div className="ab5-primary-markets">{[0,2,1].map(index=><OddsRow key={index} match={match} index={index} selected={selected} toggle={toggle}/>)}</div>
  </article>;
}

function Slip(props:Props&{mode:Mode}){
  const {selected,session,stake,setStake,stakeTouched,setStakeTouched,open,remove,clear,keep,setKeep}=props;
  const checked=validateStake(stake,session.balance),total=totalsFor(selected,checked.value);
  const reason=!selected.length?'경기의 배당을 먼저 선택해 주세요.':!session.loggedIn?'로그인 후 이용할 수 있습니다.':checked.error;
  function amount(value:number,replace=false){const previous=/^\d+$/.test(stake)&&Number.isSafeInteger(Number(stake))?Number(stake):0;setStake(String(Math.min(replace?value:previous+value,DEMO.maxStake,session.balance)));setStakeTouched(true);}
  const summary=[['총 배당',`${total.displayOdds} 배`],['총 당첨금',`${moneyText(total.potential)} 원`],['최소 배당','제한 없음'],['최대 배당','제한 없음'],['최소 베팅금액',`${moneyText(DEMO.minStake)} 원`],['최대 베팅금액',`${moneyText(DEMO.maxStake)} 원`],['최대 당첨금액','제한 없음']];
  return <section className="ab5-rail-card ab5-slip" aria-label="베팅슬립">
    <div className="ab5-slip-head"><label className="ab5-keep"><Switch className="ab5-slip-toggle" checked={keep} onCheckedChange={setKeep} aria-label="슬립 유지"/>슬립 유지</label><button className="ab5-delete" disabled={!selected.length} onClick={clear}><Trash2/>전체삭제</button></div>
    <div className="ab5-folder"><span>{props.mode==='domestic'?'국내형':'해외형'} 폴더선택</span><strong>{selected.length}폴더</strong></div>
    {!selected.length?<div className="ab5-slip-empty"><Ticket/><strong>선택된 베팅내역이 없습니다</strong><small>경기를 선택하여 배팅을 시작하세요</small></div>:<div className="ab5-slip-selections" aria-live="polite">{selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return <article key={s.id} className="ab5-slip-selection" data-selection={s.id}><div><span>{match.league}</span><button className="icon-button" aria-label={`${match.home.name} 선택 제거`} onClick={()=>remove(s.id)}><X/></button></div><strong>{match.home.name} vs {match.away.name}</strong><p>{market.name} {market.line}</p><div><span>{pick.label}</span><b>{priceText(pick.price)}</b></div></article>;})}</div>}
    <section className="ab5-amount"><div className="ab5-amount-head"><label htmlFor="stake"><span className="ab5-badge">BET</span> 베팅 금액</label><button className="ab5-reset" onClick={()=>{setStake('');setStakeTouched(false);}}><RotateCcw/>초기화</button></div><div className="ab5-amount-input"><input id="stake" aria-label="베팅 금액" inputMode="numeric" autoComplete="off" value={/^\d+$/.test(stake)?moneyText(stake):stake} placeholder="0" onChange={e=>{setStake(e.target.value.replaceAll(',',''));setStakeTouched(true);}} aria-invalid={stakeTouched&&!!checked.error} aria-describedby="ab5-stake-hint"/><span>원</span></div><div className="ab5-amount-quick">{[5000,10000,50000,100000,1000000].map(v=><button key={v} onClick={()=>amount(v)}>+ {moneyText(v)}</button>)}<button onClick={()=>amount(DEMO.maxStake,true)}>MAX</button></div></section>
    <div className="ab5-slip-summary">{summary.map(([label,value])=><div className="ab5-summary-row" key={label}><span>{label}</span><strong data-total-odds={label==='총 배당'?'':undefined}>{value}</strong></div>)}</div>
    <button className="ab5-bet-submit" disabled={!!reason} onClick={()=>open({kind:'confirm'})}><Ticket/>베팅하기</button><p className="ab5-slip-hint" id="ab5-stake-hint">{stakeTouched&&checked.error?checked.error:reason||'로컬 데모 · 실제 거래가 발생하지 않습니다.'}</p>
  </section>;
}

export function WogSurface(props:Props){
  const {session,open,logout,selected,toggle}=props;
  const [mode,setMode]=useState<Mode>('european');
  const [listFilters,setListFilters]=useState<Record<Mode,ListFilters>>({european:{query:'',sport:'all',league:''},domestic:{query:'',sport:'all',league:''}});
  const {query,sport,league}=listFilters[mode];
  function updateFilters(change:Partial<ListFilters>,target:Mode=mode){setListFilters(value=>({...value,[target]:{...value[target],...change}}));}
  const setSport=(sport:string)=>updateFilters({sport}),setLeague=(league:string)=>updateFilters({league});
  const [selectedMatchId,setSelectedMatchId]=useState<string|null>(prematchMatches[0]?.id??null);
  const [filter,setFilter]=useState('all'),[expandedSport,setExpandedSport]=useState(''),[expandedCountry,setExpandedCountry]=useState('');
  const [revealedLeague,setRevealedLeague]=useState({key:'',revision:0});
  const listRef=useRef<HTMLDivElement>(null),marketsRef=useRef<HTMLDivElement>(null),popularTarget=useRef<string|null>(null);
  const scrollPositions=useRef({domestic:0,european:0,details:0});
  const modeMatches=prematchMatches;
  const searched=modeMatches.filter(m=>matchesQuery(m,query));
  const filtered=searched.filter(m=>(sport==='all'||m.sport===sport)&&(!league||m.leagueKey===league));
  const europeanFilters=listFilters.european;
  const europeanMatches=mode==='european'?filtered:prematchMatches.filter(m=>matchesQuery(m,europeanFilters.query)&&(europeanFilters.sport==='all'||m.sport===europeanFilters.sport)&&(!europeanFilters.league||m.leagueKey===europeanFilters.league));
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
    if(id==='deposit')open({kind:'charge'});else if(id==='withdraw')open({kind:'withdraw'});else if(id==='history')open({kind:'history'});else open({kind:'view',view:id});
  }
  function popular(m:Match){popularTarget.current=m.id;navigate('european');updateFilters({query:'',sport:m.sport,league:m.leagueKey},'european');setSelectedMatchId(m.id);setFilter('all');setRevealedLeague(v=>({key:m.leagueKey,revision:v.revision+1}));}
  const leagues=new Map<string,Match[]>();filtered.forEach(m=>leagues.set(m.leagueKey,[...(leagues.get(m.leagueKey)??[]),m]));
  const groups=match?marketGroups(match):[];
  return <div className="ab5-shell">
    <header className="ab5-header"><div className="ab5-gnb"><div className="ab5-brand-slot"><button className="ab5-brand" aria-label="ALDEBARAN 스포츠 홈" onClick={()=>navigate('european')}><img src="/assets/branding/aldebaran-wordmark.png" alt="ALDEBARAN" width="1101" height="120"/></button></div><nav className="ab5-menu" aria-label="주요 카테고리">{menu.map(([id,label,Icon])=><button key={id} className="ab5-menu-item" aria-current={mode===id?'page':undefined} disabled={id!=='domestic'&&id!=='european'} onClick={()=>{if(id==='domestic'||id==='european')navigate(id);}}>{id==='european'?<img className="ab5-menu-icon" src="/sports/r8/mercury-basketball.png" alt=""/>:<Icon className="ab5-menu-icon"/>}<span className="ab5-menu-label">{label}</span>{['european','inplay'].includes(id)&&<span className="ab5-menu-badge">{id==='european'?'NEW':'LIVE'}</span>}</button>)}</nav><div/><div className="ab5-auth">{session.loggedIn?<button className="ab5-auth-logout" onClick={logout}><LogOut/>로그아웃</button>:<div className="ab5-auth-guest">{['로그인','회원가입','무기명 회원가입'].map(label=><button key={label} onClick={()=>open({kind:'view',view:'account'})}>{label}</button>)}</div>}</div></div><div className="ab5-notice"><div className="ab5-marquee" tabIndex={0}><span className="ab5-marquee-track">서비스 점검 및 이벤트 안내는 공지사항에서 확인해 주세요. · ALDEBARAN 스포츠는 로컬 데모 경기와 배당을 제공합니다.</span></div><nav className="ab5-notice-links" aria-label="공지 및 이용 안내">{notices.map(([id,label,Icon])=><button key={id} onClick={()=>navigate(id)}><Icon/>{label}</button>)}</nav></div></header>
    <div className="ab5-body">
      <aside className="ab5-rail ab5-scroll" aria-label="스포츠 바로가기" tabIndex={0}><div className="ab5-left-stack">
        <section className="ab5-rail-card ab5-quick" aria-label="빠른 메뉴">{quick.map(([id,label,Icon],i)=><button key={id} className={`ab5-quick-action ${i<3?'primary':''}`} onClick={()=>navigate(id)}>{i<3&&<Icon/>}{label}</button>)}<button className="ab5-promo wide" onClick={()=>navigate('casino')} aria-label="카지노 둘러보기"><img src={casinoPhoto} alt="카지노 라운지"/><span className="ab5-promo-label">CASINO</span></button><button className="ab5-promo" onClick={()=>navigate('slots')} aria-label="슬롯 둘러보기"><img src={slotsPhoto} alt="슬롯 라운지"/><span className="ab5-promo-label">SLOT</span></button></section>
        <section className="ab5-rail-card ab5-search-card" aria-label="스포츠 검색">{(['european','domestic'] as const).map(target=><form key={target} className="ab5-search-row" onSubmit={e=>{e.preventDefault();navigate(target);}}><input aria-label={target==='european'?'해외형 스포츠 검색':'국내형 스포츠 검색'} placeholder={target==='european'?'해외형 스포츠 검색 (국가/리그명/팀명)':'국내형 스포츠 검색 (국가/리그명/팀명)'} value={listFilters[target].query} onChange={e=>{updateFilters({query:e.target.value},target);navigate(target);}}/>{listFilters[target].query?<button aria-label={target==='european'?'해외형 검색어 지우기':'국내형 검색어 지우기'} type="button" onClick={()=>{updateFilters({query:''},target);navigate(target);}}><X/></button>:<button aria-label={target==='european'?'해외형 검색 결과':'국내형 검색 결과'} type="submit"><Search/></button>}</form>)}</section>
        <section className="ab5-rail-card ab5-sports-summary"><h2 className="ab5-sidebar-title"><span className="ab5-badge">SPORTS</span>인기 스포츠 리스트</h2><ul className="ab5-sport-tree">{sportTabs.slice(1).map(s=>{const items=searched.filter(m=>m.sport===s.id),countries=[...new Set(items.map(m=>countryFor(m)[0]))];return <li key={s.id}><button className="ab5-sport-row" aria-expanded={expandedSport===s.id} disabled={!items.length} onClick={()=>{setExpandedSport(expandedSport===s.id?'':s.id);setExpandedCountry('');chooseSport(s.id);}}><span><img src={s.logo!} alt=""/>{s.name}</span><span>{items.length}<ChevronDown/></span></button>{expandedSport===s.id&&countries.map(country=><div key={country}><button className="ab5-sport-subrow ab5-country" aria-expanded={expandedCountry===country} onClick={()=>setExpandedCountry(expandedCountry===country?'':country)}><span><CountryFlag country={country}/> {country}</span><ChevronDown/></button>{expandedCountry===country&&[...new Set(items.filter(m=>countryFor(m)[0]===country).map(m=>m.leagueKey))].map(key=><button className="ab5-sport-subrow ab5-league-link" aria-pressed={league===key} key={key} onClick={()=>{setSport(s.id);setLeague(key);}}>{items.find(m=>m.leagueKey===key)!.league}<b>{items.filter(m=>m.leagueKey===key).length}</b></button>)}</div>)}</li>;})}</ul></section>
        <section className="ab5-rail-card ab5-latest"><h2 className="ab5-sidebar-title"><span className="ab5-badge">LIVE</span>최신 인기 게임</h2><div className="ab5-latest-list">{prematchMatches.slice(0,5).map(m=><button key={m.id} className="ab5-latest-row" onClick={()=>popular(m)}><time>{m.timeLabel.slice(-5)}</time><img src={m.sportLogo} alt=""/><span><span>{m.home.name}</span><span>{m.away.name}</span></span></button>)}</div></section>
      </div></aside>
      <main className="ab5-center" data-mode={mode} aria-label={mode==='domestic'?'국내형 스포츠':'해외형 스포츠'}><div className="ab5-center-surface"><div className={`ab5-center-grid ${mode==='domestic'?'ab5-domestic':''}`}>
        <section className="ab5-pane ab5-list-pane" aria-label="경기 목록"><div className="ab5-sportbar"><div className="ab5-sport-tabs" aria-label="스포츠 종목">{sportTabs.map(s=><button key={s.id} className="ab5-sport-tab" aria-pressed={sport===s.id} onClick={()=>chooseSport(s.id)}><span className="ab5-sport-count">{searched.filter(m=>s.id==='all'||m.sport===s.id).length}</span>{s.logo?<img src={s.logo} alt=""/>:<Trophy/>}<span className="ab5-sport-label">{s.id==='all'?'전체':s.name}</span></button>)}</div></div><div className="ab5-list-scroll ab5-scroll" ref={listRef} role="region" aria-label="리그별 경기 목록" tabIndex={0}>{[...leagues].map(([key,items])=><Fold key={key} id={`league-${key}`} kind="league" reveal={revealedLeague.key===key?revealedLeague.revision:0} title={<span className="ab5-league-label"><CountryFlag country={countryFor(items[0])[0]}/>{countryFor(items[0])[0]} ({items[0].league})<small>{items.length}</small></span>}><div className="ab5-event-list">{items.map(m=><MatchCard key={m.id} match={m} inspected={m.id===match?.id} detailEntry={mode==='european'} inspect={()=>inspect(m.id)} selected={selected} toggle={toggle}/>)}</div></Fold>)}{!filtered.length&&<div className="ab5-empty"><Search/><strong>검색 결과가 없습니다</strong><span>현재 조건에 맞는 경기가 없습니다.</span><button className="ab5-small-action" onClick={()=>updateFilters({query:'',sport:'all',league:''})}>검색·필터 초기화</button></div>}</div><BackToTop scrollRef={listRef}/></section>
        {mode==='european'&&<section className="ab5-pane" aria-label="선택 경기 세부 베팅" data-detail-match={match?.id??''}><div className="ab5-match-heading"><h1 className="ab5-match-title">{match?`${match.home.name} vs ${match.away.name}`:'선택할 경기가 없습니다'}</h1>{match&&<span className="ab5-match-start">{match.timeLabel}</span>}</div><div className="ab5-detail-panel"><div className="ab5-market-tabs" role="group" aria-label="마켓 종류">{filters.map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><div className="ab5-market-scroll ab5-scroll" ref={marketsRef} role="region" aria-label="세부 마켓 목록" tabIndex={0}>{match?groups.filter(g=>filter==='all'||g.category===filter).map(group=><Fold key={`${match.id}-${group.id}`} id={`detail-${match.id}-${group.id}`} kind="market" title={<span>{group.name}<small>{group.rows.length>1?`${group.rows.length} 라인`:''}</small></span>}><div className="ab5-market-rows">{group.rows.map(index=><OddsRow key={selectionId(match,index,0)} match={match} index={index} selected={selected} toggle={toggle} detail/>)}</div></Fold>):<div className="ab5-empty"><Ticket/><strong>표시할 상세 마켓이 없습니다</strong><span>다른 검색어나 종목을 선택해 주세요.</span></div>}{match&&<p className="ab5-data-note">로컬 데모 배당 · {groups.length}개 마켓 그룹</p>}</div></div></section>}
      </div></div></main>
      <aside className="ab5-rail ab5-scroll" aria-label="계정과 베팅슬립" tabIndex={0}><div className="ab5-right-stack"><section className="ab5-rail-card ab5-user"><div className="ab5-user-head"><span className="ab5-badge">LV.0</span><strong>{session.loggedIn?(session.nickname??'ALDEBARAN 회원'):'GUEST'}</strong><button className="ab5-small-action" onClick={()=>navigate('profile')}>정보수정</button></div><div className="ab5-balances"><div className="ab5-balance-row"><span>보유머니</span><strong className="ab5-balance-value">{moneyText(session.balance)} <small>원</small></strong></div><div className="ab5-balance-row"><span>보너스 전환</span><button className="ab5-small-action" onClick={()=>navigate('bonus')}>전환</button></div><div className="ab5-balance-row"><span>금일 적중</span><strong className="ab5-balance-value">0 <small>원</small></strong></div></div><div className="ab5-user-actions">{services.map(([id,label,Icon])=><button key={id} onClick={()=>navigate(id)}><Icon/>{label}</button>)}</div></section><Slip {...props} mode={mode}/>{props.storageError&&<output className="ab5-slip-hint">{props.storageError}</output>}<section className="ab5-rail-card ab5-banner-stack" aria-label="이용 안내 배너">{banners.map(([id,label,description,Icon])=><button key={id} className="ab5-mini-banner" onClick={()=>navigate(id)}><span><strong>{label}</strong><small>{description}</small></span>{id==='age-policy'?<b className="ab5-age">19</b>:<Icon/>}</button>)}</section></div></aside>
    </div>
  </div>;
}
