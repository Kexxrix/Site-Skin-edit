import { Client } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport, getDefaultEnvironment } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = dirname(fileURLToPath(import.meta.url));
const target = 'Hello_World_Stretch_3s';
const stage = process.argv[2];
const writable = ['setup', 'animate', 'background', 'save'].includes(stage);
const client = new Client({ name: 'codex-ae-motion', version: '1.0.0' }, { capabilities: {} });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: ['C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/index.js'],
  env: { ...getDefaultEnvironment(), AE_MCP_EXE: 'C:/Program Files/Adobe/Adobe After Effects 2025/Support Files/AfterFX.exe', AE_MCP_READONLY: writable ? '0' : '1', AE_MCP_ENABLE_EVAL: '0' },
  stderr: 'inherit',
});
let sequence = 0;
const run = new Date().toISOString().replace(/[:.]/g, '-');
function assert(value, message) { if (!value) throw new Error(message); }
function check(value) {
  if (!value || typeof value !== 'object') return;
  if (value.ok === false || value.isError === true || value.failed > 0) throw new Error(JSON.stringify(value));
  if (Array.isArray(value.warnings) && value.warnings.length) throw new Error(JSON.stringify(value.warnings));
  if (Array.isArray(value.logs) && value.logs.length) console.log('AE logs:', JSON.stringify(value.logs));
  for (const child of Object.values(value)) if (child && typeof child === 'object') check(child);
}
async function call(name, args = {}) {
  const response = await client.callTool({ name, arguments: args }, undefined, { timeout: 120000 });
  await writeFile(join(root, 'logs', `${run}-${String(++sequence).padStart(3,'0')}-${name}.json`), JSON.stringify({ request: { name, arguments: args }, response }, null, 2));
  assert(!response.isError, JSON.stringify(response.content));
  const envelope = response.structuredContent ?? JSON.parse(response.content.find(c => c.type === 'text').text);
  check(envelope);
  return envelope.result ?? envelope;
}
const op = (operation, args = {}) => call('ae_do', { operation, args });
const batch = ops => op('batch.run', { ops, stopOnError: true });
const operation = (name, args) => ({ operation: name, args });
const expr = (layer, property, expression) => operation('expression.set', { comp: target, layer, property, expression });
const prop = (layer, property, value) => operation('property.set', { comp: target, layer, property, value });
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
function leafPaths(group, prefix = []) {
  const found = [];
  for (const p of group.properties ?? []) if (p.matchName === 'ADBE Vector Shape') found.push({ path: [...prefix, p.matchName], value: p.value });
  for (const g of group.groups ?? []) found.push(...leafPaths(g, [...prefix, g.name]));
  return found;
}

try {
  await mkdir(join(root, 'logs'), { recursive: true });
  await client.connect(transport);
  if (stage === 'inspect') {
    const project = await call('ae_project_info');
    const layers = await call('ae_layer_info', { compNameOrId: 1, layerIndex: 'all', includeProperties: true });
    const effects = await op('project.list_effects');
    const queue = await op('render.status');
    const baseline = { project, layers, sourceLayerHash: hash(layers), effects, queue };
    await writeFile(join(root, 'baseline.json'), JSON.stringify(baseline, null, 2), { flag: 'wx' });
    console.log(JSON.stringify({ project, layers: layers.layers.map(l => ({ name:l.name, type:l.type, enabled:l.enabled, paths: l.contentsGroup ? leafPaths(l.contentsGroup, ['ADBE Root Vectors Group']).map(p => ({ path:p.path, kind:p.value?.__kind, vertices:p.value?.vertices?.length, minY:Math.min(...(p.value?.vertices ?? []).map(v=>v[1])),maxY:Math.max(...(p.value?.vertices ?? []).map(v=>v[1])) })) : [] })), effects: effects.effects.filter(e => /Gradient Ramp|Slider Control/.test(e.displayName)), queue }, null, 2));
  } else if (stage === 'setup') {
    const project = await call('ae_project_info');
    assert(!project.items.some(i => i.name === target), 'Target comp already exists; setup is not repeatable.');
    await batch([
      operation('comp.duplicate', { comp: 1, newName: target }),
      operation('comp.set_props', { comp: target, props: { duration: 3, frameRate: 30, workAreaStart: 0, workAreaDuration: 3, bgColor: [0.16,0.16,0.16] } }),
      operation('layer.set_props', { comp: target, layer: 'all', props: { outPoint: 3 } }),
      operation('layer.create_solid', { comp: target, name: 'Gray Radial Background', color: [0.16,0.16,0.16] }),
      operation('effect.add', { comp: target, layer: 'Gray Radial Background', matchName: 'ADBE Ramp' }),
      operation('layer.move', { comp: target, layer: 'Gray Radial Background', toIndex: 3 }),
      operation('timeline.set_active_comp', { comp: target }),
      operation('timeline.set_time', { comp: target, time: 0 }),
    ]);
    const ramp = await op('property.list', { comp: target, layer: 'Gray Radial Background', property: ['ADBE Effect Parade', 'ADBE Ramp'] });
    const groups = await op('property.list', { comp: target, layer: 'Hello World - Source Outlines', property: ['ADBE Root Vectors Group'] });
    const letters = [];
    for (const group of groups.children.filter(g => g.matchName === 'ADBE Vector Group')) {
      const prefix = ['ADBE Root Vectors Group', group.index, 'ADBE Vectors Group'];
      const contents = await op('property.list', { comp: target, layer: 'Hello World - Source Outlines', property: prefix });
      const paths = [];
      for (const p of contents.children.filter(p => p.matchName === 'ADBE Vector Shape - Group')) {
        const path = [...prefix, p.index, 'ADBE Vector Shape'];
        const original = await op('property.get', { comp: target, layer: 'Hello World - Source Outlines', property: path });
        paths.push({ path, value: original.value });
      }
      letters.push({ index: group.index, name: group.name, paths });
    }
    await writeFile(join(root, 'paths.json'), JSON.stringify(letters, null, 2), { flag: 'wx' });
    await writeFile(join(root, 'ramp.json'), JSON.stringify(ramp, null, 2), { flag: 'wx' });
    console.log(JSON.stringify({ target, ramp, letters: letters.map(l => ({ index:l.index, name:l.name, pathCount:l.paths.length })) }, null, 2));
  } else if (stage === 'animate') {
    const letters = JSON.parse(await readFile(join(root, 'paths.json'), 'utf8'));
    assert(letters.map(l => l.name).join('') === 'HelloWorld', 'Unexpected letter sequence');
    const layer = 'Hello World - Source Outlines';
    const bg = 'Gray Radial Background';
    const ramp = i => ['ADBE Effect Parade', 'ADBE Ramp', `ADBE Ramp-${String(i).padStart(4,'0')}`];
    const ops = [
      prop(bg, ramp(1), [960,540]),
      prop(bg, ramp(2), [0.25,0.25,0.25,1]),
      prop(bg, ramp(3), [2060,540]),
      prop(bg, ramp(4), [0.16,0.16,0.16,1]),
      prop(bg, ramp(5), 2),
      prop(bg, ramp(6), 32),
      prop(bg, ramp(7), 0),
      expr(layer, ['ADBE Transform Group','ADBE Scale'], `// Slow push-in, followed by progressively increasing acceleration.\nvar t=Math.max(0,time);\nvar s;\nif(t<=1){s=100+5*t+7*t*t;}else{var d=Math.min(t-1,0.7);var x=d/0.7;s=112+19*d+30*x*x+920*Math.pow(x,5);}\n[s,s];`),
      expr(layer, ['ADBE Transform Group','ADBE Opacity'], `// Only the last four frames of the fast exit fade.\nvar u=Math.max(0,Math.min(1,(time-47/30)/(4/30)));\n100*(1-u*u);`),
    ];
    const profiles = [
      {dir:-1,cut:-62,amount:560,delay:0},
      {dir:1,cut:-28,amount:480,delay:0.02},
      {dir:-1,cut:-54,amount:620,delay:0.04},
      {dir:1,cut:-50,amount:560,delay:0},
      {dir:-1,cut:-40,amount:460,delay:0.03},
      {dir:1,cut:-51,amount:600,delay:0.01},
      {dir:-1,cut:-40,amount:360,delay:0.055},
      {dir:1,cut:-35,amount:500,delay:0.025},
      {dir:-1,cut:-54,amount:580,delay:0.045},
      {dir:1,cut:-40,amount:560,delay:0.005},
    ];
    for (const [i, letter] of letters.entries()) {
      const profile = profiles[i];
      for (const path of letter.paths) {
        const shape = path.value;
        assert(shape.__kind === 'Shape' && shape.vertices.length === shape.inTangents.length, 'Invalid source path');
        const expression = `// ${letter.name} ${i+1}: stretch one side of the vector outline; keep curves and counters.\nvar p=${JSON.stringify(shape.vertices)};\nvar it=${JSON.stringify(shape.inTangents)};\nvar ot=${JSON.stringify(shape.outTangents)};\nvar u=Math.max(0,Math.min(1,(time-${1+profile.delay})/0.57));\nvar amount=${profile.amount}*Math.pow(u,2.2);\nfunction bend(y){\n  var w=Math.max(0,Math.min(1,(${profile.dir}*(y-(${profile.cut}))+4)/8));\n  w=w*w*(3-2*w);\n  return y+${profile.dir}*amount*w;\n}\nfor(var k=0;k<p.length;k++){\n  var y=p[k][1];\n  var ny=bend(y);\n  it[k]=[it[k][0],bend(y+it[k][1])-ny];\n  ot[k]=[ot[k][0],bend(y+ot[k][1])-ny];\n  p[k]=[p[k][0],ny];\n}\ncreatePath(p,it,ot,${shape.closed !== false});`;
        ops.push(expr(layer, path.path, expression));
      }
    }
    const result = await batch(ops);
    await writeFile(join(root, 'animation-spec.json'), JSON.stringify({ comp:target, width:1920,height:1080,fps:30,duration:3,zoomStart:0,stretchStart:1,exitComplete:1.7,holdUntil:3,profiles,operations:ops },null,2));
    console.log(JSON.stringify({ operations: result.count, failed: result.failed, paths: letters.reduce((n,l)=>n+l.paths.length,0) }));
  } else if (stage === 'preview') {
    const frames = [0,15,30,36,39,42,44,46,48,50,51,89];
    await mkdir(join(root, 'preview'), { recursive:true });
    for (const frame of frames) {
      const result = await call('ae_render_frame', { compNameOrId:target, time:frame/30, outPath:join(root,'preview',`frame-${String(frame).padStart(3,'0')}.png`) });
      console.log(JSON.stringify({ frame, ...result }));
    }
  } else if (stage === 'verify') {
    const baseline = JSON.parse(await readFile(join(root, 'baseline.json'),'utf8'));
    const source = await call('ae_layer_info', { compNameOrId:1, layerIndex:'all', includeProperties:true });
    assert(hash(source) === baseline.sourceLayerHash, 'Original source layer state changed');
    const comp = await call('ae_comp_info', { nameOrId:target });
    assert(comp.width===1920 && comp.height===1080 && comp.duration===3 && comp.frameRate===30, 'Wrong comp settings');
    const letters = JSON.parse(await readFile(join(root,'paths.json'),'utf8'));
    const layer = 'Hello World - Source Outlines';
    const ops=[];
    for(const t of [0,0.5,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,89/30]) {
      for(const attribute of ['ADBE Scale','ADBE Opacity']) ops.push(operation('property.get',{comp:target,layer,property:['ADBE Transform Group',attribute],time:t}));
    }
    for(const letter of letters) for(const path of letter.paths) ops.push(operation('property.get',{comp:target,layer,property:path.path,time:1.4}));
    const animated = await batch(ops);
    const samples = animated.results.slice(0,22).map((r,i)=>({property:ops[i].args.property.at(-1),time:ops[i].args.time,value:r.value,expression:r.hasExpression}));
    const pathResults = animated.results.slice(22);
    assert(pathResults.length===14 && pathResults.every(p=>p.hasExpression && p.value?.__kind==='Shape'), 'Path expression evaluation failed');
    let cursor=0;
    const letterChanges=letters.map(letter=>{
      const changed=letter.paths.map(path=>hash(path.value.vertices)!==hash(pathResults[cursor++].value.vertices));
      assert(changed.some(Boolean), `Letter ${letter.index} did not deform`);
      return {index:letter.index,letter:letter.name,changedPaths:changed.filter(Boolean).length,totalPaths:changed.length};
    });
    const report={sourceUnchanged:true,comp,samples,verifiedPathExpressions:pathResults.length,letterChanges};
    await writeFile(join(root,'verification.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  } else if (stage === 'background') {
    await op('property.set',{comp:target,layer:'Gray Radial Background',property:['ADBE Effect Parade','ADBE Ramp','ADBE Ramp-0006'],value:32});
    console.log(JSON.stringify(await call('ae_render_frame',{compNameOrId:target,time:0,outPath:join(root,'preview','background-smooth.png')})));
    const spec=JSON.parse(await readFile(join(root,'animation-spec.json'),'utf8'));
    spec.operations.find(o=>o.operation==='property.set' && o.args.property?.at(-1)==='ADBE Ramp-0006').args.value=32;
    await writeFile(join(root,'animation-spec.json'),JSON.stringify(spec,null,2));
  } else if (stage === 'render') {
    await mkdir(join(root,'frames'), { recursive:true });
    for(let frame=0;frame<90;frame++) {
      const outPath=join(root,'frames',`frame-${String(frame).padStart(3,'0')}.png`);
      let exists=false;
      try { await access(outPath); exists=true; } catch {}
      if(!exists || process.argv.includes('--refresh')) await call('ae_render_frame',{compNameOrId:target,time:frame/30,outPath});
      if(frame%15===0 || frame===89) console.log(JSON.stringify({renderedFrames:frame+1,total:90}));
    }
  } else if (stage === 'save') {
    const path=join(root,'Hello-World-Stretch-3s.aep');
    let exists=false;
    try { await access(path); exists=true; } catch {}
    assert(!exists, 'Refusing to overwrite an existing project file');
    await batch([
      operation('timeline.set_active_comp',{comp:target}),
      operation('timeline.set_time',{comp:target,time:0}),
      operation('timeline.select_layers',{comp:target,indices:[1],deselectOthers:true}),
    ]);
    console.log(JSON.stringify(await call('ae_save_project',{path})));
    console.log(JSON.stringify(await call('ae_project_info')));
  } else {
    throw new Error(`Unimplemented stage ${stage}`);
  }
} finally {
  await client.close();
}
