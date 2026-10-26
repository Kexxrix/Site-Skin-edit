await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('435:14043'));
const ids=['611:5577','611:5589','611:5666','611:5678','611:5755','611:5767'];
const headers=['611:5571','611:5583','611:5660','611:5672','611:5749','611:5761'];
const fonts=new Map();for(const id of ids){const n=await figma.getNodeByIdAsync(id);for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);}await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function digest(n){const a=[n,...n.findAll(()=>true)].map(c=>({id:c.id,name:c.name,type:c.type,x:c.x,y:c.y,w:c.width,h:c.height,fills:'fills'in c?c.fills:null,effects:'effects'in c?c.effects:null,text:c.type==='TEXT'?c.characters:null}));const s=JSON.stringify(a);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
const masters=[await figma.getNodeByIdAsync('484:3465'),await figma.getNodeByIdAsync('484:3549')];const masterBefore=masters.map(digest);
const out=[];
for(let i=0;i<ids.length;i++){
 const n=await figma.getNodeByIdAsync(ids[i]),h=await figma.getNodeByIdAsync(headers[i]),band=h.children.find(c=>c.name==='Single gold band'),dark=i%2===0;
 const before={x:n.x,y:n.y,w:n.width,h:n.height,groupBounds:band.children.map(c=>[c.name,c.x,c.y,c.width,c.height]),texts:n.findAllWithCriteria({types:['TEXT']}).map(t=>t.characters)};
 n.cornerRadius=14;n.clipsContent=true;n.paddingLeft=14;n.paddingRight=14;
 n.fills=[{type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:dark?[
 {position:0,color:{r:0,g:0,b:0,a:.58}},
 {position:.48,color:{r:0,g:0,b:0,a:.30}},
 {position:1,color:{r:1,g:1,b:1,a:.055}}
 ]:[
 {position:0,color:{r:.29,g:.26,b:.20,a:.22}},
 {position:.48,color:{r:.29,g:.26,b:.20,a:.08}},
 {position:1,color:{r:1,g:1,b:1,a:.20}}
 ]}];
 n.effects=dark?[
 {type:'INNER_SHADOW',color:{r:0,g:0,b:0,a:.80},offset:{x:0,y:3},radius:5,spread:0,visible:true,blendMode:'NORMAL'},
 {type:'INNER_SHADOW',color:{r:1,g:1,b:1,a:.15},offset:{x:0,y:-1},radius:1,spread:0,visible:true,blendMode:'NORMAL'}
 ]:[
 {type:'INNER_SHADOW',color:{r:.16,g:.13,b:.08,a:.25},offset:{x:0,y:2},radius:4,spread:0,visible:true,blendMode:'NORMAL'},
 {type:'INNER_SHADOW',color:{r:1,g:1,b:1,a:.78},offset:{x:0,y:-1},radius:1,spread:0,visible:true,blendMode:'NORMAL'}
 ];
 const after={x:n.x,y:n.y,w:n.width,h:n.height,groupBounds:band.children.map(c=>[c.name,c.x,c.y,c.width,c.height]),texts:n.findAllWithCriteria({types:['TEXT']}).map(t=>t.characters)};
 out.push({headerId:h.id,noticeId:n.id,theme:dark?'BlackGold':'WhiteGold',before,after,checks:{outerBoundsUnchanged:JSON.stringify(before.groupBounds)===JSON.stringify(after.groupBounds),copyUnchanged:JSON.stringify(before.texts)===JSON.stringify(after.texts),nativeInstance:n.type==='INSTANCE',height28:n.height===28,insetShadows:n.effects.length===2&&n.effects.every(e=>e.type==='INNER_SHADOW')},effects:n.effects,fills:n.fills,padding:[n.paddingLeft,n.paddingRight],cornerRadius:n.cornerRadius,mainComponentId:n.mainComponent.id});
}
return {mutatedNodeIds:ids,notices:out,sharedMasters:masters.map((n,i)=>({id:n.id,before:masterBefore[i],after:digest(n),unchanged:masterBefore[i]===digest(n)})),allPassed:out.every(n=>Object.values(n.checks).every(Boolean))&&masters.every((n,i)=>masterBefore[i]===digest(n))};
