const fs=require('fs');const path=require('path');const q=__dirname;
const a=JSON.parse(fs.readFileSync(path.join(q,'project-after-motion.json'),'utf8'));
const b=JSON.parse(fs.readFileSync(path.join(q,'project-before.json'),'utf8'));
console.log(JSON.stringify({preservation:b.items.map(x=>({id:x.id,name:x.name,unchanged:JSON.stringify(x)===JSON.stringify(a.items.find(y=>y.id===x.id))})),devices:a.items.filter(x=>x.id===151||x.id===163).map(x=>({name:x.name,layers:x.layers.map(l=>({name:l.name,type:l.type,keys:Object.keys(l),transform:l.transformGroup?.properties.filter(p=>!p.matchName.includes('Position_'))}))}))},null,2));
