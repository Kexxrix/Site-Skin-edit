
const p=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(p);
const NAME='15 · 07B Roomy · 44px / R6 / 확장 배너 · 1920';
if(p.children.some(n=>n.name===NAME))throw new Error('Target comparison exists; inspect before retry');
const map={"449:4147":"573:5820","449:4169":"573:5832","449:4191":"573:5844","449:4023":"573:5856","449:4045":"573:5868","449:4067":"573:5880","449:4206":"573:5892","449:4220":"573:5900","449:4234":"573:5908","449:4248":"573:5916","449:4082":"573:5924","449:4096":"573:5932","449:4110":"573:5940","449:4124":"573:5948"},setIds={"nav":"573:4953","sidebar":"573:5022","header":"573:5819","quickLinks":"573:5818","account":"573:5817"},cards=[{"source":"435:52710","setId":"573:6046","variants":[{"id":"573:5956","theme":"Theme=BlackGold","r":6},{"id":"573:6001","theme":"Theme=WhiteGold","r":6}]},{"source":"435:52801","setId":"573:6059","variants":[{"id":"573:6047","theme":"Theme=BlackGold","r":6},{"id":"573:6053","theme":"Theme=WhiteGold","r":6}]}];
const rootIds=['564:39068','564:39853'];
function all(n){return [n,...n.findAll(()=>true)];}
function hash(n){const s=JSON.stringify(all(n).map(c=>[c.id,c.name,c.type,c.x,c.y,c.width,c.height,c.type==='TEXT'?c.characters:null,'fills'in c?c.fills:null,'cornerRadius'in c?c.cornerRadius:null,c.boundVariables]));let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0;}
const sources=[];const fonts=new Map();
for(const id of rootIds){const n=await figma.getNodeByIdAsync(id);sources.push({n,before:hash(n)});for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);}
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const headerSet=await figma.getNodeByIdAsync(setIds.header),sideSet=await figma.getNodeByIdAsync(setIds.sidebar);
const radius=await figma.variables.getVariableByIdAsync('VariableID:261:563');
function r6(n){n.cornerRadius=6;for(const f of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])n.setBoundVariable(f,radius);}
const section=figma.createSection();section.name=NAME;p.appendChild(section);section.x=100;section.y=Math.max(...p.children.filter(n=>n.id!==section.id&&n.x<5000).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(4048,2200);
const created=[section.id],deleted=[],screens=[];
const captionSource=await figma.getNodeByIdAsync('564:39067');
for(let ti=0;ti<2;ti++){
 const theme=ti?'WhiteGold':'BlackGold',source=sources[ti].n,screen=source.clone();section.appendChild(screen);screen.name='07B Roomy · '+theme+' · 44px / 22px / R6 · 1920';screen.x=64+ti*2000;screen.y=124;
 const cap=captionSource.clone();section.appendChild(cap);cap.characters='07B Roomy · '+theme+' · 44px 행 / R6 / 확장 배너';cap.name=cap.characters;cap.x=screen.x;cap.y=80;created.push(cap.id);
 const oldHeader=screen.children[0],shell=screen.children[1],rail=shell.children[0],main=shell.children[1];
 const headerMain=headerSet.children.find(c=>c.name==='Theme='+theme),header=headerMain.createInstance();screen.insertChild(0,header);header.name='Header · 07B Roomy · R6';header.resize(1920,88);header.layoutSizingHorizontal='FILL';header.layoutSizingVertical='HUG';deleted.push(oldHeader.id);oldHeader.remove();
 const oldSide=rail.children[0],sideMain=sideSet.children.find(c=>c.name==='Theme='+theme),side=sideMain.createInstance();rail.insertChild(0,side);side.name='Sidebar · Roomy 44px · Icon 22px';side.resize(232,oldSide.height+82);side.layoutSizingHorizontal='FILL';side.layoutSizingVertical='FIXED';deleted.push(oldSide.id);oldSide.remove();
 const swaps=[];
 const instances=main.findAllWithCriteria({types:['INSTANCE']}).filter(n=>!n.id.startsWith('I'));
 for(const inst of instances){
  const oldId=inst.mainComponent?.id;
  let newId=map[oldId];
  const card=cards.find(c=>c.source===oldId);if(card)newId=card.variants.find(v=>v.theme==='Theme='+theme).id;
  if(!newId)continue;
  const old={w:inst.width,h:inst.height,sh:inst.layoutSizingHorizontal,sv:inst.layoutSizingVertical,text:inst.findAllWithCriteria({types:['TEXT']}).map(t=>t.characters),images:inst.findAll(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>c.fills.find(f=>f.type==='IMAGE').imageHash)};
  const master=await figma.getNodeByIdAsync(newId);inst.swapComponent(master);inst.resize(old.w,master.name.includes('/Banner/')?256:old.h);inst.layoutSizingHorizontal=old.sh;inst.layoutSizingVertical=old.sv;r6(inst);
  const newText=inst.findAllWithCriteria({types:['TEXT']}).map(t=>t.characters),newImages=inst.findAll(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>c.fills.find(f=>f.type==='IMAGE').imageHash);
  const sameContent=JSON.stringify([...old.text].sort())===JSON.stringify([...newText].sort())&&JSON.stringify([...old.images].sort())===JSON.stringify([...newImages].sort());
  swaps.push({id:inst.id,oldMain:oldId,newMain:inst.mainComponent.id,name:inst.name,r:inst.cornerRadius,h:inst.height,contentPreserved:sameContent});
 }
 const menuRows=side.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.mainComponent?.parent?.id===setIds.nav);
 const icons=menuRows.map(row=>row.children.find(c=>c.type==='INSTANCE'&&Object.values(c.componentPropertyReferences).some(v=>String(v).startsWith('Icon#'))));
 const band=header.children[0],quick=band.children.find(c=>c.name==='Quick links'),accounts=band.children.find(c=>c.name==='Member access').children;
 const banners=main.children[0].children.map(b=>{const art=b.findOne(n=>n.name==='Artwork');return {id:b.id,h:b.height,r:b.cornerRadius,art:{w:art.width,h:art.height,mode:art.fills.find(f=>f.type==='IMAGE').scaleMode},details:b.findOne(n=>n.name==='Benefit details').height};});
 const checks={width1920:screen.width===1920,header88:header.height===88,allRows44:menuRows.length===14&&menuRows.every(r=>r.height===44),allIcons22:icons.every(i=>i.width===22&&i.height===22),text13:menuRows.every(r=>r.findOne(n=>n.type==='TEXT').fontSize===13),noMenuCount:!side.findOne(n=>n.type==='TEXT'&&(n.characters==='전체 메뉴'||n.characters==='14')),allCardR6:swaps.every(s=>s.r===6),allContentPreserved:swaps.every(s=>s.contentPreserved),headerControlsR6:quick.cornerRadius===6&&accounts.every(a=>a.cornerRadius===6),allBanners256Fit:banners.length===3&&banners.every(b=>b.h===256&&b.art.mode==='FIT'),sidebarBannerAligned:Math.abs(side.absoluteTransform[1][2]-main.children[0].absoluteTransform[1][2])<0.01};
 register:for(const n of all(screen).filter(n=>!n.id.startsWith('I')))created.push(n.id);
 screens.push({id:screen.id,name:screen.name,theme,w:screen.width,h:screen.height,header:header.id,sidebar:side.id,banners,swaps,checks});
}
const preserved=sources.every(s=>hash(s.n)===s.before);
return {createdNodeIds:[...new Set(created)],mutatedNodeIds:[],deletedNodeIds:deleted,section:{id:section.id,x:section.x,y:section.y,w:section.width,h:section.height},screens,originalSection14Preserved:preserved,allChecksPassed:preserved&&screens.every(s=>Object.values(s.checks).every(Boolean))};

