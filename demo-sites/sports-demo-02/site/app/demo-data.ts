import records from './match-records.json';
import sports from './sport-menu.json';
import progressSnapshots from './live-snapshots.json';

export type Pick = { label: string; price: number; locked?: boolean };
export type Market = { name: string; rule: string; line?: string; picks: Pick[] };
export type Match = typeof records[number] & { markets: Market[] };
export type Selection = { id: string; matchId: string; marketIndex: number; pickIndex: number };
const sportImage = (sport:string) => sport==='esports'?'/sports/r8/mercury-esports.png':`/sports/sirius-r5/${sport==='hockey'?'ice-hockey':sport}.png`;
export const sportMenu = sports.map(s=>({...s,logo:s.logo?sportImage(s.id):null}));
const prices = [[1.84,2.10],[1.56,2.43],[1.82,2.06],[1.08,8.20],[1.78,2.14],[1.32,4.80,7.10],[3.15,3.50,2.125],[2.15,3.45,3.10],[1.88,3.65,3.90]];
const totals = ['8.5','218.5','5.5','169.5','48.5','3.5','2.5','2.5','2.5'];
const handicaps = ['1.5','3.5','1.5','15.5','2.5','1.5','0.5','0.5','0.5'];
export const matches: Match[] = records.map((record,i)=>{
  const football = record.sport==='soccer';
  const rule = football?'정규시간 90분':'연장 포함';
  const template=i<9?i:football?5+(i%4):record.sport==='baseball'?0:record.leagueKey==='wnba'?3:record.sport==='basketball'?1:record.sport==='hockey'?2:4;
  const snapshot=(progressSnapshots as Record<string,Partial<Match>>)[record.id];
  return {...record,...snapshot,sportLogo:sportImage(record.sport),markets:[
    {name:football?'승무패':'승패',rule:record.sport==='american-football'?'연장 포함 · 무승부 반환':rule,picks:football?[{label:'홈',price:prices[template][0]},{label:'무',price:prices[template][1]},{label:'원정',price:prices[template][2]}]:[{label:'홈',price:prices[template][0]},{label:'원정',price:prices[template][1]}]},
    {name:'오버 / 언더',rule,line:totals[template],picks:[{label:'오버',price:1.91},{label:'언더',price:1.87}]},
    {name:record.sport==='baseball'?'런 핸디캡':record.sport==='hockey'?'퍽 핸디캡':'핸디캡',rule,line:`홈 −${handicaps[template]}`,picks:[{label:`홈 −${handicaps[template]}`,price:1.78},{label:`원정 +${handicaps[template]}`,price:2.03,locked:i===0}]},
  ]};
}).sort((a,b)=>Number(b.state==='in')-Number(a.state==='in'));
export const sections = [
  {id:'live',title:'실시간 스포츠',english:'LIVE SPORTS'},
  {id:'soon',title:'국내형 스포츠',english:'DOMESTIC SPORTS'},
  {id:'popular',title:'인기경기',english:'POPULAR MATCH'},
];
export const priceText = (n:number) => n.toFixed(Number(n.toFixed(2))===n?2:3);
export const moneyText = (n:number|string) => Number(n).toLocaleString('ko-KR');
export const DEMO = {initialBalance:1000000,minStake:1000,maxStake:100000,maxHistory:30,storageKey:'sirius-sports-r1-v1'};
export type Receipt = {id:string;createdAt:string;stake:number;odds:string;potential:string;picks:{match:string;market:string;pick:string;price:string}[]};

// Keep decimal odds integer-scaled through the final display and won truncation.
export function totalsFor(selected:Selection[],stake:number) {
  let numerator=BigInt(1),denominator=BigInt(1);
  for(const selection of selected) {
    const price=matches.find(m=>m.id===selection.matchId)!.markets[selection.marketIndex].picks[selection.pickIndex].price;
    const text=String(price),digits=text.split('.')[1]?.length||0;
    numerator*=BigInt(text.replace('.',''));
    denominator*=BigInt(10)**BigInt(digits);
  }
  const rounded=(numerator*BigInt(1000)+denominator/BigInt(2))/denominator;
  const odds=selected.length?`${rounded/BigInt(1000)}.${String(rounded%BigInt(1000)).padStart(3,'0')}`:'0.000';
  const potential=selected.length?(BigInt(stake)*numerator/denominator).toString():'0';
  return {odds,potential};
}

export function validateStake(raw:string,balance:number) {
  if(!raw.trim())return {value:0,error:'금액을 입력해 주세요.'};
  if(!/^\d+$/.test(raw))return {value:0,error:'숫자로 된 정수 금액만 입력해 주세요.'};
  const value=Number(raw);
  if(!Number.isSafeInteger(value)||value>DEMO.maxStake)return {value:0,error:`한 번에 최대 ${moneyText(DEMO.maxStake)}원까지 가능합니다.`};
  if(value<DEMO.minStake)return {value:0,error:`최소 ${moneyText(DEMO.minStake)}원을 입력해 주세요.`};
  if(value>balance)return {value:0,error:'보유 금액보다 큰 금액입니다.'};
  return {value,error:''};
}


