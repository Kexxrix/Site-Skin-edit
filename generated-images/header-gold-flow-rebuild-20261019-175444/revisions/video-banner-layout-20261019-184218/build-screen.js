await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('347:553'));
const page=figma.currentPage;if(page.children.some(n=>n.name==='17 · 07B 동영상 + 상단 배너 · 가독성 개선'))throw Error('Revised video screen already exists');
const source=await figma.getNodeByIdAsync('618:65586');const fonts=new Map();for(const t of source.findAllWithCriteria({types:['TEXT']}))for(const f of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(f.fontName),f.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function digest(n){const s=JSON.stringify([n,...n.findAll(()=>true)].map(c=>({id:c.id,type:c.type,name:c.name,x:c.x,y:c.y,w:c.width,h:c.height,fills:'fills'in c?c.fills:null,text:c.type==='TEXT'?c.characters:null})));let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
const before=digest(source);
const section=figma.createSection();section.name='17 · 07B 동영상 + 상단 배너 · 가독성 개선';section.x=100;section.y=Math.max(...page.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(2048,2500);section.fills=[{type:'SOLID',color:{r:.12,g:.12,b:.12}}];
const screen=source.clone();section.appendChild(screen);screen.name='07B 동영상배너 · 3:1 이미지 / 여백 개선 · 1920';screen.x=64;screen.y=64;
const main=screen.children[1].children[1],gateway=main.children[0],hero=gateway.children[0],column=hero.children[0],video=hero.children[1];
const videoBefore=JSON.stringify(video.fills);const cardH=523/3,heroH=cardH*3+24;
hero.name='Video hero · Benefits + film';hero.resize(1592,heroH);hero.layoutSizingHorizontal='FILL';hero.layoutSizingVertical='FIXED';hero.primaryAxisSizingMode='FIXED';hero.counterAxisSizingMode='FIXED';hero.itemSpacing=12;hero.counterAxisAlignItems='MIN';
column.name='Benefit banners · 3:1';column.resize(523,heroH);column.layoutSizingHorizontal='FIXED';column.layoutSizingVertical='FILL';column.itemSpacing=12;column.primaryAxisAlignItems='MIN';
const oldCards=[...column.children],componentIds=['623:5570','623:5582','623:5594'],cards=[];
for(let i=0;i<3;i++){
 const mainComponent=await figma.getNodeByIdAsync(componentIds[i]),old=oldCards[i],instance=mainComponent.createInstance();column.insertChild(i,instance);
 const props={};for(const[k,v]of Object.entries(old.componentProperties)){if(mainComponent.componentPropertyDefinitions[k]&&['TEXT','BOOLEAN'].includes(v.type))props[k]=v.value;}if(Object.keys(props).length)instance.setProperties(props);
 instance.name='Benefit / '+['Payback','Events','DailyReward'][i]+' · Video companion';instance.resize(523,cardH);instance.layoutSizingHorizontal='FILL';instance.layoutSizingVertical='FIXED';old.remove();cards.push({id:instance.id,mainComponentId:mainComponent.id,w:instance.width,h:instance.height});
}
video.name='Hero film · native video';video.resize(1057,heroH);video.layoutSizingHorizontal='FILL';video.layoutSizingVertical='FILL';
section.resizeWithoutConstraints(2048,screen.height+128);figma.viewport.scrollAndZoomIntoView([screen]);
const all=[section,screen,...screen.findAll(()=>true)];return{section:{id:section.id,name:section.name,x:section.x,y:section.y,w:section.width,h:section.height},screen:{id:screen.id,name:screen.name,w:screen.width,h:screen.height},hero:{id:hero.id,w:hero.width,h:hero.height,gap:hero.itemSpacing,columnId:column.id,columnW:column.width,columnH:column.height},video:{id:video.id,w:video.width,h:video.height,paintUnchanged:JSON.stringify(video.fills)===videoBefore,fill:video.fills},cards,createdNodeIds:all.filter(n=>!n.id.startsWith('I')).map(n=>n.id),sourceBefore:before,sourceAfter:digest(source),sourceUnchanged:before===digest(source)};
