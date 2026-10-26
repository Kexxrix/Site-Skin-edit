
const p=await figma.getNodeByIdAsync('347:553');await figma.setCurrentPageAsync(p);
const pairs=[['564:39068','574:41902'],['564:39853','574:43010']],mutated=[],results=[];
function pathFrom(node,ancestor){const a=[];while(node.id!==ancestor.id){a.unshift(node.parent.children.findIndex(c=>c.id===node.id));node=node.parent;}return a;}
function at(root,path){let n=root;for(const i of path)n=n.children[i];return n;}
function content(n){return {text:n.findAllWithCriteria({types:['TEXT']}).map(t=>t.characters).sort(),images:n.findAll(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE')).map(c=>c.fills.find(f=>f.type==='IMAGE').imageHash).sort()};}
for(const [srcId,dstId]of pairs){
 const src=await figma.getNodeByIdAsync(srcId),dst=await figma.getNodeByIdAsync(dstId),sm=src.children[1].children[1],dm=dst.children[1].children[1];
 const cards=sm.findAllWithCriteria({types:['INSTANCE']}).filter(n=>!n.id.startsWith('I')&&['435:52710','435:52801'].includes(n.mainComponent?.id));
 const fonts=new Map();for(const t of dst.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 for(const old of cards){
  const current=at(dm,pathFrom(old,sm)),oldProps=old.componentProperties,newProps=current.componentProperties,values={};
  for(const [key,prop]of Object.entries(newProps)){
   if(prop.type==='VARIANT')continue;
   const match=Object.entries(oldProps).find(([k,v])=>k.split('#')[0]===key.split('#')[0]&&v.type===prop.type);
   if(match)values[key]=match[1].value;
  }
  current.setProperties(values);mutated.push(current.id);
  for(const img of old.findAll(c=>'fills'in c&&Array.isArray(c.fills)&&c.fills.some(f=>f.type==='IMAGE'))){
   const target=at(current,pathFrom(img,old));target.fills=img.fills;mutated.push(target.id);
  }
  results.push({id:current.id,source:old.id,contentPreserved:JSON.stringify(content(current))===JSON.stringify(content(old)),propertyCount:Object.keys(values).length});
 }
}
return {createdNodeIds:[],mutatedNodeIds:mutated,results,allContentPreserved:results.every(r=>r.contentPreserved)};

