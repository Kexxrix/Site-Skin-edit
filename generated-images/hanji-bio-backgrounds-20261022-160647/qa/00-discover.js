function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));figma.skipInvisibleInstanceChildren=false;
const specs=[{key:'hanji',id:'884:7328',decorId:'886:7514'},{key:'bio',id:'884:8017',decorId:'886:7584'}],page=figma.currentPage,roots=page.children.filter(n=>n.type==='FRAME'&&n.width===1920),fonts=new Map();
for(const r of roots)for(const t of r.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const targets=[],masters=new Set();
for(const spec of specs){
 const root=await figma.getNodeByIdAsync(spec.id),art=await figma.getNodeByIdAsync(spec.decorId);
 if(art.parent.id!==root.id||art.width!==root.width||art.height!==root.height)throw Error('Background frame mismatch');
 const instances=root.findAllWithCriteria({types:['INSTANCE']});for(const i of instances){const m=await i.getMainComponentAsync();if(m)masters.add(m.id);}
 const content=snap(root,true);content.children=root.children.filter(c=>c.id!==art.id).map(c=>snap(c));
 targets.push({...spec,name:root.name,x:root.x,y:root.y,w:root.width,h:root.height,contentHash:hash(content),instanceLinks:instances.length,images:root.findAll(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).length,art:{name:art.name,index:root.children.indexOf(art),x:art.x,y:art.y,w:art.width,h:art.height,fills:art.fills,effects:art.effects,effectStyleId:art.effectStyleId,visible:art.visible,children:art.children.map(n=>({id:n.id,name:n.name,type:n.type,visible:n.visible}))}});
}
figma.skipInvisibleInstanceChildren=true;
const protectedNodes=roots.filter(r=>!specs.some(s=>s.id===r.id)).map(n=>({id:n.id,name:n.name,x:n.x,y:n.y,hash:hash(snap(n,true))}));
for(const id of masters){const n=await figma.getNodeByIdAsync(id);protectedNodes.push({id:n.id,name:n.name,hash:hash(snap(n,true))});}
return{pageId:page.id,targets,protectedNodes,fonts:[...fonts.values()]};

