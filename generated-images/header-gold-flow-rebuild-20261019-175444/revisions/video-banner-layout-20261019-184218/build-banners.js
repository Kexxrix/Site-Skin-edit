await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('435:14043'));
const page=figma.currentPage;if(page.children.some(n=>n.name==='18 · 07B VideoHero · 이미지 전체 표시 배너'))throw Error('VideoHero component section already exists');
const configs=[{id:'573:5820',key:'Payback'},{id:'573:5832',key:'Events'},{id:'573:5844',key:'DailyReward'}];
const fonts=new Map();for(const cfg of configs){const s=await figma.getNodeByIdAsync(cfg.id);for(const t of s.findAllWithCriteria({types:['TEXT']}))for(const f of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(f.fontName),f.fontName);}await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function digest(n){const s=JSON.stringify([n,...n.findAll(()=>true)].map(c=>({id:c.id,type:c.type,name:c.name,x:c.x,y:c.y,w:c.width,h:c.height,fills:'fills'in c?c.fills:null,text:c.type==='TEXT'?c.characters:null})));let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
const section=figma.createSection();section.name='18 · 07B VideoHero · 이미지 전체 표시 배너';section.x=100;section.y=Math.max(...page.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(1770,320);section.fills=[{type:'SOLID',color:{r:.12,g:.12,b:.12}}];const created=[section.id],banners=[];
for(const [i,cfg]of configs.entries()){
 const source=await figma.getNodeByIdAsync(cfg.id),before=digest(source),n=source.clone();section.appendChild(n);n.name='P17/07BVideoHero/Banner/BlackGold/'+cfg.key;n.description='Video companion banner. Full 3:1 source artwork, independent native text/button layers, 523 x 174.33, R6. Used only in the revised video hero layout.';n.resize(523,523/3);n.x=40+i*563;n.y=72;
 const content=n.children.find(c=>c.name==='카드 콘텐츠');content.resize(523,523/3);content.layoutSizingHorizontal='FILL';content.layoutSizingVertical='FILL';content.cornerRadius=6;content.clipsContent=true;
 const art=content.children.find(c=>c.name==='Artwork'),shade=content.children.find(c=>c.name==='Shade'),copy=content.children.find(c=>c.name==='Copy');
 for(const plane of [art,shade]){plane.resize(523,523/3);plane.x=0;plane.y=0;plane.constraints={horizontal:'STRETCH',vertical:'STRETCH'};plane.cornerRadius=0;}
 art.fills=art.fills.map(f=>f.type==='IMAGE'?{...JSON.parse(JSON.stringify(f)),scaleMode:'FIT'}:f);
 shade.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[1,0,0],[0,1,0]],gradientStops:[{position:0,color:{r:.025,g:.025,b:.025,a:.86}},{position:.40,color:{r:.025,g:.025,b:.025,a:.63}},{position:.62,color:{r:.025,g:.025,b:.025,a:.12}},{position:1,color:{r:.025,g:.025,b:.025,a:0}}]}];
 copy.resize(292,523/3);copy.x=0;copy.y=0;copy.paddingTop=16;copy.paddingBottom=16;copy.paddingLeft=16;copy.paddingRight=16;copy.primaryAxisAlignItems='SPACE_BETWEEN';copy.counterAxisAlignItems='MIN';copy.constraints={horizontal:'MIN',vertical:'STRETCH'};copy.itemSpacing=8;
 const typo=copy.children.find(c=>c.name==='Typography');typo.resize(260,58);typo.layoutSizingHorizontal='FILL';typo.layoutSizingVertical='HUG';typo.itemSpacing=2;typo.primaryAxisAlignItems='MIN';
 const title=typo.children.find(c=>c.name==='Title'),description=typo.children.find(c=>c.name==='Description');title.fontSize=26;title.lineHeight={unit:'PIXELS',value:34};description.fontSize=13;description.lineHeight={unit:'PIXELS',value:20};
 for(const t of [title,description]){t.textAutoResize='HEIGHT';t.resize(260,t.height);t.layoutSizingHorizontal='FILL';t.layoutSizingVertical='HUG';}
 const action=copy.children.find(c=>c.name==='Action');action.resize(action.width,32);action.layoutSizingHorizontal='HUG';action.layoutSizingVertical='FIXED';
 banners.push({key:cfg.key,id:n.id,sourceId:source.id,w:n.width,h:n.height,artId:art.id,copyId:copy.id,sourceBefore:before,sourceAfter:digest(source),sourceUnchanged:before===digest(source),properties:Object.keys(n.componentPropertyDefinitions)});created.push(...[n,...n.findAll(()=>true)].filter(c=>!c.id.startsWith('I')).map(c=>c.id));
}
return {section:{id:section.id,name:section.name,x:section.x,y:section.y,w:section.width,h:section.height},banners,createdNodeIds:created};
