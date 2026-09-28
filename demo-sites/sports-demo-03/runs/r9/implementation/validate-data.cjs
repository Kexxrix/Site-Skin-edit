const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const site=path.resolve(__dirname,'../../../site'),ts=require(path.join(site,'node_modules/typescript'));
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file);
const data=require(path.join(site,'app/demo-data.ts'));
const baseline=JSON.parse(fs.readFileSync(path.join(__dirname,'baseline.json'),'utf8')).matches;
const audit=JSON.parse(fs.readFileSync(path.join(__dirname,'pricing-audit.json'),'utf8'));
const fixed=JSON.parse(fs.readFileSync(path.join(site,'app/prematch-odds-r9.json'),'utf8'));
const findings=[],check=(pass,message)=>{if(!pass)findings.push(message);};
check(data.prematchMatches.length===61,'Expected 61 prematch fixtures');
check(Object.keys(fixed.fixtures).length===61,'Snapshot coverage');
const sportCounts={},pairs=[new Map(),new Map(),new Map()];
let outcomes=0,stableIds=0,duplicates=0,pushMarkets=0,monotonicComparisons=0,maxRoundingError=0;
for(const match of data.prematchMatches){
  const old=baseline.find(m=>m.id===match.id),fixture=fixed.fixtures[match.id];
  check(!!old&&!!fixture,'Missing fixture '+match.id);
  check(match.sourceKind==='synthetic-model'&&match.datasetVersion===fixed.datasetVersion,'Source metadata '+match.id);
  check(old.markets.length===match.markets.length,'Market count '+match.id);
  sportCounts[match.sport]=(sportCounts[match.sport]||0)+1;
  match.markets.forEach((m,i)=>m.picks.forEach((p,j)=>{
    outcomes++;
    check(Number.isFinite(p.price)&&p.price>1&&Number.isInteger(p.priceCents)&&p.priceCents===Math.round(p.price*100),'Invalid canonical price '+match.id+'/'+i+'/'+j);
    check(/^\d+\.\d{2}$/.test(data.priceText(p.price)),'Display decimals');
    check(data.selectionId(match,i,j)===old.selectionIds[i][j],'Selection ID changed '+match.id+'/'+i+'/'+j);
    stableIds++;
  }));
  for(let i=0;i<3;i++){const pair=match.markets[i].picks.map(p=>p.priceCents).join('/');pairs[i].set(pair,(pairs[i].get(pair)||0)+1);}
  const rows=audit.filter(m=>m.fixtureId===match.id),eventPrices=new Map(),families=new Map();
  for(const row of rows){
    let quotedSum=0,expectedSum=0,errorBound=0;
    if(row.outcomes.some(q=>q.refundStake>1e-8))pushMarkets++;
    row.outcomes.forEach((q,p)=>{
      check(Math.abs(q.winStake+q.loseStake+q.refundStake-1)<1e-7,'Settlement mass '+match.id+'/'+row.index);
      check(q.priceCents===match.markets[row.index].picks[p].priceCents,'Adapter/snapshot price mismatch');
      const event=[row.scope,...[q.winStake,q.loseStake,q.refundStake].map(x=>x.toFixed(9))].join('|');
      if(eventPrices.has(event)){duplicates++;check(eventPrices.get(event)===q.priceCents,'Equivalent event price mismatch '+match.id);}
      eventPrices.set(event,q.priceCents);
      quotedSum+=1/q.price;expectedSum+=q.winStake/(q.winStake+q.loseStake)*(1+row.margin);
      errorBound+=.005/(q.price*(q.price-.005));
    });
    maxRoundingError=Math.max(maxRoundingError,Math.abs(quotedSum-expectedSum));
    check(Math.abs(quotedSum-expectedSum)<=errorBound+1e-7,'Overround inconsistent with recorded margin '+match.id+'/'+row.index);
    if(['total','handicap'].includes(row.family)){
      const key=[row.scope,row.family,row.team].join('|');
      families.set(key,[...(families.get(key)||[]),row]);
    }
  }
  for(const rows of families.values()){
    rows.sort((a,b)=>a.line-b.line);
    for(let i=1;i<rows.length;i++){
      const a=rows[i-1],b=rows[i];monotonicComparisons++;
      if(a.family==='total'){
        const underA=a.outcomes[a.labels.indexOf('언더')].priceCents,overA=a.outcomes[a.labels.indexOf('오버')].priceCents;
        const underB=b.outcomes[b.labels.indexOf('언더')].priceCents,overB=b.outcomes[b.labels.indexOf('오버')].priceCents;
        check(underA>=underB&&overA<=overB,'Total monotonicity '+match.id+'/'+a.scope+'/'+a.team);
      }else check(a.outcomes[0].priceCents>=b.outcomes[0].priceCents&&a.outcomes[1].priceCents<=b.outcomes[1].priceCents,'Handicap monotonicity '+match.id);
    }
  }
}
for(const [i,freq] of pairs.entries())check(freq.size>1,'All fixtures repeat base market '+i);
const report={datasetVersion:fixed.datasetVersion,fixtures:data.prematchMatches.length,markets:audit.length,outcomes,stableSelectionIds:stableIds,sportCounts,canonicalPriceRange:[Math.min(...audit.flatMap(r=>r.outcomes.map(o=>o.price))),Math.max(...audit.flatMap(r=>r.outcomes.map(o=>o.price)))],baseMarkets:pairs.map((f,i)=>({index:i,uniquePriceSets:f.size,maxRepeatedSetCount:Math.max(...f.values())})),equivalentEventComparisons:duplicates,monotonicComparisons,pushMarkets,pricingMargins:[...new Set(audit.map(r=>r.margin))],maxRoundingError,findings,passed:findings.length===0};
fs.writeFileSync(path.join(__dirname,'data-validation.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(findings.length)process.exit(1);
