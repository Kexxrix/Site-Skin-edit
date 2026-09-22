import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const base='E:/codexwork/Site-Skin-edit/demo-sites';
const record=base+'/sports-demo-03/runs/r2/implementation';
fs.mkdirSync(record,{recursive:true});
fs.mkdirSync(base+'/sports-demo-03/runs/r2/public',{recursive:true});
const skip=new Set(['.git','node_modules','.next','.vinext','.wrangler','dist','.sites-runtime','work','outputs']);
function inventory(root){const files={};function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(skip.has(e.name)||e.name.startsWith('.env')||e.name.endsWith('.pem'))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile())files[path.relative(root,p).replaceAll('\\','/')]=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');}}walk(root);return files;}
function state(id,whole=false){const root=base+'/'+id,site=root+'/site';return {path:site,head:execFileSync('git',['-c',`safe.directory=${site}`,'-C',site,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),dirty:execFileSync('git',['-c',`safe.directory=${site}`,'-C',site,'status','--porcelain'],{encoding:'utf8'}).trim(),files:inventory(whole?root:site)};}
const current={at:new Date().toISOString(),aldebaran:state('sports-demo-03'),mercury:state('sports-demo-01',true),sirius:state('sports-demo-02',true)};
const file=record+'/baseline.json';
if(process.argv[2]==='baseline'){
 fs.writeFileSync(file,JSON.stringify(current,null,2),{flag:'wx'});
 console.log(JSON.stringify(Object.fromEntries(Object.entries(current).map(([k,v])=>[k,typeof v==='object'?{head:v.head,dirty:v.dirty,count:Object.keys(v.files).length}:v]))));
}else{
 const before=JSON.parse(fs.readFileSync(file));
 const result={at:current.at};
 for(const k of ['aldebaran','mercury','sirius']){const a=before[k],b=current[k];result[k]={head:b.head,dirty:b.dirty,changed:Object.keys(a.files).filter(p=>b.files[p]!==a.files[p]),added:Object.keys(b.files).filter(p=>!(p in a.files)),headUnchanged:a.head===b.head,dirtyUnchanged:a.dirty===b.dirty};}
 fs.writeFileSync(record+'/preservation.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
 if(['mercury','sirius'].some(k=>result[k].changed.length||result[k].added.length||!result[k].headUnchanged||!result[k].dirtyUnchanged))process.exitCode=1;
}
