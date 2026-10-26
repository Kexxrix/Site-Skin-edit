function deepCopy(v){return JSON.parse(JSON.stringify(v));}
function mapAliases(v,cfg){if(Array.isArray(v))return v.map(x=>mapAliases(x,cfg));if(v&&typeof v==="object"){if(v.type==="VARIABLE_ALIAS"&&cfg.variableMap[v.id])return {type:"VARIABLE_ALIAS",id:cfg.variableMap[v.id]};const out={};for(const [k,x]of Object.entries(v))out[k]=mapAliases(x,cfg);return out;}return v;}
async function prepareRemap(cfg){
 const entries=Object.entries(cfg.variableMap);const values=await Promise.all(entries.map(([,id])=>figma.variables.getVariableByIdAsync(id)));const vars={};for(let i=0;i<entries.length;i++)vars[entries[i][1]]=values[i];
 const oldCollection=await figma.variables.getVariableCollectionByIdAsync("VariableCollectionId:88:554");
 const collection=await figma.variables.getVariableCollectionByIdAsync(cfg.collectionId);
 const palette=[];for(const [oldId,newId]of entries){const old=await figma.variables.getVariableByIdAsync(oldId);if(old.name.startsWith("palette/"))palette.push({old:old.valuesByMode["88:0"],value:vars[newId].valuesByMode[cfg.modeId]});}
 return {cfg,vars,oldCollection,collection,palette};
}
function remapPaints(paints,ctx){
 if(!Array.isArray(paints))return paints;
 return paints.map(p=>{
  let n=mapAliases(deepCopy(p),ctx.cfg);
  if(n.type==="SOLID"&&n.boundVariables?.color&&ctx.vars[n.boundVariables.color.id])n=figma.variables.setBoundVariableForPaint(n,"color",ctx.vars[n.boundVariables.color.id]);
  if(n.type.startsWith("GRADIENT"))n.gradientStops=n.gradientStops.map(s=>{const m=ctx.palette.find(x=>["r","g","b"].every(k=>Math.abs(x.old[k]-s.color[k])<.00001));return m?{...s,color:{...m.value,a:s.color.a}}:s;});
  return n;
 });
}
function atPath(root,path){let n=root;for(const i of path){if(!n.children||!n.children[i])throw new Error("Instance structure changed");n=n.children[i];}return n;}
function snapshotTree(root){
 const out=[];function walk(n,path){
  const s={path,type:n.type,name:n.name,visible:n.visible,opacity:n.opacity};
  for(const k of ["fills","strokes","effects"])if(k in n&&Array.isArray(n[k]))s[k]=deepCopy(n[k]);
  for(const k of ["cornerRadius","strokeWeight","strokeAlign","clipsContent"])if(k in n&&typeof n[k]!=="symbol")s[k]=n[k];
  if(n.type==="TEXT"){for(const k of ["characters","fontName","fontSize","lineHeight","letterSpacing","textCase","textDecoration","textAlignHorizontal","textAlignVertical","textAutoResize","paragraphSpacing","paragraphIndent","textStyleId"])if(typeof n[k]!=="symbol")s[k]=typeof n[k]==="object"?deepCopy(n[k]):n[k];}
  if(n.type==="INSTANCE"){s.props=Object.fromEntries(Object.entries(n.componentProperties).map(([k,p])=>[k,{type:p.type,value:p.value}]));}
  if(path.length===0){s.root={w:n.width,h:n.height,hs:n.layoutSizingHorizontal,vs:n.layoutSizingVertical,min:n.minWidth,max:n.maxWidth,padding:"paddingTop"in n?[n.paddingTop,n.paddingRight,n.paddingBottom,n.paddingLeft]:null};}
  out.push(s);if("children"in n)n.children.forEach((c,i)=>walk(c,[...path,i]));
 }walk(root,[]);return out;
}
function restoreProps(n,props){if(n.type!=="INSTANCE"||!props)return;const keys=Object.keys(n.componentProperties),update={};for(const [k,p]of Object.entries(props)){if(p.type==="VARIANT")continue;const key=keys.includes(k)?k:keys.find(x=>x.split("#")[0]===k.split("#")[0]);if(key)update[key]=p.value;}if(Object.keys(update).length)n.setProperties(update);}
async function restoreTree(root,snap,ctx){
 for(const s of snap)if(s.props)restoreProps(atPath(root,s.path),s.props);
 for(const s of snap){
  const n=atPath(root,s.path);if(n.type!==s.type)throw new Error("Layer type changed");
  if(n.type==="TEXT"){
   if(s.textStyleId&&ctx.cfg.styleMap[s.textStyleId])await n.setTextStyleIdAsync(ctx.cfg.styleMap[s.textStyleId]);
   for(const k of ["fontName","fontSize","lineHeight","letterSpacing","textCase","textDecoration","textAlignHorizontal","textAlignVertical","paragraphSpacing","paragraphIndent"])if(s[k]!==undefined)n[k]=s[k];
   n.characters=s.characters;n.textAutoResize=s.textAutoResize;
  }
  n.name=s.name.replace("BIT365 Champagne","BIT365 BlackGold");n.visible=s.visible;n.opacity=s.opacity;
  for(const k of ["fills","strokes"])if(s[k])n[k]=remapPaints(s[k],ctx);
  if(s.effects)n.effects=mapAliases(s.effects,ctx.cfg);
  for(const k of ["cornerRadius","strokeWeight","strokeAlign","clipsContent"])if(s[k]!==undefined)n[k]=s[k];
  if("explicitVariableModes"in n&&n.explicitVariableModes[ctx.oldCollection.id])n.clearExplicitVariableModeForCollection(ctx.oldCollection);
 }
 const s=snap[0].root;
 if(s.padding){root.paddingTop=s.padding[0];root.paddingRight=s.padding[1];root.paddingBottom=s.padding[2];root.paddingLeft=s.padding[3];}
 root.minWidth=s.min;root.maxWidth=s.max;root.resize(s.w,s.h);if(s.hs)root.layoutSizingHorizontal=s.hs;if(s.vs)root.layoutSizingVertical=s.vs;
}
async function remapNodeTree(root,ctx){
 for(const n of [root,...root.findAll(()=>true)]){
  if(n.type==="TEXT"&&ctx.cfg.styleMap[n.textStyleId])await n.setTextStyleIdAsync(ctx.cfg.styleMap[n.textStyleId]);
  for(const k of ["fills","strokes"])if(k in n&&Array.isArray(n[k]))n[k]=remapPaints(n[k],ctx);
  if("explicitVariableModes"in n&&n.explicitVariableModes[ctx.oldCollection.id])n.clearExplicitVariableModeForCollection(ctx.oldCollection);
 }
 root.setExplicitVariableModeForCollection(ctx.collection,ctx.cfg.modeId);
}
