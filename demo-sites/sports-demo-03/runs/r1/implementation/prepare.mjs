import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const base='E:/codexwork/Site-Skin-edit/demo-sites';
const target=path.join(base,'sports-demo-03/site');
const record=path.join(base,'sports-demo-03/runs/r1/implementation');
const skip=new Set(['.git','node_modules','.next','.vinext','.wrangler','dist','.sites-runtime','work','outputs']);
function inventory(root){
 const files={};
 function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(skip.has(e.name)||e.name.startsWith('.env')||e.name.endsWith('.pem'))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile())files[path.relative(root,p).replaceAll('\\','/')]=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');}}
 walk(root);return files;
}
function state(name){const root=path.join(base,name);const app=path.join(root,'site');return {root,head:execFileSync('git',['-c',`safe.directory=${app}`,'-C',app,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),dirty:execFileSync('git',['-c',`safe.directory=${app}`,'-C',app,'status','--porcelain'],{encoding:'utf8'}).trim(),files:inventory(root)};}
if(fs.readdirSync(target).length)throw Error('Destination not empty');
const baseline={createdAt:new Date().toISOString(),source:state('sports-demo-01'),protectedSirius:state('sports-demo-02'),target};
fs.writeFileSync(path.join(record,'baseline.json'),JSON.stringify(baseline,null,2));
const src=path.join(base,'sports-demo-01/site');
const include=['app','components','hooks','lib','public','.gitignore','.oxfmtrc.json','.oxlintrc.json','components.json','next-env.d.ts','next.config.ts','package-lock.json','package.json','tsconfig.json','vite.config.ts'];
for(const name of include)fs.cpSync(path.join(src,name),path.join(target,name),{recursive:true,filter:p=>!path.basename(p).startsWith('.env')&&!p.endsWith('.pem')});
fs.mkdirSync(path.join(target,'.openai'));
fs.writeFileSync(path.join(target,'.openai/hosting.json'),JSON.stringify({d1:null,r2:null},null,2)+'\n');
fs.appendFileSync(path.join(target,'.gitignore'),'\n/.sites-runtime/\n*.tsbuildinfo\n');
console.log(JSON.stringify({sourceHead:baseline.source.head,sourceDirty:baseline.source.dirty,siriusHead:baseline.protectedSirius.head,siriusDirty:baseline.protectedSirius.dirty,protectedFiles:Object.keys(baseline.source.files).length+Object.keys(baseline.protectedSirius.files).length,copied:include}));
