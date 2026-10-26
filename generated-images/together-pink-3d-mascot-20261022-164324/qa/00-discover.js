function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

const page=await figma.getNodeByIdAsync("795:1330");await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren=false;
const roots=page.children.filter(n=>n.type==="FRAME"&&Math.abs(n.width-1920)<.01);
const fonts={};for(const r of roots)for(const t of r.findAllWithCriteria({types:["TEXT"]}))for(const s of t.getStyledTextSegments(["fontName"]))fonts[JSON.stringify(s.fontName)]=s.fontName;
await Promise.all(Object.values(fonts).map(f=>figma.loadFontAsync(f)));
const root=await figma.getNodeByIdAsync("850:3637"),all=[root,...root.findAll(()=>true)],masters={};
for(const n of all.filter(n=>n.type==="INSTANCE")){const m=await n.getMainComponentAsync();if(m)masters[m.id]=m;}
const tree=n=>({id:n.id,name:n.name,type:n.type,x:n.x,y:n.y,width:n.width,height:n.height,visible:n.visible,children:("children"in n?n.children.map(c=>({id:c.id,name:c.name,type:c.type,x:c.x,y:c.y,width:c.width,height:c.height,visible:c.visible})):[])});
const target={id:root.id,name:root.name,x:root.x,y:root.y,width:root.width,height:root.height,contentHash:hash(snap(root,true)),nodeCount:all.length,instances:all.filter(n=>n.type==="INSTANCE").length,imageNodes:all.filter(n=>"fills"in n&&typeof n.fills!=="symbol"&&n.fills.some(f=>f.type==="IMAGE")).length,children:root.children.map(tree),containers:root.findAll(n=>(n.type==="FRAME"||n.type==="INSTANCE")&&(/Sidebar|sidebar|Page shell|Main|Partners/.test(n.name))).slice(0,12).map(tree)};
figma.skipInvisibleInstanceChildren=true;
const protectedNodes=[...roots.filter(n=>n.id!==root.id),...Object.values(masters)].map(n=>({id:n.id,name:n.name,x:n.x,y:n.y,hash:hash(snap(n,true))}));
return {pageId:page.id,pageName:page.name,fonts:Object.values(fonts),target,protectedNodes};
