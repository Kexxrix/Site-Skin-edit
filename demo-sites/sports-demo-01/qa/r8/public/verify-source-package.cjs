const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process'),assert=require('assert/strict');
const site=path.resolve(__dirname,'../../../site'),manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../implementation/audit-ready.json')));
const hash=(b,type='sha256')=>crypto.createHash(type).update(b).digest('hex');
const git=(...a)=>cp.execFileSync('git',['-c','safe.directory='+site.replaceAll('\\','/'),...a],{cwd:site,encoding:'utf8'}).trim();
const tree=Object.fromEntries(git('ls-tree','-r','HEAD').split('\n').map(line=>{const [meta,name]=line.split('\t');return [name,meta.split(' ')[2]];}));
const normalized=[],raw=[];
for(const f of manifest.files){const b=fs.readFileSync(path.join(site,f.path));assert.equal(hash(b),f.sha256,'Frozen bytes '+f.path);const blob=b=>hash(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b]),'sha1');if(blob(b)===tree[f.path])raw.push(f.path);else{const text=b.toString('utf8');assert.ok(!text.includes('\u0000'));assert.equal(blob(Buffer.from(text.replaceAll('\r\n','\n'))),tree[f.path],'Commit bytes '+f.path);normalized.push(f.path);}}
const archive=path.join(__dirname,'mercury-r8-audited.tar.gz');
const entries=cp.execFileSync('C:/Windows/System32/tar.exe',['-tzf',archive],{encoding:'utf8'}).trim().split(/\r?\n/);
assert.ok(entries.includes('dist/.openai/hosting.json'));assert.ok(entries.includes('dist/server/index.js'));assert.ok(!entries.some(x=>x.includes('/.wrangler/')));
const css=path.join(site,'dist/client/_next/static/css/index.BRM1po-v.css');
const report={verifiedAt:new Date().toISOString(),sourceId:manifest.sourceId,commit:git('rev-parse','--verify','HEAD'),sourceFiles:manifest.files.length,allFrozenBytesMatch:true,rawGitBlobMatches:raw.length,lineEndingNormalizedOnly:normalized,archive:{path:archive,bytes:fs.statSync(archive).size,sha256:hash(fs.readFileSync(archive)),entries:entries.length,noRuntimeCache:true,hostingManifest:true,worker:true},css:{name:'index.BRM1po-v.css',sha256:hash(fs.readFileSync(css))},packageMethod:'Sites0.1.65 official package-site.sh via Git Bash; .mjs wrapper selected unconfigured WindowsApps WSL bash, so explicit Git Bash and /e archive path used. Same official packager succeeded.'};
fs.writeFileSync(path.join(__dirname,'source-and-package.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
