figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
const section=await figma.getNodeByIdAsync("550:4303"),oldNav=await figma.getNodeByIdAsync("435:51438"),oldSet=await figma.getNodeByIdAsync("435:48751"),sourceIds=["435:49186","435:49225"],assets=[{"id":"deposit","componentId":"550:4304","imageNodeId":"550:4305","key":"da49dcbbc2467364261a863438bf4614e84e5c2f"},{"id":"withdraw","componentId":"550:4306","imageNodeId":"550:4307","key":"99519f909fe1c439cd5547cee04a596c10da6a35"},{"id":"profile","componentId":"550:4308","imageNodeId":"550:4309","key":"37729367ae27acc4b6fac1707053443e39c06bd2"},{"id":"support","componentId":"550:4310","imageNodeId":"550:4311","key":"e1a35f548bb51bfa2b6e8b77739cefc4981e247e"},{"id":"mail","componentId":"550:4312","imageNodeId":"550:4313","key":"759039a1c996a826bc1782a51b14565c300b3355"},{"id":"domestic","componentId":"550:4314","imageNodeId":"550:4315","key":"0fd3808a185e0d501f76305af05d412821dde9d2"},{"id":"international","componentId":"550:4316","imageNodeId":"550:4317","key":"b1d833a73cd87243864c115be461b982d1dda798"},{"id":"esports","componentId":"550:4318","imageNodeId":"550:4319","key":"e0db6708ba1841673586754bf7dc20c42ecd03ca"},{"id":"live","componentId":"550:4320","imageNodeId":"550:4321","key":"f877c285771072769c32ba4282e6ef18980e864e"},{"id":"casino","componentId":"550:4322","imageNodeId":"550:4323","key":"95caaf19c74209e51ebb84743973fa238cd70ffa"},{"id":"slots","componentId":"550:4324","imageNodeId":"550:4325","key":"82347f662d6ce04b68e0679fe65d4f2255d8166a"},{"id":"notice","componentId":"550:4326","imageNodeId":"550:4327","key":"7df0eccd893405695d1453928fbbca8c2c1526c1"},{"id":"event","componentId":"550:4328","imageNodeId":"550:4329","key":"cd6f45360cf37f88f6ee12fa8a85b49152d49ec0"},{"id":"rules","componentId":"550:4330","imageNodeId":"550:4331","key":"b1951686f35b2ed425dfbcd8b3c0eae37580585a"}],specs=[{"id":"deposit","file":"01-deposit.png"},{"id":"withdraw","file":"02-withdraw.png"},{"id":"profile","file":"03-profile.png"},{"id":"support","file":"04-support.png"},{"id":"mail","file":"05-mail.png"},{"id":"domestic","file":"06-domestic.png"},{"id":"international","file":"07-international.png"},{"id":"esports","file":"08-esports.png"},{"id":"live","file":"09-live.png"},{"id":"casino","file":"10-casino.png"},{"id":"slots","file":"11-slots.png"},{"id":"notice","file":"12-notice.png"},{"id":"event","file":"13-event.png"},{"id":"rules","file":"14-rules.png"}];
if(section.children.some(n=>n.name==="P17/LibraryGoldFree/NavigationItem"))throw Error("Free sidebar already built");
const assetMap=Object.fromEntries(assets.map(a=>[a.id,a])),created=[],mutated=[];
function signature(root){const rows=[];function walk(n){const r=[n.id,n.name,n.type,n.x,n.y,n.width,n.height,n.visible];if("fills"in n)r.push(n.fills);if(n.type==="TEXT")r.push(n.characters);if(n.type==="INSTANCE")r.push(n.mainComponent.id,n.componentProperties);rows.push(r);if("children"in n)for(const c of n.children)walk(c);}walk(root);return JSON.stringify(rows);}
const beforeNav=signature(oldNav),beforeSources=await Promise.all(sourceIds.map(async id=>signature(await figma.getNodeByIdAsync(id)))),beforeSetDefs=JSON.stringify(oldSet.componentPropertyDefinitions);
const fonts={};for(const root of [oldNav,...await Promise.all(sourceIds.map(id=>figma.getNodeByIdAsync(id)))])for(const t of root.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts[JSON.stringify(s.fontName)]=s.fontName;
await Promise.all(Object.values(fonts).map(f=>figma.loadFontAsync(f)));
function physical(n){created.push(n.id);if(n.type!=="INSTANCE"&&"children"in n)for(const c of n.children)physical(c);}
function key(props,name){return Object.keys(props).find(k=>k.split("#")[0]===name);}
const nav=oldNav.clone();section.appendChild(nav);nav.name="P17/LibraryGoldFree/NavigationItem";nav.x=64;nav.y=450;
const iconKey=key(nav.componentPropertyDefinitions,"Icon");nav.editComponentProperty(iconKey,{defaultValue:assetMap.deposit.componentId,preferredValues:assets.map(a=>({type:"COMPONENT",key:a.key}))});
nav.description="기존 LibraryGold의 36px 메뉴·13px 텍스트·기본/호버/선택 상태를 유지. 독립 PNG 아이콘 28px. 기존 네모 배지 아이콘이나 원본 메뉴에 영향 없음.";
const navVariants=Object.fromEntries(nav.children.map(c=>[c.name,c]));
for(const c of nav.children){const icon=c.children.find(n=>n.name==="Icon");icon.swapComponent(await figma.getNodeByIdAsync(assetMap.deposit.componentId));icon.resize(28,28);c.description="기존 메뉴 레이아웃과 상태 유지. 바깥 네모 패널 없는 골드 입체 PNG 아이콘.";}
physical(nav);
const sidebars=[];
for(const [i,id]of sourceIds.entries()){
 const source=await figma.getNodeByIdAsync(id),theme=i===0?"WhiteGold":"BlackGold",c=source.clone();section.appendChild(c);c.name="Theme="+theme;
 const rows=c.findAll(n=>n.type==="INSTANCE"&&n.name.startsWith("Menu /"));
 if(rows.length!==14)throw Error("Menu count "+rows.length);
 for(const [j,row]of rows.entries()){
  const prior=row.componentProperties,label=prior[key(prior,"Label")].value,state=prior.State.value;
  row.swapComponent(navVariants["Theme="+theme+", State="+state]);
  const properties=row.componentProperties;row.setProperties({[key(properties,"Label")]:label,[key(properties,"Icon")]:assetMap[specs[j].id].componentId});
  row.resize(216,36);row.layoutSizingHorizontal="FILL";
 }
 c.description="LibraryGoldFree 추가안. 기존 LibraryGold 구조·간격·텍스트·선택 표현 유지, 14개 단독 골드 PNG 아이콘 적용. 네모 배지 프레임 없음. 1920 비교용.";
 sidebars.push({id:c.id,theme,menuCount:rows.length,w:c.width,h:c.height});physical(c);
}
const sidebarSet=figma.combineAsVariants(await Promise.all(sidebars.map(s=>figma.getNodeByIdAsync(s.id))),section);sidebarSet.name="P17/Sidebar/LibraryGoldFree";sidebarSet.x=1020;sidebarSet.y=100;sidebarSet.children.forEach((c,i)=>{c.x=24+i*296;c.y=24;});sidebarSet.resizeWithoutConstraints(600,1168);sidebarSet.description="기존 채택안 보존. 패널 없는 골드 입체 아이콘 추가안, WhiteGold/BlackGold. Swap instance로 기존 LibraryGold와 교체 가능.";created.push(sidebarSet.id);
function label(value,x,y,size=16){const n=figma.createText();section.appendChild(n);n.fontName={family:"Pretendard JP",style:"Medium"};n.fontSize=size;n.characters=value;n.leadingTrim="NONE";n.fills=[{type:"SOLID",color:{r:.85,g:.8,b:.66}}];n.x=x;n.y=y;created.push(n.id);return n;}
label("LIBRARY GOLD FREE · 단독 아이콘 · 기존 채택안 보존",64,32,22);label("기본 / 호버 / 선택 · 2개 스킨 · 기존 행 높이 36px",64,410);
for(const [i,a]of assets.entries())label(a.id,64+(i%7)*112,178+Math.floor(i/7)*124,12);
const existingSourcesUnchanged=(await Promise.all(sourceIds.map(async(id,i)=>signature(await figma.getNodeByIdAsync(id))===beforeSources[i]))).every(Boolean);
return {createdNodeIds:created,mutatedNodeIds:mutated,sectionId:section.id,navSetId:nav.id,navVariants:nav.children.map(c=>({id:c.id,name:c.name})),sidebarSetId:sidebarSet.id,sidebars,iconMap:assetMap,summary:{icons:assets.length,navStates:nav.children.length,sidebarThemes:sidebars.length,existingSourcesUnchanged,existingNavUnchanged:signature(oldNav)===beforeNav,existingSidebarSetPropertiesUnchanged:JSON.stringify(oldSet.componentPropertyDefinitions)===beforeSetDefs}};

