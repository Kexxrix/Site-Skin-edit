const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const source='E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site',dest='E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site',qa='E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/qa/r1/implementation';
if(fs.existsSync(dest))throw Error('Destination already exists');
const git=args=>cp.execFileSync('git',['-c','safe.directory='+source,...args],{cwd:source,encoding:'utf8'}).trim();
const tracked=git(['ls-files','-z']).split('\0').filter(Boolean),manifest=[];
fs.mkdirSync(dest);
for(const file of tracked){const bytes=fs.readFileSync(path.join(source,file));const excluded=file.startsWith('.openai/')||file==='public/screenshot.jpeg';manifest.push({file,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,copied:!excluded});if(excluded)continue;const target=path.join(dest,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(source,file),target);}
fs.mkdirSync(path.join(dest,'.openai'));fs.writeFileSync(path.join(dest,'.openai/hosting.json'),JSON.stringify({d1:null,r2:null},null,2)+'\n');
fs.writeFileSync(path.join(qa,'source-copy.json'),JSON.stringify({source,dest,sourceCommit:git(['rev-parse','HEAD']),sourceStatus:git(['status','--short']),createdAt:new Date().toISOString(),sourceFiles:manifest,excluded:['.git','remote','credentials','.openai/hosting.json','node_modules','build/cache/work directories','public/screenshot.jpeg','untracked tsconfig.tsbuildinfo'],symlinks:false},null,2));
console.log(JSON.stringify({sourceCommit:git(['rev-parse','HEAD']),tracked:manifest.length,copied:manifest.filter(f=>f.copied).length,hosting:{d1:null,r2:null},dest}));
