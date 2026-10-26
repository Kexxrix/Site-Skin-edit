figma.skipInvisibleInstanceChildren=false;await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("435:14043"));
if(figma.currentPage.children.some(n=>n.name==="15 · LibraryGold · 아이콘 단독 원본"))throw Error("Free icon components already exist");
const section=figma.createSection();figma.currentPage.appendChild(section);section.name="15 · LibraryGold · 아이콘 단독 원본";section.x=100;section.y=Math.max(...figma.currentPage.children.filter(n=>n.id!==section.id).map(n=>n.y+n.height))+400;section.resizeWithoutConstraints(2200,1500);section.fills=[{type:"SOLID",color:{r:.12,g:.12,b:.12}}];
const createdNodeIds=[section.id],icons=[],specs=[{"id":"deposit","file":"01-deposit.png"},{"id":"withdraw","file":"02-withdraw.png"},{"id":"profile","file":"03-profile.png"},{"id":"support","file":"04-support.png"},{"id":"mail","file":"05-mail.png"},{"id":"domestic","file":"06-domestic.png"},{"id":"international","file":"07-international.png"},{"id":"esports","file":"08-esports.png"},{"id":"live","file":"09-live.png"},{"id":"casino","file":"10-casino.png"},{"id":"slots","file":"11-slots.png"},{"id":"notice","file":"12-notice.png"},{"id":"event","file":"13-event.png"},{"id":"rules","file":"14-rules.png"}];
for(const [i,s]of specs.entries()){
 const c=figma.createComponent();section.appendChild(c);c.name="P17/LibraryGoldFree/Icon/"+s.id;c.resize(64,64);c.x=64+(i%7)*112;c.y=100+Math.floor(i/7)*124;c.fills=[];c.strokes=[];c.clipsContent=false;
 c.description="기존 골드 입체 재질을 유지한 투명 PNG 단독 아이콘. 바깥 버튼 패널과 네모 프레임 없음. 28px 메뉴 슬롯에서 비율 유지.";
 const r=figma.createRectangle();c.appendChild(r);r.name="Image / "+s.id;r.resize(64,64);r.fills=[];r.strokes=[];r.constraints={horizontal:"SCALE",vertical:"SCALE"};
 createdNodeIds.push(c.id,r.id);icons.push({id:s.id,componentId:c.id,imageNodeId:r.id,key:c.key});
}
const oldNav=await figma.getNodeByIdAsync("435:51438");
return {createdNodeIds,mutatedNodeIds:[],sectionId:section.id,icons,sourceNav:oldNav.children.map(n=>({id:n.id,name:n.name,reactions:n.reactions.length})),sectionPosition:{x:section.x,y:section.y,w:section.width,h:section.height}};

