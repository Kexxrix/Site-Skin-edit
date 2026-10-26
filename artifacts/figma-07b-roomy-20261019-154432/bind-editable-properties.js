
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
function pathFrom(n,a){const path=[];while(n.id!==a.id){path.unshift(n.parent.children.findIndex(c=>c.id===n.id));n=n.parent;}return path;}
function at(n,path){for(const i of path)n=n.children[i];return n;}
const mutated=[],results=[];
for(const [oldId,setId]of [['435:52710','573:6046'],['435:52801','573:6059']]){
 const original=await figma.getNodeByIdAsync(oldId),set=await figma.getNodeByIdAsync(setId);
 const props=set.componentPropertyDefinitions;
 const fonts=new Map();for(const t of set.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 let count=0;
 for(const old of original.findAll(()=>true)){
  const refs=old.componentPropertyReferences;if(!refs||!Object.keys(refs).length)continue;
  const mapped={};for(const [field,key]of Object.entries(refs)){const k=Object.keys(props).find(k=>k.split('#')[0]===key.split('#')[0]);if(k)mapped[field]=k;}
  if(!Object.keys(mapped).length)continue;
  for(const variant of set.children){const target=at(variant,pathFrom(old,original));target.componentPropertyReferences={...target.componentPropertyReferences,...mapped};mutated.push(target.id);count++;}
 }
 results.push({setId,boundLayers:count});
}
return {createdNodeIds:[],mutatedNodeIds:mutated,results};

