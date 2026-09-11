import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=new URL('./',import.meta.url).pathname.replace(/^\//,'');
const isFinal=process.argv.includes('--final');
const input=path.join(root,isFinal?'TITAN-Scenes01-03-v001.mp4':'qa/review-pass1.mp4');
function cmd(bin,args){const r=spawnSync(bin,args,{encoding:'utf8',maxBuffer:20e6});if(r.status!==0)throw new Error(bin+': '+r.stderr);return r;}
const probe=JSON.parse(cmd('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',input]).stdout);
const decode=cmd('ffmpeg',['-v','error','-i',input,'-f','null','-']);
fs.writeFileSync(path.join(root,isFinal?'qa/final-probe.json':'qa/review-pass1-probe.json'),JSON.stringify({probe,fullDecode:{exitCode:decode.status,stderr:decode.stderr}},null,2),{flag:'wx'});
const frames=[0,3,7,10,20,30,38,39,44,47,65,70,73,92,96,100,107,113,114,118,122,124,131,135,138,155,163,170];
for(const f of frames)cmd('ffmpeg',['-v','error','-n','-i',input,'-vf',`select=eq(n\\,${f})`.replace('\\\\','\\'),'-frames:v','1','-update','1',path.join(root,(isFinal?'qa/final-F':'qa/video-F')+String(f).padStart(3,'0')+'.png')]);
const source=path.resolve(root,'../../../..','TEMP/아이패드.mp4');
if(!isFinal)for(const [f,t] of [[114,2],[170,3.8666666667]])cmd('ffmpeg',['-v','error','-n','-ss',String(t),'-i',source,'-frames:v','1','-update','1',path.join(root,'qa/original-source-for-F'+f+'.png')]);
console.log(JSON.stringify({probe,fullDecode:decode.stderr,framesExtracted:frames.length}));
