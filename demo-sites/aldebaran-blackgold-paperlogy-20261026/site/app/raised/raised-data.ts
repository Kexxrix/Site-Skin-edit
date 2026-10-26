import figmaAssets from './figma-assets.json';
export const images = figmaAssets.images;

export const menuGroups = [
  {title:'서비스',items:[['입금신청','\uf019'],['출금신청','\uf093'],['마이페이지','\uf007'],['문의하기','\uf590'],['쪽지','\uf0e0']]},
  {title:'스포츠',items:[['국내형','\uf024'],['해외형','\uf0ac'],['E스포츠','\uf11b'],['인플레이','\uf7c0']]},
  {title:'게임',items:[['라이브카지노','\uf522'],['슬롯','\uf0e7']]},
  {title:'게시판',items:[['공지사항','\uf0a1'],['이벤트','\uf06b'],['베팅규정','\uf15c']]},
];

export const matches = [
  {id:'bayern',time:'09.19 03:30',league:'분데스리가',count:'111+',home:'바이에른 뮌헨',away:'우니온 베를린',homeLogo:images.imgHomeLogo,awayLogo:images.imgAwayLogo,result:['1.31','5.82','9.01'],handicap:['1.90','홈 −1.5','1.93'],handicapName:'핸디캡',total:['1.61','3.5','2.37']},
  {id:'raptors',time:'10.04 08:00',league:'NBA 프리시즌',count:'80+',home:'토론토 랩터스',away:'마이애미 히트',homeLogo:images.imgHomeLogo1,awayLogo:images.imgAwayLogo1,result:['1.56','2.48'],handicap:['1.89','홈 −3.5','1.94'],handicapName:'핸디캡',total:['2.18','218.5','1.71']},
  {id:'rays',time:'09.24 09:00',league:'MLB',count:'65+',home:'탬파베이 레이스',away:'애슬레틱스',homeLogo:images.imgHomeLogo2,awayLogo:images.imgAwayLogo2,result:['1.72','2.25'],handicap:['2.78','-1.5','1.50'],handicapName:'런라인',total:['2.15','7.5','1.79']},
];

export type Provider = {title:string;subtitle:string;art:string;logo:string};
export const casinoProviders: Provider[] = [
  {title:'에볼루션',subtitle:'Evolution',art:images.imgArt,logo:images.imgBrandmark},
  {title:'아시아 게이밍',subtitle:'Asia Gaming',art:images.imgArt1,logo:images.imgBrandmark1},
  {title:'아스타',subtitle:'ASTAR',art:images.imgArt2,logo:images.imgBrandmark2},
  {title:'벳게임즈티비',subtitle:'Betgames.tv',art:images.imgArt3,logo:images.imgBrandmark3},
  {title:'빅게이밍',subtitle:'Big Gaming Live',art:images.imgArt4,logo:images.imgBrandmark4},
  {title:'드림게이밍',subtitle:'Dream Gaming',art:images.imgArt5,logo:images.imgBrandmark5},
  {title:'WM 라이브',subtitle:'WM Live',art:images.imgArt6,logo:images.imgBrandmark6},
  {title:'프라그마틱 라이브',subtitle:'Pragmatic Play Live',art:images.imgArt7,logo:images.imgBrandmark7},
  {title:'비보 게이밍',subtitle:'Vivo Gaming',art:images.imgArt8,logo:images.imgBrandmark8},
  {title:'섹시 카지노',subtitle:'Sexy Casino',art:images.imgArt9,logo:images.imgBrandmark9},
];
export const slotProviders: Provider[] = [
  {title:'프라그마틱 플레이',subtitle:'Pragmatic Play',art:images.imgArt10,logo:images.imgBrandmark10},
  {title:'프라그마틱 터보',subtitle:'Pragmatic Turbo Spin',art:images.imgArt11,logo:images.imgBrandmark10},
  {title:'이그드라실',subtitle:'Yggdrasil',art:images.imgArt12,logo:images.imgBrandmark11},
  {title:'플레이앤고',subtitle:'PlayNGo',art:images.imgArt13,logo:images.imgBrandmark12},
  {title:'레드 타이거',subtitle:'Red Tiger',art:images.imgArt14,logo:images.imgBrandmark13},
  {title:'릴렉스 게이밍',subtitle:'Relax Gaming',art:images.imgArt15,logo:images.imgBrandmark14},
  {title:'와즈단',subtitle:'Wazdan',art:images.imgArt16,logo:images.imgBrandmark15},
  {title:'핵쏘 게이밍',subtitle:'Hacksaw',art:images.imgArt17,logo:images.imgBrandmark16},
  {title:'플레이테크 슬롯',subtitle:'Playtech Slot',art:images.imgArt18,logo:images.imgBrandmark17},
  {title:'넷엔트',subtitle:'Netent',art:images.imgArt19,logo:images.imgBrandmark18},
];
