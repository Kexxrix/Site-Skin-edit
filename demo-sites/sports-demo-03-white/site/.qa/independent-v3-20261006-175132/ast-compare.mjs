import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);const ts=require('../../node_modules/typescript');
const q=path.dirname(fileURLToPath(import.meta.url)),site=path.resolve(q,'../..'),base='E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3/application-20261006-v1/before-source';
function parse(root,name){const text=fs.readFileSync(path.join(root,'app',name),'utf8'),s=ts.createSourceFile(name,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),events=[],statements=[];function walk(n){if(ts.isJsxAttribute(n)&&/^on[A-Z]/.test(n.name.getText(s)))events.push(n.getText(s));ts.forEachChild(n,walk);}walk(s);for(const n of s.statements){const text=n.getText(s);if(ts.isVariableStatement(n)&&n.declarationList.declarations.some(d=>['approvedIconBase','graphiteSportIcons','approvedFunctionIcons'].includes(d.name.getText(s))))continue;if(ts.isFunctionDeclaration(n)&&n.name?.getText(s)==='GraphiteIcon')continue;statements.push(text);}return {events,statements};}
const results={};let count=0;for(const name of fs.readdirSync(path.join(base,'app')).filter(n=>n.endsWith('.tsx'))){const a=parse(base,name),b=parse(site,name);results[name]={eventCountBefore:a.events.length,eventCountAfter:b.events.length,sameEvents:JSON.stringify(a.events)===JSON.stringify(b.events),sameStatementsOutsideIconMapping:JSON.stringify(a.statements)===JSON.stringify(b.statements)};count+=a.events.length;}
results.totalEventHandlers=count;fs.writeFileSync(path.join(q,'ast-comparison.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
