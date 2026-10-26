
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("347:552"));figma.skipInvisibleInstanceChildren=false;
for(const f of [{family:"Font Awesome 6 Free",style:"Solid"},{family:"Pretendard JP",style:"Medium"},{family:"Pretendard JP",style:"SemiBold"}])await figma.loadFontAsync(f);
const mutated=[],removed=[],createdStyles=[];
const nav=await figma.getNodeByIdAsync("349:652");
for(const c of nav.children){const icon=c.children.find(n=>n.name==="Icon");icon.fontSize=16;mutated.push(icon.id);
if(c.variantProperties.Style==="Showcase"&&c.variantProperties.State==="Selected"){
const lower=c.children.find(n=>n.name==="Selected / lower gold light");if(lower){removed.push(lower.id);lower.remove();}
c.effects=[];mutated.push(c.id);
}}
const side=await figma.getNodeByIdAsync("351:1352");
const gap=await figma.variables.getVariableByIdAsync("VariableID:347:569");
const collection=await figma.variables.getVariableCollectionByIdAsync("VariableCollectionId:347:554");
for(const c of side.children){
if(c.variantProperties.Style==="Spine"){c.setBoundVariable("itemSpacing",gap);c.minHeight=631;mutated.push(c.id);}
if(c.variantProperties.Style==="HUD"){
const rail=c.findOne(n=>n.name==="Category rail");for(const icon of rail.findAll(n=>n.type==="TEXT"&&n.name==="Icon")){icon.fontSize=16;mutated.push(icon.id);}}
if(c.variantProperties.Style==="Showcase"){
for(const tile of c.findAll(n=>n.type==="INSTANCE"&&n.name.startsWith("Benefit /"))){tile.setExplicitVariableModeForCollection(collection,c.variantProperties.Theme==="WhiteGold"?"347:0":"347:1");mutated.push(tile.id);}
}}
function smallStyle(name,weight){const s=figma.createTextStyle();s.name="BIT365 ReferenceSidebar/Index/"+name;s.fontName={family:"Pretendard JP",style:weight};s.fontSize=13;s.lineHeight={unit:"PIXELS",value:20};s.letterSpacing={unit:"PIXELS",value:0};createdStyles.push(s.id);return s;}
const counter=smallStyle("Counter","Medium"),heading=smallStyle("Heading","SemiBold");
const sections=await figma.getNodeByIdAsync("350:754");
for(const c of sections.children){const h=c.children.find(n=>n.name==="Section title");h.resize(h.width,32);mutated.push(h.id);
for(const n of h.children){if(n.name==="Number"||n.name==="Title"){await n.setTextStyleIdAsync(n.name==="Number"?counter.id:heading.id);mutated.push(n.id);}}
}
const benefit=await figma.getNodeByIdAsync("349:656");const icon=benefit.children.find(n=>n.name==="Icon");icon.fontSize=26;icon.lineHeight={unit:"PIXELS",value:32};icon.resize(32,32);mutated.push(icon.id);
const label=benefit.children.find(n=>n.name==="Label");await label.setTextStyleIdAsync("");label.fontSize=12;label.lineHeight={unit:"PIXELS",value:18};mutated.push(label.id);
return {createdNodeIds:[],mutatedNodeIds:mutated,removedNodeIds:removed,createdStyleIds:createdStyles,summary:{menuIcons:30,categoryIcons:8,spineGap:12,indexHeading:13,indexCounter:13,indexHeaderHeight:32,benefitIcon:26,benefitLabel:12,showcaseLowerLineRemoved:2,benefitExplicitTheme:6}};
