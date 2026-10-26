
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
const NAME='16 · 07B Roomy · 44px / R6 / 확장 배너';
if(p.children.some(n=>n.name===NAME))throw new Error('Scoped component section already exists; inspect before retry');
const created=[],deleted=[],componentMap={},checks=[];
const sourceIds=['558:4749','558:4818','539:4179','539:4222','449:4147','449:4169','449:4191','449:4023','449:4045','449:4067','449:4206','449:4220','449:4234','449:4248','449:4082','449:4096','449:4110','449:4124','435:52710','435:52801'];
const sources=new Map();for(const id of sourceIds)sources.set(id,await figma.getNodeByIdAsync(id));
function all(n){return [n,...n.findAll(()=>true)];}
function digest(n){const s=JSON.stringify(all(n).map(c=>[c.id,c.name,c.type,c.x,c.y,c.width,c.height,c.type==='TEXT'?c.characters:null,'cornerRadius'in c?c.cornerRadius:null,'fills'in c?c.fills:null,c.boundVariables,'children'in c?c.children.map(x=>x.id):null]));let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0;}
const before=new Map([...sources].map(([id,n])=>[id,digest(n)]));
const fontMap=new Map();for(const n of sources.values())for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fontMap.set(JSON.stringify(seg.fontName),seg.fontName);
await Promise.all([...fontMap.values()].map(f=>figma.loadFontAsync(f)));
const radius=await figma.variables.getVariableByIdAsync('VariableID:261:563');
const coll=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:435:14044');
if((await figma.variables.getLocalVariablesAsync('FLOAT')).some(v=>v.name==='07BRoomy/row-height'))throw new Error('Scoped row token already exists');
const heightVar=figma.variables.createVariable('07BRoomy/row-height',coll,'FLOAT');heightVar.scopes=['WIDTH_HEIGHT'];heightVar.setVariableCodeSyntax('WEB','var(--p17-07b-row-height)');for(const m of coll.modes)heightVar.setValueForMode(m.modeId,44);
const section=figma.createSection();section.name=NAME;p.appendChild(section);section.x=100;section.y=Math.max(...p.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(4200,3340);
created.push(section.id);
function r6(n){n.cornerRadius=6;for(const f of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])n.setBoundVariable(f,radius);}
function register(n){created.push(...all(n).filter(c=>!c.id.startsWith('I')).map(c=>c.id));}
function cloneMain(id,name,x,y){const c=sources.get(id).clone();section.appendChild(c);c.name=name;c.x=x;c.y=y;return c;}
// Grid logic adapted from figma-generate-library/scripts/createComponentWithVariants.js.
function grid(set,cols,gap=24){for(let i=0;i<set.children.length;i++){const c=set.children[i];c.x=24+(i%cols)*(c.width+gap);c.y=24+Math.floor(i/cols)*(c.height+gap);}set.resize(Math.max(...set.children.map(c=>c.x+c.width))+24,Math.max(...set.children.map(c=>c.y+c.height))+24);}
const nav=sources.get('558:4749').clone();section.appendChild(nav);nav.name='P17/07BRoomy/NavigationItem';nav.x=40;nav.y=440;
for(const c of nav.children){c.resize(216,44);c.setBoundVariable('height',heightVar);r6(c);}
grid(nav,2,16);nav.description='44px menu row; original 13px text and 22px raster icon preserved. Radius 6px.';register(nav);
const navByName=new Map(nav.children.map(c=>[c.name,c]));
const side=sources.get('558:4818').clone();section.appendChild(side);side.name='P17/07BRoomy/Sidebar';side.x=600;side.y=440;r6(side.children[0]);r6(side.children[1]);
for(const c of side.children){
 const menu=c.children[0],heading=menu.children.find(n=>n.name==='Header');deleted.push(heading.id);heading.remove();
 const rows=c.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.mainComponent?.parent?.id==='558:4749');
 for(const row of rows){const mc=navByName.get(row.mainComponent.name);row.swapComponent(mc);row.resize(216,44);row.layoutSizingHorizontal='FILL';row.setBoundVariable('height',heightVar);r6(row);}
 const icons=rows.map(row=>row.children.find(n=>n.type==='INSTANCE'&&Object.values(n.componentPropertyReferences).some(v=>String(v).startsWith('Icon#'))));
 checks.push({role:'sidebar',theme:c.name,count:rows.length,all44:rows.every(r=>r.height===44),all22:icons.every(i=>i.width===22&&i.height===22),text13:rows.every(r=>r.findOne(n=>n.type==='TEXT').fontSize===13),headingRemoved:!c.findOne(n=>n.type==='TEXT'&&(n.characters==='전체 메뉴'||n.characters==='14'))});
}
grid(side,2,64);side.description='Roomy 44px rows, no 전체 메뉴 count header, original raster icons and typography. Independent source family.';register(side);
const accountClones=[],quickClones=[],headers=[];
for(let ti=0;ti<2;ti++){
 const theme=ti?'WhiteGold':'BlackGold',headerId=ti?'539:4222':'539:4179';
 const hc=cloneMain(headerId,'Theme='+theme,40+ti*2000,80);
 const band=hc.children[0],member=band.children.find(n=>n.name==='Member access'),quick=band.children.find(n=>n.name==='Quick links');
 for(const inst of member.children){
  const master=inst.mainComponent;const copy=master.clone();section.appendChild(copy);copy.name='Theme='+theme+', Action='+inst.name;copy.resize(inst.width,44);copy.fills=inst.fills;copy.strokes=inst.strokes;copy.effects=inst.effects;r6(copy);copy.description='07B Roomy account action; 44px height and 6px radius.';
  accountClones.push(copy);inst.swapComponent(copy);r6(inst);
 }
 const quickClone=quick.clone();section.appendChild(quickClone);const qc=figma.createComponentFromNode(quickClone);qc.name='Theme='+theme;r6(qc);quickClones.push(qc);
 const qi=qc.createInstance();band.insertChild(band.children.indexOf(quick),qi);qi.name='Quick links';qi.resize(quick.width,quick.height);qi.layoutSizingHorizontal='HUG';qi.layoutSizingVertical='FIXED';deleted.push(quick.id);quick.remove();
 hc.description='07B BronzeFlow with rectangular 6px account buttons and quick-link panel. Original order and header height preserved.';headers.push(hc);
}
const account=figma.combineAsVariants(accountClones,section);account.name='P17/07BRoomy/AccountButton';account.x=1100;account.y=240;grid(account,3,16);register(account);
const quickSet=figma.combineAsVariants(quickClones,section);quickSet.name='P17/07BRoomy/QuickLinks';quickSet.x=40;quickSet.y=240;grid(quickSet,2,24);register(quickSet);
const headerSet=figma.combineAsVariants(headers,section);headerSet.name='P17/07BRoomy/Header';headerSet.x=40;headerSet.y=40;grid(headerSet,2,80);register(headerSet);
const banners=[];
for(let ti=0;ti<2;ti++){
 const theme=ti?'WhiteGold':'BlackGold';
 const ids=ti?['449:4023','449:4045','449:4067']:['449:4147','449:4169','449:4191'];
 for(let ki=0;ki<3;ki++){
  const kind=['Payback','Events','DailyReward'][ki],srcId=ids[ki],c=cloneMain(srcId,'P17/07BRoomy/Banner/'+theme+'/'+kind,40+ki*570,1720+ti*340);
  const content=c.children[0],art=content.children.find(n=>n.name==='Artwork'),shade=content.children.find(n=>n.name==='Shade'),copy=content.children.find(n=>n.name==='Copy');
  const tag=copy.children.find(n=>n.name==='Tag'),type=copy.children.find(n=>n.name==='Typography'),action=copy.children.find(n=>n.name==='Action');
  const paint=art.fills.find(f=>f.type==='IMAGE'),size=await figma.getImageByHash(paint.imageHash).getSizeAsync(),artH=c.width*size.height/size.width,totalH=artH+80;
  c.resize(c.width,totalH);c.layoutSizingVertical='FIXED';c.clipsContent=true;r6(c);r6(content);content.clipsContent=true;
  art.layoutPositioning='AUTO';art.resize(c.width,artH);art.layoutSizingHorizontal='FILL';art.layoutSizingVertical='FIXED';
  art.fills=art.fills.map(f=>f.type==='IMAGE'?{...f,scaleMode:'FIT',imageTransform:[[1,0,0],[0,1,0]]}:f);
  if(shade){deleted.push(shade.id);shade.remove();}
  copy.layoutPositioning='AUTO';copy.name='Benefit details';copy.layoutMode='HORIZONTAL';copy.resize(c.width,80);copy.layoutSizingHorizontal='FILL';copy.layoutSizingVertical='FIXED';copy.primaryAxisAlignItems='SPACE_BETWEEN';copy.counterAxisAlignItems='CENTER';copy.paddingLeft=12;copy.paddingRight=12;copy.paddingTop=12;copy.paddingBottom=12;copy.itemSpacing=12;
  art.appendChild(tag);tag.x=12;tag.y=12;
  type.layoutSizingHorizontal='FIXED';type.layoutSizingVertical='HUG';
  action.layoutSizingHorizontal='HUG';action.layoutSizingVertical='FIXED';r6(action);
  c.description='Full uncropped '+size.width+'×'+size.height+' image at native aspect ratio above an 80px details area; 6px card radius.';
  componentMap[srcId]=c.id;register(c);banners.push({id:c.id,theme,kind,w:c.width,h:c.height,image:{hash:paint.imageHash,source:size,frame:{w:art.width,h:art.height},mode:art.fills.find(f=>f.type==='IMAGE').scaleMode},detailsHeight:copy.height});
 }
}
for(let ti=0;ti<2;ti++){
 const theme=ti?'WhiteGold':'BlackGold',ids=ti?['449:4082','449:4096','449:4110','449:4124']:['449:4206','449:4220','449:4234','449:4248'];
 for(let ki=0;ki<4;ki++){const id=ids[ki],c=cloneMain(id,'P17/07BRoomy/Gateway/'+theme+'/'+['LiveCasino','Slots','Sports','InPlay'][ki],40+ki*410+ti*1720,2540);r6(c);r6(c.children[0]);c.clipsContent=true;componentMap[id]=c.id;register(c);}
}
const cardSets=[];
for(const [sourceId,role,x]of [['435:52710','SportsCard',40],['435:52801','GameCard',1300]]){
 const comps=[];for(let ti=0;ti<2;ti++){const theme=ti?'WhiteGold':'BlackGold',c=cloneMain(sourceId,'Theme='+theme,x,2820);r6(c);c.clipsContent=true;c.setExplicitVariableModeForCollection(coll,ti?'435:0':'435:1');comps.push(c);}
 const set=figma.combineAsVariants(comps,section);set.name='P17/07BRoomy/'+role;set.x=x;set.y=2820;grid(set,2,40);cardSets.push({source:sourceId,setId:set.id,variants:comps.map(c=>({id:c.id,theme:c.name,r:c.cornerRadius}))});register(set);
}
const sourcePreserved=[...sources].every(([id,n])=>digest(n)===before.get(id));
return {createdNodeIds:[...new Set(created)],deletedNodeIds:deleted,mutatedNodeIds:[],createdVariableIds:[heightVar.id],section:{id:section.id,x:section.x,y:section.y,w:section.width,h:section.height},tokens:{radius:radius.id,rowHeight:heightVar.id},sets:{nav:nav.id,sidebar:side.id,header:headerSet.id,quickLinks:quickSet.id,account:account.id},componentMap,banners,cardSets,sidebarChecks:checks,sourcePreserved};

