import fs from 'node:fs';
import {run} from './ae-client.mjs';
const record=JSON.parse(fs.readFileSync(new URL('./logs/2026-09-11T09-50-13-696Z.json',import.meta.url))).records[0];
const ops=[{operation:'property.add',args:{comp:'TITAN_MASTER_20S',layer:'S01_Meet',property:['Text','Animators','Animator 1','Properties'],matchName:'ADBE Text Position 3D'}},record.call.args.args.ops[7],...record.call.args.args.ops.slice(107)];
for(const o of ops)if(o.args?.property?.[0]==='Contents'&&o.args.property[1]==='Continuous_Path')o.args.property.splice(2,0,'Contents');
const root=new URL('./',import.meta.url).pathname.replace(/^\//,'');
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_save_project'},...[20,104,118,124,155].map(f=>({name:'ae_render_frame',args:{compNameOrId:'TITAN_MASTER_20S',time:f/30,outPath:root+'qa/motion-pass1-F'+String(f).padStart(3,'0')+'.png'}}))]});
