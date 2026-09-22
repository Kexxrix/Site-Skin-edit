const fs=require('fs'),path=require('path'),cp=require('child_process'),assert=require('assert/strict'),Module=require('module'),crypto=require('crypto');
const site=path.resolve(__dirname,'../../../site'),filename=path.join(site,'app/demo-data.ts'),ts=require(path.join(site,'node_modules/typescript'));
const git=(...args)=>cp.execFileSync('git',['-c','safe.directory='+site.replaceAll('\\','/'),...args],{cwd:site,encoding:'utf8'});
function compile(source){const mod=new Module(filename,module);mod.filename=filename;mod.paths=Module._nodeModulePaths(path.dirname(filename));mod._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2020}}).outputText,filename);return mod.exports;}
const before=compile(git('show','HEAD:app/demo-data.ts')),after=compile(fs.readFileSync(filename,'utf8')),results=[];
function check(name,a,b){assert.deepEqual(a,b,name);results.push({name,passed:true});}
check('77 unique IDs preserved',after.matches.map(m=>m.id).sort(),before.matches.map(m=>m.id).sort());
for(const old of before.matches){const current=after.matches.find(m=>m.id===old.id);for(const key of ['markets','home','away','leagueLogo','league','leagueKey','section','startUtc'])check(`${old.id}: ${key} unchanged`,current[key],old[key]);}
check('first live six have 3 progress snapshots',after.matches.filter(m=>m.section==='live').slice(0,6).filter(m=>m.state==='in').length,3);
check('all new sports mapped',after.sportMenu.filter(s=>s.logo).every(s=>s.logo.startsWith('/sports/r8/')&&fs.existsSync(path.join(site,'public',s.logo))),true);
const selected=ids=>ids.map(id=>({id:id+'-0-0',matchId:id,marketIndex:0,pickIndex:0}));
check('calculation unaffected by sorting',after.totalsFor(selected(['record-401816943','record-401902644']),10000),{odds:'2.870',potential:'28704'});
for(const raw of ['', 'abc', '-1000','1000.5','999','100001'])check(`invalid stake ${raw}`,!!after.validateStake(raw,1000000).error,true);
check('valid minimum',after.validateStake('1000',1000000),{value:1000,error:''});
check('valid maximum',after.validateStake('100000',1000000),{value:100000,error:''});
for(const name of ['app/match-records.json','app/logo-presentation.json','app/layout.tsx','app/typography.css','components/ui/button.tsx'])check(name+' retained',fs.readFileSync(path.join(site,name),'utf8').replaceAll('\r\n','\n'),git('show','HEAD:'+name).replaceAll('\r\n','\n'));
for(const m of after.matches.filter(m=>m.state==='in')){const bytes=fs.readFileSync(path.join(site,'..',m.sourceFile));check('raw SHA '+m.id,crypto.createHash('sha256').update(bytes).digest('hex'),m.sourceSha256);const p=JSON.parse(bytes).plays.find(p=>p.id===m.progressSource.playId);check('raw play score '+m.id,m.score,[String(p.homeScore),String(p.awayScore)]);check('raw play time '+m.id,m.progressSource.wallclock,p.wallclock);}
fs.writeFileSync(path.join(__dirname,'data-check.json'),JSON.stringify({checkedAt:new Date().toISOString(),results,checks:results.length,passed:true,counts:after.matches.reduce((a,m)=>(a[m.state]=(a[m.state]||0)+1,a),{})},null,2));console.log(JSON.stringify({passed:true,checks:results.length}));
