from pathlib import Path
root=Path('E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site')
p=root/'app/page.tsx'
s=p.read_text(encoding='utf-8')
a=s.index('function MatchSection(');b=s.index('function Slip(',a)
new='''function MatchSection({section,items,selected,toggle,reset}:{section:typeof sections[number];items:Match[];selected:Selection[];toggle:(match:Match,m:number,p:number)=>void;reset:()=>void}) {
  const [visible,setVisible]=useState(6);
  const [collapsed,setCollapsed]=useState<Set<string>>(new Set());
  const [announcement,setAnnouncement]=useState('');
  const shown=items.slice(0,visible);
  const groups=new Map<string,{representative:Match;items:Match[];total:number}>();
  for(const match of shown) {
    const key=`${match.sport}-${match.leagueKey}`;
    if(!groups.has(key))groups.set(key,{representative:match,items:[],total:items.filter(item=>item.sport===match.sport&&item.leagueKey===match.leagueKey).length});
    groups.get(key)!.items.push(match);
  }
  function expand(){const added=Math.min(6,items.length-visible);setVisible(visible+added);setAnnouncement(`${section.title} ${added}경기 추가, 총 ${visible+added}경기 표시`);}
  function toggleGroup(key:string){setCollapsed(previous=>{const next=new Set(previous);if(next.has(key))next.delete(key);else next.add(key);return next;});}
  return <section id={section.id} className="section-block" aria-label={section.title}>
    <SectionTitle section={section} count={items.length}/>
    <div id={`${section.id}-list`} className="league-list">
      {[...groups].map(([key,group])=>{const match=group.representative,open=!collapsed.has(key),id=`${section.id}-${key}`;return <div className="league-group" key={key} data-league={key}>
        <button className="league-toggle" aria-expanded={open} aria-controls={id} onClick={()=>toggleGroup(key)}>
          <SportsLogo src={match.sportLogo} variant="sport"/><SportsLogo src={match.leagueLogo} variant="league"/>
          <strong>{match.league}</strong><span className="league-count">{group.items.length} / {group.total} 경기</span><ChevronDown/>
        </button>
        <div id={id} hidden={!open}>
          <div className="market-head match-columns" aria-hidden="true"><span>시간 / 상태</span><span>경기 <small>홈 · 원정</small></span><span>{match.sport==='soccer'?'승무패 (1X2)':'승패 (1 / 2)'}</span><span>핸디캡 (H / A)</span><span>오버 / 언더 (O / U)</span><span>기타</span></div>
          {group.items.map(item=><MatchRow key={item.id} match={item} selected={selected} toggle={toggle}/>)}
        </div>
      </div>;})}
    </div>
    {!items.length&&<div className="empty-results"><Search/><strong>검색 결과가 없습니다</strong><span>다른 팀·리그 또는 종목을 선택해 보세요.</span><Button className="btn" onClick={reset}>검색·필터 초기화</Button></div>}
    {visible<items.length&&<div className="more-row"><Button className="btn more-button" aria-label={`${section.title} 더보기`} aria-controls={`${section.id}-list`} onClick={expand}>더보기<span className="remaining-count">{items.length-visible}</span><ChevronDown/></Button></div>}
    <output className="sr-only" aria-live="polite">{announcement}</output>
  </section>;
}
function MatchRow({match,selected,toggle}:{match:Match;selected:Selection[];toggle:(match:Match,m:number,p:number)=>void}) {
  const status=match.completed?'종료 · FINAL':match.state==='in'?match.statusDetail:'예정';
  function marketCell(m:number) {
    const market=match.markets[m];
    return <div className={`row-market ${market.picks.length===3?'three-way':''}`} aria-label={`${market.name} · ${market.rule}`} title={market.rule}>
      {market.picks.map((pick,p)=>{const id=`${match.id}-${m}-${p}`;return <Button key={id} className="odd" data-pick={id} aria-label={`${match.home.name} ${market.name}${market.line?' '+market.line:''} ${pick.label} ${priceText(pick.price)}${pick.locked?' 잠김':''}`} aria-pressed={selected.some(s=>s.id===id)} disabled={pick.locked} onClick={()=>toggle(match,m,p)}>
        <span className="pick-label">{pick.label}{m===1&&<small> {market.line}</small>}</span><span className="odd-value">{pick.locked?<LockKeyhole aria-label="잠김"/>:<Check className="pick-check" aria-hidden="true"/>}<strong className="num">{priceText(pick.price)}</strong></span>
      </Button>;})}
    </div>;
  }
  return <article className="match-row match-columns" data-match={match.id} data-state={match.state} aria-label={`${match.home.name} 대 ${match.away.name} · ${status}`}>
    <div className="row-time"><time dateTime={match.startUtc} title="한국 표준시 (KST)">{match.timeLabel}</time>{match.state==='in'&&<span className="live-label"><span className="live-dot"/>LIVE</span>}<span className={`row-status ${match.state==='in'?'in-play':''}`}>{status}</span></div>
    <div className="row-teams">{[match.home,match.away].map((team,index)=><div className="row-team" key={index}><SportsLogo src={team.logo} variant="team" alt={`${team.name} 로고`}/><strong title={`${team.name} · ${team.originalName}`}>{team.name}</strong><span className="row-score" aria-label={`${index===0?'홈':'원정'} ${match.score[index]}`}>{match.score[index]}</span></div>)}</div>
    {marketCell(0)}{marketCell(2)}{marketCell(1)}<span className="extra-markets" aria-label="추가 마켓 없음">—</span>
  </article>;
}
'''
s=s[:a]+new+s[b:]
s=s.replace('검색으로 카드가 숨겨져도','검색으로 경기가 숨겨져도')
p.write_text(s,encoding='utf-8')
# Split browser storage before opening the first SIRIUS preview.
p=root/'app/demo-data.ts';s=p.read_text(encoding='utf-8').replace("storageKey:'mercury-demo-r6-v1'","storageKey:'sirius-sports-r1-v1'");p.write_text(s,encoding='utf-8')
'''
'''
