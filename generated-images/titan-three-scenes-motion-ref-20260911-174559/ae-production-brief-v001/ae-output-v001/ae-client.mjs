import { Client } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport, getDefaultEnvironment } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

export async function run(request) {
  const client = new Client({ name: 'titan-fresh-production', version: '1.0.0' }, { capabilities: {} });
  const transport = new StdioClientTransport({ command: 'C:/Program Files/nodejs/node.exe', args: ['C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/index.js'], env: { ...getDefaultEnvironment(), AE_MCP_EXE: 'C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/AfterFX (Beta).exe', AE_MCP_READONLY: request.write ? '0' : '1', AE_MCP_ENABLE_EVAL: '0' }, stderr: 'inherit' });
  const records = [];
  try {
    await client.connect(transport);
    if (request.schemas) {
      const listed = await client.listTools();
      const record = { schemas: listed.tools.filter(t => request.schemas.includes(t.name)) };
      records.push(record); console.log(JSON.stringify(record));
    }
    for (const call of request.calls ?? []) {
      const raw = await client.callTool({ name: call.name, arguments: call.args ?? {} }, undefined, { timeout: Math.max(75000, (call.args?.timeoutMs ?? 0) + 15000) });
      const response = raw.structuredContent ?? JSON.parse(raw.content.find(c => c.type === 'text').text);
      const record = { call, response }; records.push(record);
      console.log(JSON.stringify(request.compact ? { call:call.name, operation:call.args?.operation, ok:response.ok, count:response.result?.count, failed:response.result?.failed, result:call.args?.operation === 'batch.run' ? response.result?.results?.filter(r=>r.ok===false) : response.result ?? response } : record));
      if (raw.isError || response.ok === false || response.result?.ok === false || response.result?.failed > 0) throw new Error('AE call failed; stopped without retry.');
    }
    return records;
  } finally {
    await mkdir(new URL('./logs/', import.meta.url), { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    await writeFile(new URL(`./logs/${stamp}.json`, import.meta.url), JSON.stringify({ timestamp: stamp, write: !!request.write, records }, null, 2), { flag: 'wx' });
    await client.close();
  }
}
if (process.argv[2]) await run(JSON.parse(await readFile(process.argv[2], 'utf8')));
