function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
figma.skipInvisibleInstanceChildren=false;
const src=await figma.getNodeByIdAsync('795:1331'),dst=await figma.getNodeByIdAsync('840:3015');
const extras=new Set(),pairs=[],structural=[],geometry=[],textMetrics=[],content=[],images=[],masks=[],connections=[];
const near=(a,b)=>typeof a==='number'&&typeof b==='number'?Math.abs(a-b)<.01:eq(a,b);
function pair(a,b,path='root'){
 if(!b||a.type!==b.type){structural.push({path,source:a.id,target:b?.id,type:[a.type,b?.type]});return;}
 pairs.push([a,b]);
 const keys=['width','height','x','y','cornerRadius','topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius','layoutMode','layoutSizingHorizontal','layoutSizingVertical','paddingLeft','paddingRight','paddingTop','paddingBottom','itemSpacing','clipsContent','overflowDirection'];
 const diffs={};
 for(const k of keys){if(path==='root'&&(k==='x'||k==='y'))continue;if(k in a&&k in b&&!near(a[k],b[k]))diffs[k]=[a[k],b[k]];}
 if(Object.keys(diffs).length)(a.type==='TEXT'?textMetrics:geometry).push({source:a.id,target:b.id,name:a.name,diffs});
 if(a.type==='TEXT'&&a.characters!==b.characters)content.push({source:a.id,target:b.id});
 if('fills'in a&&typeof a.fills!=='symbol'){
  const x=a.fills.filter(p=>p.type==='IMAGE'),y=b.fills.filter(p=>p.type==='IMAGE');
  if(x.length){const same=(p,q)=>q&&p.imageHash===q.imageHash&&p.scaleMode===q.scaleMode&&eq(p.imageTransform,q.imageTransform)&&eq(p.scalingFactor,q.scalingFactor)&&eq(p.rotation,q.rotation);images.push({source:a.id,target:b.id,same:x.length===y.length&&x.every((p,i)=>same(p,y[i])),filtersChanged:!eq(x.map(p=>p.filters),y.map(p=>p.filters))});}
 }
 if('isMask'in a&&a.isMask){
  const signature=n=>({isMask:n.isMask,maskType:n.maskType,width:n.width,height:n.height,relativeTransform:n.relativeTransform,vectorPaths:'vectorPaths'in n?n.vectorPaths:undefined,children:'children'in n?n.children.map(signature):undefined});
  masks.push({source:a.id,target:b.id,same:eq(signature(a),signature(b))});
 }
 if('children'in a){const ac=a.children,bc=b.children.filter(c=>!extras.has(c.id));if(ac.length!==bc.length)structural.push({path,childCounts:[ac.length,bc.length]});for(let i=0;i<ac.length;i++)pair(ac[i],bc[i],path+'/'+i);}
}
pair(src,dst);
for(const[a,b]of pairs.filter(([n])=>n.type==='INSTANCE')){const x=await a.getMainComponentAsync(),y=await b.getMainComponentAsync();connections.push({source:a.id,target:b.id,master:x?.id,same:x?.id===y?.id});}
const visible=n=>{for(let p=n;p&&p.type!=='PAGE';p=p.parent)if(p.visible===false)return false;return true;};
const texts=pairs.filter(([a,b])=>b.type==='TEXT'&&visible(b)).map(([a,b])=>b);
const fontMap=new Map();for(const t of texts)for(const s of t.getStyledTextSegments(['fontName']))fontMap.set(JSON.stringify(s.fontName),s.fontName);
const fontLoads=await Promise.all([...fontMap.values()].map(async font=>{try{await figma.loadFontAsync(font);return{font,loaded:true};}catch(e){return{font,loaded:false,error:String(e)};}}));
const textProblems=texts.filter(n=>n.hasMissingFont||n.leadingTrim!=='NONE'||!n.textStyleId).map(n=>({id:n.id,name:n.name,missingFont:n.hasMissingFont,trim:n.leadingTrim,style:n.textStyleId}));
const collection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:840:3010');
const vars=await Promise.all(collection.variableIds.map(id=>figma.variables.getVariableByIdAsync(id)));
figma.skipInvisibleInstanceChildren=true;
const expected={"roots":[{"id":"795:1331","name":"A0 · 정밀 마스크 · 골드 그라데이션 · BlackGold · 1920","x":100,"y":100,"w":1920,"h":1819.199951171875,"hash":"51fe4fe6"},{"id":"803:1334","name":"CC Lime · 24 기본형 고정 · 1920","x":2220,"y":100,"w":1920,"h":1819.199951171875,"hash":"241213ca"},{"id":"818:1896","name":"HT Polished Gold · 24 기본형 고정 · 1920","x":4340,"y":100,"w":1920,"h":1819.199951171875,"hash":"41e9400"},{"id":"829:2453","name":"ZXC Navy Cyan · 24 기본형 고정 · 1920","x":6460,"y":100,"w":1920,"h":1819.199951171875,"hash":"9a273334"}],"masters":[{"id":"693:3257","name":"Theme=BlackGold","hash":"c4f72310"},{"id":"660:5998","name":"P19/Assets/Logo/BlackGold","hash":"4f7273c8"},{"id":"660:6000","name":"Theme=BlackGold, Step=1","hash":"4149997a"},{"id":"660:6080","name":"P19/Assets/HeaderIcon/megaphone","hash":"d8b07f76"},{"id":"693:3348","name":"Theme=BlackGold","hash":"ffa90821"},{"id":"660:6126","name":"Role=CheckIn, Theme=BlackGold, State=Default","hash":"eb621fff"},{"id":"660:6202","name":"P19/Assets/HeaderIcon/calendar-check","hash":"88bcd674"},{"id":"660:6132","name":"Role=Betting, Theme=BlackGold, State=Default","hash":"ad172410"},{"id":"660:6208","name":"P19/Assets/HeaderIcon/receipt-text","hash":"d3cf45ec"},{"id":"660:6138","name":"Role=Telegram, Theme=BlackGold, State=Default","hash":"5e85a260"},{"id":"660:6213","name":"P19/Assets/HeaderIcon/telegram","hash":"701cd03f"},{"id":"693:3389","name":"Theme=BlackGold, Action=Login","hash":"d1ec189"},{"id":"693:3391","name":"Theme=BlackGold, Action=Join","hash":"5f40d4cf"},{"id":"693:3393","name":"Theme=BlackGold, Action=Anonymous","hash":"d36dc2ba"},{"id":"652:6078","name":"Theme=BlackGold","hash":"cc37a67"},{"id":"652:6022","name":"Theme=BlackGold, State=Selected","hash":"57cea1f0"},{"id":"660:6228","name":"P19/Assets/GoldIcon/deposit","hash":"adea7115"},{"id":"660:6230","name":"P19/Assets/Grip","hash":"ec2a7b50"},{"id":"652:6014","name":"Theme=BlackGold, State=Default","hash":"7d014be0"},{"id":"660:6237","name":"P19/Assets/GoldIcon/withdraw","hash":"14ada16d"},{"id":"660:6239","name":"P19/Assets/GoldIcon/profile","hash":"4e540ef2"},{"id":"660:6241","name":"P19/Assets/GoldIcon/support","hash":"3165e743"},{"id":"660:6243","name":"P19/Assets/GoldIcon/mail","hash":"f57805e1"},{"id":"660:6245","name":"P19/Assets/GoldIcon/domestic","hash":"b71b935c"},{"id":"660:6247","name":"P19/Assets/GoldIcon/international","hash":"fb6bdfa0"},{"id":"660:6249","name":"P19/Assets/GoldIcon/esports","hash":"fcd8aec3"},{"id":"660:6251","name":"P19/Assets/GoldIcon/live","hash":"59ddb7d1"},{"id":"660:6253","name":"P19/Assets/GoldIcon/casino","hash":"67eb4bd2"},{"id":"660:6255","name":"P19/Assets/GoldIcon/slots","hash":"3eead559"},{"id":"660:6257","name":"P19/Assets/GoldIcon/notice","hash":"63282fc1"},{"id":"660:6259","name":"P19/Assets/GoldIcon/event","hash":"f9bb4ee2"},{"id":"660:6261","name":"P19/Assets/GoldIcon/rules","hash":"180a6019"},{"id":"771:650","name":"P23/Selected/A0/Payback","hash":"614be1f0"},{"id":"737:3544","name":"Tone=Ink","hash":"ad31d5c5"},{"id":"771:663","name":"P23/Selected/A0/Events","hash":"ed4c31a5"},{"id":"771:676","name":"P23/Selected/A0/DailyReward","hash":"f1072023"},{"id":"660:6301","name":"P19/Gateway/BlackGold/LiveCasino","hash":"39bdb0cb"},{"id":"660:6309","name":"P19/Gateway/BlackGold/Slots","hash":"cb4cb673"},{"id":"660:6317","name":"P19/Gateway/BlackGold/Sports","hash":"13efe79b"},{"id":"660:6325","name":"P19/Gateway/BlackGold/InPlay","hash":"12c3f6d5"},{"id":"660:6333","name":"P19/Content/SectionHeading","hash":"a4667d36"},{"id":"660:6343","name":"Theme=BlackGold","hash":"f08f348c"},{"id":"660:6434","name":"Theme=BlackGold","hash":"80c78582"},{"id":"660:6446","name":"P19/Partners/BlackGold","hash":"6f4f31b"}]};
const preserved=[];
for(const e of [...expected.roots,...expected.masters]){const n=await figma.getNodeByIdAsync(e.id),actual=hash(snap(n,true));preserved.push({id:e.id,expected:e.hash,actual,same:actual===e.hash});}
figma.skipInvisibleInstanceChildren=false;
const header=await figma.getNodeByIdAsync('840:3016');
figma.currentPage.selection=[dst];figma.viewport.scrollAndZoomIntoView([dst]);
return{
 frame:{id:dst.id,name:dst.name,x:dst.x,y:dst.y,width:dst.width,height:dst.height},
 counts:{pairedNodes:pairs.length,instances:connections.length,visibleTexts:texts.length,imageNodes:images.length,masks:masks.length,variables:vars.length,privateTextStyles:new Set(texts.map(n=>n.textStyleId)).size},
 structural,geometry,textMetrics,changedCopy:content,imageFailures:images.filter(x=>!x.same),imageFilterChanges:images.filter(x=>x.filtersChanged),masks,connectionFailures:connections.filter(x=>!x.same),preservationFailures:preserved.filter(x=>!x.same),preservedCount:preserved.filter(x=>x.same).length,
 textProblems,fontLoads,
 variableProblems:vars.filter(v=>v.scopes.includes('ALL_SCOPES')||!v.codeSyntax.WEB||v.valuesByMode[collection.defaultModeId]===undefined).map(v=>v.id),
 mainGap:(await figma.getNodeByIdAsync('840:3025')).itemSpacing,
 themeDetails:{headerBottomStroke:header.strokeBottomWeight,sectionBars:dst.findAll(n=>n.type==='INSTANCE'&&n.name==='P19/Content/SectionHeading'&&n.fills.some(p=>p.type==='GRADIENT_LINEAR')).length},
 mutatedNodeIds:[],createdNodeIds:[]
};
