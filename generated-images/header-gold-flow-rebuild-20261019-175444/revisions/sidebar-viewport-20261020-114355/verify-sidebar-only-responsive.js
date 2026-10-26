const p=figma.root.children.find(p=>p.id==='647:46472');await figma.setCurrentPageAsync(p);
const ids=['647:46475','647:46527','647:46579','647:46633'];const screens=[];for(const id of ids)screens.push(await figma.getNodeByIdAsync(id));
const fonts=new Map();for(const n of screens)for(const t of n.findAllWithCriteria({types:['TEXT']}))for(const seg of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(seg.fontName),seg.fontName);await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);}
function contentSignature(n){function rec(n){const r={type:n.type,name:n.name,x:n.x,y:n.y,width:n.width,height:n.height,visible:n.visible,opacity:n.opacity};for(const k of ['fills','strokes','effects','cornerRadius'])if(k in n&&typeof n[k]!=='symbol')r[k]=n[k];if(n.type==='TEXT')r.characters=n.characters;if('children'in n)r.children=n.children.map(rec);return r;}return hashString(JSON.stringify(n.children.map(rec)));}

const expected=['fd12ba0f','7e28ba8d','d1f941a4','7489eb88'],tests=[],final=[],mutated=[];
try{for(const [i,screen] of screens.entries()){
 const shell=screen.children.find(n=>n.name==='Page shell'),rail=shell.children[0],sidebar=rail.children[0],main=shell.children[1];
 for(const viewportHeight of [768,900,1080,1440]){
 rail.resize(232,viewportHeight-88);rail.layoutSizingVertical='FIXED';
 const viewport=sidebar.findAll(n=>n.name==='Menu scroll viewport')[0],footer=sidebar.findAll(n=>n.name==='Solution footer')[0];
 const rows=sidebar.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.name.startsWith('Menu /')),active=rows.find(n=>n.name==='Menu / 입금신청'),marker=active.children.find(n=>n.name==='Selected / left marker');
 const dimensionsPreserved=rows.length===14&&rows.every(n=>n.height===44&&n.children.find(c=>c.name==='Icon').width===22&&n.children.find(c=>c.name==='Icon').height===22&&n.children.find(c=>c.type==='TEXT').fontSize===13);
 const selectedMatches=active.cornerRadius===8&&active.strokeLeftWeight===2&&active.strokeRightWeight===0&&active.strokeTopWeight===0&&active.strokeBottomWeight===0&&(!marker||!marker.visible);
 const footerInside=footer.y+footer.height<=sidebar.height-8+0.01,bodyPreserved=contentSignature(main)===expected[i],fullPageVisible=screen.height===(i<2?1949.199951171875:2224.199951171875)&&!main.clipsContent&&main.overflowDirection==='NONE';
 tests.push({screenId:screen.id,viewportHeight,sidebarHeight:sidebar.height,menuHeight:viewport.height,needsMenuScroll:viewport.height<792,footerInside,dimensionsPreserved,selectedMatches,bodyPreserved,fullPageVisible,passed:sidebar.height===viewportHeight-124&&viewport.overflowDirection==='VERTICAL'&&footerInside&&dimensionsPreserved&&selectedMatches&&bodyPreserved&&fullPageVisible});
 }
 rail.resize(232,992);rail.layoutSizingVertical='FIXED';mutated.push(rail.id);
 final.push({screenId:screen.id,artboardHeight:screen.height,railHeight:rail.height,sidebarHeight:sidebar.height,mainOverflow:main.overflowDirection,bodySignature:contentSignature(main),expectedSignature:expected[i]});
}}finally{for(const n of screens){const rail=n.children.find(c=>c.name==='Page shell').children[0];rail.resize(232,992);rail.layoutSizingVertical='FIXED';}}
return {createdNodeIds:[],mutatedNodeIds:mutated,tests,final,allPassed:tests.every(t=>t.passed)};
