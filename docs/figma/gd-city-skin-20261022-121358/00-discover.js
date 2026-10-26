function norm(v){if(typeof v==="number")return Math.round(v*10000)/10000;if(Array.isArray(v))return v.map(norm);if(v&&typeof v==="object"){const o={};for(const k of Object.keys(v).sort())o[k]=norm(v[k]);return o;}return v;}
function snap(n,ignore=false){const r={type:n.type,width:n.width,height:n.height,visible:n.visible,opacity:('opacity'in n?n.opacity:undefined)};if(!ignore){r.x=n.x;r.y=n.y;}for(const k of ["fills","strokes","effects","cornerRadius","layoutMode","layoutSizingHorizontal","layoutSizingVertical","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","clipsContent","overflowDirection","boundVariables","explicitVariableModes"])if(k in n&&typeof n[k]!=="symbol")r[k]=n[k];if(n.type==="TEXT"){r.characters=n.characters;r.fonts=n.getStyledTextSegments(["fontName","fontSize","lineHeight","letterSpacing"]);r.leadingTrim=n.leadingTrim;}if("children"in n)r.children=n.children.map(c=>snap(c));return norm(r);}
function hash(v){const s=JSON.stringify(v);let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
function eq(a,b){if(typeof a==="number"&&typeof b==="number")return Math.abs(a-b)<=.001;if(a===b)return true;if(!a||!b||typeof a!=="object"||typeof b!=="object")return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>eq(a[k],b[k]));}

await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
figma.skipInvisibleInstanceChildren=false;
const page=figma.currentPage,source=await figma.getNodeByIdAsync('850:3637'),roots=page.children.filter(n=>n.type==='FRAME'&&n.width===1920);
const fonts=new Map();
for(const root of roots)for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const links=[],masterIds=new Set();for(const i of source.findAllWithCriteria({types:['INSTANCE']})){const c=await i.getMainComponentAsync();if(c)masterIds.add(c.id);}
const col=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:850:3570');
const variables=[];for(const id of col.variableIds){const v=await figma.variables.getVariableByIdAsync(id);variables.push({id:v.id,name:v.name,value:v.valuesByMode[col.defaultModeId],scopes:v.scopes});}
const textIds=new Set(source.findAllWithCriteria({types:['TEXT']}).map(n=>n.textStyleId).filter(x=>typeof x==='string'&&x)),textStyles=[];
for(const id of textIds){const s=await figma.getStyleByIdAsync(id);const d={id:s.id,name:s.name};for(const k of ['fontName','fontSize','lineHeight','letterSpacing','leadingTrim','textDecoration','textCase','paragraphSpacing','paragraphIndent'])d[k]=s[k];textStyles.push(d);}
const effectIds=new Set(source.findAll(n=>'effectStyleId'in n&&n.effectStyleId).map(n=>n.effectStyleId)),effectStyles=[];
for(const id of effectIds){const s=await figma.getStyleByIdAsync(id);effectStyles.push({id:s.id,name:s.name,effects:s.effects});}
const sourceStructure=[source,...source.findAll(n=>n.type!=='TEXT'&&n.type!=='VECTOR'&&n.type!=='RECTANGLE'&&n.type!=='ELLIPSE')].map(n=>({id:n.id,name:n.name,type:n.type,parent:n.parent?.name,w:n.width,h:n.height,fills:'fills'in n?n.fills:undefined}));
figma.skipInvisibleInstanceChildren=true;
const rootData=roots.map(n=>({id:n.id,name:n.name,x:n.x,y:n.y,w:n.width,h:n.height,hash:hash(snap(n,true))})),masters=[];
for(const id of masterIds){const n=await figma.getNodeByIdAsync(id);masters.push({id:n.id,name:n.name,hash:hash(snap(n,true))});}
return{sourceId:source.id,sourceHash:hash(snap(source,true)),sourceCollectionId:col.id,sourceModeId:col.defaultModeId,roots:rootData,masters,variables,textStyles,effectStyles,fonts:[...fonts.values()]};

