import fs from 'node:fs';
import {run} from './ae-client.mjs';
const M='TITAN_MASTER_20S',root=new URL('./',import.meta.url).pathname.replace(/^\//,'');
const old=JSON.parse(fs.readFileSync(new URL('./logs/2026-09-11T09-50-13-696Z.json',import.meta.url))).records[0].call.args.args.ops[107].args.expression;
const path=old.replace('else if(f<108){q=s(p(74,101));pts=[[708,638],[708+1102*q,638]];}','else if(f<101){q=s(p(74,101));pts=[[708,638],[708+1102*q,638]];}\nelse if(f<108){q=s(p(101,108));pts=[[708,638],[1810,638],[1810,638-558*q]];}')
.replace('else if(f<114){q=s(p(108,114));pts=[[708,638],[1810,638],[1810,638-478*q]];}','else if(f<114){q=s(p(108,114));pts=[[708,638],[1810,638],[1810,80+80*q]];}')
.replace('pts=[[708,638],[1810,638],[1810,160],[378,160],[378,750],[378+1662*q,750]];','pts=[mix([708,638],[2500,160],q),mix([1810,638],[2500,160],q),mix([1810,160],[2500,160],q),[378,160],[378,750],[378+1662*q,750]];')
.replace('pts=[[708,638],[1810,638],[1810,160],[378,160],[378,750],[2040,750],[2040+80*q,750+80*q*q]];','pts=[[2500,160],[378,160],[378,750],[2040,750],[2040+80*q,750+80*q*q]];');
const common='var f=time*30;function p(a,b){return Math.max(0,Math.min(1,(f-a)/(b-a)));}function s(x){return x*x*(3-2*x);}';
const ops=[{operation:'expression.set',args:{comp:M,layer:'SHARED_LINE_01_to_03',property:['Contents','Continuous_Path','Contents','Path 1','Path'],expression:path}},
{operation:'layer.create_shape',args:{comp:M,name:'S01_Line_Continuation'}},
{operation:'transform.set',args:{comp:M,layer:'S01_Line_Continuation',position:[0,0],anchorPoint:[0,0]}},
{operation:'shape.add_group',args:{comp:M,layer:'S01_Line_Continuation',name:'Continuation'}},
{operation:'shape.add_path',args:{comp:M,layer:'S01_Line_Continuation',groupIndex:1,vertices:[[1440,431],[2500,431]],closed:false}},
{operation:'shape.add_stroke',args:{comp:M,layer:'S01_Line_Continuation',groupIndex:1,color:[0.137,0.153,0.173,1],width:3.2}},
{operation:'expression.set',args:{comp:M,layer:'S01_Line_Continuation',property:['Contents','Continuation','Contents','Path 1','Path'],expression:common+'var e=thisComp.layer("SHARED_DOT_ENDPOINT").transform.position;var x=e[0]+(2500-e[0])*s(p(1,10))*(1-s(p(31,44)));createPath([[e[0],e[1]],[x,e[1]]],[],[],false);'}},
{operation:'layer.set_props',args:{comp:M,layer:'S01_Line_Continuation',props:{outPoint:44/30}}},
{operation:'layer.create_shape',args:{comp:M,name:'S02_Subtle_Frame'}},
{operation:'transform.set',args:{comp:M,layer:'S02_Subtle_Frame',position:[1230,485]}},
{operation:'shape.add_group',args:{comp:M,layer:'S02_Subtle_Frame',name:'Frame'}},
{operation:'shape.add_rect',args:{comp:M,layer:'S02_Subtle_Frame',groupIndex:1,size:[1625,872],roundness:25}},
{operation:'shape.add_stroke',args:{comp:M,layer:'S02_Subtle_Frame',groupIndex:1,color:[0.961,0.953,0.933,1],width:2}},
{operation:'expression.set',args:{comp:M,layer:'S02_Subtle_Frame',property:['Transform','Opacity'],expression:common+'20*s(p(39,47))*(1-s(p(108,118)));'}},
{operation:'layer.set_props',args:{comp:M,layer:'S02_Subtle_Frame',props:{inPoint:39/30,outPoint:118/30}}},
{operation:'layer.move',args:{comp:M,layer:'S02_Subtle_Frame',toIndex:21}},
{operation:'timeline.set_time',args:{comp:M,time:0}},
{operation:'render.set_output',args:{queueIndex:1,renderTemplate:'Best Settings',outputTemplate:'H.264 - Match Render Settings - 40 Mbps',outputPath:root+'qa/review-pass1.mp4',timeSpanStart:0,timeSpanDuration:5.7,skipFrames:0,logType:'errorsAndSettings'}},
{operation:'render.set_om_settings',args:{queueIndex:1,settings:{'Output Audio':'Off'}}}];
await run({write:true,compact:true,calls:[{name:'ae_do',args:{operation:'batch.run',args:{ops,stopOnError:true},timeoutMs:60000}},{name:'ae_save_project'},{name:'ae_do',args:{operation:'project.open',args:{path:root+'TITAN-Production-Scenes01-03-v001.aep',save:false}}},{name:'ae_do',args:{operation:'render.status'}},{name:'ae_do',args:{operation:'render.start',timeoutMs:600000}}]});
