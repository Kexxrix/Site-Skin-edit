const page=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(page);
const sourceSection=await figma.getNodeByIdAsync('600:43117');
const sourceScreens=[await figma.getNodeByIdAsync('600:43118'),await figma.getNodeByIdAsync('600:43762')];
const sourceLabels=[await figma.getNodeByIdAsync('600:43170'),await figma.getNodeByIdAsync('600:43814')];
const fonts=new Map();for(const t of sourceSection.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function digest(n){const a=[n,...n.findAll(()=>true)].map(c=>({id:c.id,name:c.name,type:c.type,x:c.x,y:c.y,w:c.width,h:c.height,opacity:c.opacity,visible:c.visible,fills:'fills'in c?c.fills:null,text:c.type==='TEXT'?c.characters:null}));const s=JSON.stringify(a);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
const before=digest(sourceSection);
const section=figma.createSection();section.name='17 · 07B 이미지 헤더 추가 2종 · 브론즈 새틴 / 스모크 골드 · 1920';section.x=100;section.y=Math.max(...page.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(4048,4300);section.fills=JSON.parse(JSON.stringify(sourceSection.fills));
const created=[section.id],screens=[];
for(const [row,cfg]of [{key:'BronzeSatin',title:'브론즈 새틴',components:['604:5443','604:5455']},{key:'SmokeGold',title:'스모크 골드',components:['604:5532','604:5544']}].entries()){
 for(let col=0;col<2;col++){
  const theme=col===0?'BlackGold':'WhiteGold';const src=sourceScreens[col];
  const screen=src.clone();section.appendChild(screen);screen.name='07B '+cfg.title+' · '+theme+' · 이미지 오버레이 · 1920';screen.x=64+col*2000;screen.y=124+row*2112;
  const old=screen.children[0];const main=await figma.getNodeByIdAsync(cfg.components[col]);const head=main.createInstance();screen.insertChild(0,head);old.remove();head.name='Header · 07B '+cfg.key+' · R6';head.resize(1920,88);head.layoutSizingHorizontal='FILL';head.layoutSizingVertical='FIXED';
  const label=sourceLabels[col].clone();section.appendChild(label);label.characters='0'+(row+2)+' · '+cfg.title+' · '+theme+' · 헤더 이미지 오버레이';label.name=label.characters;label.x=screen.x;label.y=screen.y-44;
  const real=[screen,...screen.findAll(()=>true)].filter(n=>!n.id.startsWith('I'));created.push(...real.map(n=>n.id),label.id);
  screens.push({key:cfg.key,theme,id:screen.id,labelId:label.id,headerId:head.id,mainComponentId:main.id,sourceScreenId:src.id,bodyId:screen.children[1].id,x:screen.x,y:screen.y,w:screen.width,h:screen.height,layout:screen.layoutMode});
 }
}
figma.viewport.scrollAndZoomIntoView([section]);
return {section:{id:section.id,name:section.name,x:section.x,y:section.y,w:section.width,h:section.height},screens,createdNodeIds:created,sourceBefore:before,sourceAfter:digest(sourceSection),sourceUnchanged:before===digest(sourceSection)};
