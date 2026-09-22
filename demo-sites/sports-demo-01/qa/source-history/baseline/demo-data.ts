export type Pick = { label: string; price: number; trend?: 'up' | 'down'; locked?: boolean };
export type Market = { name: string; line?: string; picks: Pick[] };
export type Match = { id: string; sport: 'football' | 'basketball' | 'baseball'; league: string; state: string; home: string; away: string; codes: [string,string]; score: [string,string]; markets: Market[] };
export type Selection = { id: string; matchId: string; marketIndex: number; pickIndex: number };
export const matches: Match[] = [
  { id:'live-1', sport:'football', league:'K리그 1', state:'후반 62:18', home:'서울 유나이티드', away:'부산 애슬레틱', codes:['SEO','BUS'], score:['2','1'], markets:[
    {name:'승무패', picks:[{label:'홈',price:1.84,trend:'up'},{label:'무',price:3.25},{label:'원정',price:4.10,trend:'down'}]},
    {name:'오버 / 언더',line:'3.5',picks:[{label:'오버',price:1.91},{label:'언더',price:1.87}]},
    {name:'아시안 핸디캡',line:'홈 −0.5',picks:[{label:'홈 −0.5',price:1.78,trend:'down'},{label:'원정 +0.5',price:2.03,locked:true}]}
  ]},
  { id:'live-2', sport:'basketball', league:'코리아 농구 리그', state:'3쿼터 · 06:18', home:'인천 블랙팔콘스', away:'대전 골든나이츠', codes:['INC','DAE'], score:['68','66'], markets:[
    {name:'승패 · 연장 포함',picks:[{label:'홈',price:1.56,trend:'up'},{label:'원정',price:2.43}]},
    {name:'오버 / 언더',line:'158.5',picks:[{label:'오버',price:1.79,trend:'down'},{label:'언더',price:1.92}]},
    {name:'핸디캡',line:'홈 −3.5',picks:[{label:'홈 −3.5',price:1.87},{label:'원정 +3.5',price:1.88}]}
  ]},
  { id:'live-3', sport:'football', league:'유럽 클럽 챔피언십', state:'전반 38:42', home:'노스런던 인터내셔널 유나이티드', away:'웨스트브리지 애슬레틱 클럽', codes:['NLU','WBA'], score:['0','0'], markets:[
    {name:'승무패',picks:[{label:'홈',price:2.125},{label:'무',price:3.05},{label:'원정',price:3.40}]},
    {name:'오버 / 언더',line:'2.5',picks:[{label:'오버',price:2.14,locked:true},{label:'언더',price:1.68,trend:'up'}]},
    {name:'아시안 핸디캡',line:'홈 −0.5',picks:[{label:'홈 −0.5',price:2.18},{label:'원정 +0.5',price:1.71,trend:'down'}]}
  ]},
  { id:'soon-1', sport:'baseball', league:'코리아 베이스볼', state:'오늘 18:30 · 마감 12분 전', home:'수원 이글스', away:'광주 타이거스', codes:['SUW','GWJ'], score:['–','–'], markets:[
    {name:'승패 · 연장 포함',picks:[{label:'홈',price:1.71},{label:'원정',price:2.14}]},
    {name:'오버 / 언더',line:'8.5',picks:[{label:'오버',price:1.96},{label:'언더',price:1.83}]},
    {name:'런 핸디캡',line:'홈 −1.5',picks:[{label:'홈 −1.5',price:1.95},{label:'원정 +1.5',price:1.78}]}
  ]},
  { id:'popular-1', sport:'football', league:'프리미어 디비전', state:'내일 04:00', home:'맨체스터 로열스', away:'런던 시티', codes:['MCR','LDN'], score:['–','–'], markets:[
    {name:'승무패',picks:[{label:'홈',price:1.62},{label:'무',price:3.65},{label:'원정',price:4.20}]},
    {name:'오버 / 언더',line:'2.5',picks:[{label:'오버',price:1.93},{label:'언더',price:1.85}]},
    {name:'아시안 핸디캡',line:'홈 −0.5',picks:[{label:'홈 −0.5',price:1.86},{label:'원정 +0.5',price:1.99}]}
  ]}
];
export const sections = [
  {id:'live', title:'실시간 스포츠', english:'LIVE SPORTS', caption:'지금 진행 중인 경기', matchIds:['live-1','live-2','live-3']},
  {id:'soon', title:'마감임박', english:'CLOSING SOON', caption:'시작 전 마지막 선택', matchIds:['soon-1']},
  {id:'popular', title:'인기경기', english:'POPULAR MATCH', caption:'주목받는 매치업', matchIds:['popular-1']}
];
export const priceText = (value:number) => value.toFixed(Number(value.toFixed(2)) === value ? 2 : 3);


