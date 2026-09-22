const fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto'),path=require('node:path');
const archive=path.join(__dirname,'sirius-r1.tar.gz'),site=path.resolve(__dirname,'../../../site');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const entries=cp.execFileSync('tar',['-tzf',archive],{encoding:'utf8'}).trim().split(/\r?\n/);
for(const required of ['dist/server/index.js','dist/.openai/hosting.json','dist/client/branding/sirius-symbol.png','dist/client/branding/sirius-wordmark.png'])if(!entries.includes(required))throw Error('Missing '+required);
if(entries.some(p=>/(^|\/)(\.git|node_modules|\.wrangler)(\/|$)/.test(p)))throw Error('Unexpected development state in archive');
const files=[];
for(const entry of entries.filter(e=>!e.endsWith('/'))){
 const bytes=cp.execFileSync('tar',['-xOf',archive,entry],{maxBuffer:30*1024*1024});
 const local=entry==='dist/.openai/hosting.json'?site+'/.openai/hosting.json':site+'/'+entry;
 const expected=fs.readFileSync(local);
 if(hash(bytes)!==hash(expected))throw Error('Archive mismatch: '+entry);
 files.push({path:entry,bytes:bytes.length,sha256:hash(bytes)});
}
const metadata=JSON.parse(cp.execFileSync('tar',['-xOf',archive,'dist/.openai/hosting.json'],{encoding:'utf8'}));
if(metadata.project_id!=='appgprj_6aacb6c2a38881918bd8a324fa9c5b54'||metadata.d1!==null||metadata.r2!==null)throw Error('Hosting identity mismatch');
const result={checkedAt:new Date().toISOString(),archive,bytes:fs.statSync(archive).size,sha256:hash(fs.readFileSync(archive)),sourceId:JSON.parse(fs.readFileSync(__dirname+'/expected-assets.json')).sourceId,commit:'4e48de6df3b5810e0afbb668804244f1264c0230',projectId:metadata.project_id,pass:true,allPackagedFilesMatchValidatedBuild:true,files};
fs.writeFileSync(__dirname+'/archive-validation.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({pass:true,files:files.length,bytes:result.bytes,sha256:result.sha256}));
