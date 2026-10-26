
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));figma.skipInvisibleInstanceChildren=false;
await figma.loadFontAsync({family:'Noto Serif KR',style:'Black'});
const style=await figma.getStyleByIdAsync('S:4cbe20ac8600599fa75a91cedecfd1b883d17cad,');style.letterSpacing={unit:'PIXELS',value:-.2};
const root=await figma.getNodeByIdAsync('884:7328'),titles=root.findAll(n=>n.type==='TEXT'&&n.name==='Title'&&n.parent.name.startsWith('P23-A0'));
for(const n of titles){await n.setTextStyleIdAsync(style.id);n.textAutoResize='NONE';n.resize(n.characters==='회원 이벤트'?126:149,34);}
return{createdNodeIds:[],mutatedNodeIds:titles.map(n=>n.id),mutatedStyleIds:[style.id],bounds:titles.map(n=>({id:n.id,width:n.width,height:n.height,spacing:n.letterSpacing}))};

