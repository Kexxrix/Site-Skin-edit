'use client';

import {useLayoutEffect,useRef,useState,type ReactNode} from 'react';
import {ChevronDown,Gamepad2,LockKeyhole,LogOut,Mail,Radio,Search,Ticket,Trash2,Trophy,X} from 'lucide-react';
import {Switch} from '@/components/ui/switch';
import {matches,sportMenu,priceText,moneyText,DEMO,totalsFor,validateStake,type Match,type Selection,type Receipt} from './demo-data';
import {marketGroups,countryFor,matchesQuery,selectionId} from './mercury-market-view';
import {HeightAccordion,BackToTop} from './match-motion';

export type Session={loggedIn:boolean;balance:number;history:Receipt[];nickname?:string};
export type Overlay={kind:'info';title:string;body:string}|{kind:'account'|'charge'|'withdraw'|'history'|'confirm'}|{kind:'receipt';receipt:Receipt};
export type Open=(overlay:Overlay)=>void;
type Mode='domestic'|'european';
type ListFilters={query:string;sport:string;league:string};
type Props={selected:Selection[];toggle:(match:Match,m:number,p:number)=>void;session:Session;open:Open;logout:()=>void;stake:string;setStake:(v:string)=>void;stakeTouched:boolean;setStakeTouched:(v:boolean)=>void;remove:(id:string)=>void;clear:()=>void;keep:boolean;setKeep:(v:boolean)=>void;storageError:string};
const menu=[['domestic','국내형 스포츠',Trophy],['european','해외형 스포츠',Trophy],['esports','E 스포츠',Gamepad2],['inplay','인플레이',Radio],['casino','카지노',Ticket],['slots','슬롯',Gamepad2],['minigame','미니게임',Gamepad2],['virtual','가상 스포츠',Trophy],['community','자유게시판',Mail],['results','경기결과',Trophy]] as const;
const notices=[['notice','공지사항'],['event','이벤트게시판'],['attendance','출석체크'],['support','고객센터'],['rules','이용규정']] as const;
const quick=[['deposit','충전'],['withdraw','환전'],['support','고객센터'],['event','이벤트'],['attendance','출석부'],['notice','공지사항']] as const;
const quickBanners=[['domestic','국내형 스포츠','국내형스포츠2.png'],['european','해외형 스포츠','해외형스포츠.png'],['esports','E-스포츠','E스포츠.png'],['inplay','인플레이','인플레이.png'],['slots','슬롯','슬롯.png'],['casino','카지노','카지노.png']] as const;
const services=[['deposit','충전'],['withdraw','환전'],['payback','페이백'],['messages','쪽지'],['support','고객센터'],['history','베팅내역']] as const;
const banners=[['support','텔레그램 고객센터','문의 및 제휴 안내','01'],['notice','텔레그램 공식채널','이벤트 및 공지 안내','02'],['rules','MERCURY 이용안내','서비스 이용 방법','03'],['live-guide','실시간 중계 안내','경기 중계 일정 확인','04'],['lineups','스포츠 라인업','경기별 선수 정보','05'],['age-policy','미성년자 이용불가','만 19세 이상 이용','06']] as const;
const sportTabs=sportMenu;
const filters=[['all','전체'],['result','승무패'],['handicap','핸디캡'],['totals','언더·오버'],['other','기타']] as const;

const uiIcons:Record<string,string>={
  deposit:'/icons/sirius-20261001/imgi_8_deposit.png',
  withdraw:'/icons/sirius-20261001/imgi_9_withdraw.png',
  support:'/icons/sirius-20261001/imgi_6_support.png',
  payback:'/icons/mercury-ui/Icon_Image_이벤트01.png',
  event:'/icons/sirius-20261001/imgi_4_event.png',
  messages:'/icons/sirius-20261001/imgi_142_messages.png',
  attendance:'/icons/sirius-20261001/imgi_5_attendance.png',
  rules:'/icons/sirius-20261001/imgi_7_rules.png',
  history:'/icons/sirius-20261001/imgi_10_history.png',
  reset:'/icons/sirius-20261001/imgi_143_reset.png',
  ticket:'/icons/mercury-ui/Icon_Image_티켓01.png',
  notice:'/icons/sirius-20261001/imgi_1_notice.png',
};
const maskedUiIcons:Record<string,string>={deposit:'/icons/mercury-ui/Icon_Image_충전01.png',withdraw:'/icons/mercury-ui/Icon_Image_환전02.png',support:'/icons/mercury-ui/Icon_Image_고객센터02.png'};
function UiIcon({name,masked=false}:{name:string;masked?:boolean}){
  const src=masked?(maskedUiIcons[name]??uiIcons[name]):uiIcons[name];
  return masked?<span className="mc-ui-icon mc-ui-icon-mask" aria-hidden="true" style={{maskImage:'url("'+src+'")',WebkitMaskImage:'url("'+src+'")'}}/>:<img className="mc-ui-icon" src={src} alt=""/>;
}

function SportIcon({sport}:{sport:typeof sportTabs[number]}){return <span className="mc-sport-icon" data-icon={sport.id}><img src={sport.logo!} alt=""/></span>;}

function CountryFlag({country}:{country:string}){
  return <svg className="mc-country-flag" viewBox="0 0 30 20" role="img" aria-label={country}>{country==='독일'?<><path fill="#151515" d="M0 0h30v7H0z"/><path fill="#cf2435" d="M0 7h30v6H0z"/><path fill="#ffce45" d="M0 13h30v7H0z"/></>:country==='프랑스'?<><path fill="#174389" d="M0 0h10v20H0z"/><path fill="#fff" d="M10 0h10v20H10z"/><path fill="#e4434d" d="M20 0h10v20H20z"/></>:country==='잉글랜드'?<><path fill="#fff" d="M0 0h30v20H0z"/><path fill="#ce2b37" d="M13 0h4v20h-4zM0 8h30v4H0z"/></>:<><path fill="#fff" d="M0 0h30v20H0z"/>{Array.from({length:7},(_,i)=><path key={i} fill="#bf3547" d={`M0 ${i*40/13}h30v${20/13}H0z`}/>)}<path fill="#243e74" d="M0 0h13v10.77H0z"/>{Array.from({length:50},(_,i)=>{const row=Math.floor(i/11)*2+(i%11>=6?1:0),col=i%11>=6?i%11-6:i%11;return <circle key={i} cx={1.05+col*2.15+(row%2?1.075:0)} cy={.9+row*1.12} r=".36" fill="#fff"/>;})}</>}</svg>;
}
function Fold({id,title,children,kind,reveal=0}:{id:string;title:ReactNode;children:ReactNode;kind:'league'|'market';reveal?:number}){
  const [closed,setClosed]=useState(false);
  const [seenReveal,setSeenReveal]=useState(reveal);
  if(seenReveal!==reveal){setSeenReveal(reveal);setClosed(false);}
  return <section className={`mc-${kind}${kind==='market'?'-group':''}`}><button className={`mc-${kind}-head`} onClick={()=>setClosed(v=>!v)} aria-expanded={!closed} aria-controls={id}>{title}<ChevronDown className={closed?'is-closed':''}/></button><HeightAccordion id={id} collapsed={closed}>{children}</HeightAccordion></section>;
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
    const name=<span className="mc-odd-label" title={label}>{label}</span>;
    const value=<strong className="mc-odd-value">{locked?<LockKeyhole aria-label="마감"/>:priceText(pick.price)}</strong>;
    return <button data-skin-target="odds" key={id} className={`mc-odd ${reverse?'reverse':''}`} data-selection-id={id} data-odds-source={match.sourceKind} data-odds-version={match.datasetVersion} aria-label={`${match.home.name} 대 ${match.away.name} ${market.name} ${market.line??''} ${pick.label} ${priceText(pick.price)}`} aria-pressed={selected.some(s=>s.id===id)} disabled={locked} onClick={()=>toggle(match,index,p)}>{reverse?<>{value}{name}</>:<>{name}{value}</>}</button>;
  }
  const lineBetween=hasLine&&order.length===2;
  return <div className={`mc-market-row ${lineBetween?(detail?'mc-row-line':'mc-row-three'):order.length===3?'mc-row-three':'mc-row-two'}${order.length>3?' mc-row-many':''}`} data-market-index={index} data-market-id={market.canonicalId}>
    {hasLine&&!lineBetween&&<div className="mc-many-line"><span className="mc-market-line">기준 {market.line}</span></div>}
    {lineBetween?<>{odd(order[0])}<div className={detail?'mc-line-box':'mc-market-center'}>{!detail&&<span className="mc-market-name mc-ellipsis">{market.name}</span>}<b className="mc-market-line">{market.line}</b></div>{odd(order[1],true)}</>:order.map((p,i)=>odd(p,order.length<=3&&i===order.length-1))}
  </div>;
}

function TeamEmblem({team}:{team:Match['home']}){
  const [failed,setFailed]=useState(false);
  const initials=(team.originalName||team.name).split(/\s+/).map(word=>word[0]).join('').slice(0,2).toUpperCase();
  return team.logo&&!failed?<img className="mc-team-emblem" src={team.logo} alt="" width="28" height="28" draggable={false} onError={()=>setFailed(true)}/>:<span className="mc-team-emblem mc-team-initials" aria-hidden="true">{initials}</span>;
}
function MatchCard({match,inspected,inspect,selected,toggle,detailEntry}:{match:Match;inspected:boolean;inspect:()=>void;selected:Selection[];toggle:Props['toggle'];detailEntry:boolean}){
  const teams=<><span className="mc-team"><TeamEmblem key={match.home.logo} team={match.home}/><span className="mc-ellipsis" title={match.home.name}>{match.home.name}</span></span><span className="mc-score-box"><span className="mc-score">VS</span></span><span className="mc-team"><span className="mc-ellipsis" title={match.away.name}>{match.away.name}</span><TeamEmblem key={match.away.logo} team={match.away}/></span></>;
  return <article className="mc-card" data-skin-target="panel" data-match-id={match.id} data-inspected={detailEntry&&inspected} onClick={detailEntry?event=>{if(event.target instanceof Element&&!event.target.closest('button'))inspect();}:undefined}>
    <div className="mc-card-meta"><time className="mc-card-time" dateTime={match.startUtc}>{match.timeLabel}</time><span className="mc-card-league">{match.league}</span>{detailEntry&&<button className="mc-market-open" onClick={inspect} aria-label={`${match.home.name} 전체 마켓 ${match.markets.length}개 보기`}><span className="mc-market-open__count">{String(match.markets.length)+'+'}</span></button>}</div>
    {detailEntry?<button className="mc-card-inspect" aria-label={`${match.home.name} 대 ${match.away.name} 경기 보기`} aria-pressed={inspected} onClick={inspect}>{teams}</button>:<div className="mc-card-inspect">{teams}</div>}
    <div className="mc-primary-markets">{[0,2,1].map(index=><OddsRow key={index} match={match} index={index} selected={selected} toggle={toggle}/>)}</div>
  </article>;
}

function Slip(props:Props&{mode:Mode}){
  const {selected,session,stake,setStake,stakeTouched,setStakeTouched,open,remove,clear,keep,setKeep}=props;
  const checked=validateStake(stake,session.balance),total=totalsFor(selected,checked.value);
  const reason=!selected.length?'경기의 배당을 먼저 선택해 주세요.':!session.loggedIn?'로그인 후 이용할 수 있습니다.':checked.error;
  function amount(value:number,replace=false){const previous=/^\d+$/.test(stake)&&Number.isSafeInteger(Number(stake))?Number(stake):0;setStake(String(Math.min(replace?value:previous+value,DEMO.maxStake,session.balance)));setStakeTouched(true);}
  const summary=[['총 배당',`${total.displayOdds} 배`],['총 당첨금',`${moneyText(total.potential)} 원`],['최소 배당','제한 없음'],['최대 배당','제한 없음'],['최소 베팅금액',`${moneyText(DEMO.minStake)} 원`],['최대 베팅금액',`${moneyText(DEMO.maxStake)} 원`],['최대 당첨금액','제한 없음']];
  return <section className="mc-rail-card mc-slip" aria-label="베팅슬립">
    <div className="mc-slip-head"><label className="mc-keep"><Switch className="mc-slip-toggle" checked={keep} onCheckedChange={setKeep} aria-label="슬립 유지"/>슬립 유지</label><button className="mc-delete" disabled={!selected.length} onClick={clear}><Trash2/>전체삭제</button></div>
    <div className="mc-folder"><span>{props.mode==='domestic'?'국내형':'해외형'} 폴더선택</span><strong>{selected.length}폴더</strong></div>
    {!selected.length?<div className="mc-slip-empty"><UiIcon name="ticket"/><strong>선택된 베팅내역이 없습니다</strong><small>경기를 선택하여 배팅을 시작하세요</small></div>:<div className="mc-slip-selections" aria-live="polite">{selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return <article key={s.id} className="mc-slip-selection" data-selection={s.id}><div><span>{match.league}</span><button className="icon-button" aria-label={`${match.home.name} 선택 제거`} onClick={()=>remove(s.id)}><X/></button></div><strong>{match.home.name} vs {match.away.name}</strong><p>{market.name} {market.line}<small className="mc-slip-market-rule">{market.rule}</small></p><div><span>{pick.label}</span><b>{priceText(pick.price)}</b></div></article>;})}</div>}
    <section className="mc-amount"><div className="mc-amount-head"><label htmlFor="stake"><span className="mc-badge">BET</span> 베팅 금액</label><button className="mc-reset" onClick={()=>{setStake('');setStakeTouched(false);}}><UiIcon name="reset"/>초기화</button></div><div className="mc-amount-input"><input id="stake" aria-label="베팅 금액" inputMode="numeric" autoComplete="off" value={/^\d+$/.test(stake)?moneyText(stake):stake} placeholder="0" onChange={e=>{setStake(e.target.value.replaceAll(',',''));setStakeTouched(true);}} aria-invalid={stakeTouched&&!!checked.error} aria-describedby="mc-stake-hint"/><span>원</span></div><div className="mc-amount-quick">{[5000,10000,50000,100000,1000000].map(v=><button key={v} onClick={()=>amount(v)}>+ {moneyText(v)}</button>)}<button onClick={()=>amount(DEMO.maxStake,true)}>MAX</button></div></section>
    <div className="mc-slip-summary">{summary.map(([label,value])=><div className="mc-summary-row" key={label}><span>{label}</span><strong data-total-odds={label==='총 배당'?'':undefined}>{label==='총 당첨금'?<><span className={selected.length>0&&checked.value>0?'mc-payout-value':undefined}>{moneyText(total.potential)}</span> 원</>:value}</strong></div>)}</div>
    <button className="mc-bet-submit" disabled={!!reason} onClick={()=>open({kind:'confirm'})}><UiIcon name="ticket" masked/>베팅하기</button><p className="mc-slip-hint" id="mc-stake-hint">{stakeTouched&&checked.error?checked.error:reason||'선택한 경기와 금액을 확인해 주세요.'}</p>
  </section>;
}

export function MercurySurface(props:Props){
  const {session,open,logout,selected,toggle}=props;
  const [mode,setMode]=useState<Mode>('european');
  const [listFilters,setListFilters]=useState<Record<Mode,ListFilters>>({european:{query:'',sport:'all',league:''},domestic:{query:'',sport:'all',league:''}});
  const {query,sport,league}=listFilters[mode];
  function updateFilters(change:Partial<ListFilters>,target:Mode=mode){setListFilters(value=>({...value,[target]:{...value[target],...change}}));}
  const setSport=(sport:string)=>updateFilters({sport}),setLeague=(league:string)=>updateFilters({league});
  const [selectedMatchId,setSelectedMatchId]=useState<string|null>(matches[0]?.id??null);
  const [filter,setFilter]=useState('all'),[expandedSport,setExpandedSport]=useState(''),[expandedCountry,setExpandedCountry]=useState('');
  const [revealedLeague,setRevealedLeague]=useState({key:'',revision:0});
  const listRef=useRef<HTMLDivElement>(null),marketsRef=useRef<HTMLDivElement>(null),popularTarget=useRef<string|null>(null);
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
  return <div className="mc-shell" data-skin-target="background">
    <header className="mc-header">
      <div className="mc-header-main" data-skin-target="header"><div className="mc-gnb"><div className="mc-brand-slot"><button className="mc-brand" aria-label="MERCURY 스포츠 홈" onClick={()=>navigate('european')}><img className="mc-brand-wordmark" src="/branding/mercury-wordmark_v3.png" alt="MERCURY" width="1798" height="526"/></button></div><div className="mc-auth">{session.loggedIn?<button className="mc-auth-logout" onClick={logout}><LogOut/>로그아웃</button>:<div className="mc-auth-guest">{['로그인','회원가입','무기명 회원가입'].map(label=><button key={label} onClick={()=>open({kind:'account'})}>{label}</button>)}</div>}</div></div></div>
      <div className="mc-menu-panel" data-skin-target="menu"><nav className="mc-menu" aria-label="주요 카테고리">{menu.map(([id,label,Icon])=><button key={id} className="mc-menu-item" data-skin-target="menu-item" aria-current={mode===id?'page':undefined} disabled={id!=='domestic'&&id!=='european'} onClick={()=>{if(id==='domestic'||id==='european')navigate(id);}}>{id==='european'?<img className="mc-menu-icon" src={sportMenu.find(s=>s.id==='basketball')!.logo!} alt=""/>:<Icon className="mc-menu-icon"/>}<span className="mc-menu-label">{label}</span>{['european','inplay'].includes(id)&&<span className="mc-menu-badge">{id==='european'?'NEW':'LIVE'}</span>}</button>)}</nav></div>
      <div className="mc-notice"><div className="mc-marquee" tabIndex={0}><span className="mc-marquee-track">서비스 점검 및 이벤트 안내는 공지사항에서 확인해 주세요.</span></div><nav className="mc-notice-links" aria-label="공지 및 이용 안내">{notices.map(([id,label])=><button key={id} onClick={()=>navigate(id)}><UiIcon name={id}/>{label}</button>)}</nav></div>
    </header>
    <div className="mc-body">
      <aside className="mc-rail mc-scroll" aria-label="스포츠 바로가기" tabIndex={0}><div className="mc-left-stack">
        <section className="mc-rail-card mc-quick" aria-label="빠른 메뉴">
          {quick.slice(0,3).map(([id,label])=><button key={id} className="mc-quick-action primary" onClick={()=>navigate(id)}><UiIcon name={id} masked/>{label}</button>)}
          {quick.slice(3).map(([id,label])=><button key={id} className="mc-quick-action secondary" onClick={()=>navigate(id)}><UiIcon name={id}/>{label}</button>)}
          {quickBanners.map(([id,label,image])=><button key={id} className="mc-quick-banner" style={{backgroundImage:`url("/banners/mercury-left-rail/${image}")`}} onClick={()=>navigate(id)}><span className="mc-quick-banner-label">{label}</span></button>)}
        </section>
        <section className="mc-rail-card mc-search-card" aria-label="스포츠 검색">{(['european','domestic'] as const).map(target=><form key={target} className="mc-search-row" onSubmit={e=>{e.preventDefault();navigate(target);}}><input aria-label={target==='european'?'해외형 스포츠 검색':'국내형 스포츠 검색'} placeholder={target==='european'?'해외형 스포츠 검색 (국가/리그명/팀명)':'국내형 스포츠 검색 (국가/리그명/팀명)'} value={listFilters[target].query} onChange={e=>{updateFilters({query:e.target.value},target);navigate(target);}}/>{listFilters[target].query?<button aria-label={target==='european'?'해외형 검색어 지우기':'국내형 검색어 지우기'} type="button" onClick={()=>{updateFilters({query:''},target);navigate(target);}}><X/></button>:<button aria-label={target==='european'?'해외형 검색 결과':'국내형 검색 결과'} type="submit"><Search/></button>}</form>)}</section>
        <section className="mc-rail-card mc-sports-summary"><h2 className="mc-sidebar-title"><span className="mc-badge"><span>SPORTS</span></span>인기 스포츠 리스트</h2><ul className="mc-sport-tree">{sportTabs.slice(1).map(s=>{const items=searched.filter(m=>m.sport===s.id),countries=[...new Set(items.map(m=>countryFor(m)[0]))];return <li key={s.id}><button className="mc-sport-row" aria-expanded={expandedSport===s.id} onClick={()=>{setExpandedSport(expandedSport===s.id?'':s.id);setExpandedCountry('');chooseSport(s.id);}}><span><SportIcon sport={s}/>{s.name}</span><span>{items.length}<ChevronDown/></span></button>{expandedSport===s.id&&countries.map(country=><div key={country}><button className="mc-sport-subrow mc-country" aria-expanded={expandedCountry===country} onClick={()=>setExpandedCountry(expandedCountry===country?'':country)}><span><CountryFlag country={country}/> {country}</span><ChevronDown/></button>{expandedCountry===country&&[...new Set(items.filter(m=>countryFor(m)[0]===country).map(m=>m.leagueKey))].map(key=><button className="mc-sport-subrow mc-league-link" aria-pressed={league===key} key={key} onClick={()=>{setSport(s.id);setLeague(key);}}>{items.find(m=>m.leagueKey===key)!.league}<b>{items.filter(m=>m.leagueKey===key).length}</b></button>)}</div>)}</li>;})}</ul></section>
        <section className="mc-rail-card mc-latest"><h2 className="mc-sidebar-title"><span className="mc-badge"><span>LIVE</span></span>최신 인기 게임</h2><div className="mc-latest-list">{matches.slice(0,5).map(m=><button key={m.id} className="mc-latest-row" onClick={()=>popular(m)}><time>{m.timeLabel.slice(-5)}</time><img src={m.sportLogo} alt=""/><span><span>{m.home.name}</span><span>{m.away.name}</span></span></button>)}</div></section>
      </div></aside>
      <main className="mc-center" data-mode={mode} aria-label={mode==='domestic'?'국내형 스포츠':'해외형 스포츠'}><div className="mc-center-surface"><div className="mc-sportbar"><div className="mc-sport-tabs" aria-label="스포츠 종목">{sportTabs.map(s=><button key={s.id} className="mc-sport-tab" data-skin-target="sport" data-sport={s.id} aria-pressed={sport===s.id} onClick={()=>chooseSport(s.id)}><SportIcon sport={s}/><span className="mc-sport-label">{s.id==='all'?'전체':s.name}</span><span className="mc-sport-count">{searched.filter(m=>s.id==='all'||m.sport===s.id).length}</span></button>)}</div></div><div className={`mc-center-grid ${mode==='domestic'?'mc-domestic':''}`}>
        <section className="mc-pane mc-list-pane" aria-label="경기 목록"><div className="mc-list-scroll mc-scroll" ref={listRef} role="region" aria-label="리그별 경기 목록" tabIndex={0}>{[...leagues].map(([key,items])=><Fold key={key} id={`league-${key}`} kind="league" reveal={revealedLeague.key===key?revealedLeague.revision:0} title={<span className="mc-league-label"><CountryFlag country={countryFor(items[0])[0]}/>{countryFor(items[0])[0]} ({items[0].league})<small>{items.length}</small></span>}><div className="mc-event-list">{items.map(m=><MatchCard key={m.id} match={m} inspected={m.id===match?.id} detailEntry={mode==='european'} inspect={()=>inspect(m.id)} selected={selected} toggle={toggle}/>)}</div></Fold>)}{!filtered.length&&<div className="mc-empty"><Search/><strong>{emptySport?'등록된 경기가 없습니다.':'검색 결과가 없습니다'}</strong><span>현재 조건에 맞는 경기가 없습니다.</span><button className="mc-small-action" onClick={()=>updateFilters({query:'',sport:'all',league:''})}>검색·필터 초기화</button></div>}</div><BackToTop scrollRef={listRef}/></section>
        {mode==='european'&&<section className="mc-pane" aria-label="선택 경기 세부 베팅" data-detail-match={match?.id??''}><div className="mc-match-heading"><h1 className="mc-match-title">{match?`${match.home.name} vs ${match.away.name}`:emptySport?'경기 없음':'선택할 경기가 없습니다'}</h1>{match&&<span className="mc-match-start">{match.timeLabel}</span>}</div><div className="mc-detail-panel"><div className="mc-market-tabs" role="group" aria-label="마켓 종류">{filters.map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><div className="mc-market-scroll mc-scroll" ref={marketsRef} role="region" aria-label="세부 마켓 목록" tabIndex={0}>{match?groups.filter(g=>filter==='all'||g.category===filter).map(group=><Fold key={`${match.id}-${group.id}`} id={`detail-${match.id}-${group.id}`} kind="market" title={<span title={group.name}>{group.name}<small>{group.rows.length>1?`${group.rows.length} 라인`:''}</small></span>}><div className="mc-market-rule">{match.markets[group.rows[0]].rule}</div><div className="mc-market-rows">{group.rows.map(index=><OddsRow key={selectionId(match,index,0)} match={match} index={index} selected={selected} toggle={toggle} detail/>)}</div></Fold>):<div className="mc-empty"><Ticket/><strong>{emptySport?'경기 없음':'표시할 상세 마켓이 없습니다'}</strong><span>다른 검색어나 종목을 선택해 주세요.</span></div>}{match&&filter!=='all'&&!groups.some(g=>g.category===filter)&&<div className="mc-empty"><Ticket/><strong>해당 종류의 마켓이 없습니다</strong></div>}{match&&<p className="mc-data-note">{match.markets.length}개 마켓 · {groups.length}개 그룹</p>}</div></div></section>}
      </div></div></main>
      <aside className="mc-rail mc-scroll" aria-label="계정과 베팅슬립" tabIndex={0}><div className="mc-right-stack"><section className="mc-rail-card mc-user"><div className="mc-user-head"><span className="mc-badge">LV.0</span><strong>{session.loggedIn?(session.nickname??'MERCURY 회원'):'GUEST'}</strong><button className="mc-small-action" onClick={()=>navigate('profile')}>정보수정</button></div><div className="mc-balances"><div className="mc-balance-row"><span>보유머니</span><strong className="mc-balance-value">{moneyText(session.balance)} <small>원</small></strong></div><div className="mc-balance-row"><span>보너스 전환</span><button className="mc-small-action" onClick={()=>navigate('bonus')}>전환</button></div></div><div className="mc-user-actions">{services.map(([id,label])=><button key={id} onClick={()=>navigate(id)}><UiIcon name={id}/>{label}</button>)}</div></section><Slip {...props} mode={mode}/>{props.storageError&&<output className="mc-slip-hint">{props.storageError}</output>}<section className="mc-rail-card mc-banner-stack" aria-label="이용 안내 배너">{banners.map(([id,label,description])=><button key={id} className="mc-mini-banner" onClick={()=>navigate(id)}><span><strong>{label}</strong><small>{description}</small></span></button>)}</section></div></aside>
    </div>
  </div>;
}
