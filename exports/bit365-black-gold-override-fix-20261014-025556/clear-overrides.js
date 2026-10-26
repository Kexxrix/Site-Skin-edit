function cp(v){return JSON.parse(JSON.stringify(v));}
function eq(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function walk(root){const out=[];function visit(n,path){out.push({n,path});if("children"in n)n.children.forEach((c,i)=>visit(c,[...path,i]));}visit(root,[]);return out;}
function at(root,path){for(const i of path){root=root?.children?.[i];if(!root)throw new Error("Layer structure changed at "+path.join("."));}return root;}
function hash(v){let h=2166136261;for(const c of JSON.stringify(v))h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16);}
const textFields=["fontName","fontSize","lineHeight","letterSpacing","textCase","textDecoration","textAlignHorizontal","textAlignVertical","paragraphSpacing","paragraphIndent","textAutoResize"];
const layoutFields=["layoutMode","primaryAxisAlignItems","counterAxisAlignItems","itemSpacing","counterAxisSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","layoutGrow","layoutAlign","layoutPositioning","layoutWrap","itemReverseZIndex","strokesIncludedInLayout","minWidth","maxWidth","minHeight","maxHeight","primaryAxisSizingMode","counterAxisSizingMode"];
const commonFields=["name","visible","opacity","locked","effects","strokeWeight","strokeAlign","cornerRadius","topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius","clipsContent"];
function snapshot(root,main,mode){
return walk(root).map(({n,path})=>{const source=at(main,path),s={path,id:n.id,type:n.type,fields:{},w:n.width,h:n.height,x:n.x,y:n.y,hs:n.layoutSizingHorizontal,vs:n.layoutSizingVertical,paint:{}};
for(const k of [...commonFields,...layoutFields,...(n.type==="TEXT"?textFields:[])])if(k in n&&typeof n[k]!=="symbol"&&n[k]!==undefined)s.fields[k]=typeof n[k]==="object"?cp(n[k]):n[k];
if(n.type==="TEXT"){s.characters=n.characters;s.textStyleId=n.textStyleId;}
if(n.type==="INSTANCE")s.props=Object.fromEntries(Object.entries(n.componentProperties).map(([k,p])=>[k,p.value]));
for(const field of ["fills","strokes"]){if(!(field in n)||!Array.isArray(n[field]))continue;const old=n[field],base=Array.isArray(source[field])?source[field]:[];
if(mode==="master"){if(!eq(old,base))s.paint[field]=cp(old);}
else if(field==="fills"&&!eq(old.filter(p=>p.type==="IMAGE"),base.filter(p=>p.type==="IMAGE")))s.paint[field]=cp(old);
}
return s;});
}
async function fonts(snaps){const names=new Map();for(const s of snaps){const f=s.fields.fontName;if(f)names.set(JSON.stringify(f),f);}for(const f of names.values())await figma.loadFontAsync(f);}
function assign(n,k,v,mut){if(!eq(n[k],v)){n[k]=typeof v==="object"?cp(v):v;mut.add(n.id);}}
async function restore(root,snap,mode,mut){
for(const s of snap){const n=at(root,s.path);if(n.type!==s.type)throw new Error("Layer type changed");
if(s.props&&n.type==="INSTANCE"){const current=n.componentProperties,delta={};for(const[k,v]of Object.entries(s.props))if(current[k]&&!eq(current[k].value,v))delta[k]=v;if(Object.keys(delta).length){n.setProperties(delta);mut.add(n.id);}}}
for(const s of snap){const n=at(root,s.path);
if(n.type==="TEXT"){if(s.textStyleId&&typeof s.textStyleId==="string"&&n.textStyleId!==s.textStyleId){await n.setTextStyleIdAsync(s.textStyleId);mut.add(n.id);}for(const k of textFields)if(k in s.fields)assign(n,k,s.fields[k],mut);if(n.characters!==s.characters){n.characters=s.characters;mut.add(n.id);}}
for(const[k,v]of Object.entries(s.fields)){if(n.type==="TEXT"&&textFields.includes(k))continue;if(mode==="screen"&&s.path.length===0&&["cornerRadius","topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius","clipsContent"].includes(k)&&root.parent.name.endsWith("Image and outline"))continue;assign(n,k,v,mut);}
for(const[field,paint]of Object.entries(s.paint))if(!eq(n[field],paint)){n[field]=cp(paint);mut.add(n.id);}
}
const s=snap[0];if(Math.abs(root.width-s.w)>.00001||Math.abs(root.height-s.h)>.00001){root.resize(s.w,s.h);mut.add(root.id);}
if(root.layoutSizingHorizontal!==s.hs){root.layoutSizingHorizontal=s.hs;mut.add(root.id);}if(root.layoutSizingVertical!==s.vs){root.layoutSizingVertical=s.vs;mut.add(root.id);}
}
function content(root){return walk(root).map(({n,path})=>({path,type:n.type,name:n.name,visible:n.visible,text:n.type==="TEXT"?{c:n.characters,f:n.fontName,s:n.fontSize,l:n.lineHeight,ls:n.letterSpacing}:null,images:"fills"in n&&Array.isArray(n.fills)?n.fills.filter(p=>p.type==="IMAGE"):[]}));}
async function cleanInstance(root,mode,mut){
const main=await root.getMainComponentAsync();if(!main)throw new Error("Missing main component");
const snap=snapshot(root,main,mode),before=hash(content(root));await fonts(snap);
for(const o of root.overrides)mut.add(o.id);mut.add(root.id);
root.resetOverrides();
const afterMain=await root.getMainComponentAsync();if(afterMain.id!==main.id)root.swapComponent(main);
await restore(root,snap,mode,mut);
const after=hash(content(root));if(before!==after)throw new Error("Image or text changed while clearing overrides: "+root.id+" "+before+" != "+after);
const delta=[];for(const s of snap){const n=at(root,s.path);for(const[k,a,b]of [["x",s.x,n.x],["y",s.y,n.y],["width",s.w,n.width],["height",s.h,n.height]])if(Math.abs(a-b)>.01)delta.push({id:n.id,field:k,before:a,after:b});}
if(delta.length)throw new Error("Layout changed: "+JSON.stringify(delta.slice(0,5)));
return{root:root.id,contentHash:after,remainingPaintOverrides:root.overrides.flatMap(o=>o.overriddenFields.filter(f=>["fills","strokes"].includes(f)).map(field=>({id:o.id,field})))};
}
