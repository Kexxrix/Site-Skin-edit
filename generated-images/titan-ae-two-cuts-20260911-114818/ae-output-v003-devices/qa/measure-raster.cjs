const sharp = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{
 for(const file of process.argv.slice(2)){
  const {data,info}=await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const bg=[...data.slice(0,3)], hasAlpha=await sharp(file).stats().then(s=>s.isOpaque===false);
  let minX=info.width,minY=info.height,maxX=-1,maxY=-1,n=0;
  for(let y=0;y<info.height;y++)for(let x=hasAlpha?0:1750;x<info.width;x++){
   const i=(y*info.width+x)*4;
   if(hasAlpha?data[i+3]>8:Math.max(...bg.map((b,c)=>Math.abs(data[i+c]-b)))>8){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);n++;}
  }
  console.log(JSON.stringify({file,bg,hasAlpha,info,bounds:{minX,minY,maxX,maxY,width:maxX-minX+1,height:maxY-minY+1},pixels:n}));
 }
})().catch(e=>{console.error(e);process.exit(1)});
