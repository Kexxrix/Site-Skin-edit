function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));figma.skipInvisibleInstanceChildren=false;
const page=figma.currentPage,root=await figma.getNodeByIdAsync('884:6638'),roots=page.children.filter(n=>n.type==='FRAME'&&n.width===1920),fonts=new Map(),masters=new Set();
for(const r of roots)for(const t of r.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
for(const n of root.findAllWithCriteria({types:['INSTANCE']})){const m=await n.getMainComponentAsync();if(m)masters.add(m.id);}
const target={id:root.id,name:root.name,x:root.x,y:root.y,w:root.width,h:root.height,contentHash:hash(snap(root,true)),children:root.children.map(n=>({id:n.id,name:n.name,type:n.type})),fills:root.fills};
if(root.children.some(n=>n.name==='White Gallery · Generated abstract background'))throw Error('A generated background already exists; inspect before adding');
figma.skipInvisibleInstanceChildren=true;
const protectedNodes=roots.filter(n=>n.id!==root.id).map(n=>({id:n.id,name:n.name,x:n.x,y:n.y,hash:hash(snap(n,true))}));
for(const id of masters){const n=await figma.getNodeByIdAsync(id);protectedNodes.push({id:n.id,name:n.name,hash:hash(snap(n,true))});}
return{pageId:page.id,target,protectedNodes,fonts:[...fonts.values()]};

