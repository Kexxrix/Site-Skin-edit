const fs=require('fs'),path=require('path');const file=path.resolve(__dirname,'../../../site/app/page.tsx');let s=fs.readFileSync(file,'utf8');
function replace(a,b){if(!s.includes(a))throw Error('Missing source: '+a.slice(0,70));s=s.replaceAll(a,b);}
replace("{kind:'charge'|'withdraw'|'history'|'confirm'}","{kind:'account'|'charge'|'withdraw'|'history'|'confirm'}");
replace("body:label==='이벤트'?'스포츠 선택부터 체험내역 확인까지, MERCURY의 스포츠 데모를 자유롭게 둘러보세요. 이벤트 참여나 보상 지급은 제공하지 않습니다.':`${label} 전용 콘텐츠는 이 데모에 포함되어 있지 않습니다. 스포츠 화면의 대진과 배당을 선택해 체험하실 수 있습니다.`","body:label==='이벤트'?'이벤트 소식은 공지사항에서 확인하세요.':`${label} 서비스는 준비 중입니다.`");
const strings={
 '체험 회원':'회원','내 체험내역':'내 베팅내역','체험내역 열기':'베팅내역 보기','체험 금액':'베팅 금액','체험 예상금액':'예상 당첨금','선택 체험하기':'베팅하기','가상 로그인 후 체험할 수 있습니다.':'로그인 후 이용할 수 있습니다.','가상 로그아웃':'로그아웃','가상 로그인':'로그인','가상 잔액':'보유 금액',
 '스포츠 데모 이용 안내':'이용 안내','저장된 체험내역이 없습니다':'베팅내역이 없습니다','배당과 금액을 선택한 뒤 체험을 완료해 보세요.':'경기의 배당과 베팅 금액을 선택해 주세요.','체험 기록':'베팅 내역',
 '이전 저장 내용의 형식이 달라 기본 체험 상태로 시작합니다.':'이전 계정 정보를 불러오지 못했습니다.','브라우저 저장소를 읽을 수 없어 이번 화면에서만 체험합니다.':'계정 정보를 불러오지 못했습니다.','저장 공간을 사용할 수 없어 새로고침하면 체험내역이 사라질 수 있습니다.':'내역을 저장하지 못했습니다. 새로고침 전에 내역을 확인해 주세요.'
};for(const[a,b]of Object.entries(strings))replace(a,b);
replace("'확인 후 이 브라우저의 체험내역에 저장됩니다.'","'선택 내역과 금액을 확인해 주세요.'");
replace('>체험내역</button>','>베팅내역</button>');
replace("?'DEMO':'GUEST'","?'회원':'GUEST'");
replace("<small>{session.loggedIn?'개인정보 없는 가상 계정':'로그인으로 선택을 체험하세요'}</small>",'');
replace('<small>보유 금액 채우기</small>','');replace('<small>베팅 금액 안내</small>','');
replace("body:'실제 상담 전송은 제공하지 않습니다. 배당 선택, 금액 입력 또는 체험내역이 궁금하다면 왼쪽 스포츠 가이드를 확인해 주세요.'","body:serviceCopy.support");
replace("body:'베팅 금액은 1,000원부터 100,000원까지, 보유 금액 내에서 입력합니다. 총 배당은 중간 반올림 없이 곱하며 소수 3자리로 표시합니다. 예상금액은 입력액과 원래 배당 곱의 결과에서 1원 미만을 버립니다. 예: 10,000 × 1.84 × 1.56 = 28,704원. 결과 정산이나 실제 지급은 없습니다.'","body:serviceCopy.amount");
replace('<span className="promo-index">01—09</span>','<span className="promo-index">{matches.length} MATCHES</span>');
replace('<img src={item.logo} alt="" width="24" height="24"/>','<SportsLogo src={item.logo} role="menu"/>');
replace('<div className="left-footer"><strong>MERCURY</strong><span>SPORTS EXPERIENCE</span><p>이 브라우저에만 체험내역이 저장됩니다.<br/>개인정보 입력과 실제 거래는 없습니다.</p></div>','<div className="left-footer"><strong>MERCURY</strong></div>');
let lines=s.split('\n');lines=lines.flatMap(line=>{
 const t=line.trim();
 if(t.startsWith('<div className="noticebar">'))return ['    <div className="noticebar"><button onClick={()=>open({kind:\'info\',title:\'공지사항\',body:serviceCopy.notice})}><Bell/><b>NOTICE</b><span>{serviceCopy.notice}</span><ChevronRight/></button></div></>;'];
 if(t.startsWith('const overlayTitle='))return ["  function showOverlay(next:Overlay){if(next.kind==='account'){setSession(prev=>({...prev,loggedIn:true}));return;}setOverlay(next);}","  const overlayTitle=overlay?.kind==='info'?overlay.title:overlay?.kind==='charge'?'충전':overlay?.kind==='withdraw'?'환전 안내':overlay?.kind==='history'?'내 베팅내역':overlay?.kind==='receipt'?'베팅이 완료되었습니다':'선택 내역 확인';"];
 if(t.startsWith('{sections.map(section=>'))return ['    {sections.map(section=><MatchSection key={`${section.id}|${sport}|${normalized}`} section={section} items={filtered.filter(m=>m.section===section.id)} selected={selected} toggle={toggle} reset={resetSearch}/>)}'];
 if(t.startsWith('<footer className="main-footer">'))return ['    <footer className="main-footer"><span>MERCURY</span></footer>'];
 if(t.startsWith("{overlay?.kind==='account'"))return [];
 if(t.startsWith("{overlay?.kind==='source'"))return [];
 if(t.startsWith("{overlay?.kind==='charge'"))return ['    {overlay?.kind===\'charge\'&&<><p className="dialog-copy">충전 후 보유 금액은 {moneyText(DEMO.initialBalance)}원입니다.</p><div className="dialog-total"><span>현재 보유 금액</span><strong>₩ {moneyText(session.balance)}</strong></div><Button className="btn gold" onClick={()=>{setSession(prev=>({...prev,balance:DEMO.initialBalance}));setOverlay({kind:\'info\',title:\'충전 완료\',body:\'보유 금액이 1,000,000원으로 변경되었습니다.\'});}}>충전하기</Button></>}'];
 if(t.startsWith("{overlay?.kind==='withdraw'"))return ['    {overlay?.kind===\'withdraw\'&&<><p className="dialog-copy">환전 문의는 고객센터 이용 안내를 확인해 주세요.</p><div className="dialog-total"><span>보유 금액</span><strong>₩ {moneyText(session.balance)}</strong></div><Button className="btn" onClick={()=>setOverlay({kind:\'info\',title:\'고객센터\',body:serviceCopy.support})}>이용 안내</Button></>}'];
 if(t.startsWith("{overlay?.kind==='receipt'"))return ['    {overlay?.kind===\'receipt\'&&<><div className="receipt-success"><Check/><strong>베팅 완료</strong><span>{overlay.receipt.picks.length}경기 · ₩ {moneyText(overlay.receipt.stake)}</span></div><Button className="btn gold" onClick={()=>setOverlay({kind:\'history\'})}>내 베팅내역 보기</Button></>}'];
 return [line];
});s=lines.join('\n');
replace('open={setOverlay}','open={showOverlay}');
replace('<DialogDescription>실제 거래가 없는 MERCURY 스포츠 체험입니다.</DialogDescription>','');
replace('showCloseButton={false}>','showCloseButton={false} aria-describedby={undefined}>');
replace("body:'이 데모는 문의를 외부로 전송하거나 개인정보를 수집하지 않습니다. 배당 선택과 금액 계산은 왼쪽 스포츠 가이드에서 확인하실 수 있습니다.'","body:serviceCopy.support");
replace("body:'MERCURY 스포츠 체험 화면입니다. 로그인과 체험내역은 이 브라우저에만 저장됩니다. 최근 30개 체험내역을 보관하며 별도 결과 정산·보상·실제 거래는 없습니다.'","body:serviceCopy.notice");
replace('확인하면 보유 금액에서 베팅 금액을 차감하고 이 브라우저에 내역을 저장합니다. 실제 베팅이나 결과 정산은 이루어지지 않습니다.','선택한 경기와 베팅 금액을 확인해 주세요.');
replace('확인하고 체험내역 저장','베팅 확인');
fs.writeFileSync(file,s);
