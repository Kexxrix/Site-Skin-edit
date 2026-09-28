const fs = require('node:fs');
const {execFileSync} = require('node:child_process');
const path = require('node:path');
const expected = ['app/demo-data.ts','app/aldebaran-wog-r5.tsx',...Array.from({length:8},(_,i)=>`public/sports/aldebaran/image_Sports_Aldebaran-${String(i+1).padStart(2,'0')}.png`)];
if (!process.stdin.isTTY) throw new Error('A raw TTY is required');
process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
let input = '', busy = false;
process.stdout.write('READY\n');
process.stdin.on('data', chunk => {
  if (busy) return;
  input += chunk;
  let credential;
  try { credential = JSON.parse(input.trim()); } catch { return; }
  busy = true;
  try {
    if (credential.auth_mode !== 'http_extra_header' || credential.publish_on_push_accepted) throw new Error('Unexpected credential mode');
    const env = {...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never',GIT_CONFIG_COUNT:'2',GIT_CONFIG_KEY_0:'safe.directory',GIT_CONFIG_VALUE_0:process.cwd().replaceAll('\\','/'),GIT_CONFIG_KEY_1:'http.extraHeader',GIT_CONFIG_VALUE_1:'Authorization: Bearer '+credential.token};
    const git = args => execFileSync('git',args,{env,encoding:'utf8',stdio:['ignore','pipe','pipe'],timeout:60000}).trim();
    const before = git(['rev-parse','HEAD']);
    if (before !== '300cc605df9bb846cdeac5333dccb2aef2fec226') throw new Error('Source baseline changed');
    const changes = git(['status','--porcelain','--untracked-files=all']).split('\n').filter(Boolean).map(line=>line.trimStart().slice(2).trim().replace(/^"|"$/g,''));
    if (changes.length!==expected.length || changes.some(file=>!expected.includes(file))) throw new Error('Unexpected source changes: '+JSON.stringify(changes));
    git(['diff','--check']);
    git(['add','--',...expected]);
    git(['commit','-m','Use supplied ALDEBARAN sport icons while preserving card motifs']);
    const sha = git(['rev-parse','HEAD']);
    git(['push',credential.remote_url,`${sha}:refs/heads/${credential.branch}`]);
    const remoteSha = git(['ls-remote',credential.remote_url,`refs/heads/${credential.branch}`]).split(/\s/)[0];
    if (remoteSha!==sha) throw new Error('Remote source does not match');
    const status = git(['status','--porcelain']);
    if (status) throw new Error('Source is not clean after push');
    const result = {before,commit:sha,remoteSha,clean:true,files:expected};
    fs.writeFileSync(path.join(__dirname,'source.json'),JSON.stringify(result,null,2));
    process.stdout.write(JSON.stringify(result)+'\n');
    process.exit(0);
  } catch (error) {
    process.stderr.write(String(error.message).replaceAll(credential.token,'[redacted]')+'\n');
    process.exit(1);
  }
});
