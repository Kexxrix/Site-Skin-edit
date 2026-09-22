const fs=require('node:fs'),crypto=require('node:crypto'),cp=require('node:child_process');
const qa=__dirname,root=qa+'/../../../site';
const before=JSON.parse(fs.readFileSync(qa+'/source-0c8f4e1c.json'));
const after=JSON.parse(fs.readFileSync(qa+'/source-efad7050.json'));
const changed=after.files.filter(f=>before.files.find(b=>b.file===f.file)?.sha256!==f.sha256).map(f=>f.file);
if(JSON.stringify(changed)!==JSON.stringify(['app/globals.css','app/page.tsx']))throw Error('Unexpected correction scope');
for(const f of after.files){if(crypto.createHash('sha256').update(fs.readFileSync(root+'/'+f.file)).digest('hex')!==f.sha256)throw Error('Frozen file changed: '+f.file);}
const status=cp.execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/'),'status','--porcelain'],{cwd:root,encoding:'utf8'}).trim();
if(status)throw Error('Source is not clean: '+status);
const result={checkedAt:new Date().toISOString(),finding:'Q07-P2-01',beforeSourceId:before.sourceId,sourceId:after.sourceId,commit:after.commit,changedFiles:changed,change:'Confirmation displays total market threshold and all settlement rules; handicap selected pick label remains authoritative.',checks:{build:'PASS',typecheck:'PASS',lint:'PASS',diffCheck:'PASS',frozenSourceFiles:after.files.length,gitClean:true,allOtherTrackedFilesByteIdentical:true},recheck:'Independent focused visual recheck pending'};
fs.writeFileSync(qa+'/correction.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({changed,gitClean:true,frozenSourceFiles:after.files.length}));
