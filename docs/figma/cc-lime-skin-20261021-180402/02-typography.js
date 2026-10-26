await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
const root=await figma.getNodeByIdAsync('803:1334'),texts=root.findAllWithCriteria({types:['TEXT']}),fonts=new Map();
const source=await figma.getNodeByIdAsync('795:1331'),borderFixed=[];function fixBorders(a,b){if('strokes'in a&&'strokes'in b&&Array.isArray(a.strokes)&&Array.isArray(b.strokes)&&!a.strokes.length&&b.strokes.length){b.strokeAlign='OUTSIDE';borderFixed.push(b.id);}if('children'in a){const children=b.children.filter(n=>n.id!=='803:1987');a.children.forEach((c,i)=>fixBorders(c,children[i]));}}fixBorders(source,root);
for(const t of texts)for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
for(const style of ['Regular','Medium','Bold','Black'])fonts.set(style,{family:'Noto Sans KR',style});
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const probe=figma.createText();probe.x=4500;probe.y=100;probe.name='Temporary font fit probe';
const styles=new Map(),changed=[],fit=[],before=new Map();
for(const t of texts)before.set(t.id,{x:t.x,y:t.y,w:t.width,h:t.height,resize:t.textAutoResize,horizontal:t.layoutSizingHorizontal,vertical:t.layoutSizingVertical});
for(const t of texts){
 if(t.fontName.family==='Bebas Neue')continue;
 if(typeof t.fontSize!=='number')throw Error('Mixed font size requires targeted handling: '+t.id);
 const o=before.get(t.id),oldSize=t.fontSize,oldFamily=t.fontName.family,oldWeight=t.fontName.style;
 const weight=/ExtraBold|Black/.test(oldWeight)?'Black':/Bold/.test(oldWeight)?'Bold':/Medium/.test(oldWeight)?'Medium':'Regular';
 const font={family:'Noto Sans KR',style:weight},spacing=t.letterSpacing,lh=t.lineHeight.unit==='AUTO'?{unit:'PIXELS',value:o.h/Math.max(1,t.characters.split('\n').length)}:t.lineHeight;
 probe.fontName=font;probe.fontSize=oldSize;probe.characters=t.characters;probe.letterSpacing=spacing;probe.lineHeight=lh;probe.leadingTrim='NONE';probe.textAutoResize='WIDTH_AND_HEIGHT';
 let size=oldSize;while((probe.width>o.w+.1||probe.height>o.h+.1)&&size>8){size=Math.round((size-.25)*100)/100;probe.fontSize=size;}
 if(probe.width>o.w+.15||probe.height>o.h+.15)throw Error('Cannot fit '+t.id+' '+t.characters);
 const key=[weight,size,lh.unit,lh.value,spacing.unit,spacing.value].join('-');
 let st=styles.get(key);if(!st){st=figma.createTextStyle();st.name='P24/CC Lime/Typography/'+weight+' '+size+' / '+lh.value;st.fontName=font;st.fontSize=size;st.lineHeight=lh;st.letterSpacing=spacing;st.leadingTrim='NONE';st.textDecoration='NONE';styles.set(key,st);}
 t.textAutoResize='NONE';t.fontName=font;t.fontSize=size;t.lineHeight=lh;t.letterSpacing=spacing;t.leadingTrim='NONE';t.textDecoration='NONE';t.resize(o.w,o.h);t.textAlignVertical='CENTER';
 await t.setTextStyleIdAsync(st.id);
 if(o.resize==='HEIGHT')t.textAutoResize='HEIGHT';
 if(o.horizontal==='FILL')t.layoutSizingHorizontal='FILL';
 if(o.vertical==='FILL')t.layoutSizingVertical='FILL';
 changed.push(t.id);
 if(size!==oldSize)fit.push({id:t.id,text:t.characters,from:oldSize,to:size,measured:[probe.width,probe.height],box:[o.w,o.h]});
}
// Keep native HUG/FILL behavior. Font metrics may alter text bounds inside the fixed layout.
for(const t of texts){if(!changed.includes(t.id))continue;const o=before.get(t.id);t.textAutoResize=o.resize;if(o.horizontal==='FILL')t.layoutSizingHorizontal='FILL';if(o.vertical==='FILL')t.layoutSizingVertical='FILL';}
const mismatches=texts.flatMap(t=>{const o=before.get(t.id);return ['x','y','width','height'].flatMap(k=>{const a=o[{width:'w',height:'h'}[k]||k],b=t[k];return Math.abs(a-b)>.01?[{id:t.id,key:k,before:a,after:b}]:[];});});
probe.remove();
return{mutatedNodeIds:[...changed,...borderFixed],removedTemporaryNodeIds:[probe.id],fontFamily:'Noto Sans KR',preservedBebasCount:texts.length-changed.length,textStyleIds:[...styles.values()].map(s=>s.id),textStyleCount:styles.size,resizedText:fit,textBoundsDifferences:mismatches};
