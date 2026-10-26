figma.skipInvisibleInstanceChildren=false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("347:553"));
for(const style of ["Medium","SemiBold","Bold"])await figma.loadFontAsync({family:"Pretendard JP",style});
const overview=await figma.getNodeByIdAsync("488:17986"),board=await figma.getNodeByIdAsync("488:17987");
const defs=[{"id":"539:4093","layout":"07A BronzeFlat","label":"브론즈 플랫","theme":"BlackGold","w":1920,"h":88,"paintStyleId":"S:c10485959c173000279f00bef908046167b86948,","fillType":"SOLID","capsule":44,"authHeights":[44,44,44]},{"id":"539:4136","layout":"07A BronzeFlat","label":"브론즈 플랫","theme":"WhiteGold","w":1920,"h":88,"paintStyleId":"S:c10485959c173000279f00bef908046167b86948,","fillType":"SOLID","capsule":44,"authHeights":[44,44,44]},{"id":"539:4179","layout":"07B BronzeFlow","label":"브론즈 가로 흐름","theme":"BlackGold","w":1920,"h":88,"paintStyleId":"S:1841aa7ef1bde32415bd2d7169f879796a98d8c1,","fillType":"GRADIENT_LINEAR","capsule":44,"authHeights":[44,44,44]},{"id":"539:4222","layout":"07B BronzeFlow","label":"브론즈 가로 흐름","theme":"WhiteGold","w":1920,"h":88,"paintStyleId":"S:1841aa7ef1bde32415bd2d7169f879796a98d8c1,","fillType":"GRADIENT_LINEAR","capsule":44,"authHeights":[44,44,44]},{"id":"539:4265","layout":"07C WarmGraphite","label":"웜 그라파이트 플랫","theme":"BlackGold","w":1920,"h":88,"paintStyleId":"S:27d8ee0a6ad905e24c08773c7e998000303626ba,","fillType":"SOLID","capsule":44,"authHeights":[44,44,44]},{"id":"539:4308","layout":"07C WarmGraphite","label":"웜 그라파이트 플랫","theme":"WhiteGold","w":1920,"h":88,"paintStyleId":"S:27d8ee0a6ad905e24c08773c7e998000303626ba,","fillType":"SOLID","capsule":44,"authHeights":[44,44,44]},{"id":"539:4351","layout":"07D StoneFlow","label":"스톤 가로 흐름","theme":"BlackGold","w":1920,"h":88,"paintStyleId":"S:c5b05f5702798b8ffaca2beb08094cf317f57637,","fillType":"GRADIENT_LINEAR","capsule":44,"authHeights":[44,44,44]},{"id":"539:4394","layout":"07D StoneFlow","label":"스톤 가로 흐름","theme":"WhiteGold","w":1920,"h":88,"paintStyleId":"S:c5b05f5702798b8ffaca2beb08094cf317f57637,","fillType":"GRADIENT_LINEAR","capsule":44,"authHeights":[44,44,44]}];
if(overview.children.some(n=>n.name.startsWith("07A ·")))throw Error("Muted comparisons already exist");
const createdNodeIds=[],mutatedNodeIds=new Set(),fullScreens=[],overviewInstances=[];
function physical(n){const out=[n.id];if(n.type!=="INSTANCE"&&"children"in n)for(const ch of n.children)out.push(...physical(ch));return out;}
function label(parent,text,x,y,size=18){const n=figma.createText();parent.appendChild(n);n.fontName={family:"Pretendard JP",style:"Bold"};n.fontSize=size;n.characters=text;n.leadingTrim="NONE";n.fills=[{type:"SOLID",color:{r:.85,g:.80,b:.66}}];n.x=x;n.y=y;createdNodeIds.push(n.id);return n;}
function signature(n){const rows=[];function walk(node){const a=[node.name,node.type,node.x,node.y,node.width,node.height];if(node.type==="TEXT")a.push(node.characters);if("fills"in node&&Array.isArray(node.fills))a.push(node.fills.filter(p=>p.type==="IMAGE").map(p=>p.imageHash));rows.push(a);if(node.type!=="INSTANCE"&&"children"in node)for(const c of node.children)walk(c);}walk(n);return JSON.stringify(rows);}
for(let i=0;i<defs.length;i++){
 const d=defs[i],direction=Math.floor(i/2),white=d.theme==="WhiteGold";
 const main=await figma.getNodeByIdAsync(d.id),inst=main.createInstance();overview.appendChild(inst);
 inst.name=d.layout.slice(0,3)+" · "+d.label+" · "+d.theme;inst.x=white?2064:64;inst.y=206+(10+direction)*232;
 createdNodeIds.push(inst.id);overviewInstances.push({id:inst.id,main:d.id,theme:d.theme,layout:d.layout});
 if(!white)label(overview,d.layout.slice(0,3)+" · "+d.label+" · 88px",64,172+(10+direction)*232);
 const source=await figma.getNodeByIdAsync(white?"489:30362":"489:29716"),originalBody=source.children.find(n=>n.type==="FRAME"&&n.name==="Page shell");
 const frame=source.clone();board.appendChild(frame);frame.name=d.layout.slice(0,3)+" · "+d.label+" · "+d.theme+" · LibraryGold · 1920";
 frame.x=64+direction*2000;frame.y=8792+(white?2140:0);
 const header=frame.children.find(n=>n.type==="INSTANCE"&&n.name.startsWith("Header"));
 header.swapComponent(main);header.removeOverrides();header.name="Header · "+d.label;header.resize(1920,88);header.layoutSizingHorizontal="FILL";
 const clonedBody=frame.children.find(n=>n.type==="FRAME"&&n.name==="Page shell");
 const sourceSignature=signature(originalBody),clonedSignature=signature(clonedBody);
 createdNodeIds.push(...physical(frame));
 label(board,d.layout.slice(0,3)+" · "+d.label+" · "+d.theme,frame.x,frame.y-34,20);
 fullScreens.push({id:frame.id,headerId:header.id,main:d.id,layout:d.layout,theme:d.theme,w:frame.width,h:frame.height,bodyIdentical:sourceSignature===clonedSignature});
}
overview.resizeWithoutConstraints(4048,3508);overview.name="10 · 헤더 14종 · 빠른 비교";mutatedNodeIds.add(overview.id);
board.resizeWithoutConstraints(10048,13080);board.name="11 · 1920 전체 화면 · 헤더 14종 × 2개 스킨";mutatedNodeIds.add(board.id);
for(const parent of [overview,board])for(const t of parent.children.filter(n=>n.type==="TEXT")){
 for(const segment of t.getStyledTextSegments(["fontName"]))await figma.loadFontAsync(segment.fontName);
 const previous=t.characters;
 t.characters=t.characters.replace("10 SELECTED DIRECTIONS","14 HEADER DIRECTIONS").replace("단일 행 헤더 10종","단일 행 헤더 14종").replace("10개 헤더 구조","14개 헤더 구조").replace("20개 전체 화면","28개 전체 화면").replace("10 · 계정 우선","10 · 계정 캡슐");
 if(t.characters!==previous)mutatedNodeIds.add(t.id);
}
for(const frame of board.children.filter(n=>n.type==="FRAME"&&n.name.startsWith("10 ·"))){frame.name=frame.name.replace("계정 우선","계정 캡슐");mutatedNodeIds.add(frame.id);}
return {createdNodeIds,mutatedNodeIds:[...mutatedNodeIds],overviewId:overview.id,fullBoardId:board.id,overviewInstances,fullScreens,summary:{addedFullScreens:fullScreens.length,fullScreens:board.children.filter(n=>n.type==="FRAME").length,bodyUnchanged:fullScreens.every(n=>n.bodyIdentical)}};

