import { Client } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport, getDefaultEnvironment } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

export const root = new URL('./', import.meta.url);
export const pathRoot = decodeURIComponent(root.pathname.replace(/^\//, ''));
export async function run(request) {
  const client = new Client({ name: 'titan-append-markers06-08', version: '2.0.0' }, { capabilities: {} });
  const transport = new StdioClientTransport({ command: 'C:/Program Files/nodejs/node.exe', args: ['C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/index.js'], env: { ...getDefaultEnvironment(), AE_MCP_EXE: 'C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/AfterFX (Beta).exe', AE_MCP_READONLY: request.write ? '0' : '1', AE_MCP_ENABLE_EVAL: '0' }, stderr: 'inherit' });
  const records = [];
  const started = new Date().toISOString();
  try {
    await client.connect(transport);
    if (request.schemas) {
      const listed = await client.listTools();
      const record = { schemas: listed.tools.filter(t => request.schemas.includes(t.name)) };
      records.push(record); console.log(JSON.stringify(record));
    }
    for (const call of request.calls ?? []) {
      const start = Date.now();
      const raw = await client.callTool({ name: call.name, arguments: call.args ?? {} }, undefined, { timeout: Math.max(75000, (call.args?.timeoutMs ?? 0) + 15000) });
      const response = raw.structuredContent ?? JSON.parse(raw.content.find(c => c.type === 'text').text);
      const record = { call, response, elapsedMs: Date.now()-start }; records.push(record);
      console.log(JSON.stringify(request.compact ? { call:call.name, operation:call.args?.operation, ok:response.ok, count:response.result?.count, failed:response.result?.failed, result:call.name === 'ae_catalog' ? response.operations?.map(o=>o.name) : call.args?.operation === 'batch.run' ? response.result?.results?.filter(r=>r.ok===false) : response.result ?? response } : record));
      function nestedFailures(value, at='response', found=[]) { if (!value || typeof value !== 'object') return found; if (value.ok === false) found.push({at,error:value.error}); for(const [key,child] of Object.entries(value)) if(child && typeof child === 'object') nestedFailures(child,at+'.'+key,found); return found; }
      const failures=nestedFailures(response);
      if (raw.isError || failures.length || response.result?.failed > 0) { console.log(JSON.stringify({nestedFailures:failures})); throw new Error('AE call failed; stopped without retry.'); }
    }
    return records;
  } finally {
    await mkdir(new URL('./logs/', root), { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    await writeFile(new URL(`./logs/${stamp}.json`, root), JSON.stringify({ started, ended: new Date().toISOString(), write: !!request.write, records }, null, 2), { flag: 'wx' });
    await client.close();
  }
}
if (process.argv[1]?.replace(/\\/g, '/').endsWith('/ae-client.mjs') && process.argv[2]) await run(JSON.parse(await readFile(process.argv[2], 'utf8')));
