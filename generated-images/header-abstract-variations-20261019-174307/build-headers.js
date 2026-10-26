const page=await figma.getNodeByIdAsync('435:14043'); await figma.setCurrentPageAsync(page);
const source=await figma.getNodeByIdAsync('599:5378');
const fonts=new Map(); for(const t of source.findAllWithCriteria({types:['TEXT']})) for(const s of t.getStyledTextSegments(['fontName'])) fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function digest(n){const a=[n,...n.findAll(()=>true)].map(c=>({id:c.id,name:c.name,type:c.type,x:c.x,y:c.y,w:c.width,h:c.height,opacity:c.opacity,visible:c.visible,fills:'fills'in c?c.fills:null,text:c.type==='TEXT'?c.characters:null}));const s=JSON.stringify(a);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);}
const before=digest(source);
const section=figma.createSection();section.name='18 · 07B Abstract · 브론즈 새틴 / 스모크 골드 · 헤더 원본';section.x=100;section.y=Math.max(...page.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(4200,480);section.fills=[{type:'SOLID',color:{r:.12,g:.12,b:.12}}];
const created=[section.id]; const families=[];
for(const cfg of [{key:'BronzeSatin',title:'브론즈 새틴',y:40,textureY:-56,darkOpacity:.62,whiteOpacity:.14},{key:'SmokeGold',title:'스모크 골드',y:264,textureY:-136,darkOpacity:.68,whiteOpacity:.16}]){
 const set=source.clone();section.appendChild(set);set.name='P17/07BRoomy/Header/'+cfg.key;set.x=40;set.y=cfg.y;set.description='07B Roomy image overlay header: '+cfg.title+'. Generated background image only. Original editable native UI, 88px height and R6 controls preserved. BlackGold and WhiteGold themes.';
 const variants=[];
 for(const v of set.children){ const dark=v.name==='Theme=BlackGold';v.description=cfg.title+' / '+(dark?'BlackGold':'WhiteGold')+'. Background image separated from foreground controls.';const texture=v.children.find(n=>n.name==='Generated abstract gold / image overlay');texture.name='Generated '+cfg.key+' / image overlay';texture.y=cfg.textureY;texture.opacity=dark?cfg.darkOpacity:cfg.whiteOpacity;texture.fills=[]; variants.push({id:v.id,theme:dark?'BlackGold':'WhiteGold',textureId:texture.id,w:v.width,h:v.height}); }
 created.push(...[set,...set.findAll(()=>true)].filter(n=>!n.id.startsWith('I')).map(n=>n.id));
 families.push({key:cfg.key,title:cfg.title,setId:set.id,variants});
}
return {section:{id:section.id,name:section.name,x:section.x,y:section.y,w:section.width,h:section.height},families,createdNodeIds:created,sourceBefore:before,sourceAfter:digest(source),sourceUnchanged:before===digest(source)};
