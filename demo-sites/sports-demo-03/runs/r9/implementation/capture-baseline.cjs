const fs=require('node:fs');
const path=require('node:path');
const site=path.resolve(__dirname,'../../../site');
const ts=require(path.join(site,'node_modules/typescript'));
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file);
const data=require(path.join(site,'app/demo-data.ts'));
const out={source:'4759aae04293e80c9dc3c60658ab97297118dbb0',matches:data.prematchMatches.map(m=>({...m,selectionIds:m.markets.map((market,i)=>market.picks.map((p,j)=>data.selectionId(m,i,j)))}))};
fs.writeFileSync(path.join(__dirname,'baseline.json'),JSON.stringify(out,null,2));
console.log(JSON.stringify(out.matches.map(m=>({id:m.id,sport:m.sport,league:m.leagueKey,home:m.home.originalName||m.home.name,away:m.away.originalName||m.away.name,total:m.markets[1].line,handicap:m.markets[2].line,markets:m.markets.length})),null,2));
