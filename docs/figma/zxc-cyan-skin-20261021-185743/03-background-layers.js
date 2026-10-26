await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
const bg=await figma.getNodeByIdAsync('829:3120'),main=await figma.getNodeByIdAsync('829:2463'),pic=bg.fills.find(p=>p.type==='IMAGE'),shade=bg.fills.find(p=>p.type==='GRADIENT_LINEAR');
if(!pic||!shade)throw Error('Expected image and readability overlay missing');
if(main.children.some(n=>n.name==='ZXC · background shade'))throw Error('Shade already exists; inspect before retry');
bg.fills=[{...pic,blendMode:'NORMAL',filters:{...(pic.filters||{}),saturation:-1}}];
const overlay=figma.createRectangle();main.insertChild(1,overlay);overlay.name='ZXC · background shade';overlay.layoutPositioning='ABSOLUTE';overlay.x=bg.x;overlay.y=bg.y;overlay.resize(bg.width,bg.height);overlay.fills=[shade];
return{mutatedNodeIds:[bg.id],createdNodeIds:[overlay.id],backgroundId:bg.id,overlayId:overlay.id,reason:'Separate image and shade layers so the starfield remains visible and individually editable',imageHash:pic.imageHash};
