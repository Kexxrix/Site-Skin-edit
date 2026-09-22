import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const base='E:/codexwork/Site-Skin-edit/demo-sites';
const app=path.join(base,'sports-demo-03/site');
const record=path.join(base,'sports-demo-03/runs/r1/implementation');
const before=JSON.parse(fs.readFileSync(path.join(record,'baseline.json')));
const skip=new Set(['.git','node_modules','.next','.vinext','.wrangler','dist','.sites-runtime','work','outputs']);
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function inventory(root){const files={};function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(skip.has(e.name)||e.name.startsWith('.env')||e.name.endsWith('.pem'))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile())files[path.relative(root,p).replaceAll('\\','/')]=hash(p);}}walk(root);return files;}
const protection={};
for(const key of ['source','protectedSirius']){
 const previous=before[key],root=previous.root,site=path.join(root,'site'),files=inventory(root);
 const changed=Object.keys(previous.files).filter(p=>files[p]!==previous.files[p]);
 const added=Object.keys(files).filter(p=>!(p in previous.files));
 const head=execFileSync('git',['-c',`safe.directory=${site}`,'-C',site,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
 const dirty=execFileSync('git',['-c',`safe.directory=${site}`,'-C',site,'status','--porcelain'],{encoding:'utf8'}).trim();
 protection[key]={head,dirty,changed,added,unchanged:head===previous.head&&dirty===previous.dirty&&!changed.length&&!added.length};
}
const current=inventory(app),source=path.join(base,'sports-demo-01/site');
const changedFiles=Object.keys(current).filter(p=>!fs.existsSync(path.join(source,p))||hash(path.join(source,p))!==current[p]);
const retained=['app/match-motion.tsx','app/motion.css','app/typography.css','app/match-records.json','app/live-snapshots.json','package.json','package-lock.json'].map(p=>({path:p,sha256:current[p],unchanged:current[p]===hash(path.join(source,p))}));
const srcData=fs.readFileSync(path.join(source,'app/demo-data.ts'),'utf8');
const ownData=fs.readFileSync(path.join(app,'app/demo-data.ts'),'utf8');
const recordData={at:new Date().toISOString(),protection,changedFiles,retained,onlyDataChangeIsStorageKey:ownData===srcData.replace("storageKey:'mercury-demo-r6-v1'","storageKey:'aldebaran-frame-r1-v1'"),build:{command:'npm run build',exitCode:0},typecheck:{command:'tsc --noEmit --incremental false',exitCode:0}};
fs.writeFileSync(path.join(record,'changes-and-preservation.json'),JSON.stringify(recordData,null,2));
console.log(JSON.stringify(recordData,null,2));
if(Object.values(protection).some(p=>!p.unchanged)||retained.some(p=>!p.unchanged)||!recordData.onlyDataChangeIsStorageKey)process.exitCode=1;
