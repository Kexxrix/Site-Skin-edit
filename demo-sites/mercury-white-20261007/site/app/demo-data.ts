import records from './match-records.json';
import sports from './sport-menu.json';
import progressSnapshots from './live-snapshots.json';
import fixedOdds from './prematch-r15.json';
export type Pick = { label: string; price: number; priceCents?:number; locked?: boolean; key?:string };
export type Market = { name: string; rule: string; line?: string; picks: Pick[]; key?:string; source?:'local-demo'; group?:string; category?:'result'|'handicap'|'totals'|'other'; canonicalId?:string; templateId?:string; period?:string; settlementScope?:string; subjectId?:string; status?:'active'; variant?:string };
export type Match = typeof records[number] & { markets: Market[]; sourceKind?:string; datasetVersion?:string };
export type Selection = { id: string; matchId: string; marketIndex: number; pickIndex: number; sourceKind?:string; datasetVersion?:string };

const sportImage=(sport:string)=>'/sports/r8/mercury-'+(sport==='hockey'?'ice-hockey':sport)+'.png';
export const sportIcons:Record<string,string>=Object.fromEntries(sports.map(s=>[s.id,sportImage(s.id)]));
Object.assign(sportIcons,{
  all:'/sports/sirius-20261001/imgi_23_all.png',
  soccer:'/sports/sirius-20261001/imgi_11_soccer.png',
  basketball:'/sports/sirius-20261001/imgi_12_basketball.png',
  baseball:'/sports/sirius-20261001/imgi_13_baseball.png',
  volleyball:'/sports/sirius-20261001/imgi_14_volleyball.png',
  hockey:'/sports/sirius-20261001/imgi_15_hockey.png',
  formula1:'/sports/sirius-20261001/imgi_16_formula1.png',
  boxing:'/sports/sirius-20261001/imgi_17_boxing.png',
  mma:'/sports/sirius-20261001/imgi_18_mma.png',
  motorsports:'/sports/sirius-20261001/imgi_19_motorsports.png',
});
export const sportMenu=[
  ...['all','soccer','basketball','baseball','volleyball','hockey'].map(id=>({...sports.find(s=>s.id===id)!,logo:sportIcons[id]})),
  ...[['formula1','포뮬라1'],['boxing','복싱'],['mma','MMA'],['motorsports','모터스포츠']].map(([id,name])=>({id,name,logo:sportIcons[id]})),
];
const fixedFixtures=fixedOdds.fixtures as Record<string,{sport:string;markets:Market[]}>;
/** Same active prematch set and fixed markets as ALDEBARAN; original records remain intact. */
export const matches:Match[]=[...records.filter(record=>record.sport!=='american-football'),...fixedOdds.baseballFixtures]
  .map(record=>({...record,...(progressSnapshots as Record<string,Partial<Match>>)[record.id]} as Match))
  .filter(record=>record.state==='pre'&&!record.completed)
  .map(record=>{
    const fixed=fixedFixtures[record.id];
    if(!fixed||fixed.sport!==record.sport)throw new Error('Missing fixed prematch odds: '+record.id);
    return {...record,sportLogo:sportIcons[record.sport],sourceKind:fixedOdds.sourceKind,datasetVersion:fixedOdds.datasetVersion,markets:fixed.markets};
  });
const oddsFormatter=new Intl.NumberFormat('en-US',{useGrouping:false,minimumFractionDigits:2,maximumFractionDigits:2});
export function priceText(value:number|string|bigint,denominator=BigInt(1)):string {
  if(typeof value==='bigint') {
    if(value<BigInt(0)||denominator<=BigInt(0))return '—';
    const rounded=(value*BigInt(100)+denominator/BigInt(2))/denominator;
    return `${rounded/BigInt(100)}.${String(rounded%BigInt(100)).padStart(2,'0')}`;
  }
  if(typeof value==='string') {
    const decimal=value.match(/^(\d+)(?:\.(\d+))?$/);
    return decimal?priceText(BigInt(decimal[1]+(decimal[2]??'')),BigInt(10)**BigInt(decimal[2]?.length??0)):'—';
  }
  return typeof value==='number'&&Number.isFinite(value)&&value>=0?oddsFormatter.format(value):'—';
}
export const selectionId=(match:Match,m:number,p:number)=>match.markets[m].key?`${match.id}:${match.sport}:${match.markets[m].key}:${match.markets[m].line??'none'}:${match.markets[m].picks[p].key}`:`${match.id}-${m}-${p}`;
export const moneyText = (n:number|string) => Number(n).toLocaleString('ko-KR');
export const DEMO = {initialBalance:1000000,minStake:1000,maxStake:100000,maxHistory:30,storageKey:'mercury-demo-r6-v1'};
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
  return {odds,displayOdds:selected.length?priceText(numerator,denominator):priceText(0),potential};
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


