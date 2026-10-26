
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));figma.skipInvisibleInstanceChildren=false;
await Promise.all([{family:'Pretendard JP',style:'Black'},{family:'Noto Serif KR',style:'SemiBold'}].map(f=>figma.loadFontAsync(f)));
const root=await figma.getNodeByIdAsync('884:7328'),titles=root.findAll(n=>n.type==='TEXT'&&n.name==='Title'&&n.parent.name.startsWith('P23-A0')),mutated=[];
for(const n of titles){await n.setTextStyleIdAsync('S:3561e3d1e8ef81a506a4e0fa90670d56ae690f1a,');n.textAutoResize='WIDTH_AND_HEIGHT';mutated.push(n.id);}
const cardStyle=figma.createTextStyle();cardStyle.name='P24/Hanji Ink/Typography/Serif card 14';cardStyle.fontName={family:'Noto Serif KR',style:'SemiBold'};cardStyle.fontSize=14;cardStyle.lineHeight={unit:'PIXELS',value:19.6};cardStyle.letterSpacing={unit:'PIXELS',value:-.2};cardStyle.leadingTrim='NONE';
const cards=root.findAll(n=>n.type==='TEXT'&&n.name==='Title'&&n.parent.name==='Information');
for(const n of cards){const a=n.textAutoResize;await n.setTextStyleIdAsync(cardStyle.id);n.textAutoResize=a;mutated.push(n.id);}
const unused=await figma.getStyleByIdAsync('S:4cbe20ac8600599fa75a91cedecfd1b883d17cad,');unused.remove();
return{createdNodeIds:[],mutatedNodeIds:mutated,createdStyleIds:[cardStyle.id],removedStyleIds:['S:4cbe20ac8600599fa75a91cedecfd1b883d17cad,'],cardStyleId:cardStyle.id,heroBounds:titles.map(n=>({id:n.id,width:n.width,height:n.height,auto:n.textAutoResize})),cardBounds:cards.map(n=>({id:n.id,width:n.width,height:n.height}))};

