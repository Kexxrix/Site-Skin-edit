'use client';

import {useEffect,useState} from 'react';
import {CalendarCheck,ChevronRight,Gamepad2,Headphones} from 'lucide-react';
import {matches,moneyText,DEMO} from './demo-data';
import {matchesQuery} from './wog-market-data';
import {casinoPhoto,slotsPhoto,type Session,type Open} from './aldebaran-wog-r5';

export const serviceTitles:Record<string,string>={inplay:'인플레이',esports:'E스포츠',account:'데모 계정 이용',profile:'내 정보',casino:'카지노 라운지',slots:'슬롯 라운지',minigame:'미니게임',virtual:'가상 스포츠',community:'자유게시판',results:'경기결과',notice:'공지사항',event:'이벤트게시판',attendance:'출석체크',support:'고객센터',rules:'이용규정',messages:'쪽지함',payback:'페이백',bonus:'보너스 전환','live-guide':'실시간 중계 안내',lineups:'스포츠 라인업','age-policy':'이용 연령 안내','domestic-search':'국내형 스포츠 검색 결과'};
const records={
  notice:[['2026.09.22','스포츠 화면 이용 안내','종목과 리그를 고른 뒤 경기의 배당을 선택하세요. 오른쪽 상세에서는 여러 기준점과 경기 구간을 비교할 수 있습니다. 같은 경기의 선택을 바꾸면 슬립의 기존 선택이 교체됩니다.'],['2026.09.21','계정 및 기록 보관 안내','로그인과 충전은 이 브라우저에서만 작동하는 데모입니다. 보유 금액과 베팅내역은 브라우저에 저장됩니다. 저장 공간을 지우면 기록도 사라집니다.'],['2026.09.20','점검 및 문의 안내','화면이 최신 상태로 보이지 않으면 새로고침해 주세요. 문의는 고객센터의 로컬 문의 보관 기능으로 작성할 수 있습니다. 외부 전송은 하지 않습니다.']],
  event:[['2026.09.22','매일 한 번, 출석 달력','출석체크에서 오늘 날짜를 체크해 보세요. 체크 기록은 이 브라우저에 저장됩니다. 금전성 보상이나 실제 포인트 지급은 없습니다.'],['2026.09.21','나만의 경기 조합','경기 목록과 상세의 배당을 비교하고 슬립의 예상 금액을 확인해 보세요. 실거래 없이 화면을 체험할 수 있습니다.']],
  community:[['2026.09.22','처음 이용하는 분들을 위한 슬립 팁','한 경기에서는 한 가지 선택을 담을 수 있어요. 같은 배당을 다시 누르면 해제되고, 다른 경기를 추가하면 조합 배당이 계산됩니다.'],['2026.09.21','어떤 종목을 즐겨 보시나요?','축구, 농구, 야구, 아이스하키의 로컬 경기 자료를 둘러보세요. 종목별 경기 수는 화면에 있는 실제 데이터 수와 연결됩니다.'],['2026.09.20','경기 상태 확인하기','예정 경기는 VS, 진행과 종료 경기는 수집된 점수를 표시합니다. 표시 일정은 데모 자료이며 실시간 중계를 의미하지 않습니다.']],
  messages:[['2026.09.22','ALDEBARAN에 오신 것을 환영합니다','스포츠 화면의 배당과 계정 기능을 체험해 보세요. 이 쪽지는 데모 안내이며 실제 수신 메시지가 아닙니다.'],['2026.09.21','슬립 유지 기능 안내','슬립 유지를 켜면 새로고침 후에도 선택과 금액을 복원합니다. 전체삭제는 선택만 비웁니다. 공유 기기에서는 사용 후 슬립 유지를 꺼 주세요.']],
};

function RecordList({kind}:{kind:keyof typeof records}){
  const [current,setCurrent]=useState<number|null>(null);
  return <div className="ab5-service-records">{records[kind].map(([date,title,body],i)=><article key={title}><button aria-expanded={current===i} onClick={()=>setCurrent(current===i?null:i)}><span><small>{date} · ALDEBARAN</small><strong>{title}</strong></span><ChevronRight/></button>{current===i&&<p>{body}</p>}</article>)}</div>;
}
function Attendance(){
  const [now]=useState(()=>new Date()),[days,setDays]=useState<string[]>([]),[message,setMessage]=useState('');
  const month=now.toLocaleDateString('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit'}),today=now.toLocaleDateString('en-CA',{timeZone:'Asia/Seoul'});
  const [year,nmonth]=month.split('-').map(Number),count=new Date(year,nmonth,0).getDate(),offset=new Date(year,nmonth-1,1).getDay();
  useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(DEMO.storageKey+'-attendance')??'[]');if(Array.isArray(saved))setDays(saved.filter((d:unknown)=>typeof d==='string'));}catch{setMessage('기존 출석 기록을 읽지 못했습니다.');}},[]);
  function check(){const next=[...new Set([...days,today])];try{localStorage.setItem(DEMO.storageKey+'-attendance',JSON.stringify(next));setDays(next);setMessage('오늘 출석을 기록했습니다.');}catch{setMessage('브라우저 저장 공간을 확인해 주세요.');}}
  return <div className="ab5-attendance"><h3>{year}년 {nmonth}월</h3><p>하루 한 번 출석을 기록하세요. 금전성 보상은 없습니다.</p><div className="ab5-calendar">{'일월화수목금토'.split('').map(d=><b key={d}>{d}</b>)}{Array.from({length:offset},(_,i)=><span key={'blank'+i}/>)}{Array.from({length:count},(_,i)=>{const date=`${month}-${String(i+1).padStart(2,'0')}`;return <span key={date} data-today={date===today} data-checked={days.includes(date)}>{i+1}{days.includes(date)&&<CalendarCheck/>}</span>;})}</div><button className="ab5-service-primary" disabled={days.includes(today)} onClick={check}>{days.includes(today)?'오늘 출석 완료':'오늘 출석하기'}</button><output aria-live="polite">{message}</output></div>;
}
function Support(){
  const [subject,setSubject]=useState('이용 문의'),[body,setBody]=useState(''),[saved,setSaved]=useState<{subject:string;body:string;date:string}[]>([]),[message,setMessage]=useState('');
  useEffect(()=>{try{const value=JSON.parse(localStorage.getItem(DEMO.storageKey+'-inquiries')??'[]');if(Array.isArray(value))setSaved(value.filter(v=>typeof v.subject==='string'&&typeof v.body==='string'&&typeof v.date==='string'));}catch{setMessage('보관된 문의를 읽지 못했습니다.');}},[]);
  return <div className="ab5-support-view"><p><Headphones/>계정, 슬립, 경기 화면 이용에 관한 문의를 작성하세요. 이 문의는 현재 브라우저에만 보관되며 외부 상담원에게 전송되지 않습니다.</p><form onSubmit={e=>{e.preventDefault();if(!body.trim())return;const next=[{subject,body:body.trim(),date:new Date().toLocaleString('ko-KR')},...saved].slice(0,20);try{localStorage.setItem(DEMO.storageKey+'-inquiries',JSON.stringify(next));setSaved(next);setBody('');setMessage('문의 내용을 이 브라우저에 보관했습니다.');}catch{setMessage('저장 공간을 확인해 주세요.');}}}><label>문의 유형<select value={subject} onChange={e=>setSubject(e.target.value)}><option>이용 문의</option><option>계정 문의</option><option>배당·슬립 문의</option><option>제휴 안내 문의</option></select></label><label>문의 내용<textarea required maxLength={1000} value={body} onChange={e=>setBody(e.target.value)} placeholder="개인정보를 제외하고 내용을 적어 주세요."/></label><button className="ab5-service-primary" type="submit">로컬 문의 보관</button></form><output aria-live="polite">{message}</output><h3>보관된 문의</h3>{!saved.length?<p>작성한 문의가 없습니다.</p>:saved.map((v,i)=><article key={i}><strong>{v.subject}</strong><small>{v.date}</small><p>{v.body}</p></article>)}</div>;
}
function Lobby({kind}:{kind:'casino'|'slots'|'minigame'|'virtual'}){
  const [chosen,setChosen]=useState('');
  const items=kind==='casino'?['라이브 바카라','블랙잭','룰렛']:kind==='slots'?['클래식 릴','프루트 릴','다이아몬드 릴']:kind==='minigame'?['주사위','홀짝','카드 하이로우']:['가상 축구','가상 농구','가상 레이싱'];
  return <div className="ab5-lobby"><p>종류별 게임 방식을 둘러보세요. 실제 게임 서버나 금전 거래에는 연결되지 않습니다.</p><div className="ab5-lobby-grid">{items.map((item,i)=><button key={item} aria-pressed={chosen===item} onClick={()=>setChosen(item)}>{kind==='casino'||kind==='slots'?<img src={kind==='casino'?casinoPhoto:slotsPhoto} alt="" style={{objectPosition:`${25+i*25}% center`}}/>:<Gamepad2/>}<strong>{item}</strong><span>게임 안내 보기</span></button>)}</div>{chosen&&<article><h3>{chosen}</h3><p>{kind==='casino'?'테이블에서 진행되는 카드 또는 숫자 게임입니다. 바카라는 두 패의 합, 블랙잭은 21에 가까운 패, 룰렛은 선택한 숫자와 구간으로 결과를 비교합니다.':kind==='slots'?'릴의 심볼 조합을 확인하는 게임입니다. 릴 수와 지급 조합은 게임별 안내에서 확인하며, 현재는 분류 미리보기만 제공합니다.':kind==='minigame'?'짧은 라운드마다 결과를 확인하는 게임 종류입니다. 현재 화면에서는 규칙과 게임 분류를 살펴볼 수 있습니다.':'시뮬레이션으로 진행되는 스포츠 경기 분류입니다. 실제 스포츠 일정과 분리되며, 현재 가상 경기 피드는 연결되어 있지 않습니다.'}</p><p>이 라운지는 로컬 미리보기이며 플레이 또는 베팅을 실행하지 않습니다.</p></article>}</div>;
}
export function ServiceView({view,query='',session,open,saveNickname}:{view:string;query?:string;session:Session;open:Open;saveNickname:(name:string)=>void}){
  const [nickname,setNickname]=useState(session.nickname??'ALDEBARAN 회원'),[message,setMessage]=useState('');
  if(view in records)return <RecordList kind={view as keyof typeof records}/>;
  if(view==='attendance')return <Attendance/>;
  if(view==='support')return <Support/>;
  if(['casino','slots','minigame','virtual'].includes(view))return <Lobby kind={view as 'casino'|'slots'|'minigame'|'virtual'}/>;
  if(view==='account')return <div className="ab5-service-copy"><h3>ALDEBARAN 데모 계정</h3><p>별도의 개인정보 입력 없이 데모 계정으로 접속합니다. 현재 보유 금액과 내역을 그대로 유지합니다.</p><dl><dt>보유 금액</dt><dd>{moneyText(session.balance)}원</dd><dt>보관된 내역</dt><dd>{session.history.length}건</dd></dl><button className="ab5-service-primary" onClick={()=>open({kind:'account'})}>데모 계정으로 접속</button></div>;
  if(view==='profile')return <form className="ab5-service-copy" onSubmit={e=>{e.preventDefault();if(nickname.trim()){saveNickname(nickname.trim());setMessage('표시 이름을 저장했습니다.');}}}><p>현재 브라우저의 데모 표시 이름을 변경합니다.</p><label>표시 이름<input maxLength={16} required value={nickname} onChange={e=>setNickname(e.target.value)}/></label><p>계정 상태: {session.loggedIn?'데모 로그인':'방문자'} · 보유 금액 {moneyText(session.balance)}원</p><button className="ab5-service-primary" type="submit">정보 저장</button><output>{message}</output></form>;
  if(view==='results'||view==='domestic-search'||view==='lineups'||view==='live-guide'||view==='inplay'||view==='esports'){
    const items=matches.filter(m=>view==='results'?m.completed:view==='domestic-search'?m.state==='pre'&&!m.completed&&matchesQuery(m,query):view==='live-guide'||view==='inplay'?m.state==='in':view==='esports'?m.sport==='esports':true);
    return <div className="ab5-service-scoreboard"><p>{view==='results'?'같은 경기 자료에 저장된 종료 결과입니다.':view==='domestic-search'?`국내형 목록의 검색 결과 ${items.length}경기 · ${query||'전체'}`:view==='esports'?'등록된 E스포츠 경기입니다.':view==='live-guide'||view==='inplay'?'진행 상태가 기록된 경기입니다. 실제 영상 중계 링크는 연결되어 있지 않습니다.':'팀별 경기 편성입니다. 공식 선수 명단이 없는 데모 자료이므로 선수 라인업은 제공하지 않습니다.'}</p>{!items.length?<p>해당 조건의 경기가 없습니다.</p>:items.map(m=><article key={m.id}><small>{m.league} · {m.timeLabel}</small><strong>{m.home.name} <b>{m.state==='pre'?'VS':m.score.join(' : ')}</b> {m.away.name}</strong><span>{m.state==='pre'?'예정':m.completed?'종료':m.statusDetail}</span></article>)}</div>;
  }
  if(view==='bonus'||view==='payback')return <div className="ab5-service-copy"><h3>{view==='bonus'?'보너스 전환 내역':'페이백 내역'}</h3><dl><dt>전환 가능한 보너스</dt><dd>0원</dd><dt>지급 가능한 페이백</dt><dd>0원</dd></dl><p>현재 데모에는 지급된 보너스와 정산된 손익이 없습니다. 베팅 기록은 예상 금액만 보관하며 적중 정산이나 실제 지급을 처리하지 않습니다.</p><button className="ab5-service-primary" onClick={()=>open({kind:'history'})}>내 베팅내역 확인</button></div>;
  return <div className="ab5-service-copy">{(view==='age-policy'?[['이용 연령','이 화면은 만 19세 이상을 대상으로 한 스포츠 UI 데모입니다. 미성년자는 이용할 수 없습니다.'],['책임 있는 이용','실제 자금이나 개인정보를 입력하지 마세요. 이용 시간을 정하고 무리한 금액 추정이나 과도한 이용을 피하세요.']]:[['데모 서비스의 범위','경기 일정과 점수는 수집된 자료이며 실시간 피드가 아닙니다. 추가 배당은 로컬 데모 데이터입니다.'],['선택 및 계산','한 경기당 한 선택을 유지합니다. 동일 배당을 다시 누르면 해제됩니다. 배당은 정밀 곱셈 후 소수 2자리, 예상 당첨금은 1원 미만 버림으로 표시됩니다.'],['이용 한도',`한 번의 데모 베팅은 ${moneyText(DEMO.minStake)}원부터 ${moneyText(DEMO.maxStake)}원까지이며 보유 금액을 초과할 수 없습니다.`],['기록과 개인정보','계정, 출석, 문의, 슬립 유지 기록은 현재 브라우저에만 저장됩니다. 외부 결제·송금·문의 전송은 이루어지지 않습니다.']]).map(([title,body])=><section key={title}><h3>{title}</h3><p>{body}</p></section>)}</div>;
}
