const page=figma.root.children.find(p=>p.id==='647:46472');await figma.setCurrentPageAsync(page);
const ids=['647:46475','647:46527','647:46579','647:46633'];const fonts=new Map();
const screens=[];for(const id of ids){const n=await figma.getNodeByIdAsync(id);screens.push(n);for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);}
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const out=[],mutated=[];
for(const screen of screens){
 const shell=screen.children.find(n=>n.name==='Page shell'),rail=shell.children[0],main=shell.children[1],sidebar=rail.children[0];
 main.overflowDirection='NONE';main.clipsContent=false;main.layoutSizingVertical='HUG';
 rail.resize(232,992);rail.layoutSizingVertical='FIXED';rail.layoutSizingHorizontal='FIXED';rail.paddingTop=18;rail.paddingBottom=18;
 sidebar.resize(232,956);sidebar.layoutSizingHorizontal='FILL';sidebar.layoutSizingVertical='FILL';
 shell.layoutSizingVertical='HUG';shell.clipsContent=screen.name.includes('WhiteGold');screen.clipsContent=false;screen.layoutSizingVertical='HUG';
 const active=sidebar.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='Menu / 입금신청'),marker=active.children.find(n=>n.name==='Selected / left marker');
 out.push({id:screen.id,height:screen.height,mainHeight:main.height,mainSizing:main.layoutSizingVertical,railHeight:rail.height,sidebarHeight:sidebar.height,selected:{id:active.id,main:active.mainComponent.id,radius:active.cornerRadius,strokeLeft:active.strokeLeftWeight,strokeRight:active.strokeRightWeight,strokeTop:active.strokeTopWeight,strokeBottom:active.strokeBottomWeight,strokes:active.strokes,marker:marker?{visible:marker.visible,width:marker.width,height:marker.height}:null}});
 mutated.push(screen.id,shell.id,rail.id,sidebar.id,main.id);
}
const a=await figma.getNodeByIdAsync('647:46473'),b=await figma.getNodeByIdAsync('647:46474');a.resizeWithoutConstraints(4048,2077.199951171875);b.resizeWithoutConstraints(4048,2352.199951171875);a.x=100;a.y=100;b.x=100;b.y=2337.199951171875;mutated.push(a.id,b.id);
return {createdNodeIds:[],mutatedNodeIds:mutated,screens:out,fullPageRestored:out.every((s,i)=>Math.abs(s.height-(i<2?1949.199951171875:2224.199951171875))<0.01)};
