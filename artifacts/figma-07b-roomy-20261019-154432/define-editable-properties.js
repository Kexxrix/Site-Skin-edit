
const p=await figma.getNodeByIdAsync('435:14043');await figma.setCurrentPageAsync(p);
const groups=[{old:'435:52710',set:'573:6046'},{old:'435:52801',set:'573:6059'}],mutated=[],definitions=[];
for(const g of groups){
 const original=await figma.getNodeByIdAsync(g.old),owner=original.parent.type==='COMPONENT_SET'?original.parent:original,target=await figma.getNodeByIdAsync(g.set);
 const fontMap=new Map();for(const t of target.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fontMap.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fontMap.values()].map(f=>figma.loadFontAsync(f)));
 const mapping={};
 for(const [key,def]of Object.entries(owner.componentPropertyDefinitions)){
  if(def.type==='VARIANT')continue;
  const name=key.split('#')[0],existing=Object.entries(target.componentPropertyDefinitions).find(([k,d])=>k.split('#')[0]===name&&d.type===def.type);
  mapping[key]=existing?existing[0]:target.addComponentProperty(name,def.type,def.defaultValue);
 }
 for(const n of target.findAll(()=>true)){
  const refs=n.componentPropertyReferences;if(!refs)continue;
  const copy={...refs};let changed=false;
  for(const [field,key]of Object.entries(copy))if(mapping[key]){copy[field]=mapping[key];changed=true;}
  if(changed){n.componentPropertyReferences=copy;mutated.push(n.id);}
 }
 mutated.push(target.id);definitions.push({set:target.id,propertyCount:Object.keys(target.componentPropertyDefinitions).length,mapping});
}
const account=await figma.getNodeByIdAsync('573:5817');
const fontMap=new Map();for(const t of account.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fontMap.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fontMap.values()].map(f=>figma.loadFontAsync(f)));
for(const action of ['Login','Join','Anonymous']){
 const variants=account.children.filter(c=>c.name.includes('Action='+action));
 const texts=variants.map(c=>c.findOne(n=>n.type==='TEXT'));
 const name=action+' label',existing=Object.entries(account.componentPropertyDefinitions).find(([k,d])=>k.split('#')[0]===name);
 const key=existing?existing[0]:account.addComponentProperty(name,'TEXT',texts[0].characters);
 for(const t of texts){t.componentPropertyReferences={...t.componentPropertyReferences,characters:key};mutated.push(t.id);}
}
mutated.push(account.id);
return {createdNodeIds:[],mutatedNodeIds:mutated,definitions,accountProperties:Object.keys(account.componentPropertyDefinitions)};

