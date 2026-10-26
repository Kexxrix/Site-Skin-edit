
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
const section=await figma.getNodeByIdAsync('573:4952'),source=await figma.getNodeByIdAsync('573:6046'),NAME='P17/07BRoomy/SportsCard/Raised';
if(section.children.some(n=>n.name===NAME))throw new Error('Raised card family already exists; inspect before retry');
const before=JSON.stringify(source.findAll(()=>true).map(n=>[n.id,n.name,n.width,n.height,'fills'in n?n.fills:null,'effects'in n?n.effects:null,n.type==='TEXT'?n.characters:null,n.componentPropertyReferences]));
const fonts=new Map();for(const t of source.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function rgb(hex){return {r:parseInt(hex.slice(0,2),16)/255,g:parseInt(hex.slice(2,4),16)/255,b:parseInt(hex.slice(4,6),16)/255};}
function linear(stops){return {type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:stops.map(([position,hex])=>({position,color:{...rgb(hex),a:1}}))};}
function shadow(type,hex,a,y,radius){return {type,color:{...rgb(hex),a},offset:{x:0,y},radius,spread:0,visible:true,blendMode:'NORMAL'};}
const paintStyles=await figma.getLocalPaintStylesAsync(),effectStyles=await figma.getLocalEffectStylesAsync(),styleIds=[];
function paint(name,fills){if(paintStyles.some(s=>s.name===name))throw new Error('Scoped paint exists');const s=figma.createPaintStyle();s.name=name;s.paints=fills;styleIds.push(s.id);return s;}
function effect(name,effects){if(effectStyles.some(s=>s.name===name))throw new Error('Scoped effect exists');const s=figma.createEffectStyle();s.name=name;s.effects=effects;styleIds.push(s.id);return s;}
const styles={};
for(const theme of ['BlackGold','WhiteGold']){
 const dark=theme==='BlackGold',prefix='P17/07BRoomy/SportsRaised/'+theme+'/';
 styles[theme]={
  card:paint(prefix+'Card',[linear(dark?[[0,'020202'],[.12,'0C0C0C'],[.32,'252525'],[.48,'151515'],[.72,'030303'],[1,'000000']]:[[0,'FFFFFF'],[.2,'FBFBF8'],[.4,'F1F0EA'],[.55,'E7E6DF'],[1,'FCFCFA']])]),
  button:paint(prefix+'Button',[linear(dark?[[0,'4B4B4B'],[.38,'393939'],[1,'282828']]:[[0,'FFFFFF'],[.38,'F1F0EA'],[1,'DFDED6']])]),
  cardEffect:effect(prefix+'Card relief',[shadow('DROP_SHADOW','000000',dark?.24:.1,2,5),shadow('INNER_SHADOW','FFFFFF',dark?.045:.8,1,1)]),
  buttonEffect:effect(prefix+'Button bevel',[shadow('DROP_SHADOW','000000',dark?.4:.12,1,2),shadow('INNER_SHADOW','FFFFFF',dark?.11:.85,1,0),shadow('INNER_SHADOW','000000',dark?.3:.09,-1,0)])
 };
}
const set=source.clone();section.appendChild(set);set.name=NAME;set.x=2000;set.y=2820;
set.description='Raised sports card variation based on the reference: full-card central light band, beveled odds surfaces, subtle shadow. Original card geometry, fonts, odds and image slots retained. Flat sources are preserved.';
const marketNames=new Set(['Home result','Draw result','Away result','Home handicap','Away handicap','Under','Over']),variants=[];
for(let i=0;i<set.children.length;i++){
 const c=set.children[i],theme=c.name.includes('WhiteGold')?'WhiteGold':'BlackGold',s=styles[theme];
 c.fillStyleId=s.card.id;c.effectStyleId=s.cardEffect.id;
 const panels=c.findAll(n=>n.type==='FRAME'&&marketNames.has(n.name));
 for(const panel of panels){panel.fillStyleId=s.button.id;panel.effectStyleId=s.buttonEffect.id;}
 c.x=24+i*560;c.y=24;
 variants.push({id:c.id,theme,w:c.width,h:c.height,r:c.cornerRadius,panelCount:panels.length,fillStyle:c.fillStyleId,effectStyle:c.effectStyleId,boundTextCount:c.findAllWithCriteria({types:['TEXT']}).filter(t=>t.componentPropertyReferences.characters).length});
}
set.resize(1128,276);
const after=JSON.stringify(source.findAll(()=>true).map(n=>[n.id,n.name,n.width,n.height,'fills'in n?n.fills:null,'effects'in n?n.effects:null,n.type==='TEXT'?n.characters:null,n.componentPropertyReferences]));
return {createdNodeIds:[set.id,...set.findAll(()=>true).filter(n=>!n.id.startsWith('I')).map(n=>n.id)],mutatedNodeIds:[],createdStyleIds:styleIds,setId:set.id,variants,sourcePreserved:before===after,properties:Object.keys(set.componentPropertyDefinitions),styles:Object.fromEntries(Object.entries(styles).map(([k,v])=>[k,Object.fromEntries(Object.entries(v).map(([key,s])=>[key,s.id]))]))};

