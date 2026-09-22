'use client';

import {useEffect,useState} from 'react';
import {Check,History,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Dialog,DialogClose,DialogContent,DialogTitle} from '@/components/ui/dialog';
import {matches,priceText,selectionId,moneyText,DEMO,totalsFor,validateStake,type Match,type Selection,type Receipt} from './demo-data';
import {WogSurface,type Session,type Overlay} from './aldebaran-wog-r5';
import {ServiceView,serviceTitles} from './wog-service-views';
const initialSession:Session={loggedIn:false,balance:DEMO.initialBalance,history:[]};

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
  const [keep,setKeep]=useState(false);
  const [stake,setStake]=useState('');
  const [stakeTouched,setStakeTouched]=useState(false);
  const [session,setSession]=useState<Session>(initialSession);
  const [ready,setReady]=useState(false);
  const [storageError,setStorageError]=useState('');
  const [overlay,setOverlay]=useState<Overlay|null>(null);
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
    try {
      const stored=JSON.parse(localStorage.getItem(DEMO.storageKey+'-slip')??'null');
      if(stored?.keep===true){
        setKeep(true);
        const ids=new Set(Array.isArray(stored.ids)?stored.ids:[]),restored:Selection[]=[];
        for(const match of matches){if(match.completed)continue;let found=false;for(let m=0;m<match.markets.length&&!found;m++)for(let p=0;p<match.markets[m].picks.length;p++){const id=selectionId(match,m,p);if(ids.has(id)&&!match.markets[m].picks[p].locked){restored.push({id,matchId:match.id,marketIndex:m,pickIndex:p});found=true;break;}}}
        setSelected(restored);if(typeof stored.stake==='string')setStake(stored.stake);
      }
    } catch {setStorageError('저장된 슬립을 불러오지 못했습니다.');}
    setReady(true);
  },[]);
  useEffect(()=>{
    if(!ready)return;
    try {localStorage.setItem(DEMO.storageKey,JSON.stringify(session));}
    // oxlint-disable-next-line react/react-compiler -- Surface a failure reported by the external browser storage API.
    catch {setStorageError('내역을 저장하지 못했습니다. 새로고침 전에 내역을 확인해 주세요.');}
  },[session,ready]);
  useEffect(()=>{
    if(!ready)return;
    try {localStorage.setItem(DEMO.storageKey+'-slip',JSON.stringify(keep?{keep,ids:selected.map(s=>s.id),stake}:{keep:false}));}
    catch {setStorageError('슬립을 저장하지 못했습니다.');}
  },[ready,keep,selected,stake]);
  function toggle(match:Match,m:number,p:number) {
    if(match.completed||match.markets[m].picks[p].locked)return;
    const id=selectionId(match,m,p);
    setSelected(prev=>prev.some(s=>s.id===id)?prev.filter(s=>s.id!==id):[...prev.filter(s=>s.matchId!==match.id),{id,matchId:match.id,marketIndex:m,pickIndex:p}]);
  }
  function logout(){setSession(prev=>({...prev,loggedIn:false}));}
  const checked=validateStake(stake,session.balance);
  const total=totalsFor(selected,checked.value);
  function confirmExperience() {
    if(!session.loggedIn||!selected.length||checked.error)return;
    const receipt:Receipt={id:crypto.randomUUID(),createdAt:new Date().toISOString(),stake:checked.value,odds:total.rawOdds,potential:total.potential,picks:selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return {match:`${match.home.name} vs ${match.away.name}`,market:`${market.name} ${market.line||''} · ${market.rule}`,pick:pick.label,price:String(pick.price)};})};
    setSession(prev=>({...prev,balance:prev.balance-checked.value,history:[receipt,...prev.history].slice(0,DEMO.maxHistory)}));
    setSelected([]);setStake('');setStakeTouched(false);setOverlay({kind:'receipt',receipt});
  }
  function showOverlay(next:Overlay){if(next.kind==='account'){setSession(prev=>({...prev,loggedIn:true}));setOverlay(null);return;}setOverlay(next);}
  const overlayTitle=overlay?.kind==='view'?serviceTitles[overlay.view]??'이용 안내':overlay?.kind==='info'?overlay.title:overlay?.kind==='charge'?'충전':overlay?.kind==='withdraw'?'환전 안내':overlay?.kind==='history'?'내 베팅내역':overlay?.kind==='receipt'?'베팅이 완료되었습니다':'선택 내역 확인';
  return <><WogSurface selected={selected} toggle={toggle} session={session} open={showOverlay} logout={logout} stake={stake} setStake={setStake} stakeTouched={stakeTouched} setStakeTouched={setStakeTouched} remove={id=>setSelected(prev=>prev.filter(s=>s.id!==id))} clear={()=>setSelected([])} keep={keep} setKeep={setKeep} storageError={storageError}/>
  <Dialog open={!!overlay} onOpenChange={open=>{if(!open)setOverlay(null);}}><DialogContent className="demo-dialog" data-ab-surface="panel" showCloseButton={false} aria-describedby={undefined}><DialogClose render={<Button className="icon-button dialog-close" data-ab-control="secondary" aria-label="닫기"/>}><X/></DialogClose><DialogTitle>{overlayTitle}</DialogTitle>
    {overlay?.kind==='view'&&<ServiceView key={overlay.view} view={overlay.view} query={overlay.query} session={session} open={showOverlay} saveNickname={nickname=>setSession(prev=>({...prev,nickname}))}/>}
    {overlay?.kind==='info'&&<p className="dialog-copy">{overlay.body}</p>}
    {overlay?.kind==='charge'&&<><p className="dialog-copy">충전 후 보유 금액은 {moneyText(DEMO.initialBalance)}원입니다.</p><div className="dialog-total"><span>현재 보유 금액</span><strong>₩ {moneyText(session.balance)}</strong></div><Button className="btn gold" data-ab-control="primary" onClick={()=>{setSession(prev=>({...prev,balance:DEMO.initialBalance}));setOverlay({kind:'info',title:'충전 완료',body:'보유 금액이 1,000,000원으로 변경되었습니다.'});}}>충전하기</Button></>}
    {overlay?.kind==='withdraw'&&<><p className="dialog-copy">환전 문의는 고객센터 이용 안내를 확인해 주세요.</p><div className="dialog-total"><span>보유 금액</span><strong>₩ {moneyText(session.balance)}</strong></div><Button className="btn" data-ab-control="secondary" onClick={()=>setOverlay({kind:'view',view:'support'})}>이용 안내</Button></>}
    {overlay?.kind==='confirm'&&<><div className="confirm-picks">{selected.map(s=>{const match=matches.find(m=>m.id===s.matchId)!,market=match.markets[s.marketIndex],pick=market.picks[s.pickIndex];return <div key={s.id}><strong>{match.home.name} vs {match.away.name}</strong><span>{market.name} · {pick.label}<b>{priceText(pick.price)}</b></span></div>;})}</div><div className="dialog-total"><span>베팅 금액</span><strong>₩ {moneyText(checked.value)}</strong></div><div className="dialog-total"><span>총 배당 / 예상금액</span><strong>{total.displayOdds} / ₩ {moneyText(total.potential)}</strong></div><p className="dialog-copy">선택한 경기와 베팅 금액을 확인해 주세요.</p><Button className="btn gold" data-ab-control="primary" disabled={!session.loggedIn||!selected.length||!!checked.error} onClick={confirmExperience}>베팅 확인</Button></>}
    {overlay?.kind==='receipt'&&<><div className="receipt-success"><Check/><strong>베팅 완료</strong><span>{overlay.receipt.picks.length}경기 · ₩ {moneyText(overlay.receipt.stake)}</span></div><Button className="btn gold" data-ab-control="primary" onClick={()=>setOverlay({kind:'history'})}>내 베팅내역 보기</Button></>}
    {overlay?.kind==='history'&&<div className="history-list">{!session.history.length?<div className="history-empty"><History/><strong>베팅내역이 없습니다</strong><p>경기의 배당과 베팅 금액을 선택해 주세요.</p></div>:session.history.map(receipt=><article key={receipt.id}><div className="history-meta"><time>{new Date(receipt.createdAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}</time><span>베팅 내역</span></div>{receipt.picks.map((pick,i)=><div key={i} className="history-pick"><strong>{pick.match}</strong><span>{pick.market} · {pick.pick}<b>{priceText(pick.price)}</b></span></div>)}<div className="history-totals"><span>₩ {moneyText(receipt.stake)} × {priceText(receipt.odds)}</span><strong>예상 ₩ {moneyText(receipt.potential)}</strong></div></article>)}</div>}
  </DialogContent></Dialog>
  </>;
}
