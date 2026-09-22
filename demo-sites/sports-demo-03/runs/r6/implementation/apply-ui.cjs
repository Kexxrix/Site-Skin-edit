const fs=require('fs');
function edit(file,change){const old=fs.readFileSync(file,'utf8');const next=change(old);if(next===old)throw Error('No change '+file);fs.writeFileSync(file,next);}
function replace(s,a,b){if(!s.includes(a))throw Error('Missing: '+a.slice(0,100));return s.replace(a,b);}
edit('app/aldebaran-wog-r5.tsx',s=>{
  s=replace(s,'className="ab5-menu-item" aria-current={mode===id?\'page\':undefined} onClick={()=>navigate(id)}',`className="ab5-menu-item" aria-current={mode===id?'page':undefined} disabled={id!=='domestic'&&id!=='european'} onClick={()=>{if(id==='domestic'||id==='european')navigate(id);}}`);
  const from=s.indexOf('        <section className="ab5-rail-card ab5-search-card"'),to=s.indexOf('\n        <section',from);
  s=s.slice(0,from)+`        <section className="ab5-rail-card ab5-search-card" aria-label="스포츠 검색">{(['european','domestic'] as const).map(target=><form key={target} className="ab5-search-row" onSubmit={e=>{e.preventDefault();navigate(target);}}><input aria-label={target==='european'?'해외형 스포츠 검색':'국내형 스포츠 검색'} placeholder={target==='european'?'해외형 스포츠 검색 (국가/리그명/팀명)':'국내형 스포츠 검색 (국가/리그명/팀명)'} value={listFilters[target].query} onChange={e=>{updateFilters({query:e.target.value},target);navigate(target);}}/>{listFilters[target].query?<button aria-label={target==='european'?'해외형 검색어 지우기':'국내형 검색어 지우기'} type="button" onClick={()=>{updateFilters({query:''},target);navigate(target);}}><X/></button>:<button aria-label={target==='european'?'해외형 검색 결과':'국내형 검색 결과'} type="submit"><Search/></button>}</form>)}</section>`+s.slice(to);
  s=replace(s,'{matches.slice(0,5).map','{prematchMatches.slice(0,5).map');
  s=replace(s,"aria-label={mode==='domestic'?'국내형 스포츠':mode==='inplay'?'인플레이':'해외형 스포츠'}", "data-mode={mode} aria-label={mode==='domestic'?'국내형 스포츠':'해외형 스포츠'}");
  s=replace(s,'className="ab5-center-grid"','className={`ab5-center-grid ${mode===\'domestic\'?\'ab5-domestic\':\'\'}`}');
  s=replace(s,'inspected={m.id===match?.id} inspect=',"inspected={m.id===match?.id} detailEntry={mode==='european'} inspect=");
  s=replace(s,"onClick={()=>navigate('european')}>검색·필터 초기화", "onClick={()=>updateFilters({query:'',sport:'all',league:''})}>검색·필터 초기화");
  s=replace(s,'        <section className="ab5-pane" aria-label="선택 경기 세부 베팅"', "        {mode==='european'&&<section className=\"ab5-pane\" aria-label=\"선택 경기 세부 베팅\"");
  s=replace(s,"{match.state==='pre'?match.timeLabel:`${match.score[0]} : ${match.score[1]} · ${match.state==='in'?match.statusDetail:'종료'}`}",'{match.timeLabel}');
  s=replace(s,'</div></div></section>\n      </div></div></main>','</div></div></section>}\n      </div></div></main>');
  return replace(s,'<Slip {...props}/>','<Slip {...props} mode={mode}/>');
});
edit('app/aldebaran-wog-r5.css',s=>{
  s=replace(s,'.ab5-brand img { width: 182px; height: auto; display: block; object-fit: contain; }','.ab5-brand img { width: 182px; height: auto; display: block; object-fit: contain; flex-shrink: 0; position: relative; }');
  s=replace(s,'grid-template-columns: minmax(0,1fr) 120px minmax(0,1fr)','grid-template-columns: minmax(0,1fr) 56px minmax(0,1fr)');
  s=replace(s,'gap: 6px; font-size: 13px; font-weight: 900; line-height: 19.5px;','gap: 8px; font-size: 15px; font-weight: 900; line-height: 22px;');
  s=replace(s,'.ab5-brand {border:0;background:#242424;clip-path:polygon(0 0,100% 0,87% 100%,0 100%);border-bottom:1px solid var(--ab5-accent);}',`.ab5-brand {border:0;background:transparent;}
.ab5-brand::before {content:"";position:absolute;inset:0;background:#242424;clip-path:polygon(0 0,100% 0,87% 100%,0 100%);border-bottom:1px solid var(--ab5-accent);pointer-events:none;}`);
  s=replace(s,'.ab5-team>svg {width:13px;height:13px;color:var(--ab5-muted);}\n.ab5-card-inspect {padding-top:6px;}\n.ab5-live-status {font-size:10px;line-height:13px;bottom:calc(100% - 3px);color:var(--ab5-muted);}',`.ab5-team-emblem {width:28px;height:28px;object-fit:contain;flex-shrink:0;}
.ab5-team-initials {display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--ab5-line);border-radius:50%;font-size:11px;}
.ab5-domestic {grid-template-columns:1fr;}
.ab5-domestic .ab5-sport-tabs {width:587px;}
.ab5-domestic .ab5-event-list {display:grid;grid-template-columns:repeat(2,587px);column-gap:30px;row-gap:8px;}`);
  return replace(s,'.ab5-live-status { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 12px; font-weight: 700; line-height: 14px; }\n','');
});
edit('app/page.tsx',s=>s.replace('price:priceText(pick.price)','price:String(pick.price)').replace('{total.odds} /','{total.displayOdds} /').replace('<b>{pick.price}</b>','<b>{priceText(pick.price)}</b>').replace('× {receipt.odds}','× {priceText(receipt.odds)}'));
edit('app/wog-service-views.tsx',s=>s.replace("={account:","={inplay:'인플레이',esports:'E스포츠',account:").replace("view==='results'||view==='domestic-search'||view==='lineups'||view==='live-guide'","view==='results'||view==='domestic-search'||view==='lineups'||view==='live-guide'||view==='inplay'||view==='esports'").replace("m.section==='soon'&&matchesQuery(m,query):view==='live-guide'?m.state==='in':true","m.state==='pre'&&!m.completed&&matchesQuery(m,query):view==='live-guide'||view==='inplay'?m.state==='in':view==='esports'?m.sport==='esports':true").replace("view==='live-guide'?'진행", "view==='esports'?'등록된 E스포츠 경기입니다.':view==='live-guide'||view==='inplay'?'진행").replace('소수 3자리','소수 2자리'));
console.log('R6 UI changes applied.');
