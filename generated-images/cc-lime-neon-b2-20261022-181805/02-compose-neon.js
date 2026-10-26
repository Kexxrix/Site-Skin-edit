const page=await figma.getNodeByIdAsync("919:7490");await figma.setCurrentPageAsync(page);figma.skipInvisibleInstanceChildren=false;
for(const font of [{"family":"Noto Sans KR","style":"Medium","variationSettings":{"wght":500}},{"family":"Noto Sans KR","style":"Bold","variationSettings":{"wght":700}},{"family":"Bebas Neue","style":"Regular"},{"family":"Noto Sans KR","style":"Black","variationSettings":{"wght":900}},{"family":"Pretendard JP","style":"Bold"},{"family":"Noto Sans KR","style":"Regular","variationSettings":{"wght":400}}])await figma.loadFontAsync(font);
const root=await figma.getNodeByIdAsync("937:1767"),top=await figma.getNodeByIdAsync("937:1783");
const createdNodeIds=[],mutatedNodeIds=[root.id,top.id],removedNodeIds=[],heroSlots=[],gatewaySlots=[];
const c=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const solid=(h,opacity=1)=>({type:"SOLID",color:c(h),opacity});
const white="#F2FFE5",lime="#C6FF45",ink="#07110B",soft="#CBDECF";
const fontBlack={"family":"Noto Sans KR","style":"Black","variationSettings":{"wght":900}};
const fontBold={"family":"Noto Sans KR","style":"Bold","variationSettings":{"wght":700}};
const fontReg={"family":"Noto Sans KR","style":"Regular","variationSettings":{"wght":400}};
function add(parent,n,name,x,y,w,h){parent.appendChild(n);n.name=name;n.resize(w,h);if(parent.layoutMode&&parent.layoutMode!=="NONE")n.layoutPositioning="ABSOLUTE";n.x=x;n.y=y;createdNodeIds.push(n.id);return n;}
function rect(parent,name,x,y,w,h,fills){const n=add(parent,figma.createRectangle(),name,x,y,w,h);n.fills=fills;return n;}
function text(parent,name,chars,x,y,w,h,size,font=fontBold,color=white,line=size*1.35){const n=add(parent,figma.createText(),name,x,y,w,h);n.fontName=font;n.fontSize=size;n.lineHeight={unit:"PIXELS",value:line};n.characters=chars;n.fills=[solid(color)];n.textAutoResize="NONE";return n;}
function overlay(parent,w,h,strong=.9){return rect(parent,"Overlay · contrast / separate layer",0,0,w,h,[{type:"GRADIENT_LINEAR",gradientTransform:[[1,0,0],[0,1,0]],gradientStops:[{position:0,color:{...c(ink),a:strong}},{position:.48,color:{...c(ink),a:.62}},{position:.8,color:{...c(ink),a:.02}},{position:1,color:{...c(ink),a:0}}]}]);}
function clear(n){for(const ch of [...n.children]){removedNodeIds.push(ch.id,...("findAll"in ch?ch.findAll(()=>true).map(x=>x.id):[]));ch.remove();}}
const arrowTemplate=await figma.getNodeByIdAsync("930:2137");
function arrow(parent,x,y){const a=arrowTemplate.clone();parent.appendChild(a);a.name="Arrow · original vector instance";if(parent.layoutMode&&parent.layoutMode!=="NONE")a.layoutPositioning="ABSOLUTE";a.x=x;a.y=y;createdNodeIds.push(a.id,...a.findAll(()=>true).map(n=>n.id));return a;}
const data={
 Payback:{key:"hero-payback",label:"페이백 포인트",kicker:"01 / PAYBACK VAULT",title:"페이백\n포인트",desc:"콤프와 페이백 포인트를\n한곳에서 확인하세요.",cta:"포인트 확인하기"},
 Events:{key:"hero-events",label:"회원 이벤트",kicker:"02 / MEMBER ACCESS",title:"회원만의\n새로운 이벤트",desc:"진행 중인 혜택과 참여 조건을\n한눈에 확인하세요.",cta:"이벤트 살펴보기"},
 DailyReward:{key:"hero-reward",label:"데일리 리워드",kicker:"03 / DAILY DROP",title:"매일 만나는\n데일리 리워드",desc:"출석 체크로 매일 이어지는\n보상을 만나보세요.",cta:"리워드 확인하기"}
};
const cardConfig=[{"id":"937:1787","role":"Events"},{"id":"937:1801","role":"Payback"},{"id":"937:1815","role":"DailyReward"},{"id":"937:1829","role":"Events"},{"id":"937:1843","role":"Payback"},{"id":"937:1857","role":"DailyReward"},{"id":"937:1871","role":"Events"}];
for(const cfg of cardConfig){
 const card=await figma.getNodeByIdAsync(cfg.id),d=data[cfg.role],small=card.width<500;
 const oldPhoto=card.findOne(n=>n.name==="Photo · current image"),fallback=oldPhoto.fills.filter(p=>p.type==="IMAGE");
 const oldHit=card.findOne(n=>n.name==="Click target · full card"),reactions=oldHit?.reactions?JSON.parse(JSON.stringify(oldHit.reactions)):[];
 clear(card);card.name=(small?"Preview":"Hero")+" / "+cfg.role+" · Neon District";card.layoutMode="NONE";card.clipsContent=true;card.cornerRadius=6;card.fills=[solid(ink)];card.strokes=[solid("#9DBD6B",small?.3:.5)];card.strokeWeight=1;mutatedNodeIds.push(card.id);
 const photo=rect(card,"Photo · "+d.key+" / generated",0,0,card.width,card.height,fallback);photo.constraints={horizontal:"SCALE",vertical:"SCALE"};
 overlay(card,card.width,card.height,small?.6:.92);
 text(card,"Eyebrow / editable",d.kicker,small?22:36,small?24:34,small?280:400,22,small?11:12,fontBold,lime,20);
 if(small){
  text(card,"Title / editable",d.label,22,238,280,38,24,fontBlack,white,34);
  text(card,"Preview navigation hint","중앙으로 이동",22,289,230,22,12,fontReg,soft,20);
 }else{
  const fs=cfg.role==="Payback"?46:40;
  text(card,"Title / editable",d.title,36,82,430,124,fs,fontBlack,white,fs+11);
  text(card,"Description / editable",d.desc,36,226,370,54,15,fontReg,soft,24);
  const b=add(card,figma.createFrame(),"CTA · lime access",36,326,190,44);b.layoutMode="NONE";b.cornerRadius=4;b.fills=[solid(lime)];b.strokes=[solid("#E3FFB3",.7)];b.strokeWeight=1;
  text(b,"CTA label / editable",d.cta,14,11,146,22,14,fontBold,ink,22);arrow(b,158,12);
 }
 const hit=rect(card,"Click target · preview focus",0,0,card.width,card.height,[]);if(reactions.length)await hit.setReactionsAsync(reactions);
 heroSlots.push({nodeId:photo.id,cardId:card.id,key:d.key,role:cfg.role,small,width:card.width,height:card.height});
}
const section=await figma.getNodeByIdAsync("937:1896"),grid=await figma.getNodeByIdAsync("937:1898"),heading=await figma.getNodeByIdAsync("937:1897");
heading.characters="플레이 게이트웨이";mutatedNodeIds.push(section.id,grid.id,heading.id);
grid.resize(1592,124);grid.layoutSizingVertical="FIXED";section.resize(1592,160);section.layoutSizingVertical="HUG";
const gateways=[{"id":"937:1899","key":"gateway-casino","en":"LIVE CASINO","ko":"라이브 카지노"},{"id":"937:1907","key":"gateway-slots","en":"SLOT DISTRICT","ko":"슬롯"},{"id":"937:1915","key":"gateway-sports","en":"SPORTS ARENA","ko":"스포츠"},{"id":"937:1923","key":"gateway-inplay","en":"IN-PLAY LIVE","ko":"인플레이"}];
for(const g of gateways){
 const card=await figma.getNodeByIdAsync(g.id),old=card.findOne(n=>"fills"in n&&typeof n.fills!=="symbol"&&n.fills.some(p=>p.type==="IMAGE"));
 const fallback=old.fills.filter(p=>p.type==="IMAGE");
 clear(card);card.layoutMode="NONE";card.resize(389.75,124);card.layoutSizingHorizontal="FILL";card.layoutSizingVertical="FIXED";card.cornerRadius=6;card.clipsContent=true;card.fills=[solid(ink)];card.strokes=[solid("#9DBD6B",.5)];card.strokeWeight=1;mutatedNodeIds.push(card.id);
 const photo=rect(card,"Photo · "+g.key+" / generated · full bleed",0,0,389.75,124,fallback);photo.constraints={horizontal:"SCALE",vertical:"SCALE"};overlay(card,389.75,124,.9);
 text(card,"Eyebrow / editable",g.en,20,21,280,18,11,fontBold,lime,18);
 text(card,"Title / editable",g.ko,20,47,280,36,23,fontBlack,white,32);
 const a=add(card,figma.createFrame(),"Entry affordance · lime square",341.75,80,28,28);a.cornerRadius=4;a.fills=[solid(lime)];arrow(a,4,4);
 rect(card,"Click target · full image",0,0,389.75,124,[]);
 gatewaySlots.push({nodeId:photo.id,cardId:card.id,key:g.key,width:389.75,height:124});
}
for(const [id,label] of [["937:1890","01  페이백 포인트"],["937:1892","02  회원 이벤트"],["937:1894","03  데일리 리워드"]]){
 const n=await figma.getNodeByIdAsync(id),t=n.findOne(x=>x.type==="TEXT");t.characters=label;t.fontSize=12;mutatedNodeIds.push(t.id);
}
top.resize(1592,640);top.layoutSizingHorizontal="FILL";top.layoutSizingVertical="HUG";top.name="Top layout · B2 Neon District · generated art";
const decor=root.children.find(n=>n.name.includes("Cyberpunk artwork"));if(decor){decor.resize(root.width,root.height);mutatedNodeIds.push(decor.id);}
const result={createdNodeIds,mutatedNodeIds,removedNodeIds,rootId:root.id,topId:top.id,width:root.width,height:root.height,heroSlots,gatewaySlots};
return result;
