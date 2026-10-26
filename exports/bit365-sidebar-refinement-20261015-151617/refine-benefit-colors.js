
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync("347:552"));figma.skipInvisibleInstanceChildren=false;
await figma.loadFontAsync({family:"Pretendard JP",style:"Medium"});
const tile=await figma.getNodeByIdAsync("349:656"),label=tile.children.find(n=>n.name==="Label");
const surface=await figma.variables.getVariableByIdAsync("VariableID:307:557"),ink=await figma.variables.getVariableByIdAsync("VariableID:347:565");
tile.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:1,g:1,b:1}},"color",surface)];
label.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:0.1882,g:0.1412,b:0.0353}},"color",ink)];
tile.description="Bright benefit tile in both skins. Background: existing WhiteGold surface. Label: onGold dark ink. Shared Label and Icon properties remain editable; no local text-color overrides.";
const changed=[tile.id,label.id];const set=await figma.getNodeByIdAsync("351:1352");
for(const sidebar of set.children.filter(n=>n.variantProperties.Style==="Showcase")){
for(const n of sidebar.findAll(x=>x.type==="INSTANCE"&&x.name.startsWith("Benefit /"))){n.clearExplicitVariableModeForCollection("VariableCollectionId:347:554");changed.push(n.id);}}
return {createdNodeIds:[],mutatedNodeIds:changed,contrast:"Bright surface plus onGold dark ink in both themes; source component colors remain shared."};
