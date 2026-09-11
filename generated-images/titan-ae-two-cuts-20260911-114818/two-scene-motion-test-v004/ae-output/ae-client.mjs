import { Client } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport, getDefaultEnvironment } from 'file:///C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const outDir = fileURLToPath(new URL('.', import.meta.url));
export async function run(request) {
  const client = new Client({ name: 'titan-two-scene-v004', version: '1.0.0' }, { capabilities: {} });
  const transport = new StdioClientTransport({ command: 'C:/Program Files/nodejs/node.exe', args: ['C:/Users/User/.codex/tools/after-effects-mcp/node_modules/@kumoproductions/mcp-aftereffects/dist/index.js'], env: { ...getDefaultEnvironment(), AE_MCP_EXE: 'C:/Program Files/Adobe/Adobe After Effects (Beta)/Support Files/AfterFX (Beta).exe', AE_MCP_READONLY: request.write ? '0' : '1', AE_MCP_ENABLE_EVAL: '0' }, stderr: 'inherit' });
  const results = [];
  try {
    await client.connect(transport);
    for (const call of request.calls ?? []) {
      const raw = await client.callTool({ name: call.name, arguments: call.args ?? {} }, undefined, { timeout: Math.max(75000, (call.args?.timeoutMs ?? 0) + 15000) });
      const response = raw.structuredContent ?? JSON.parse(raw.content.find(item => item.type === 'text').text);
      results.push({ call, response });
      console.log(JSON.stringify(request.verbose ? results.at(-1) : { name: call.name, operation: call.args?.operation, ok: response.ok, result: response.error ?? 'recorded' }));
      if (raw.isError || response.ok === false || response.result?.ok === false || response.result?.failed > 0) throw new Error(JSON.stringify(response));
    }
    return results;
  } finally {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = new URL(`log-${request.label ?? 'calls'}-${stamp}.json`, import.meta.url);
    await writeFile(path, JSON.stringify({ timestamp: stamp, write: !!request.write, results }, null, 2), { flag: 'wx' });
    console.log(`LOG ${fileURLToPath(path)}`);
    await client.close();
  }
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let input = '';
  if (process.argv[2]) input = await readFile(process.argv[2], 'utf8');
  else for await (const chunk of process.stdin) input += chunk;
  await run(JSON.parse(input));
}
