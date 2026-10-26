const page=figma.root.children.find(p=>p.id==='435:14043');await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='19 · P19 · 가변 높이 사이드바 · 활성 메뉴'))throw Error('P19 sidebar section already exists; inspect before retry');
const oldNav=await figma.getNodeByIdAsync('573:4953'),oldSide=await figma.getNodeByIdAsync('573:5022');
const fonts=new Map();for(const n of [oldNav,oldSide])for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const section=figma.createSection();section.name='19 · P19 · 가변 높이 사이드바 · 활성 메뉴';section.x=100;section.y=23900;section.fills=JSON.parse(JSON.stringify(oldSide.parent.fills));
const nav=oldNav.clone();section.appendChild(nav);nav.name='P19/07BRoomy/NavigationItem';
nav.description='Page 19 menu rows: 44px height, original 13px text and 22px images. Selected rows have R8 corners and a full-height 2px gold left edge following the rounded corner. Default and hover styling retained.';
nav.x=40;nav.y=64;
const radius=await figma.variables.getVariableByIdAsync('VariableID:435:14053');
const existingStyles=await figma.getLocalPaintStylesAsync();const edgeStyle=existingStyles.find(s=>s.name==='P19/Menu/Selected left edge')||figma.createPaintStyle();edgeStyle.name='P19/Menu/Selected left edge';
edgeStyle.paints=[{type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:[{position:0,color:{r:1,g:0.9372549,b:0.6823529,a:1}},{position:0.5,color:{r:0.9764706,g:0.7294118,b:0.172549,a:1}},{position:1,color:{r:0.6745098,g:0.4196078,b:0,a:1}}]}];
const selected=[];
for(const component of nav.children){
 if(component.variantProperties.State!=='Selected')continue;
 for(const corner of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])component.setBoundVariable(corner,radius);
 component.strokes=JSON.parse(JSON.stringify(edgeStyle.paints));component.strokeStyleId=edgeStyle.id;
 component.strokeAlign='INSIDE';component.strokeWeight=2;component.strokeTopWeight=0;component.strokeRightWeight=0;component.strokeBottomWeight=0;component.strokeLeftWeight=2;
 const marker=component.children.find(c=>c.name==='Selected / left marker');marker.visible=false;
 selected.push({id:component.id,name:component.name,radius:component.cornerRadius,strokeLeft:component.strokeLeftWeight,oldMarkerVisible:marker.visible,icon:component.children.find(c=>c.name==='Icon').width});
}
const side=oldSide.clone();section.appendChild(side);side.name='P19/07BRoomy/SidebarViewport';side.x=620;side.y=64;
side.description='Viewport-height sidebar for page 19. Screen baseline 1920x1080. Sidebar height = viewport height - 88px header - 18px top - 18px bottom (956px at 1080). Root fills rail height; menu scroll viewport fills remaining space; footer stays at bottom. Preserve original 44px rows, 22px icons and 13px labels. Web equivalent: app height 100dvh, body min-height:0, sidebar menu overflow-y:auto.';
const navMap=new Map(oldNav.children.map(c=>[c.id,nav.children.find(n=>n.name===c.name)]));
const variants=[];
for(const component of side.children){
 const inner=component.children.find(n=>n.name==='Compact menu');
 const groups=inner.children.filter(n=>n.name.startsWith('Group /'));
 const viewport=inner.children.find(n=>n.name==='Flexible space');
 inner.insertChild(0,viewport);viewport.name='Menu scroll viewport';viewport.itemSpacing=inner.itemSpacing;viewport.clipsContent=true;viewport.overflowDirection='VERTICAL';viewport.minHeight=null;
 for(const group of groups){viewport.appendChild(group);group.layoutSizingHorizontal='FILL';group.layoutSizingVertical='HUG';}
 viewport.layoutSizingHorizontal='FILL';viewport.layoutSizingVertical='FILL';inner.minHeight=null;
 const rows=component.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.name.startsWith('Menu /'));
 const beforeRows=rows.map(n=>({name:n.name,label:n.children.find(c=>c.type==='TEXT').characters,icon:n.children.find(c=>c.name==='Icon').mainComponent.id}));
 for(const row of rows){const target=navMap.get(row.mainComponent.id);if(!target)throw Error('Unexpected menu source '+row.mainComponent.id);row.swapComponent(target);}
 component.minHeight=null;component.resize(232,956);component.layoutSizingHorizontal='FIXED';component.layoutSizingVertical='FIXED';
 const afterRows=rows.map(n=>({name:n.name,label:n.children.find(c=>c.type==='TEXT').characters,icon:n.children.find(c=>c.name==='Icon').mainComponent.id}));
 variants.push({id:component.id,name:component.name,height:component.height,minHeight:component.minHeight,viewportId:viewport.id,footerId:inner.children.find(n=>n.name==='Solution footer').id,rowCount:rows.length,rowsPreserved:JSON.stringify(beforeRows)===JSON.stringify(afterRows)});
}
side.resize(576,1004);side.children[0].x=24;side.children[0].y=24;side.children[1].x=320;side.children[1].y=24;
section.resizeWithoutConstraints(1250,1132);section.x=100;section.y=23900;
const created=[section.id,nav.id,side.id,...nav.findAll().filter(n=>!n.id.startsWith('I')).map(n=>n.id),...side.findAll().filter(n=>!n.id.startsWith('I')).map(n=>n.id)];
return {createdNodeIds:[...new Set(created)],createdStyleIds:[edgeStyle.id],mutatedNodeIds:[],section:{id:section.id,name:section.name},navSet:{id:nav.id,name:nav.name,variants:nav.children.map(n=>({id:n.id,name:n.name}))},sidebarSet:{id:side.id,name:side.name},selected,variants,allPassed:variants.every(v=>v.rowsPreserved&&v.rowCount===14)&&selected.every(v=>v.radius===8&&v.strokeLeft===2&&!v.oldMarkerVisible&&v.icon===22)};
