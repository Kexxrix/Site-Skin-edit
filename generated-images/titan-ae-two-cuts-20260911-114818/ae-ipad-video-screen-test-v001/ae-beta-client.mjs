import { Client } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport, getDefaultEnvironment } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const request = JSON.parse(input);
const client = new Client({ name: 'ipad-video-screen-test', version: '1.0.0' }, { capabilities: {} });
const transport = new StdioClientTransport({
  command: 'C:/Program Files/nodejs/node.exe',
  args: ['C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/index.js'],
  env: { ...getDefaultEnvironment(), AE_MCP_EXE: 'C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/AfterFX (Beta).exe', AE_MCP_READONLY: request.write ? '0' : '1', AE_MCP_ENABLE_EVAL: '0' },
  stderr: 'inherit',
});
const results = [];
try {
  await client.connect(transport);
  if (request.schemas) {
    const listed = await client.listTools();
    const result = listed.tools.filter(tool => request.schemas.includes(tool.name));
    results.push({ schemas: result });
    console.log(JSON.stringify(result));
  }
  for (const call of request.calls ?? []) {
    const raw = await client.callTool({ name: call.name, arguments: call.args ?? {} }, undefined, { timeout: Math.max(75000, (call.args?.timeoutMs ?? 0) + 15000) });
    const envelope = raw.structuredContent ?? JSON.parse(raw.content.find(item => item.type === 'text').text);
    const record = { call, response: envelope };
    results.push(record);
    console.log(JSON.stringify(record));
    if (raw.isError || envelope.ok === false) throw new Error('Call failed; stopped without retrying.');
  }
} finally {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = fileURLToPath(new URL(`./log-${stamp}.json`, import.meta.url));
  await writeFile(path, JSON.stringify({ timestamp: stamp, write: !!request.write, results }, null, 2), { flag: 'wx' });
  console.log(`LOG ${path}`);
  await client.close();
}
