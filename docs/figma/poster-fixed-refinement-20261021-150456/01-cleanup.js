await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("737:3542"));

function normalize(v){if(typeof v==='number')return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(normalize);if(v&&typeof v==='object'){const o={};for(const k of Object.keys(v).sort())o[k]=normalize(v[k]);return o;}return v;}
function renderSnapshot(n,ignoreRootXY=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:n.opacity};if(!ignoreRootXY){r.x=n.x;r.y=n.y;}for(const k of ['fills','strokes','effects','cornerRadius','layoutMode','layoutSizingHorizontal','layoutSizingVertical','paddingLeft','paddingRight','paddingTop','paddingBottom','itemSpacing','clipsContent','overflowDirection'])if(k in n&&typeof n[k]!=='symbol')r[k]=n[k];if(n.type==='TEXT'){r.characters=n.characters;r.fonts=n.getStyledTextSegments(['fontName','fontSize','lineHeight','letterSpacing']);r.leadingTrim=n.leadingTrim;}if('children'in n)r.children=n.children.map(c=>renderSnapshot(c));return normalize(r);}
function digest(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}

const page=figma.currentPage,created=[],mutated=[],removed=[];
const roots=["739:975","739:1838","739:2586","739:3309","739:4050"];
const discardSources=["738:554","738:582","738:659","738:699"];
const discardMasters=["738:555","738:564","738:573","738:583","738:597","738:611","738:660","738:673","738:686","738:700","738:711","738:721"];
function pageOf(n){for(let p=n;p;p=p.parent)if(p.type==="PAGE")return p.id;return null;}
for(const id of discardMasters){const n=await figma.getNodeByIdAsync(id);for(const i of await n.getInstancesAsync())if(!i.id.startsWith("I")&&pageOf(i)!==page.id)throw Error("External user instance: "+i.id);}
const fonts=new Map();for(const t of page.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const preserved=[];for(const id of ["693:3446","693:3503","693:4772","693:4826","738:625"]){const n=await figma.getNodeByIdAsync(id);preserved.push({id,name:n.name,type:n.type,hash:n.type==="SECTION"?digest(n.children.map(c=>renderSnapshot(c))):digest(renderSnapshot(n,true))});}
function erase(n){if(!n)return;removed.push({id:n.id,name:n.name,type:n.type});n.remove();}
for(const id of roots)erase(await figma.getNodeByIdAsync(id));
const summary=await figma.getNodeByIdAsync("742:3825");for(const n of [...summary.children])erase(n);summary.name="00 · C 포스터 · 고정 크기 5안 한눈에 비교";mutated.push(summary.id);
for(const id of discardMasters){const n=await figma.getNodeByIdAsync(id);if((await n.getInstancesAsync()).some(i=>!i.id.startsWith("I")))throw Error("Unexpected remaining instance for "+id);}
for(const id of discardSources)erase(await figma.getNodeByIdAsync(id));
const guide=await figma.getNodeByIdAsync("737:3551");for(const n of [...guide.children])erase(n);guide.name="00 · C 포스터 발전 · 기존 크기 고정 / 미채택";mutated.push(guide.id);
page.name="22 · C 포스터 · 고정 크기 5종 비교";mutated.push(page.id);
const legacyStyleNames=["P22/BannerStudy/Editorial","P22/BannerStudy/Ticket","P22/BannerStudy/Focus","P22/BannerStudy/Compact"];
const removedStyles=[];for(const style of await figma.getLocalTextStylesAsync())if(legacyStyleNames.includes(style.name)&&!page.findOne(n=>n.type==="TEXT"&&n.textStyleId===style.id)){removedStyles.push({id:style.id,name:style.name});style.remove();}
for(const style of await figma.getLocalEffectStylesAsync())if(style.name==="P22/BannerStudy/SoftLift"&&!page.findOne(n=>"effectStyleId"in n&&n.effectStyleId===style.id)){removedStyles.push({id:style.id,name:style.name});style.remove();}
return{createdNodeIds:created,mutatedNodeIds:mutated,removedRootNodes:removed,removedStyles,preserved,pageId:page.id,pageName:page.name,cReferenceSectionId:"738:625",summaryId:summary.id,guideId:guide.id,discardedMasterIds:discardMasters};
