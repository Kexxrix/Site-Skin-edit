const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
if(p.children.some(n=>n.name==='17 · 07B Gold Flow · 얇은 금빛 흐름 · 헤더 원본'))throw Error('Replacement section already exists');
const source=await figma.getNodeByIdAsync('604:5531');const fonts=new Map();for(const t of source.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const section=figma.createSection();section.name='17 · 07B Gold Flow · 얇은 금빛 흐름 · 헤더 원본';section.x=100;section.y=Math.max(...p.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(4200,720);section.fills=[{type:'SOLID',color:{r:.12,g:.12,b:.12}}];
const created=[section.id],families=[];
const configs=[{key:'GoldFlow01',title:'01 · 사선 베일',cropY:-156,height:640},{key:'GoldFlow02',title:'02 · 수평 흐름',cropY:-112,height:640},{key:'GoldFlow03',title:'03 · 교차 흐름',cropY:-136,height:1920*724/2171}];
for(const [i,cfg]of configs.entries()){
 const set=source.clone();section.appendChild(set);set.name='P17/07BRoomy/Header/'+cfg.key;set.x=40;set.y=40+i*224;set.description=cfg.title+' / reference-style thin gold flowing header. Generated background only; native 88px header UI, layout and theme bindings retained.';
 const variants=[];for(const v of set.children){const dark=v.name==='Theme=BlackGold';v.description=cfg.title+' / '+(dark?'BlackGold':'WhiteGold');const texture=v.children.find(n=>n.name.includes('/ image overlay'));texture.name='Generated '+cfg.key+' / image overlay';texture.resize(1920,cfg.height);texture.x=0;texture.y=cfg.cropY;texture.opacity=dark?.68:.16;texture.fills=[];variants.push({id:v.id,theme:dark?'BlackGold':'WhiteGold',textureId:texture.id,w:v.width,h:v.height});}
 created.push(...[set,...set.findAll(()=>true)].filter(n=>!n.id.startsWith('I')).map(n=>n.id));families.push({key:cfg.key,title:cfg.title,setId:set.id,variants});
}
return {section:{id:section.id,name:section.name,x:section.x,y:section.y,w:section.width,h:section.height},families,createdNodeIds:created};
