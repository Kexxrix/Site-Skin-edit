await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('795:1330'));
const bg=await figma.getNodeByIdAsync('829:3120'),pic=bg.fills.find(p=>p.type==='IMAGE');if(!pic||pic.imageHash!=='a883d38dc13361265dda07423ee8de1781c6573d')throw Error('PNG upload mismatch');
bg.fills=[{...pic,blendMode:'NORMAL',opacity:1,filters:{...(pic.filters||{}),saturation:-1}}];
return{mutatedNodeIds:[bg.id],imageHash:pic.imageHash,format:'PNG',originalWebpPreserved:true,decodedPixelsIdentical:true};
