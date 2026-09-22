const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const out=path.join(__dirname,'sources');
fs.mkdirSync(out,{recursive:true});
const ids=['401816943','401816960','401816961'];
(async()=>{
  const results=await Promise.allSettled(ids.map(async id=>{
    const url=`https://site.web.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?contentorigin=espn&event=${id}`;
    const response=await fetch(url);if(!response.ok)throw Error(`${id}: ${response.status}`);
    const bytes=Buffer.from(await response.arrayBuffer());
    const file=`espn-mlb-${id}-summary.json`;fs.writeFileSync(path.join(out,file),bytes);
    const data=JSON.parse(bytes);
    return {id,url,collectedAt:new Date().toISOString(),file,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),keys:Object.keys(data),plays:data.plays?.length,header:data.header?.competitions?.[0]?.status};
  }));
  fs.writeFileSync(path.join(__dirname,'progress-collection.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})();
