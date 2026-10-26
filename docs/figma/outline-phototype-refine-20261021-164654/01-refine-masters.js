// Executed by Figma use_figma. cfg is supplied from prior-state.json.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(cfg.pageId));
const page=figma.currentPage, source=await figma.getNodeByIdAsync(cfg.sourceSectionId);
const created=[],mutated=[],removed=[],styles={},cards=[],variants=[
 {id:'A0',family:'OutlineDepth',name:'와이드 실버 · 기본 정리',intent:'윤곽선을 카드 폭 93%까지 펼치고 인물 뒤에 배치. 하단 한글과 금색 버튼을 한 행으로 분리.',tradeoff:'가장 균형 잡힌 기본안. 인물 교체 시 실루엣 마스크 조정 필요.'},
 {id:'A1',family:'OutlineDepth',name:'더블 골드 · 두 줄 캡션',intent:'두 겹의 가는 금색 윤곽선과 큰 한글 제목. 바로가기는 아래쪽 독립 행의 분할형 금색 버튼.',tradeoff:'금색의 존재감이 큼. 한글 제목과 버튼 사이 8px 여백 확보.'},
 {id:'A2',family:'OutlineDepth',name:'고스트 와이드 · 세로 한글',intent:'넓은 반투명 윤곽선 아래에 한글 목적을 두 행으로 편집. 우측 금색 화살표 셀과 대비.',tradeoff:'목적의 단어 단위가 또렷함. 영문은 정보보다 배경 그래픽 역할.'},
 {id:'A3',family:'OutlineDepth',name:'골드 러닝 바 · 전체 폭 진입',intent:'카드를 가로지르는 윤곽선과 중앙 한글. 하단 금색 바 전체를 진입점으로 사용.',tradeoff:'클릭 가능한 영역이 가장 명확함. 하단 이미지 일부를 금색 바가 덮음.'},
 {id:'B0',family:'PhotoType',name:'브라이트 포토 · 기본 정리',intent:'사진 글자에 밝은 가장자리와 대비를 더하고 한글 목적과 금색 버튼을 독립된 행으로 배치.',tradeoff:'사진 글자의 질감과 한글 가독성이 균형적. 영문은 보조 그래픽.'},
 {id:'B1',family:'PhotoType',name:'파노라마 포토 · 인물 앞으로',intent:'사진을 담은 글자를 전체 폭으로 확장하고 인물을 앞에 복원. 하단 한 행 캡션과 금색 분할 버튼.',tradeoff:'가장 과감한 사진 타이포. 영문 일부가 인물 뒤로 가려지는 구도.'},
 {id:'B2',family:'PhotoType',name:'목적 우선 · 포토 워드',intent:'한글 목적을 맨 위에서 먼저 읽고 중앙 사진 글자, 하단 금색 버튼으로 시선을 이동.',tradeoff:'정보 순서가 가장 명료함. 기존 하단 제목형과 다른 읽기 흐름.'},
 {id:'B3',family:'PhotoType',name:'한글 포토 · 골드 캡션',intent:'한글 자체를 두 행의 사진 창으로 제작. 작은 단색 한글 캡션으로 다시 읽히게 하고 넓은 금색 바로가기를 배치.',tradeoff:'한글의 질감이 가장 강함. 작은 화면에서는 단색 캡션이 목적 인지를 보완.'}
];
if(source.children.some(n=>n.name.startsWith('P23/Refined/')))throw Error('Already refined; inspect before retry');
const keep=cfg.cards.filter(c=>['03','04'].includes(c.variant));
const fonts=new Map();for(const d of keep){const n=await figma.getNodeByIdAsync(d.id);for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);}
for(const f of [{family:'Pretendard JP',style:'Black'},{family:'Pretendard JP',style:'Bold'},{family:'Pretendard JP',style:'ExtraBold'},{family:'Anton',style:'Regular'},{family:'Bebas Neue',style:'Regular'}])fonts.set(JSON.stringify(f),f);
for(const sid of Object.values(cfg.styles)){const s=await figma.getStyleByIdAsync(sid);fonts.set(JSON.stringify(s.fontName),s.fontName);}await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const colors={};for(const[k,id]of Object.entries({ink:'VariableID:737:3527',paper:'VariableID:737:3526',white:'VariableID:737:3529',gold:'VariableID:737:3528',line:'VariableID:737:3531'}))colors[k]=await figma.variables.getVariableByIdAsync(id);
function paint(k){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',colors[k]);}
function track(n,deep=false){created.push(n.id);if(deep&&'children'in n)for(const c of n.children)track(c,true);return n;}
function ts(name,family,size,line,weight='Regular',spacing=0){const s=figma.createTextStyle();s.name='P23/Refined/'+name;s.fontName={family,style:weight};s.fontSize=size;s.lineHeight={unit:'PIXELS',value:line};s.letterSpacing={unit:'PIXELS',value:spacing};styles[name]=s.id;return s;}
const title=ts('Purpose/28','Pretendard JP',28,34,'ExtraBold',-.4),title26=ts('Purpose/26','Pretendard JP',26,32,'ExtraBold',-.3),stack=ts('Purpose/Stack','Pretendard JP',26,32,'ExtraBold',0),caption=ts('Purpose/Caption','Pretendard JP',20,28,'Bold',.3),entry=ts('Entry/14','Pretendard JP',14,20,'Bold',0),entry13=ts('Entry/13','Pretendard JP',13,18,'Bold',0);
async function apply(t,s,col='paper'){await t.setTextStyleIdAsync(s.id);t.fills=[paint(col)];t.leadingTrim='NONE';t.textDecoration='NONE';t.textAutoResize='WIDTH_AND_HEIGHT';}
function grad(n,stops){n.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:stops.map(([position,alpha])=>({position,color:{r:.035,g:.036,b:.036,a:alpha}}))}];}
function lowerGrad(n){grad(n,[[0,0],[.55,0],[.67,.28],[.78,.76],[1,.96]]);}
async function fit(t,word,font,size,line,width,name,y){t.characters=word;t.fontName=font;t.fontSize=size;t.lineHeight={unit:'PIXELS',value:line};t.letterSpacing={unit:'PIXELS',value:0};t.textAutoResize='WIDTH_AND_HEIGHT';let spacing=(width-t.width)/word.length;t.letterSpacing={unit:'PIXELS',value:spacing};spacing+=(width-t.width)/word.length;const sty=ts(name,font.family,size,line,font.style,spacing);await t.setTextStyleIdAsync(sty.id);t.textAutoResize='WIDTH_AND_HEIGHT';t.x=(522.6667-t.width)/2;t.y=y;t.textAlignHorizontal='CENTER';t.leadingTrim='NONE';return sty;}
const shadow={type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:.9},offset:{x:0,y:2},radius:3,spread:0,visible:true,blendMode:'NORMAL'};
function gold(n){n.fills=[paint('gold')];n.strokes=[];n.effects=[{type:'INNER_SHADOW',color:{r:1,g:.95,b:.8,a:.22},offset:{x:0,y:1},radius:0,spread:0,visible:true,blendMode:'NORMAL'},{...shadow,color:{r:0,g:0,b:0,a:.35},offset:{x:0,y:2},radius:3}];}
async function button(root,label,kind,w,h){const b=track(figma.createAutoLayout('HORIZONTAL'));root.appendChild(b);b.name='Entry · gold '+kind;b.layoutSizingHorizontal='FIXED';b.layoutSizingVertical='FIXED';b.resize(w,h);b.cornerRadius=4;b.paddingLeft=kind==='Wide'?14:12;b.paddingRight=kind==='Split'?0:10;b.paddingTop=0;b.paddingBottom=0;b.itemSpacing=8;b.counterAxisAlignItems='CENTER';gold(b);b.appendChild(label);await apply(label,h<32?entry13:entry,'ink');label.layoutSizingHorizontal='FILL';label.layoutSizingVertical='HUG';label.textAlignHorizontal=kind==='Wide'?'CENTER':'LEFT';label.textAutoResize='HEIGHT';
const arrow=track((await figma.getNodeByIdAsync('737:3544')).createInstance());arrow.name='Arrow · original vector';arrow.resize(20,20);arrow.layoutSizingHorizontal='FIXED';arrow.layoutSizingVertical='FIXED';
if(kind==='Split'){const cell=track(figma.createAutoLayout('HORIZONTAL'));b.appendChild(cell);cell.name='Gold arrow cell';cell.fills=[paint('ink')];cell.paddingLeft=9;cell.paddingRight=9;cell.resize(38,h);cell.layoutSizingHorizontal='FIXED';cell.layoutSizingVertical='FIXED';cell.primaryAxisAlignItems='CENTER';cell.counterAxisAlignItems='CENTER';cell.appendChild(arrow);arrow.swapComponent(await figma.getNodeByIdAsync('737:3546'));b.paddingRight=0;}
else b.appendChild(arrow);return b;}
// Clone the untouched bases before refining them; keep their original IDs last.
for(const v of [variants[1],variants[2],variants[3],variants[5],variants[6],variants[7],variants[0],variants[4]]){for(const d of keep.filter(c=>c.key===v.family)){
const base=await figma.getNodeByIdAsync(d.id),isBase=v.id==='A0'||v.id==='B0',n=isBase?base:track(base.clone(),true);if(!isBase)source.appendChild(n);else mutated.push(n.id,...n.children.map(c=>c.id));n.name='P23/Refined/'+v.id+'-'+v.name+'/'+d.role;n.description=v.intent+' '+v.tradeoff+' 尺寸522.67×256 / R6。写真・マスク・タイポ・CTAを別レイヤーで編集。既存画像のみ。';n.resize(522.6667,256);n.cornerRadius=6;
const purpose=n.children.find(x=>x.name==='Purpose / entry');const t=purpose.children.find(x=>x.name==='Title'),label=purpose.children.find(x=>x.name==='Entry label');n.appendChild(t);n.appendChild(label);purpose.remove();
await apply(t,v.id==='A2'?stack:v.id==='B3'?caption:v.id==='A1'||v.id==='A3'?title26:title,v.id==='A1'||v.id==='A3'||v.id==='B3'?'gold':'paper');t.effects=[shadow];t.x=18;t.y=176;
const cta=await button(n,label,(v.id==='A1'||v.id==='A2'||v.id==='B1')?'Split':(v.id==='A3'||v.id==='B3')?'Wide':'Solid',(v.id==='A3'||v.id==='B3')?486:(v.id==='A1'||v.id==='A2'||v.id==='B1')?180:170,(v.id==='A3'||v.id==='B3'||v.id==='A1'||v.id==='B0')?28:36);
cta.x=18;cta.y=220;const display=n.findAll(x=>x.type==='TEXT'&&x.name.startsWith('Display'));let extraDisplay=[];
const roleWord=d.role==='Payback'?'PAYBACK':d.role==='Events'?'EVENTS':'REWARD';
if(v.family==='OutlineDepth'){
const dt=display[0];const size=v.id==='A2'?150:v.id==='A1'?172:176;await fit(dt,roleWord,{family:'Bebas Neue',style:'Regular'},size,size+8,486,v.id+'/'+d.role+'/Wide',v.id==='A2'?0:-4);dt.fills=[];dt.strokes=[paint(v.id==='A1'||v.id==='A3'?'gold':'paper')];dt.strokeWeight=v.id==='A1'?1.2:1.5;dt.opacity=v.id==='A2'?.78:.96;
const overlay=n.children.find(x=>x.name==='Overlay · lower contrast');lowerGrad(overlay);
if(v.id==='A1'){const twin=track(dt.clone());n.insertChild(n.children.indexOf(dt),twin);twin.name='Display · second gold contour';twin.x=dt.x+3;twin.y=dt.y+3;twin.opacity=.38;twin.strokeWeight=.8;extraDisplay.push(twin.id);t.y=178;cta.y=218;}
if(v.id==='A0'){t.y=204;cta.x=334.6667;cta.y=202;}
if(v.id==='A2'){dt.fills=[paint('ink')];dt.opacity=.75;t.characters=d.role==='Payback'?'페이백\n포인트':d.role==='Events'?'회원\n이벤트':'데일리\n리워드';t.y=176;cta.x=324.6667;cta.y=202;const prop=t.componentPropertyReferences?.characters;if(prop)n.editComponentProperty(prop,{defaultValue:t.characters});}
if(v.id==='A3'){t.resize(486,t.height);t.textAutoResize='HEIGHT';t.textAlignHorizontal='CENTER';t.y=176;cta.y=220;}
}else{
const mask=display.find(x=>x.isMask),edge=display.find(x=>!x.isMask),photo=mask.parent.children.find(x=>x.type==='RECTANGLE');
photo.fills=photo.fills.map(p=>p.type==='IMAGE'?{...p,filters:{...(p.filters||{}),exposure:.12,contrast:.3,saturation:.08}}:p);
const over=n.children.find(x=>x.name==='Overlay · readability');over.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[1,0,0],[0,1,0]],gradientStops:[{position:0,color:{r:0,g:0,b:0,a:.98}},{position:.43,color:{r:0,g:0,b:0,a:.94}},{position:.67,color:{r:0,g:0,b:0,a:0}},{position:1,color:{r:0,g:0,b:0,a:0}}]}];
let chars=d.role==='Payback'?'PAY\nBACK':d.role==='Events'?'EVENT':'GIFT',font={family:'Anton',style:'Regular'},size=92,line=88,x=18,y=d.role==='Payback'?-4:48,w=290;
if(v.id==='B1'){chars=roleWord;size=142;line=150;y=2;w=486;}
if(v.id==='B2'){chars=roleWord;size=88;line=100;y=66;w=294;t.y=18;cta.y=202;}
if(v.id==='B3'){chars=d.role==='Payback'?'페이백\n포인트':d.role==='Events'?'회원\n이벤트':'데일리\n리워드';font={family:'Pretendard JP',style:'Black'};size=58;line=68;y=16;w=270;t.y=177;cta.y=220;}
if(v.id==='B1'||v.id==='B2'){const s=await fit(mask,chars,font,size,line,w,v.id+'/'+d.role+'/Photo',y);await edge.setTextStyleIdAsync(s.id);edge.characters=chars;edge.textAutoResize='WIDTH_AND_HEIGHT';edge.x=mask.x;edge.y=y;}
else{const s=ts(v.id+'/'+d.role+'/Photo',font.family,size,line,font.style,v.id==='B3'?.6:0);for(const a of [mask,edge]){a.characters=chars;await a.setTextStyleIdAsync(s.id);a.textAutoResize='HEIGHT';a.resize(w,a.height);a.x=x;a.y=y;}}
mask.fills=[paint('white')];mask.isMask=true;mask.maskType='ALPHA';edge.fills=[];edge.strokes=[paint(v.id==='B3'?'gold':'paper')];edge.strokeWeight=v.id==='B3'?1.15:.9;edge.opacity=v.id==='B3'?.95:.8;edge.effects=[shadow];
for(const a of [mask,edge]){const prop=a.componentPropertyReferences?.characters;if(prop)n.editComponentProperty(prop,{defaultValue:chars});}
if(v.id==='B0'){t.y=176;cta.y=220;}
if(v.id==='B1'){t.y=204;cta.x=324.6667;cta.y=202;const ref=(await figma.getNodeByIdAsync(keep.find(c=>c.key==='OutlineDepth'&&c.role===d.role).id)).children.find(x=>x.name==='Portrait in front · native mask');const fg=track(ref.clone(),true);n.insertChild(n.children.indexOf(edge)+1,fg);extraDisplay.push(fg.id);}
}
const hit=n.children.find(x=>x.name==='Click target · full card');n.appendChild(hit);hit.resize(n.width,n.height);
const mainPhoto=n.children.find(x=>x.name==='Photo · current image');cards.push({id:n.id,variant:v.id,key:v.family,name:v.name,role:d.role,titleId:t.id,entryId:label.id,ctaId:cta.id,photoId:mainPhoto.id,displayIds:display.map(x=>x.id),extraDisplayIds:extraDisplay});
}}
// Remove only the explicitly discarded directions and their local consumers.
const oldVariants=new Set(['01','02','05','06']);for(const c of cfg.compositions.filter(c=>oldVariants.has(c.variant))){for(const id of [c.sectionId,figma.getNodeById(c.summarySetId).parent.id]){const n=await figma.getNodeByIdAsync(id);removed.push(n.id);n.remove();}}
for(const d of cfg.cards.filter(c=>oldVariants.has(c.variant))){const n=await figma.getNodeByIdAsync(d.id);removed.push(n.id);n.remove();}
for(const id of ['771:575','771:615','771:723','771:754']){const n=await figma.getNodeByIdAsync(id);removed.push(n.id);n.remove();}
for(const id of ['771:649','771:689']){const n=await figma.getNodeByIdAsync(id);removed.push(n.id);n.remove();}
source.name='91 · 카드 원본 · 윤곽선 / 사진 글자 · 8종';source.resizeWithoutConstraints(1800,2940);mutated.push(source.id);
for(let i=0;i<variants.length;i++){const v=variants[i];const titleNode=track(figma.createText());source.appendChild(titleNode);titleNode.name='Direction label';titleNode.characters=v.id+' · '+v.name;await titleNode.setTextStyleIdAsync(cfg.styles.Meta);titleNode.fills=[paint('gold')];titleNode.x=48;titleNode.y=24+i*350;cards.filter(c=>c.variant===v.id).forEach((c,j)=>{const n=figma.getNodeById(c.id);n.x=48+j*564;n.y=56+i*350;});}
page.name='23 · 인물 뒤 윤곽선 / 사진 글자 · 3종씩 변형';mutated.push(page.id);
return{createdNodeIds:[...new Set(created)],mutatedNodeIds:[...new Set(mutated)],removedNodeIds:removed,pageId:page.id,sourceSectionId:source.id,cards,variants,styles};
