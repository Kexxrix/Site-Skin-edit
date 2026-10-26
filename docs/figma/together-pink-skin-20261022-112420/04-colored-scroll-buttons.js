await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));figma.skipInvisibleInstanceChildren=true;
const cfg=[{"root":"840:3015","dark":"VariableID:840:3650","light":"VariableID:840:3651","white":"VariableID:840:3662","effect":"S:25ab14c5acd090bab69eaa8686140b857bc96e76,"},{"root":"850:3637","dark":"VariableID:850:3589","light":"VariableID:850:3590","white":"VariableID:850:3601","effect":"S:c6e30565942fb7c4d60aafaa3cb0ee10ae6cbfdc,"}],changed=new Set(),rows=[],sourceModesBefore=(await figma.getNodeByIdAsync('840:3015')).explicitVariableModes;
for(const c of cfg){
 const root=await figma.getNodeByIdAsync(c.root),vars={};for(const k of ['dark','light','white'])vars[k]=await figma.variables.getVariableByIdAsync(c[k]);
 const paint=k=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',vars[k]);
 const bars=root.findAll(n=>n.type==='INSTANCE'&&n.name==='P19/Content/SectionHeading'&&n.fills.length>0&&n.children.some(v=>v.name==='Next'&&v.visible));
 const fonts=new Map();for(const bar of bars)for(const t of bar.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 for(const bar of bars){
  const before={x:bar.x,y:bar.y,w:bar.width,h:bar.height,parentY:bar.parent.y,parentHeight:bar.parent.height};
  bar.paddingTop=4;bar.paddingBottom=4;changed.add(bar.id);
  const buttons=bar.children.filter(n=>['Previous','Next'].includes(n.name)&&n.visible);
  for(const b of buttons){
   b.primaryAxisSizingMode='AUTO';b.counterAxisSizingMode='AUTO';b.paddingLeft=3;b.paddingRight=3;b.paddingTop=3;b.paddingBottom=3;b.cornerRadius=15;b.primaryAxisAlignItems='CENTER';b.counterAxisAlignItems='CENTER';
   b.fills=[paint('dark')];b.strokes=[{...paint('light'),opacity:.55}];b.strokeWeight=1;b.strokeAlign='INSIDE';b.strokesIncludedInLayout=false;await b.setEffectStyleIdAsync(c.effect);changed.add(b.id);
   for(const glyph of b.children){changed.add(glyph.id);if('children'in glyph)for(const v of glyph.findAll(()=>true)){if('strokes'in v&&Array.isArray(v.strokes))v.strokes=v.strokes.map(p=>p.type==='SOLID'?paint('white'):p);changed.add(v.id);}}
  }
  for(const child of bar.children)changed.add(child.id);
  const after={x:bar.x,y:bar.y,w:bar.width,h:bar.height,parentY:bar.parent.y,parentHeight:bar.parent.height};
  rows.push({root:c.root,id:bar.id,before,after,approvedBarSizePreserved:bar.width===1592&&bar.height===38,horizontalPadding:[bar.paddingLeft,bar.paddingRight],verticalPadding:[bar.paddingTop,bar.paddingBottom],buttons:buttons.map(b=>({id:b.id,w:b.width,h:b.height,top:b.y,bottom:bar.height-b.y-b.height,fillVariable:b.fills[0].boundVariables.color.id,iconBox:[b.children[0].width,b.children[0].height]}))});
 }
}
const pink=await figma.getNodeByIdAsync('850:3637');figma.currentPage.selection=[pink];figma.viewport.scrollAndZoomIntoView([pink]);
return{createdNodeIds:[],mutatedNodeIds:[...changed],rows,sourceModesBefore,sourceModesAfter:(await figma.getNodeByIdAsync('840:3015')).explicitVariableModes};
