function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
if(figma.currentPage.children.some(n=>n.name.startsWith('HT Polished Gold')))throw Error('HT screen exists; inspect before retry');
const source=await figma.getNodeByIdAsync('795:1331'),cc=await figma.getNodeByIdAsync('803:1334');
if(hash(snap(source,true))!=='51fe4fe6'||hash(snap(cc,true))!=='241213ca')throw Error('Protected baseline changed; re-inspect');
const fontMap=new Map();for(const t of source.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fontMap.set(JSON.stringify(s.fontName),s.fontName);
for(const style of ['Black','ExtraBold','Bold','SemiBold'])fontMap.set(style,{family:'Pretendard JP',style});
await Promise.all([...fontMap.values()].map(f=>figma.loadFontAsync(f)));
const palette={page:'#1a1a1a',header:'#1a1a1a',ink:'#0d0d0d',surface:'#222222',panel:'#2a2a2a',raised:'#363636',edge:'#484848',gold:'#e5a834',goldLight:'#f4e7a3',goldRim:'#fae385',bronze:'#8b4208',goldDeep:'#6e5014',text:'#ffffff',muted:'#bdbdbd',borderGold:'#977136'};
const collection=figma.variables.createVariableCollection('P24 · HT Polished Gold · Skin');collection.renameMode(collection.modes[0].modeId,'Polished Gold');const modeId=collection.modes[0].modeId,vars=new Map(),fx=new Map(),textStyles=new Map(),made=[],changed=new Set();
function rgba(hex,a=1){const h=hex.replace('#','');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255,a};}
function token(k,a=1){a=Math.round(a*1000)/1000;const key=k+'@'+a;if(vars.has(key))return vars.get(key);const v=figma.variables.createVariable('color/'+k+(a===1?'':'/a'+Math.round(a*1000)),collection,'COLOR');v.scopes=['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'];v.setValueForMode(modeId,rgba(palette[k],a));v.setVariableCodeSyntax('WEB','var(--ht-'+k.replace(/[A-Z]/g,x=>'-'+x.toLowerCase())+(a===1?'':'-a'+Math.round(a*1000))+')');vars.set(key,v);return v;}
function p(k,a=1){const c=rgba(palette[k]),v=token(k,a);return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:c.r,g:c.g,b:c.b},opacity:1},'color',v);}
function g(stops){return{type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:stops.map(([position,k,a=1])=>({position,color:rgba(palette[k],a),boundVariables:{color:{type:'VARIABLE_ALIAS',id:token(k,a).id}}}))};}
const mirror=()=>g([[0,'gold'],[.09,'goldLight'],[.52,'gold'],[.85,'goldLight'],[1,'gold']]),dark=()=>g([[0,'ink'],[.5,'header'],[1,'ink']]),titleGold=()=>g([[0,'text'],[.25,'goldLight'],[.52,'gold'],[.82,'goldLight'],[1,'gold']]);
function sh(type,k,a,y,r,spread=0){return{type,color:rgba(palette[k],a),offset:{x:0,y},radius:r,spread,visible:true,blendMode:'NORMAL'};}
function effect(name,effects){const st=figma.createEffectStyle();st.name='P24/HT Polished Gold/'+name;st.effects=effects;fx.set(name,st);return st;}
const goldFx=effect('Mirror gold control',[sh('DROP_SHADOW','ink',.4,3,6),sh('DROP_SHADOW','goldDeep',.28,2,4),sh('INNER_SHADOW','bronze',.7,-2,3,.6),sh('INNER_SHADOW','goldRim',.8,-1,1,.8)]),
panelFx=effect('Dark metal panel',[sh('DROP_SHADOW','ink',.55,3,6),sh('INNER_SHADOW','goldLight',.13,1,0),sh('INNER_SHADOW','ink',.65,-1,0)]),
recessFx=effect('Recessed notice',[sh('INNER_SHADOW','ink',.95,2,4),sh('DROP_SHADOW','text',.08,1,0)]),
reliefFx=effect('Gold title relief',[sh('DROP_SHADOW','goldDeep',1,2,0),sh('DROP_SHADOW','ink',.9,4,3)]),
whiteFx=effect('White title depth',[sh('DROP_SHADOW','ink',.95,2,1)]);
const theme=source.clone();figma.currentPage.appendChild(theme);theme.name='HT Polished Gold · 24 기본형 고정 · 1920';theme.x=Math.max(...figma.currentPage.children.filter(n=>n.id!==theme.id).map(n=>n.x+n.width))+200;theme.y=100;theme.setExplicitVariableModeForCollection(collection,modeId);
function collect(n){if(!n.id.startsWith('I'))made.push(n.id);if('children'in n)n.children.forEach(collect);}collect(theme);
const all=[theme,...theme.findAll(()=>true)],noStroke=new Set(all.filter(n=>'strokes'in n&&Array.isArray(n.strokes)&&n.strokes.length===0).map(n=>n.id));
function maskTree(n){let q=n;while(q&&q.id!==theme.id){if('isMask'in q&&q.isMask)return true;q=q.parent;}return false;}
function context(n){let q=n,s='';while(q&&q.id!==theme.id){s+=' / '+q.name;q=q.parent;}return s;}
function mapColor(c,text){const hi=Math.max(c.r,c.g,c.b),lo=Math.min(c.r,c.g,c.b);if(c.r>c.g*.96&&c.g>c.b*1.23&&c.r-c.b>.09)return hi>.65?'gold':hi>.24?'goldDeep':'bronze';if(hi-lo<.075){if(text)return hi>.6?'text':hi>.3?'muted':'ink';return hi>.8?'text':hi>.4?'edge':hi>.2?'raised':hi>.12?'panel':hi>.065?'surface':'ink';}return null;}
function mapPaint(x,text=false){if(x.type==='SOLID'){const k=mapColor(x.color,text);return k?{...p(k,x.opacity??1),visible:x.visible!==false,blendMode:x.blendMode||'NORMAL'}:x;}if(x.type==='GRADIENT_LINEAR'||x.type==='GRADIENT_RADIAL')return{...x,gradientStops:x.gradientStops.map(s=>{const k=mapColor(s.color,text);return k?{...s,color:rgba(palette[k],s.color.a),boundVariables:{color:{type:'VARIABLE_ALIAS',id:token(k,s.color.a).id}}}:s;})};return x;}
function stroke(n,k,a=1){n.strokes=[p(k,a)];if(noStroke.has(n.id))n.strokeAlign='OUTSIDE';}
async function primary(n){n.fills=[mirror()];stroke(n,'goldRim',.85);await n.setEffectStyleIdAsync(goldFx.id);for(const t of n.findAllWithCriteria({types:['TEXT']})){t.fills=[p('ink')];changed.add(t.id);}for(const v of n.findAllWithCriteria({types:['VECTOR']})){v.strokes=v.strokes.map(x=>x.type==='SOLID'?p('ink'):x);changed.add(v.id);}changed.add(n.id);}
for(const n of all){if(maskTree(n))continue;const ctx=context(n);let touched=false;
 for(const field of ['fills','strokes'])if(field in n&&Array.isArray(n[field])&&n[field].length){const prev=n[field],next=prev.map(x=>mapPaint(x,n.type==='TEXT'));if(JSON.stringify(prev)!==JSON.stringify(next)){n[field]=next;touched=true;}}
 if(n.type==='INSTANCE'&&n.name.startsWith('Menu / ')){if(n.name==='Menu / 입금신청')await primary(n);else{n.fills=[p('panel')];stroke(n,'edge');n.effects=[];}touched=true;}
 if(n.type==='FRAME'&&n.name==='Section title'&&ctx.includes('Sidebar')){await primary(n);touched=true;}
 if(n.type==='TEXT'&&n.name==='Caption'&&ctx.includes('Sidebar')){n.fills=[p('ink')];n.effects=[];touched=true;}
 if('fills'in n&&Array.isArray(n.fills)&&n.name==='Image / deposit'&&ctx.includes('Menu / 입금신청')){n.fills=n.fills.map(x=>x.type==='IMAGE'?{...x,filters:{...(x.filters||{}),exposure:-.45,contrast:.25,saturation:-.25}}:x);touched=true;}
 if((n.type==='FRAME'&&n.name.startsWith('Entry · gold'))||(n.type==='FRAME'&&n.name==='Market count')||(n.type==='INSTANCE'&&['Join','Login'].includes(n.name))){await primary(n);touched=true;}
 if(n.type==='INSTANCE'&&['Anonymous','Quick links'].includes(n.name)){n.fills=[dark()];stroke(n,n.name==='Anonymous'?'gold':'edge');await n.setEffectStyleIdAsync(panelFx.id);touched=true;}
 if(n.type==='INSTANCE'&&n.name.startsWith('Notice · inline')){n.fills=[dark()];stroke(n,'edge',.8);await n.setEffectStyleIdAsync(recessFx.id);touched=true;}
 if(n.type==='INSTANCE'&&n.name.startsWith('SportsBetCard')){n.fills=[g([[0,'header'],[.45,'surface'],[1,'ink']])];stroke(n,'borderGold');await n.setEffectStyleIdAsync(panelFx.id);touched=true;}
 if(n.type==='FRAME'&&['Home result','Draw result','Away result','Home handicap','Away handicap','Under','Over'].includes(n.name)){n.fills=[g([[0,'raised'],[.15,'panel'],[1,'ink']])];stroke(n,'borderGold',.45);await n.setEffectStyleIdAsync(panelFx.id);touched=true;}
 if(n.type==='INSTANCE'&&n.name==='P19/Cards/Game'){n.fills=[p('ink')];stroke(n,'borderGold');await n.setEffectStyleIdAsync(panelFx.id);touched=true;}
 if(n.type==='FRAME'&&n.name==='Information'&&ctx.includes('Cards/Game')){n.fills=[dark()];touched=true;}
 if(n.type==='TEXT'&&n.name==='Title'&&ctx.includes('Cards/Game')){n.fills=[p('goldRim')];touched=true;}
 if(n.type==='INSTANCE'&&n.name.startsWith('P23-A0')){stroke(n,'gold',.72);await n.setEffectStyleIdAsync(panelFx.id);touched=true;}
 if(n.type==='TEXT'&&n.name==='Title'&&ctx.includes('P23-A0')){n.fills=[titleGold()];await n.setEffectStyleIdAsync(reliefFx.id);touched=true;}
 if(n.type==='TEXT'&&n.name==='Display · behind portrait'){n.fills=[];n.strokes=[mirror()];await n.setEffectStyleIdAsync(reliefFx.id);touched=true;}
 if(n.type==='TEXT'&&n.fontSize>=20&&!ctx.includes('P23-A0')){n.fills=[p('text')];await n.setEffectStyleIdAsync(whiteFx.id);touched=true;}
 if(touched)changed.add(n.id);
}
theme.fills=[p('page')];changed.add(theme.id);
const header=theme.children[0],image=header.children.find(n=>n.name.startsWith('Generated GoldFlow03')),fade=header.children.find(n=>n.name==='Readability fade');header.fills=[dark()];stroke(header,'edge');image.visible=false;fade.visible=false;changed.add(header.id);changed.add(image.id);changed.add(fade.id);
const sidebar=theme.findOne(n=>n.type==='INSTANCE'&&n.name.startsWith('Sidebar · Roomy'));sidebar.fills=[p('surface')];sidebar.strokes=[p('edge')];changed.add(sidebar.id);const compact=sidebar.children.find(n=>n.name==='Compact menu');compact.fills=[p('surface')];changed.add(compact.id);
const types=[];
for(const t of theme.findAllWithCriteria({types:['TEXT']})){if(maskTree(t))continue;const ctx=context(t),old=t.fontName;let font=old,indent=t.paragraphIndent;
 if(old.family==='Pretendard JP'){let weight=old.style;if(t.name==='Title'&&ctx.includes('P23-A0'))weight='Black';else if(t.fontSize>=20)weight='ExtraBold';else if(t.name==='Caption'&&ctx.includes('Sidebar')){weight='Bold';indent=8;}else if(t.name==='Label'&&ctx.includes('Menu / '))weight='SemiBold';font={family:'Pretendard JP',style:weight};}
 const key=JSON.stringify([font,t.fontSize,t.lineHeight,t.letterSpacing,indent]);let st=textStyles.get(key);if(!st){st=figma.createTextStyle();st.name='P24/HT Polished Gold/Typography/'+font.family+' '+font.style+' '+t.fontSize+(indent?' inset '+indent:'');st.fontName=font;st.fontSize=t.fontSize;st.lineHeight=t.lineHeight;st.letterSpacing=t.letterSpacing;st.paragraphIndent=indent;st.leadingTrim='NONE';st.textDecoration='NONE';textStyles.set(key,st);}
 const resize=t.textAutoResize;t.leadingTrim='NONE';t.fontName=font;t.paragraphIndent=indent;await t.setTextStyleIdAsync(st.id);t.textAutoResize=resize;types.push(t.id);changed.add(t.id);
}
const main=theme.findOne(n=>n.type==='FRAME'&&n.name==='Main content');
return{createdNodeIds:made,mutatedNodeIds:[...changed],frameId:theme.id,headerId:header.id,sidebarId:sidebar.id,mainId:main.id,bannerId:main.children[0].id,sportsCardId:main.findOne(n=>n.type==='INSTANCE'&&n.name.startsWith('SportsBetCard')).id,collectionId:collection.id,modeId,variables:Object.fromEntries([...vars].map(([k,v])=>[k,v.id])),textStyleIds:[...textStyles.values()].map(s=>s.id),effectStyleIds:Object.fromEntries([...fx].map(([k,v])=>[k,v.id])),palette,frameSize:[theme.width,theme.height],nodeCount:all.length,textCount:types.length,sourceHash:hash(snap(source,true)),ccHash:hash(snap(cc,true))};

