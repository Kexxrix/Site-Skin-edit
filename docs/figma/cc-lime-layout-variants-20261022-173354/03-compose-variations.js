function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

const page=await figma.getNodeByIdAsync("919:7490");await figma.setCurrentPageAsync(page);figma.skipInvisibleInstanceChildren=false;
await Promise.all([{"family":"Pretendard JP","style":"Medium"},{"family":"Pretendard JP","style":"SemiBold"},{"family":"Pretendard JP","style":"Bold"},{"family":"Bebas Neue","style":"Regular"},{"family":"Pretendard JP","style":"ExtraBold"},{"family":"Pretendard JP","style":"Regular"},{"family":"Noto Sans KR","style":"Medium","variationSettings":{"wght":500}},{"family":"Noto Sans KR","style":"Bold","variationSettings":{"wght":700}},{"family":"Noto Sans KR","style":"Black","variationSettings":{"wght":900}},{"family":"Noto Sans KR","style":"Regular","variationSettings":{"wght":400}},{"family":"Pretendard JP","style":"Black"},{"family":"Noto Serif KR","style":"SemiBold","variationSettings":{"wght":600}}].map(f=>figma.loadFontAsync(f)));
const created=new Set(),changed=new Set(),reports=[];
const A=await figma.getNodeByIdAsync("919:7491"),B=await figma.getNodeByIdAsync("920:7490");
const mark=n=>{changed.add(n.id);return n;},made=n=>{created.add(n.id);return n;};
const named=(n,s)=>n.findOne(x=>x.name===s);
const sizes=[{"hash":"2fa5dfe44d019e8cca72ce1c0ca2213fe3d79a30","size":{"width":1672,"height":941}},{"hash":"f85e41a37edafdd9fcc8792b59ab28a5efddafee","size":{"width":1672,"height":941}},{"hash":"879de2364abc7facf3c36d646671c106af30ffcd","size":{"width":1672,"height":941}},{"hash":"2ff81b73ccff1aab1dad54afc948d836e274f5cf","size":{"width":1983,"height":793}},{"hash":"d4c4d93e9054def962fbcee4db556fa8c75c5b8e","size":{"width":935,"height":272}},{"hash":"2fe402079880854b29e6ca46785f5f91b22e59b5","size":{"width":1983,"height":793}},{"hash":"2d71c1cf12a31aea50b03aa07be10b3fdb985889","size":{"width":935,"height":272}},{"hash":"f3524ba5f9c1d4a03c3ebbf60129316dd118ab4d","size":{"width":1916,"height":821}},{"hash":"c1eafa0c3a64f66d472e3cf08f28973855944d44","size":{"width":935,"height":272}},{"hash":"621066c11aa2f0672a3cdcd749aca27aaa0db9cb","size":{"width":1983,"height":793}},{"hash":"98b742be0ce98485ac65848a1e7a9749778cb611","size":{"width":935,"height":272}}];
const sourceTitle=named(A,"Title"),entrySource=named(A,"Entry · gold Solid");
const sourceLabel=entrySource.findOne(n=>n.type==="TEXT");
const paintTitle=JSON.parse(JSON.stringify(sourceTitle.fills)),paintEntry=JSON.parse(JSON.stringify(entrySource.fills)),paintEdge=JSON.parse(JSON.stringify(entrySource.strokes));
const textPaint=[{type:"SOLID",color:{r:.9607843,g:.9647059,b:.945098},boundVariables:{color:{type:"VARIABLE_ALIAS",id:"VariableID:803:1963"}}}];
function al(name,dir,parent,w,h){const n=made(figma.createAutoLayout(dir));parent.appendChild(n);n.name=name;n.fills=[];n.strokes=[];n.resize(w,h);n.primaryAxisSizingMode="AUTO";n.counterAxisSizingMode="FIXED";n.itemSpacing=0;return n;}
function frame(name,parent,w,h){const n=made(figma.createFrame());parent.appendChild(n);n.name=name;n.fills=[];n.strokes=[];n.resize(w,h);n.clipsContent=false;return n;}
function clone(n,parent){const c=n.clone();parent.appendChild(c);created.add(c.id);if("findAll"in c)for(const x of c.findAll(()=>true))created.add(x.id);return c;}
function label(parent,text,w,size=12){const t=clone(sourceLabel,parent);t.characters=text;t.fontSize=size;t.lineHeight={unit:"PIXELS",value:size+6};t.letterSpacing={unit:"PIXELS",value:0};t.fills=textPaint;t.textAutoResize="HEIGHT";t.resize(w,size+6);return t;}
function crop(p,w,h,cx=.62){if(p.type!=="IMAGE")return p;const s=sizes.find(x=>x.hash===p.imageHash)?.size;if(!s)return {...p,scaleMode:"FILL"};const imageR=s.width/s.height,targetR=w/h;if(targetR>=imageR)return {...p,scaleMode:"CROP",imageTransform:[[1,0,0],[0,imageR/targetR,0]]};const f=targetR/imageR;return {...p,scaleMode:"CROP",imageTransform:[[f,0,Math.max(0,Math.min(1-f,cx-f/2))],[0,1,0]]};}
function box(n,x,y,w,h){mark(n);n.resize(w,h);n.x=x;n.y=y;}
function hero(card,w,h,size="large"){
 mark(card);card.resize(w,h);card.layoutSizingHorizontal="FIXED";card.layoutSizingVertical="FIXED";
 const photo=named(card,"Photo · current image");box(photo,0,0,w,h);photo.fills=photo.fills.map(p=>crop(p,w,h));
 for(const name of ["Overlay · readability","Overlay · lower contrast","Click target · full card"]){const n=named(card,name);box(n,0,0,w,h);}
 const mask=named(card,"Portrait in front · native mask");mark(mask).visible=false;
 const display=named(card,"Display · behind portrait"),title=named(card,"Title"),entry=named(card,"Entry · gold Solid");
 const small=size==="small";mark(display);display.visible=!small;
 if(!small){display.fontSize=size==="large"?104:88;display.lineHeight={unit:"PIXELS",value:size==="large"?116:100};display.letterSpacing={unit:"PIXELS",value:1};display.textAutoResize="NONE";box(display,32,32,w-64,size==="large"?116:100);display.opacity=.7;}
 mark(title);title.textAutoResize="HEIGHT";title.fontSize=small?24:size==="large"?42:36;title.lineHeight={unit:"PIXELS",value:small?32:size==="large"?54:46};box(title,small?16:32,h-(small?56:size==="large"?156:138),w-(small?32:64),small?32:size==="large"?54:46);
 mark(entry);entry.visible=!small;if(!small)box(entry,32,h-(size==="large"?88:76),size==="large"?190:180,size==="large"?44:40);
 return card;
}
function gateway(card,w,h,mode){
 mark(card);card.resize(w,h);card.layoutSizingHorizontal="FIXED";card.layoutSizingVertical="FIXED";
 const content=named(card,"카드 콘텐츠");mark(content);content.resize(w,h);
 const art=named(content,"Artwork"),shade=named(content,"Shade"),rasterTitle=named(content,"타이틀이미지"),title=content.children.find(n=>n.type==="TEXT"&&n.name==="Title"),tag=content.children.find(n=>n.name==="Tag"&&n.type==="FRAME");
 for(const n of [art,shade,rasterTitle,title,tag])mark(n);
 if(mode==="square"){
  box(art,0,0,w,h);art.fills=art.fills.map(p=>crop(p,w,h,.5));box(shade,0,0,w,h);
  rasterTitle.visible=true;box(rasterTitle,16,h-82,w-32,(w-32)*272/935);
  title.visible=false;tag.visible=false;
 }else{
  box(art,0,0,132,h);art.fills=art.fills.map(p=>crop(p,132,h,.5));box(shade,0,0,146,h);
  rasterTitle.visible=false;title.visible=true;title.layoutPositioning="ABSOLUTE";title.fontSize=18;title.lineHeight={unit:"PIXELS",value:26};title.fills=paintTitle;title.textAutoResize="HEIGHT";box(title,150,30,w-190,26);
  tag.visible=true;tag.layoutPositioning="ABSOLUTE";tag.fills=[];box(tag,150,10,w-190,16);
  const tt=tag.findOne(n=>n.type==="TEXT");mark(tt);tt.fontSize=10;tt.lineHeight={unit:"PIXELS",value:14};tt.letterSpacing={unit:"PIXELS",value:.7};tt.fills=textPaint;tt.textAutoResize="HEIGHT";box(tt,0,0,w-190,14);
 }
 return card;
}
async function scroll(button,target){mark(button);await button.setReactionsAsync([{trigger:{type:"ON_CLICK"},actions:[{type:"NODE",destinationId:target.id,navigation:"SCROLL_TO",transition:{type:"SCROLL_ANIMATE",easing:{type:"EASE_OUT"},duration:.35}}]}]);}
async function pager(parent,targets,labels,compact=false){
 const row=al("Benefit selector · scroll targets","HORIZONTAL",parent,compact?108:520,32);row.itemSpacing=compact?6:8;row.counterAxisAlignItems="CENTER";row.layoutSizingVertical="FIXED";row.layoutSizingHorizontal="FIXED";
 for(let i=0;i<targets.length;i++){
  const btn=al("Select "+labels[i],"HORIZONTAL",row,compact?32:168,32);btn.primaryAxisAlignItems="CENTER";btn.counterAxisAlignItems="CENTER";btn.layoutSizingHorizontal="FIXED";btn.layoutSizingVertical="FIXED";btn.cornerRadius=6;btn.fills=compact&&i===0?paintEntry:[{type:"SOLID",color:{r:.09019608,g:.0980392,b:.11372549},boundVariables:{color:{type:"VARIABLE_ALIAS",id:"VariableID:803:1951"}}}];btn.strokes=paintEdge;btn.strokeWeight=1;
  const t=label(btn,compact?String(i+1).padStart(2,"0"):labels[i],compact?20:146,compact?11:12);t.textAlignHorizontal="CENTER";await scroll(btn,targets[i]);
 }
 return row;
}
function topInsert(main,n){const first=main.children.findIndex(c=>c.id!==n.id&&c.layoutPositioning!=="ABSOLUTE");main.insertChild(first<0?main.children.length-1:first,n);mark(main);}
function artFit(root){
 const art=root.children.find(n=>n.name.includes("Cyberpunk artwork"));
 mark(art);art.resize(root.width,root.height);
 const scout=named(art,"CC Lime · Original feline scout robot");mark(scout);scout.y=root.height-224;
 const bg=named(art,"CC Lime · Generated neon city background");mark(bg);bg.resize(root.width,root.height);
}
function lowerChecks(root,old){return ["Sports betting","🎥 라이브 카지노","🎰 슬롯 로비","Partners · Flexible centered grid · BlackGold"].map(name=>{const n=named(root,name);return {name,id:n.id,hash:hash(snap(n,true)),sameAsBefore:hash(snap(n,true))===old[name]};});}
const lowerBefore={};for(const root of [A,B]){lowerBefore[root.id]={};for(const name of ["Sports betting","🎥 라이브 카지노","🎰 슬롯 로비","Partners · Flexible centered grid · BlackGold"]){const n=named(root,name);lowerBefore[root.id][name]=hash(snap(n,true));}}
{
 const root=A,main=named(root,"Main content"),benefits=named(main,"Benefits · P23-A0"),gate=named(main,"콘텐츠 바로가기 / Section"),cards=[...benefits.children],grid=named(gate,"콘텐츠 카드 / Grid"),gateCards=[...grid.children];
 const top=al("A · Solo hero and square gateway dock","HORIZONTAL",main,1592,588);top.itemSpacing=16;top.layoutSizingHorizontal="FILL";top.layoutSizingVertical="FIXED";
 const heroWrap=frame("Solo hero · 1024 × 588",top,1024,588);heroWrap.layoutSizingHorizontal="FIXED";heroWrap.layoutSizingVertical="FIXED";
 heroWrap.appendChild(benefits);mark(benefits);benefits.name="Single banner viewport · horizontal";benefits.layoutMode="NONE";benefits.resize(1024,588);benefits.x=0;benefits.y=0;benefits.clipsContent=true;benefits.overflowDirection="HORIZONTAL";
 const track=al("Hero slide track · three existing benefits","HORIZONTAL",benefits,3096,588);track.x=0;track.y=0;track.itemSpacing=12;track.layoutSizingHorizontal="HUG";track.layoutSizingVertical="FIXED";
 for(const c of cards){track.appendChild(c);hero(c,1024,588,"large");}
 const nav=await pager(heroWrap,cards,["페이백 포인트","회원 이벤트","데일리 리워드"],true);nav.x=884;nav.y=530;
 top.appendChild(gate);mark(gate);gate.resize(552,588);gate.layoutSizingHorizontal="FIXED";gate.layoutSizingVertical="HUG";gate.itemSpacing=8;
 mark(grid);grid.layoutMode="VERTICAL";grid.itemSpacing=16;grid.resize(552,552);grid.layoutSizingHorizontal="FILL";grid.layoutSizingVertical="HUG";
 for(let r=0;r<2;r++){const row=al("Square gateway row "+(r+1),"HORIZONTAL",grid,552,268);row.itemSpacing=16;row.layoutSizingHorizontal="FILL";row.layoutSizingVertical="FIXED";for(let c=0;c<2;c++){const item=gateCards[r*2+c];row.appendChild(item);gateway(item,268,268,"square");}}
 topInsert(main,top);mark(root);root.clipsContent=true;artFit(root);
 reports.push({rootId:root.id,name:root.name,mainId:main.id,topId:top.id,heroViewportId:benefits.id,heroTrackId:track.id,gatewayId:gate.id,selectorId:nav.id,width:root.width,height:root.height,lowerChecks:lowerChecks(root,lowerBefore[root.id]),slideIds:cards.map(c=>c.id)});
}
{
 const root=B,main=named(root,"Main content"),benefits=named(main,"Benefits · P23-A0"),gate=named(main,"콘텐츠 바로가기 / Section"),cards=[...benefits.children],grid=named(gate,"콘텐츠 카드 / Grid"),gateCards=[...grid.children];
 const wrap=al("B · Center-focus carousel","VERTICAL",main,1592,464);wrap.itemSpacing=12;wrap.layoutSizingHorizontal="FILL";wrap.layoutSizingVertical="HUG";
 wrap.appendChild(benefits);mark(benefits);benefits.name="Center-focus viewport · horizontal scroll";benefits.layoutMode="NONE";benefits.resize(1592,420);benefits.clipsContent=true;benefits.overflowDirection="HORIZONTAL";benefits.layoutSizingHorizontal="FILL";benefits.layoutSizingVertical="FIXED";
 const track=al("Carousel track · three center-focus stops","HORIZONTAL",benefits,4128,420);track.itemSpacing=16;track.counterAxisAlignItems="CENTER";track.layoutSizingHorizontal="HUG";track.layoutSizingVertical="FIXED";track.x=0;track.y=0;
 const pay=cards[0],ev=cards[1],reward=cards[2];
 track.appendChild(ev);hero(ev,324,332,"small");
 track.appendChild(pay);hero(pay,912,420,"center");
 track.appendChild(reward);hero(reward,324,332,"small");
 const evLarge=clone(ev,track);evLarge.name="Events · center focus";hero(evLarge,912,420,"center");
 const paySmall=clone(pay,track);paySmall.name="Payback · side preview";hero(paySmall,324,332,"small");
 const rewardLarge=clone(reward,track);rewardLarge.name="Daily reward · center focus";hero(rewardLarge,912,420,"center");
 const evTail=clone(ev,track);evTail.name="Events · side preview";hero(evTail,324,332,"small");
 const anchors=[];
 for(let i=0;i<3;i++){const anchor=frame("Center focus stop "+(i+1),track,1592,420);anchor.layoutPositioning="ABSOLUTE";anchor.x=i*1268;anchor.y=0;anchors.push(anchor);}
 const controls=al("Carousel navigation · three benefits","HORIZONTAL",wrap,1592,32);controls.layoutSizingHorizontal="FILL";controls.layoutSizingVertical="FIXED";controls.primaryAxisAlignItems="CENTER";controls.counterAxisAlignItems="CENTER";
 const nav=await pager(controls,anchors,["페이백 포인트","회원 이벤트","데일리 리워드"]);
 const links=[[ev,1],[reward,2],[paySmall,0],[evTail,1]];
 for(const [card,i]of links)await scroll(named(card,"Click target · full card"),anchors[i]);
 topInsert(main,wrap);
 mark(grid);grid.itemSpacing=11;grid.resize(1592,72);grid.layoutSizingHorizontal="FILL";grid.layoutSizingVertical="HUG";
 for(const card of gateCards)gateway(card,389.75,72,"bar");
 mark(root);root.clipsContent=true;artFit(root);
 reports.push({rootId:root.id,name:root.name,mainId:main.id,topId:wrap.id,heroViewportId:benefits.id,heroTrackId:track.id,gatewayId:gate.id,selectorId:nav.id,width:root.width,height:root.height,lowerChecks:lowerChecks(root,lowerBefore[root.id]),slideIds:[ev,pay,reward,evLarge,paySmall,rewardLarge,evTail].map(c=>c.id),scrollAnchors:anchors.map(n=>({id:n.id,x:n.x,width:n.width}))});
}
const srcPage=await figma.getNodeByIdAsync("795:1330");page.backgrounds=srcPage.backgrounds;mark(page);
const title=label(page,"25 · CC Lime — 레이아웃 바리에이션",3900,28);title.x=100;title.y=48;title.lineHeight={unit:"PIXELS",value:40};
const subtitle=label(page,"원본 보존 · 기존 이미지 재사용 · A: 단일 히어로 + 2×2 정사각형 · B: 중앙 강조 스크롤 + 슬림 바로가기",3900,16);subtitle.x=100;subtitle.y=104;
const capA=label(page,"A · 단일 히어로 / 2×2 스퀘어 도크",1920,20);capA.x=100;capA.y=170;
const capB=label(page,"B · 중앙 강조 캐러셀 / 72px 슬림 바",1920,20);capB.x=2220;capB.y=170;
return {createdNodeIds:[...created],mutatedNodeIds:[...changed],pageId:page.id,reports};

