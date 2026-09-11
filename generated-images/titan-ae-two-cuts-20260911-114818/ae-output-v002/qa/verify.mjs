import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const sharp = require('sharp');
const qa = path.dirname(fileURLToPath(import.meta.url));
const out = path.dirname(qa);
const read = name => JSON.parse(fs.readFileSync(path.join(qa, name), 'utf8'));
const sha = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const before = read('project-before.json'), after = read('project-after.json');
const preservation = before.items.map(item => ({id:item.id, name:item.name, unchanged:JSON.stringify(item) === JSON.stringify(after.items.find(other => other.id === item.id))}));
assert(preservation.every(item => item.unchanged), 'Pre-existing project item changed');
const comp = after.items.find(item => item.name === 'TITAN_TwoCuts_75x32_3s_v001');
assert.deepEqual([comp.width,comp.height,comp.pixelAspect,comp.frameRate,comp.duration], [2400,1024,1,30,3]);
assert.equal(comp.motionBlur, false);
assert.equal(comp.layers.length, 12);
const get = name => comp.layers.find(layer => layer.name === name);
const expectedText = [['C01_TXT_MEET','Meet','Pretendard-Regular'],['C01_TXT_TITAN','TITAN','Pretendard-SemiBold'],['C02_TXT_CORE','Core systems','Pretendard-Medium'],['C02_TXT_BUILT','Built','Pretendard-Bold'],['C02_TXT_IN_HOUSE','in-house','Pretendard-Medium']];
assert.equal(comp.layers.filter(layer => layer.type === 'TextLayer').length,5);
assert.equal(comp.layers.filter(layer => layer.type === 'ShapeLayer').length,3);
for (const [name,text,font] of expectedText) {
  const layer=get(name);
  assert.equal(layer.text,text); assert.equal(layer.font,font);
  const source=layer.textGroup.properties.find(p=>p.matchName==='ADBE Text Document').value;
  assert.equal(source.boxText,false); assert.equal(source.applyFill,true); assert.equal(source.applyStroke,false); assert.equal(source.tracking,0);
  const scale=layer.transformGroup.properties.find(p=>p.matchName==='ADBE Scale');
  assert.deepEqual(scale.value,[100,100,100]); assert(!scale.keys?.length); assert(!scale.expressionEnabled);
}
for (const layer of comp.layers.filter(layer => layer.name.startsWith('C01_'))) assert.equal(layer.outPoint,1.1);
for (const layer of comp.layers.filter(layer => layer.name.startsWith('C02_'))) assert.equal(layer.outPoint,3);
assert.equal(get('C02_BG_CHARCOAL_WIPE').inPoint,.8);
for (const name of ['REF_CUT_01','REF_CUT_02']) {
  const layer=get(name); assert.equal(layer.enabled,false); assert.equal(layer.locked,true);
  const scale=layer.transformGroup.properties.find(p=>p.matchName==='ADBE Scale').value;
  assert.deepEqual(scale.slice(0,2),[125,125]);
}
assert(get('C02_BG_CHARCOAL_WIPE').index < get('C01_DOT').index);
assert(get('C02_BG_CHARCOAL_WIPE').index > get('C02_TXT_CORE').index);
const propertyTests=read('property-tests.json'); assert.equal(propertyTests.length,67); assert(propertyTests.every(test=>test.pass));
const layout=read('text-layout.json');
assert(layout.texts.every(text=>Math.abs(text.height-text.bounds.height)<=4));
assert(layout.cut2CombinedWidth>=1050 && layout.cut2CombinedWidth<=1150);
const render=read('background-render.json');
assert.equal(render.exitCode,0); assert.equal(render.frameCount,90); assert.equal(render.reuseInteractiveAE,false);
assert.equal(render.close,'DO_NOT_SAVE_CHANGES'); assert.equal(render.guideLayers,'All Off');
assert.equal(sha(fs.readFileSync(render.sourceProject)),render.sourceSha256);
const renderLog=fs.readFileSync(path.join(out,render.log),'utf8');
assert(!/ERROR|WARNING|missing/i.test(renderLog),'Background renderer reported a warning or error');
assert(renderLog.includes('00089 (90)'),'Final frame not recorded');
assert.equal(fs.readFileSync(path.join(out,render.stderr),'utf8').trim(),'');
const session=read('session-start.json');
const originalFiles=[
 ['helloMotionAep','C:/Users/User/Documents/Codex/2026-08-06/d/ae-hello-motion-3s/Hello-World-Stretch-3s.aep'],
 ['guide01',path.join(out,'../results/01-meet-titan.png')],
 ['guide02',path.join(out,'../results/02-built-in-house.png')]
].map(([key,file])=>{const hash=sha(fs.readFileSync(file));assert.equal(hash,session.sourceHashes[key].toLowerCase());return{file,sha256:hash,unchanged:true};});
const framesDir=path.join(out,'frames');
const names=fs.readdirSync(framesDir).filter(n=>/^frame-\d{3}\.png$/.test(n)).sort(); assert.equal(names.length,90);
const frames=[];
for (let f=0;f<90;f++) {
  assert.equal(names[f],`frame-${String(f).padStart(3,'0')}.png`);
  const file=path.join(framesDir,names[f]);
  const metadata=await sharp(file).metadata();
  assert.deepEqual([metadata.width,metadata.height],[2400,1024]);
  const {data,info}=await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(info.channels,4);
  let nonOpaque=0;for(let i=3;i<data.length;i+=4)if(data[i]!==255)nonOpaque++;
  assert.equal(nonOpaque,0,`Non-opaque pixels in F${f}`);
  const rgbAt=(x,y)=>Array.from(data.subarray((y*2400+x)*4,(y*2400+x)*4+3));
  if(f===0 || f===33) {
    const color=f===0?[245,243,238]:[36,38,42];
    for(let i=0;i<data.length;i+=4)assert(data[i]===color[0]&&data[i+1]===color[1]&&data[i+2]===color[2],`F${f} not uniform expected background`);
  }
  if(f>=33)assert.deepEqual(rgbAt(0,0),[36,38,42]);
  if(f>=24&&f<=33) {
    const u=(f-24)/9;const edge=2400*u*u*(3-2*u);
    // Native fractional-position edge filtering reaches 3 px; test solid interiors 4 px away.
    if(edge>=4)assert.deepEqual(rgbAt(Math.floor(edge)-4,0),[36,38,42]);
    if(edge+4<2400)assert.deepEqual(rgbAt(Math.ceil(edge)+4,0),[245,243,238]);
  }
  frames.push({frame:f,bytes:fs.statSync(file).size,width:info.width,height:info.height,sha256:sha(fs.readFileSync(file)),pixelSha256:sha(data),opaque:true});
}
const holdHash=frames[61].pixelSha256;assert(frames.slice(61).every(f=>f.pixelSha256===holdHash),'F61-F89 hold changed');
for(const f of[15,18,23,24])assert.equal(frames[f].pixelSha256,frames[14].pixelSha256,'Cut 1 hold changed');
const result={status:'passed',comp:{name:comp.name,width:comp.width,height:comp.height,fps:comp.frameRate,duration:comp.duration,frames:90,pixelAspect:comp.pixelAspect},layerCounts:{text:5,shape:3,solid:2,disabledReferences:2},propertyTests:{total:67,passed:67,maxError:Math.max(...propertyTests.map(t=>t.error))},preservation,originalFiles,frameCount:frames.length,allFramesOpaque:true,cut1Hold:'F14-F24 identical pixels',cut2Hold:'F61-F89 identical pixels',F00:'uniform #F5F3EE',F33:'uniform #24262A',renderErrors:0,colorWarnings:0,renderRoute:'isolated aerender from saved AEP',frames};
console.log(JSON.stringify(result,null,2));
