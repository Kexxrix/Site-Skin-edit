import { run, pathRoot } from './ae-client.mjs';
import fs from 'node:fs';
const base = JSON.parse(fs.readFileSync(new URL('../source-manifest.json', import.meta.url),'utf8')).assets.find(a=>a.role==='base_aep').path;
for (const name of ['PRESERVED-UNSAVED-BEFORE-APPEND.aep','TITAN-Production-v002.aep']) if(fs.existsSync(pathRoot+name)) throw Error('Destination exists: '+name);
const calls=[
 {name:'ae_save_project',args:{path:pathRoot+'PRESERVED-UNSAVED-BEFORE-APPEND.aep'}},
 {name:'ae_project_export_json',args:{outPath:pathRoot+'qa/preserved-unsaved-project.json'}},
 {name:'ae_do',args:{operation:'project.open',args:{path:base,save:false}}},
 {name:'ae_save_project',args:{path:pathRoot+'TITAN-Production-v002.aep'}},
 {name:'ae_project_export_json',args:{outPath:pathRoot+'qa/base-current-native-project.json'}},
 {name:'ae_do',args:{operation:'comp.info',args:{comp:'TITAN_MASTER_20S'}}},
 {name:'ae_do',args:{operation:'marker.list',args:{comp:'TITAN_MASTER_20S'}}},
 ...[0,39,70,100,114,124,135,155,163,170].map(f=>({name:'ae_render_frame',args:{compNameOrId:'TITAN_MASTER_20S',time:f/30,outPath:pathRoot+'qa/before-F'+String(f).padStart(3,'0')+'.png'}})),
 ...['project','comp','layer','text','font','shape','property','keyframe','expression','mask','render','timeline','footage','batch'].map(category=>({name:'ae_catalog',args:{category}}))
];
await run({write:true,compact:true,calls});
