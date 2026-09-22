'use client';

// oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Independent scroll regions are keyboard accessible.
// oxlint-disable next/no-img-element -- Preserve the supplied local branding and pre-sized sports assets without image transformation.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Bell, Check, ChevronDown, ChevronRight, ChevronUp, Clock3, Headphones, History, Info, LockKeyhole, LogOut, Radio, RotateCcw, Search, ShieldCheck, Ticket, Trash2, Trophy, UserRound, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import logoPresentation from './logo-presentation.json';
import { matches, sections, sportMenu, priceText, moneyText, DEMO, totalsFor, validateStake, type Match, type Selection, type Receipt } from './demo-data';
import { BackToTop, HeightAccordion } from './match-motion';

type Session = {loggedIn:boolean;balance:number;history:Receipt[]};
type Overlay = {kind:'info';title:string;body:string} | {kind:'account'|'charge'|'withdraw'|'history'|'confirm'} | {kind:'receipt';receipt:Receipt};
type Open = (overlay:Overlay)=>void;
const initialSession:Session={loggedIn:false,balance:DEMO.initialBalance,history:[]};
const menuLabels=['스포츠','실시간 스포츠','E스포츠','카지노','슬롯','미니게임','이벤트'];
const serviceCopy={notice:'원하는 종목과 리그를 선택해 경기를 확인하세요.',support:'배당 선택과 금액 계산은 스포츠 가이드에서 확인하실 수 있습니다. 베팅내역에서 선택한 경기와 금액을 확인하세요.',amount:'베팅 금액은 1,000원부터 100,000원까지 보유 금액 내에서 입력합니다. 총 배당은 중간 반올림 없이 곱하며 소수 3자리로 표시합니다. 예상 당첨금은 입력액과 배당 곱의 결과에서 1원 미만을 버립니다.'};

function SportsLogo({src,variant,alt=''}:{src:string;variant:'sport'|'league'|'team'|'menu';alt?:string}) {
  const item=(logoPresentation as Record<string,{width:number;height:number;left:number;top:number;backing:boolean;slotWidth:number}>)[src];
  return <span className={`logo-slot logo-${variant}${item?.backing?' logo-backed':''}`} style={variant==='league'&&item?{width:item.slotWidth}:undefined}><img src={src} alt={alt} style={item?{width:`${item.width}%`,height:`${item.height}%`,left:`${item.left}%`,top:`${item.top}%`}:undefined}/></span>;
}

function Panel({title,extra,children,className=''}:{title?:string;extra?:ReactNode;children:ReactNode;className?:string}) {
  return <section className={`panel ${className}`}>{title&&<div className="panel-heading"><h2>{title}</h2>{extra}</div>}{children}</section>;
}
function Header({session,open,logout,active,menu}:{session:Session;open:Open;logout:()=>void;active:string;menu:(label:string)=>void}) {
  return <><header className="topbar"><a href="#live" className="brand" aria-label="MERCURY 스포츠 홈"><img className="brand-symbol" src="/branding/mercury-emblem.png" width="1138" height="1100" alt=""/><img className="brand-wordmark" src="/branding/mercury-wordmark.png" width="1798" height="526" alt="MERCURY"/></a>
    <nav className="primary-nav" aria-label="주요 카테고리">{menuLabels.map(label=><button key={label} aria-pressed={active===label} onClick={()=>menu(label)}>{label==='실시간 스포츠'&&<span className="nav-dot"/>}{label}</button>)}</nav>
    <div className="header-account">{session.loggedIn?<><span className="session-label"><span className="status-dot"/>회원</span><Button className="btn" onClick={logout}><LogOut/>로그아웃</Button></>:<><Button className="btn" onClick={()=>open({kind:'account'})}>로그인</Button><Button className="btn gold" onClick={()=>open({kind:'account'})}>회원가입</Button></>}</div>
    <div className="header-rail" aria-hidden="true"/></header>
    <div className="noticebar"><button onClick={()=>open({kind:'info',title:'공지사항',body:serviceCopy.notice})}><Bell/><b>NOTICE</b><span>{serviceCopy.notice}</span><ChevronRight/></button></div></>;
}
function PhotoBanner({side,onAction}:{side:'left'|'right';onAction:()=>void}) {
  const content=side==='left'?{image:'/banners/r8/mercury-slots-woman.png',label:'MERCURY SLOTS',title:<>빛나는 밤,<br/>새로운 즐거움.</>,cta:'슬롯 둘러보기'}:{image:'/banners/r8/mercury-event-woman.png',label:'MERCURY',title:<>당신의 밤을<br/>더 특별하게.</>,cta:'이벤트 보기'};
  return <section className={`photo-banner photo-banner-${side}`} aria-label={side==='left'?'MERCURY 슬롯':'MERCURY 이벤트'}><img className="banner-photo" src={content.image} alt="" width="1672" height="941"/><div className="banner-readability" aria-hidden="true"/><div className="banner-copy"><span className="eyebrow">{content.label}</span><h2>{content.title}</h2></div><Button className="btn gold banner-cta" onClick={onAction}>{content.cta}<ChevronRight/></Button><div className="banner-frame" aria-hidden="true"/></section>;
}
function LeftColumn({query,setQuery,sport,setSport,open,reset,menu}:{query:string;setQuery:(v:string)=>void;sport:string;setSport:(v:string)=>void;open:Open;reset:()=>void;menu:(label:string)=>void}) {
  const queryMatches=(match:Match)=>`${match.home.name} ${match.away.name} ${match.home.originalName} ${match.away.originalName} ${match.league} ${match.leagueKey}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
  return <aside className="scroll-column left-column" aria-label="스포츠 바로가기" tabIndex={0}>
    <Panel title="빠른 서비스" extra={<span className="eyebrow">QUICK SERVICE</span>} className="service-panel"><div className="quick-body"><Button className="btn gold service-button" onClick={()=>open({kind:'charge'})}><span className="service-symbol"><ArrowDownToLine/></span><span>충전</span></Button><Button className="btn service-button" onClick={()=>open({kind:'withdraw'})}><span className="service-symbol"><ArrowUpFromLine/></span><span>환전</span></Button><Button className="btn customer-button" onClick={()=>open({kind:'info',title:'고객센터',body:serviceCopy.support})}><Headphones/>고객센터<ChevronRight/></Button></div></Panel>
    <Panel className="browse-panel"><div className="search-heading"><label htmlFor="match-search">경기 찾기</label><button className="text-button" onClick={reset} disabled={!query&&sport==='all'}><RotateCcw/>초기화</button></div><div className="search-box"><Search/><Input id="match-search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="팀 또는 리그 검색" autoComplete="off"/>{query&&<button className="icon-button" aria-label="검색어 지우기" onClick={()=>setQuery('')}><X/></button>}</div>
      <SidebarProvider className="!min-h-0 !block"><Sidebar collapsible="none" className="sport-nav"><nav className="sport-menu" aria-label="스포츠 종목">{sportMenu.map(item=><button key={item.id} aria-pressed={sport===item.id} onClick={()=>setSport(item.id)}>{item.logo?<SportsLogo src={item.logo} variant="menu"/>:<span className="all-sport-icon"><Trophy/></span>}<span>{item.name}</span><small className="num">{String(matches.filter(m=>(item.id==='all'||m.sport===item.id)&&queryMatches(m)).length).padStart(2,'0')}</small><ChevronRight/></button>)}</nav></Sidebar></SidebarProvider>
    </Panel>
    <PhotoBanner side="left" onAction={()=>menu('슬롯')}/>
    <Panel title="스포츠 가이드" extra={<ShieldCheck/>} className="guide-panel"><div className="support-links"><button onClick={()=>open({kind:'info',title:'배당 선택 안내',body:'배당을 누르면 슬립에 담깁니다. 같은 버튼을 다시 누르면 해제됩니다. 한 경기의 다른 배당을 선택하면 이전 선택이 교체됩니다. 잠금 표시 배당은 선택할 수 없습니다. 검색으로 카드가 숨겨져도 선택은 유지됩니다.'})}><Ticket/>배당 선택과 슬립<ChevronRight/></button><button onClick={()=>open({kind:'info',title:'금액과 계산 안내',body:serviceCopy.amount})}><Info/>금액·계산 기준<ChevronRight/></button><button onClick={()=>open({kind:'history'})}><History/>내 베팅내역<ChevronRight/></button></div></Panel>
    <div className="left-footer"><strong>MERCURY</strong></div>
  </aside>;
}
function SectionTitle({section,count}:{section:typeof sections[number];count:number}) {
  const Icon=section.id==='live'?Radio:section.id==='soon'?Clock3:Trophy;
  return <div className="section-title"><div className="title-plate"><Icon/><h2>{section.title}</h2><span className="section-kicker">{section.english}</span></div><div className="title-right"><strong className="num">{String(count).padStart(2,'0')}</strong>경기</div></div>;
}
function MatchSection({section,items,selected,toggle,reset,scrollRef}:{section:typeof sections[number];items:Match[];selected:Selection[];toggle:(match:Match,m:number,p:number)=>void;reset:()=>void;scrollRef:RefObject<HTMLElement|null>}) {
  const [visible,setVisible]=useState(6);
  const [announcement,setAnnouncement]=useState('');
  const [busy,setBusy]=useState(false);
  const busyRef=useRef(false),restoreMoreFocus=useRef(false),moreRef=useRef<HTMLDivElement>(null);
  const anchorRef=useRef<{element:HTMLElement;top:number}|null>(null);
  const shown=items.slice(0,visible),batches=Array.from({length:Math.ceil(shown.length/6)},(_,i)=>shown.slice(i*6,i*6+6));
  function resizeList(collapse=false){
    if(busyRef.current)return;
    busyRef.current=true;setBusy(true);
    const next=collapse?6:Math.min(visible+6,items.length);
    if(collapse&&moreRef.current){anchorRef.current={element:moreRef.current,top:moreRef.current.getBoundingClientRect().top};restoreMoreFocus.current=true;}
    setVisible(next);setAnnouncement(`${section.title} 총 ${next}경기 표시`);
  }
  function finishResize(){busyRef.current=false;setBusy(false);}
  useLayoutEffect(()=>{if(restoreMoreFocus.current){moreRef.current?.querySelector<HTMLButtonElement>('.more-button')?.focus({preventScroll:true});restoreMoreFocus.current=false;}},[visible]);
  return <section id={section.id} className="section-block" aria-label={section.title}>
    <SectionTitle section={section} count={items.length}/>
    <HeightAccordion id={`${section.id}-list`} className="match-batches" version={visible} scrollRef={scrollRef} anchorRef={anchorRef} onFinish={finishResize}>{batches.map((batch,i)=><div key={i} className={i?'match-batch':''}><div className="batch-content"><div className="card-grid">{batch.map(match=><BettingCard key={match.id} match={match} selected={selected} toggle={toggle}/>)}</div></div></div>)}</HeightAccordion>
    {!items.length&&<div className="empty-results"><Search/><strong>검색 결과가 없습니다</strong><span>다른 팀·리그 또는 종목을 선택해 보세요.</span><Button className="btn" onClick={reset}>검색·필터 초기화</Button></div>}
    {(visible<items.length||visible>6)&&<div className="more-row" ref={moreRef}>{visible<items.length&&<Button className="btn more-button" aria-label={`${section.title} 더보기`} aria-controls={`${section.id}-list`} aria-disabled={busy} onClick={()=>resizeList()}>더보기<ChevronDown/></Button>}{visible>6&&<button className="text-button collapse-button" aria-label={`${section.title} 접기`} aria-controls={`${section.id}-list`} aria-disabled={busy} onClick={()=>resizeList(true)}>접기<ChevronUp/></button>}</div>}
    <output className="sr-only" aria-live="polite">{announcement}</output>
  </section>;
}
function BettingCard({match,selected,toggle}:{match:Match;selected:Selection[];toggle:(match:Match,m:number,p:number)=>void}) {
  const status=match.completed?'종료 · FINAL':match.state==='in'?match.statusDetail:'예정';
  function pickButton(m:number,p:number) {
    const pick=match.markets[m].picks[p],id=`${match.id}-${m}-${p}`;
    return <Button key={id} className="odd" data-pick={id} aria-label={`${match.home.name} ${match.markets[m].name} ${pick.label} ${priceText(pick.price)}${pick.locked?' 잠김':''}`} aria-pressed={selected.some(s=>s.id===id)} disabled={pick.locked} onClick={()=>toggle(match,m,p)}><span className="pick-label">{pick.label}</span><span className="odd-value">{pick.locked?<LockKeyhole aria-label="잠김"/>:<Check className="pick-check" aria-hidden="true"/>}<strong className="num">{priceText(pick.price)}</strong></span></Button>;
  }
  return <article className="match-card" data-match={match.id} data-state={match.state} aria-label={`${match.home.name} 대 ${match.away.name} · ${status}`}>
    <div className="match-meta"><SportsLogo src={match.sportLogo} variant="sport"/><SportsLogo src={match.leagueLogo} variant="league"/><span className="league-name" title={match.league}>{match.league}</span>{match.state==='in'&&<span className="live-chip"><span className="live-dot"/>LIVE</span>}<time dateTime={match.startUtc} title="한국 표준시 (KST)">{match.timeLabel}</time></div>
    <div className="matchup"><div className="matchup-team"><SportsLogo src={match.home.logo} variant="team" alt={`${match.home.name} 로고`}/><strong title={match.home.originalName}>{match.home.name}</strong></div><div className="matchup-center"><span className="matchup-status">{status}</span><div className="score" aria-label={`홈 ${match.score[0]} 대 원정 ${match.score[1]}`}><strong>{match.score[0]}</strong><span>:</span><strong>{match.score[1]}</strong></div></div><div className="matchup-team"><SportsLogo src={match.away.logo} variant="team" alt={`${match.away.name} 로고`}/><strong title={match.away.originalName}>{match.away.name}</strong></div></div>
    <div className="markets">{match.markets.map((market,m)=><div key={market.name} className={`market-row ${market.picks.length===3?'three-way':''}`} aria-label={`${market.name} · ${market.rule}`}>{market.picks.length===3?market.picks.map((_,p)=>pickButton(m,p)):<>{pickButton(m,0)}<div className="market-reference" title={market.rule}><span>{market.name}</span>{market.line?<b>{market.line}</b>:<small>{market.rule==='연장 포함 · 무승부 반환'?'연장·무 반환':market.rule}</small>}</div>{pickButton(m,1)}</>}</div>)}</div>
  </article>;
}
function Slip({selected,session,stake,setStake,stakeTouched,setStakeTouched,remove,clear,open}:{selected:Selection[];session:Session;stake:string;setStake:(s:string)=>void;stakeTouched:boolean;setStakeTouched:(v:boolean)=>void;remove:(id:string)=>void;clear:()=>void;open:Open}) {
  const checked=validateStake(stake,session.balance),total=totalsFor(selected,checked.value);
  const reason=!selected.length?'경기의 배당을 먼저 선택해 주세요.':!session.loggedIn?'로그인 후 이용할 수 있습니다.':checked.error;
  function add(amount:number) {const value=/^\d+$/.test(stake)&&Number.isSafeInteger(Number(stake))?Number(stake):0;setStake(String(Math.min(value+amount,DEMO.maxStake,session.balance)));setStakeTouched(true);}
  return <Panel title="베팅슬립" extra={<div className="slip-actions"><span className="count-badge num" aria-label={`${selected.length}개 선택`}>{selected.length}</span><button className="icon-button" aria-label="선택 전체 제거" disabled={!selected.length} onClick={clear}><Trash2/></button></div>} className="slip">
    <div className="slip-type"><span>{selected.length>1?'조합 선택':'단일 선택'}</span><span>BET SLIP</span></div><div className="slip-list" aria-live="polite">{!selected.length?<div className="empty-slip"><Ticket/><strong>선택한 배당이 없습니다</strong><p>마음에 드는 배당을 눌러 담아보세요.</p></div>:selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return <div className="slip-item" key={s.id} data-selection={s.id}><div className="slip-item-top"><span>{match.league}</span><button className="icon-button" aria-label={`${match.home.name} 선택 제거`} onClick={()=>remove(s.id)}><X/></button></div><div className="slip-teams">{match.home.name}<span>vs</span>{match.away.name}</div><div className="slip-pick"><span>{pick.label}</span><strong className="num">{priceText(pick.price)}</strong></div><small>{market.name}{market.line&&` · ${market.line}`} · {market.rule}</small></div>;})}</div>
    <div className="slip-totals"><label className="stake-label" htmlFor="stake">베팅 금액<span>KRW</span></label><div className="stake-input"><span>₩</span><Input id="stake" value={stake} onChange={event=>{setStake(event.target.value);setStakeTouched(true);}} inputMode="numeric" autoComplete="off" placeholder="금액 입력" aria-invalid={stakeTouched&&!!checked.error} aria-describedby="stake-validation"/><button className="text-button" onClick={()=>{setStake(String(Math.min(DEMO.maxStake,session.balance)));setStakeTouched(true);}}>MAX</button></div>
      <div className="stake-quick"><Button className="btn" onClick={()=>add(5000)}>+5천</Button><Button className="btn" onClick={()=>add(10000)}>+1만</Button><Button className="btn" onClick={()=>add(50000)}>+5만</Button><Button className="btn" onClick={()=>{setStake('');setStakeTouched(false);}}>초기화</Button></div>
      <p id="stake-validation" className={`stake-hint ${stakeTouched&&checked.error?'invalid':''}`}>{stakeTouched&&checked.error?checked.error:'최소 1,000원 · 최대 100,000원'}</p>
      <div className="total-line"><span>총 배당</span><strong className="num" data-total-odds>{total.odds}</strong></div><div className="total-line payout"><span>예상 당첨금</span><strong className="num" data-potential>₩ {moneyText(total.potential)}</strong></div>
      <Button className="btn gold submit-slip" disabled={!!reason} onClick={()=>open({kind:'confirm'})}><Ticket/>베팅하기<ChevronRight/></Button><output className="slip-footnote">{reason||'선택 내역과 금액을 확인해 주세요.'}</output>
    </div>
  </Panel>;
}
function Account({session,open,logout}:{session:Session;open:Open;logout:()=>void}) {
  return <Panel title="MY ACCOUNT" extra={<span className={`account-chip ${session.loggedIn?'signed':''}`}>{session.loggedIn?'회원':'GUEST'}</span>} className="account-panel"><div className="account-body"><div className="account-identity"><span className="avatar"><UserRound/></span><div><strong>{session.loggedIn?'MERCURY 회원':'방문자님, 환영합니다'}</strong></div><button className="icon-button" aria-label={session.loggedIn?'로그아웃':'로그인'} onClick={session.loggedIn?logout:()=>open({kind:'account'})}>{session.loggedIn?<LogOut/>:<ChevronRight/>}</button></div><div className="wallet"><span>보유 금액</span><strong className="num">₩ {moneyText(session.balance)}</strong></div><div className="account-actions"><button onClick={()=>open({kind:'charge'})}><ArrowDownToLine/>충전</button><button onClick={()=>open({kind:'withdraw'})}><ArrowUpFromLine/>환전</button><button onClick={()=>open({kind:'history'})}><History/>베팅내역</button></div></div></Panel>;
}

export default function Page() {
  useEffect(()=>{
    // Typekit mutates root classes; initialize only after React hydration.
    const fontWindow=window as typeof window & {Typekit?:{load:(options:{kitId:string;async:boolean})=>void}};
    for(const kitId of ['hyf2mwn','gig5kam']) {
      const id=`adobe-kit-${kitId}`;
      if(document.getElementById(id))continue;
      const script=document.createElement('script');
      script.id=id;script.src=`https://use.typekit.net/${kitId}.js`;script.async=true;
      script.onload=()=>fontWindow.Typekit?.load({kitId,async:true});
      document.head.appendChild(script);
    }
  },[]);
  const [selected,setSelected]=useState<Selection[]>([]);
  const centerRef=useRef<HTMLElement>(null);
  const [query,setQuery]=useState('');
  const [sport,setSport]=useState('all');
  const [stake,setStake]=useState('');
  const [stakeTouched,setStakeTouched]=useState(false);
  const [session,setSession]=useState<Session>(initialSession);
  const [ready,setReady]=useState(false);
  const [storageError,setStorageError]=useState('');
  const [overlay,setOverlay]=useState<Overlay|null>(null);
  const [activeMenu,setActiveMenu]=useState('실시간 스포츠');
  useEffect(()=>{
    try {
      const saved=localStorage.getItem(DEMO.storageKey);
      if(saved) {
        const value=JSON.parse(saved) as Session;
        // oxlint-disable-next-line react/react-compiler -- Restore browser-only storage after hydration to keep the server and first client render identical.
        if(typeof value.loggedIn==='boolean'&&Number.isSafeInteger(value.balance)&&value.balance>=0&&value.balance<=DEMO.initialBalance&&Array.isArray(value.history)&&value.history.every(r=>typeof r.id==='string'&&typeof r.createdAt==='string'&&Number.isSafeInteger(r.stake)&&typeof r.odds==='string'&&typeof r.potential==='string'&&Array.isArray(r.picks)&&r.picks.every(p=>typeof p.match==='string'&&typeof p.market==='string'&&typeof p.pick==='string'&&typeof p.price==='string')))setSession({...value,history:value.history.slice(0,DEMO.maxHistory)});
        else setStorageError('이전 계정 정보를 불러오지 못했습니다.');
      }
    } catch {setStorageError('계정 정보를 불러오지 못했습니다.');}
    setReady(true);
  },[]);
  useEffect(()=>{
    if(!ready)return;
    try {localStorage.setItem(DEMO.storageKey,JSON.stringify(session));}
    // oxlint-disable-next-line react/react-compiler -- Surface a failure reported by the external browser storage API.
    catch {setStorageError('내역을 저장하지 못했습니다. 새로고침 전에 내역을 확인해 주세요.');}
  },[session,ready]);
  function toggle(match:Match,m:number,p:number) {
    if(match.markets[m].picks[p].locked)return;
    const id=`${match.id}-${m}-${p}`;
    setSelected(prev=>prev.some(s=>s.id===id)?prev.filter(s=>s.id!==id):[...prev.filter(s=>s.matchId!==match.id),{id,matchId:match.id,marketIndex:m,pickIndex:p}]);
  }
  function resetSearch(){setQuery('');setSport('all');}
  function logout(){setSession(prev=>({...prev,loggedIn:false}));}
  const normalized=query.trim().toLocaleLowerCase();
  const filtered=matches.filter(m=>(sport==='all'||m.sport===sport)&&`${m.home.name} ${m.away.name} ${m.home.originalName} ${m.away.originalName} ${m.league} ${m.leagueKey}`.toLocaleLowerCase().includes(normalized));
  const checked=validateStake(stake,session.balance);
  const total=totalsFor(selected,checked.value);
  function confirmExperience() {
    if(!session.loggedIn||!selected.length||checked.error)return;
    const receipt:Receipt={id:crypto.randomUUID(),createdAt:new Date().toISOString(),stake:checked.value,odds:total.odds,potential:total.potential,picks:selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return {match:`${match.home.name} vs ${match.away.name}`,market:`${market.name} ${market.line||''} · ${market.rule}`,pick:pick.label,price:priceText(pick.price)};})};
    setSession(prev=>({...prev,balance:prev.balance-checked.value,history:[receipt,...prev.history].slice(0,DEMO.maxHistory)}));
    setSelected([]);setStake('');setStakeTouched(false);setOverlay({kind:'receipt',receipt});
  }
  function showOverlay(next:Overlay){if(next.kind==='account'){setSession(prev=>({...prev,loggedIn:true}));return;}setOverlay(next);}
  function navigateMenu(label:string) {
    setActiveMenu(label);
    if(label==='스포츠'||label==='실시간 스포츠')document.getElementById('live')?.scrollIntoView({block:'start'});
    else showOverlay({kind:'info',title:label,body:label==='이벤트'?'이벤트 소식은 공지사항에서 확인하세요.':`${label} 서비스는 준비 중입니다.`});
  }
  const overlayTitle=overlay?.kind==='info'?overlay.title:overlay?.kind==='charge'?'충전':overlay?.kind==='withdraw'?'환전 안내':overlay?.kind==='history'?'내 베팅내역':overlay?.kind==='receipt'?'베팅이 완료되었습니다':'선택 내역 확인';
  return <div className="shell"><Header session={session} open={showOverlay} logout={logout} active={activeMenu} menu={navigateMenu}/><div className="workspace"><LeftColumn query={query} setQuery={setQuery} sport={sport} setSport={setSport} open={showOverlay} reset={resetSearch} menu={navigateMenu}/><div className="center-frame"><main ref={centerRef} className="scroll-column center-column" aria-label="스포츠 경기 목록" tabIndex={0}><div className="match-list-view">
    {(query||sport!=='all')&&<output className="results-summary"><span>{query&&<b>“{query}”</b>} {sportMenu.find(s=>s.id===sport)?.name} · <strong>{filtered.length}</strong>경기</span><button className="text-button" onClick={resetSearch}><RotateCcw/>전체 보기</button></output>}
    {sections.map(section=><MatchSection key={`${section.id}|${sport}|${normalized}`} section={section} items={filtered.filter(m=>m.section===section.id)} selected={selected} toggle={toggle} reset={resetSearch} scrollRef={centerRef}/>)}
    <footer className="main-footer"><span>MERCURY</span></footer>
  </div></main><BackToTop scrollRef={centerRef}/></div><aside className="scroll-column right-column" aria-label="계정 및 베팅슬립" tabIndex={0}><Account session={session} open={showOverlay} logout={logout}/><Slip selected={selected} session={session} stake={stake} setStake={setStake} stakeTouched={stakeTouched} setStakeTouched={setStakeTouched} remove={id=>setSelected(prev=>prev.filter(s=>s.id!==id))} clear={()=>setSelected([])} open={showOverlay}/>
    {storageError&&<output className="storage-warning">{storageError}</output>}<section className="support-panel"><div className="support-title"><Headphones/><div><h2>무엇을 도와드릴까요?</h2><span>이용 안내</span></div></div><div className="support-links"><button onClick={()=>setOverlay({kind:'info',title:'1:1 문의',body:serviceCopy.support})}>1:1 문의 안내<ChevronRight/></button><button onClick={()=>setOverlay({kind:'info',title:'공지사항',body:serviceCopy.notice})}>공지사항<ChevronRight/></button></div></section>
    <PhotoBanner side="right" onAction={()=>navigateMenu('이벤트')}/>
  </aside></div>
  <Dialog open={!!overlay} onOpenChange={open=>{if(!open)setOverlay(null);}}><DialogContent className="demo-dialog" showCloseButton={false} aria-describedby={undefined}><DialogClose render={<Button className="icon-button dialog-close" aria-label="닫기"/>}><X/></DialogClose><DialogTitle>{overlayTitle}</DialogTitle>
    {overlay?.kind==='info'&&<p className="dialog-copy">{overlay.body}</p>}
    {overlay?.kind==='charge'&&<><p className="dialog-copy">충전 후 보유 금액은 {moneyText(DEMO.initialBalance)}원입니다.</p><div className="dialog-total"><span>현재 보유 금액</span><strong>₩ {moneyText(session.balance)}</strong></div><Button className="btn gold" onClick={()=>{setSession(prev=>({...prev,balance:DEMO.initialBalance}));setOverlay({kind:'info',title:'충전 완료',body:'보유 금액이 1,000,000원으로 변경되었습니다.'});}}>충전하기</Button></>}
    {overlay?.kind==='withdraw'&&<><p className="dialog-copy">환전 문의는 고객센터 이용 안내를 확인해 주세요.</p><div className="dialog-total"><span>보유 금액</span><strong>₩ {moneyText(session.balance)}</strong></div><Button className="btn" onClick={()=>setOverlay({kind:'info',title:'고객센터',body:serviceCopy.support})}>이용 안내</Button></>}
    {overlay?.kind==='confirm'&&<><div className="confirm-picks">{selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return <div key={s.id}><strong>{match.home.name} vs {match.away.name}</strong><span>{market.name} · {pick.label}<b>{priceText(pick.price)}</b></span></div>;})}</div><div className="dialog-total"><span>베팅 금액</span><strong>₩ {moneyText(checked.value)}</strong></div><div className="dialog-total"><span>총 배당 / 예상금액</span><strong>{total.odds} / ₩ {moneyText(total.potential)}</strong></div><p className="dialog-copy">선택한 경기와 베팅 금액을 확인해 주세요.</p><Button className="btn gold" disabled={!session.loggedIn||!selected.length||!!checked.error} onClick={confirmExperience}>베팅 확인</Button></>}
    {overlay?.kind==='receipt'&&<><div className="receipt-success"><Check/><strong>베팅 완료</strong><span>{overlay.receipt.picks.length}경기 · ₩ {moneyText(overlay.receipt.stake)}</span></div><Button className="btn gold" onClick={()=>setOverlay({kind:'history'})}>내 베팅내역 보기</Button></>}
    {overlay?.kind==='history'&&<div className="history-list">{!session.history.length?<div className="history-empty"><History/><strong>베팅내역이 없습니다</strong><p>경기의 배당과 베팅 금액을 선택해 주세요.</p></div>:session.history.map(receipt=><article key={receipt.id}><div className="history-meta"><time>{new Date(receipt.createdAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}</time><span>베팅 내역</span></div>{receipt.picks.map((pick,i)=><div key={i} className="history-pick"><strong>{pick.match}</strong><span>{pick.market} · {pick.pick}<b>{pick.price}</b></span></div>)}<div className="history-totals"><span>₩ {moneyText(receipt.stake)} × {receipt.odds}</span><strong>예상 ₩ {moneyText(receipt.potential)}</strong></div></article>)}</div>}
  </DialogContent></Dialog>
  </div>;
}



