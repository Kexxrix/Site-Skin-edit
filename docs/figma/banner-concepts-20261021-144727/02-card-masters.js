await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("737:3542"));
const state={"pageId":"737:3542","pageName":"22 · 혜택 배너 · 5방향 디자인 비교","guideId":"737:3551","sharedId":"737:3543","arrowSetId":"737:3550","arrowVariants":[{"id":"737:3544","name":"Tone=Ink"},{"id":"737:3546","name":"Tone=Gold"},{"id":"737:3548","name":"Tone=White"}],"collectionId":"VariableCollectionId:737:3524","tokens":{"primitive/paper":"VariableID:737:3525","paper":"VariableID:737:3526","ink":"VariableID:737:3527","gold":"VariableID:737:3528","white":"VariableID:737:3529","muted":"VariableID:737:3530","line":"VariableID:737:3531"},"styles":{"Editorial":"S:d7448433cea20c9b4707fe93c77d7e210e838df5,","Chapter":"S:b932465dc187fb790e6d7a738dfbb16dc3829909,","Poster":"S:94d67e03ed97be953bbcdf440696b7a1fa284bea,","Ticket":"S:5955549e26ce28e95e6725900cceca9734b19afa,","Focus":"S:b1d74ff4a68b248df9d45cc19c3cf47c11813226,","Compact":"S:7a74dd4165d6065bb28fc53c6c02f968432d98bb,","Body":"S:7c46ac2d58bc29f1252fdad7b21c773d0f71d550,","Meta":"S:2f92dee1d2c10614287fe4f1d06f9b841e1a5184,","Action":"S:8a1e8e0eaaca41736a3bb289994e34fbf936c143,","DocTitle":"S:f0527f77fa9ed768e73896b8d410c8a6b1e47976,"},"sourceBaseline":[{"id":"693:3446","hash":"dc33e143"},{"id":"693:3503","hash":"c46f7125"},{"id":"693:4772","hash":"82be5d05"},{"id":"693:4826","hash":"f714048d"}],"sourceScreenId":"693:3446","sourceMainId":"693:3456","createdNodeIds":["737:3542","737:3543","737:3544","737:3545","737:3546","737:3547","737:3548","737:3549","737:3550","737:3551","737:3552","737:3553","737:3554"],"mutatedNodeIds":[]},specs=[{"id":"A","name":"에디토리얼","h":340,"layout":"three","intent":"사진은 장면으로, 정보는 지면으로. 밝은 캡션과 세리프 제목을 분리한 편집형.","pros":"읽기 쉽고 인물·선물 장면을 가리지 않음. 이미지 교체에도 안정적.","cons":"다크 화면에서 밝은 정보 면적이 눈에 띄며, 기존보다 높이가 늘어남.","entry":"카드 전체 클릭 · 제목 옆 화살표가 진입점을 표시","recommend":"균형 추천 · 가독성과 사진 보존을 우선할 때"},{"id":"B","name":"와이드 챕터","h":672,"layout":"stack","intent":"세 목적을 독립된 가로 챕터로 쌓는 디렉터리. 큰 제목과 여유 있는 읽기 흐름.","pros":"목적 구분과 설명 가독성이 가장 명확함. 사진과 텍스트의 영역이 완전히 분리됨.","cons":"배너 묶음이 672px로 높아져 아래 게임 콘텐츠가 많이 밀림.","entry":"가로 행 전체 클릭 · 밑줄 링크와 우측 화살표","recommend":"정보 전달 우선형 · 상단 혜택 영역의 비중을 크게 줄 때"},{"id":"C","name":"시네마 포스터","h":384,"layout":"three","intent":"세로 포스터 구도와 큰 두 줄 타이포그래피. 이미지별 빈 공간에 카피를 배치.","pros":"인물 이미지의 존재감과 몰입도가 높음. 기존 서비스의 어두운 분위기와 자연스럽게 연결됨.","cons":"작은 크기로 축소할 때 보조 문구의 대비를 계속 관리해야 함.","entry":"포스터 전체 클릭 · 언더라인 액션과 화살표","recommend":"비주얼 강조 후보 · 이미지의 매력을 가장 크게 보여주고 싶을 때"},{"id":"D","name":"베네핏 티켓","h":216,"layout":"three","intent":"사진 창·절취선·짧은 텍스트를 묶은 혜택 티켓. 컴팩트한 진입 도구로 해석.","pros":"상단 높이를 절약하고 세 목적을 명료하게 구분. 텍스트가 사진과 겹치지 않음.","cons":"사진 면적이 작아져 장면의 웅장함은 줄어듦. 종이 표현이 취향을 탈 수 있음.","entry":"티켓 전체 클릭 · 하단 링크와 화살표","recommend":"밀도 우선형 · 게임 콘텐츠를 위로 끌어올리고 싶을 때"},{"id":"E","name":"포커스 스테이지","h":436,"layout":"asymmetric","intent":"큰 페이백 장면과 두 개의 보조 배너. 크기 차이로 우선순위를 만드는 비대칭 무대.","pros":"상단에 시선의 중심이 생기고 카드 3개의 기계적인 반복을 피함.","cons":"페이백이 다른 두 목적보다 중요하다는 인상을 줌. 서비스 우선순위가 맞는지 확인 필요.","entry":"각 카드 전체 클릭 · 텍스트 링크와 화살표","recommend":"위계 강조형 · 페이백을 대표 진입점으로 둘 때"}],images=[{"role":"Payback","title":"페이백 포인트","posterTitle":"페이백\n포인트","desc":"콤프와 페이백 포인트를 한 곳에서 확인하세요.","entry":"내 지갑 바로가기","hash":"2fa5dfe44d019e8cca72ce1c0ca2213fe3d79a30","fx":0.74,"fy":0.43},{"role":"Events","title":"회원 이벤트","posterTitle":"회원\n이벤트","desc":"진행 중인 혜택과 참여 조건을 빠르게 확인하세요.","entry":"이벤트 보기","hash":"f85e41a37edafdd9fcc8792b59ab28a5efddafee","fx":0.66,"fy":0.44},{"role":"DailyReward","title":"데일리 리워드","posterTitle":"데일리\n리워드","desc":"출석 체크로 매일 이어지는 보상을 만나보세요.","entry":"리워드 보기","hash":"879de2364abc7facf3c36d646671c106af30ffcd","fx":0.67,"fy":0.47}];
if(figma.currentPage.findOne(n=>n.type==="SECTION"&&n.name==="91 · 카드 원본 · A 에디토리얼"))throw Error("Study card sources exist; read ledger before retry.");
const fonts=[{family:"Pretendard JP",style:"Regular"},{family:"Pretendard JP",style:"SemiBold"},{family:"Pretendard JP",style:"Bold"},{family:"Noto Serif KR",style:"SemiBold"}];await Promise.all(fonts.map(f=>figma.loadFontAsync(f)));
const token={};for(const[k,id]of Object.entries(state.tokens))token[k]=await figma.variables.getVariableByIdAsync(id);
const created=[],cards=[],sections=[];
function track(n){created.push(n.id);return n;}
function fill(key,opacity=1){return figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:1,g:1,b:1},opacity},"color",token[key]);}
function auto(parent,name,dir,w,h,key){const n=track(figma.createAutoLayout(dir));parent.appendChild(n);n.name=name;n.fills=key?[fill(key)]:[];n.resize(w,h);n.layoutSizingHorizontal="FIXED";n.layoutSizingVertical="FIXED";n.itemSpacing=0;return n;}
function card(spec,im,w,h,parent){const c=track(figma.createComponent());parent.appendChild(c);c.name="P22/Banners/"+spec.id+"/"+im.role;c.layoutMode="VERTICAL";c.resize(w,h);c.layoutSizingHorizontal="FIXED";c.layoutSizingVertical="FIXED";c.fills=[fill("ink")];c.clipsContent=true;c.description=spec.name+" · "+spec.intent+" "+spec.entry+"。画像は現在の原本のみ。未採用の比較案。";return c;}
function text(parent,name,value,styleKey,color,width,comp){const n=track(figma.createText());n.textStyleId=state.styles[styleKey];n.characters=value;n.name=name;n.fills=[fill(color)];parent.appendChild(n);n.textAutoResize="HEIGHT";n.resize(width,n.height);n.layoutSizingHorizontal="FIXED";n.layoutSizingVertical="HUG";n.leadingTrim="NONE";if(comp){const p=comp.addComponentProperty(name,"TEXT",value);n.componentPropertyReferences={characters:p};}return n;}
function abs(n,x,y){n.layoutPositioning="ABSOLUTE";n.x=x;n.y=y;return n;}
function photo(parent,im,w,h,absolute=false){const p=auto(parent,"Photo · existing image / editable crop","VERTICAL",w,h);const r=w/h,sr=1672/941;let sx=1,sy=1,tx=0,ty=0;if(r>=sr){sy=sr/r;ty=Math.max(0,Math.min(im.fy-sy/2,1-sy));}else{sx=r/sr;tx=Math.max(0,Math.min(im.fx-sx/2,1-sx));}p.fills=[{type:"IMAGE",imageHash:im.hash,scaleMode:"CROP",imageTransform:[[sx,0,tx],[0,sy,ty]]}];if(absolute)abs(p,0,0);return p;}
function shade(parent,w,h,opacity=.8){const s=auto(parent,"Overlay · left readability fade","VERTICAL",w,h);s.fills=[{type:"GRADIENT_LINEAR",gradientTransform:[[1,0,0],[0,1,0]],gradientStops:[{position:0,color:{r:0,g:0,b:0,a:opacity}},{position:.5,color:{r:0,g:0,b:0,a:opacity*.55}},{position:1,color:{r:0,g:0,b:0,a:0}}]}];return abs(s,0,0);}
function arrow(parent,color){const id=state.arrowVariants.find(v=>v.name==="Tone="+color).id;const i=track((figma.getNodeById(id)).createInstance());parent.appendChild(i);i.name="Entry arrow · full-card click";return i;}
function action(parent,im,tone,width,comp,under=false){const a=auto(parent,"Entry · entire card","HORIZONTAL",width,24);a.itemSpacing=8;a.counterAxisAlignItems="CENTER";a.primaryAxisSizingMode="AUTO";const t=text(a,"Entry label",im.entry,"Action",tone==="Ink"?"ink":tone==="Gold"?"gold":"white",width-32,comp);if(under)t.textDecoration="UNDERLINE";arrow(a,tone);a.layoutSizingVertical="HUG";return a;}
function hit(c){const h=track(figma.createRectangle());c.appendChild(h);h.name="Click target · entire card / connect to existing destination";h.fills=[];h.strokes=[];h.resize(c.width,c.height);abs(h,0,0);}
const lift=figma.createEffectStyle();lift.name="P22/BannerStudy/SoftLift";lift.effects=[{type:"DROP_SHADOW",color:{r:0,g:0,b:0,a:.16},offset:{x:0,y:6},radius:16,spread:0,visible:true,blendMode:"NORMAL"}];
const shadow=figma.createEffectStyle();shadow.name="P22/BannerStudy/PhotoText";shadow.effects=[{type:"DROP_SHADOW",color:{r:0,g:0,b:0,a:.6},offset:{x:0,y:2},radius:6,spread:0,visible:true,blendMode:"NORMAL"}];
for(let si=0;si<specs.length;si++){
 const spec=specs[si],s=track(figma.createSection());figma.currentPage.appendChild(s);s.name=(91+si)+" · 카드 원본 · "+spec.id+" "+spec.name;s.x=4600;s.y=440+si*1200;s.resizeWithoutConstraints(1800,1080);sections.push({id:s.id,concept:spec.id});
 for(let ri=0;ri<images.length;ri++){
 const im=images[ri],w=spec.id==="B"?1592:spec.id==="E"?788:520,h=spec.id==="B"?216:spec.id==="E"?(ri===0?436:210):spec.h,c=card(spec,im,w,h,s);
 c.x=spec.id==="B"?48:spec.id==="E"?(ri===0?48:884):48+ri*568;c.y=spec.id==="B"?64+ri*256:spec.id==="E"?(ri===0?64:64+(ri-1)*250):64;
 if(spec.id==="A"){
  photo(c,im,w,228);
  const info=auto(c,"Information · paper caption","VERTICAL",w,112,"paper");info.paddingTop=16;info.paddingBottom=16;info.paddingLeft=24;info.paddingRight=24;info.itemSpacing=8;info.primaryAxisAlignItems="CENTER";
  const row=auto(info,"Title + entry cue","HORIZONTAL",472,36);row.counterAxisAlignItems="CENTER";row.itemSpacing=12;
  text(row,"Title",im.title,"Editorial","ink",436,c);arrow(row,"Ink");
  text(info,"Description",im.desc,"Body","ink",472,c);
  c.effectStyleId=lift.id;
 }
 if(spec.id==="B"){
  c.layoutMode="HORIZONTAL";
  const info=auto(c,"Information · chapter","HORIZONTAL",1112,216,"ink");info.paddingLeft=40;info.paddingRight=40;info.itemSpacing=32;info.counterAxisAlignItems="CENTER";
  text(info,"Chapter index","0"+(ri+1),"DocTitle","gold",48);
  const copy=auto(info,"Chapter copy","VERTICAL",864,144);copy.itemSpacing=10;copy.primaryAxisAlignItems="CENTER";
  text(copy,"Title",im.title,"Chapter","white",864,c);text(copy,"Description",im.desc,"Body","muted",864,c);action(copy,im,"Gold",240,c,true);
  arrow(info,"Gold");photo(c,im,480,216);
  c.strokes=[fill("line")];c.strokeBottomWeight=1;c.strokeTopWeight=0;c.strokeLeftWeight=0;c.strokeRightWeight=0;
 }
 if(spec.id==="C"){
  photo(c,im,w,h,true);shade(c,w,h,.78);
  const info=auto(c,"Information · "+(ri===1?"lower-left":"upper-left"),"VERTICAL",238,190);info.itemSpacing=10;info.layoutSizingVertical="HUG";abs(info,28,ri===1?172:32);
  const title=text(info,"Title",im.posterTitle,"Poster","white",238,c);title.effectStyleId=shadow.id;
  const desc=text(info,"Description",im.desc,"Body","white",224,c);desc.effectStyleId=shadow.id;
  action(info,im,"White",224,c,true);
 }
 if(spec.id==="D"){
  c.layoutMode="HORIZONTAL";c.fills=[fill("paper")];c.setBoundVariable("cornerRadius",await figma.variables.getVariableByIdAsync("VariableID:435:14053"));
  photo(c,im,192,216);
  const info=auto(c,"Information · ticket","VERTICAL",328,216,"paper");info.paddingLeft=24;info.paddingRight=24;info.paddingTop=22;info.paddingBottom=22;info.itemSpacing=8;info.primaryAxisAlignItems="CENTER";
  text(info,"Title",im.title,"Ticket","ink",280,c);text(info,"Description",im.desc,"Body","ink",280,c);action(info,im,"Ink",240,c,true);
  const perf=track(figma.createVector());c.appendChild(perf);perf.name="Decoration · ticket perforation";perf.vectorPaths=[{windingRule:"NONE",data:"M 0 0 L 0 184"}];perf.fills=[];perf.strokes=[fill("ink",.35)];perf.strokeWeight=1;perf.dashPattern=[2,4];abs(perf,192,16);
  for(const y of [-8,208]){const e=track(figma.createEllipse());c.appendChild(e);e.name="Decoration · edge notch";e.resize(16,16);e.fills=[fill("ink")];abs(e,184,y);}
  c.effectStyleId=lift.id;
 }
 if(spec.id==="E"){
  if(ri===0){photo(c,im,w,h,true);shade(c,w,h,.82);const info=auto(c,"Information · focus hero","VERTICAL",288,220);info.itemSpacing=12;info.layoutSizingVertical="HUG";abs(info,32,40);text(info,"Title",im.posterTitle,"Focus","white",288,c);text(info,"Description",im.desc,"Body","white",272,c);action(info,im,"Gold",248,c,true);}
  else{c.layoutMode="HORIZONTAL";const info=auto(c,"Information · secondary","VERTICAL",320,210,"ink");info.paddingTop=24;info.paddingBottom=24;info.paddingLeft=24;info.paddingRight=24;info.itemSpacing=10;info.primaryAxisAlignItems="CENTER";text(info,"Title",im.title,"Compact","white",272,c);text(info,"Description",im.desc,"Body","muted",272,c);action(info,im,"Gold",248,c,true);photo(c,im,468,210);c.strokes=[fill("line")];c.strokeWeight=1;c.strokeAlign="INSIDE";}
 }
 hit(c);
 cards.push({id:c.id,concept:spec.id,role:im.role,w:c.width,h:c.height,properties:c.componentPropertyDefinitions,texts:c.findAllWithCriteria({types:["TEXT"]}).map(t=>({id:t.id,name:t.name,text:t.characters,w:t.width,h:t.height})),imageHashes:c.findAll(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==="IMAGE")).map(n=>n.fills.find(p=>p.type==="IMAGE").imageHash)});
 }
}
return{createdNodeIds:created,mutatedNodeIds:[],cards,sections,effectStyles:{lift:lift.id,text:shadow.id}};
