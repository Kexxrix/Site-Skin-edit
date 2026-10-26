
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
const NAME='17 · 07B AbstractGold · 이미지 오버레이 헤더';
if(p.children.some(n=>n.name===NAME))throw Error('Abstract header section exists');
const source=await figma.getNodeByIdAsync('573:5819');
function sig(n){return JSON.stringify(n.findAll(()=>true).map(c=>[c.id,c.name,c.width,c.height,'fills'in c?c.fills:null,c.type==='TEXT'?c.characters:null]));}
const before=sig(source),fonts=new Map();
for(const t of source.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const section=figma.createSection();p.appendChild(section);section.name=NAME;section.x=100;section.y=Math.max(...p.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(4200,240);
const set=source.clone();section.appendChild(set);set.name='P17/07BRoomy/Header/AbstractGold';set.x=40;set.y=40;set.description='Generated abstract-gold bitmap overlay under the original editable 07B Roomy header UI. 1920×88px. Two skin modes with independently tuned image opacity and readability fade.';
const added=[],variants=[];
for(const c of set.children){
 const dark=c.name.includes('BlackGold'),theme=dark?'BlackGold':'WhiteGold';
 const texture=figma.createRectangle();c.insertChild(0,texture);texture.name='Generated abstract gold / image overlay';texture.layoutPositioning='ABSOLUTE';texture.resize(1920,640);texture.x=0;texture.y=-112;texture.constraints={horizontal:'STRETCH',vertical:'MIN'};texture.opacity=dark?.72:.18;texture.fills=[];
 const fade=figma.createRectangle();c.insertChild(1,fade);fade.name='Readability fade';fade.layoutPositioning='ABSOLUTE';fade.resize(1920,88);fade.x=0;fade.y=0;fade.constraints={horizontal:'STRETCH',vertical:'STRETCH'};
 const color=dark?{r:0,g:0,b:0}:{r:245/255,g:244/255,b:239/255};
 fade.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:(dark?[[0,.06],[.38,.16],[.68,.42],[1,.95]]:[[0,.1],[.5,.1],[1,.82]]).map(([position,a])=>({position,color:{...color,a}}))}];
 c.clipsContent=true;added.push(texture.id,fade.id);variants.push({id:c.id,theme,texture:texture.id,fade:fade.id,w:c.width,h:c.height,opacity:texture.opacity});
}
return {createdNodeIds:[section.id,set.id,...set.findAll(()=>true).filter(n=>!n.id.startsWith('I')).map(n=>n.id)],mutatedNodeIds:[],section:{id:section.id,x:section.x,y:section.y},setId:set.id,variants,sourcePreserved:before===sig(source),all88:variants.every(c=>c.h===88)};

