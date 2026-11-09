// One-time conversion of the Figma reference into local HTML and plain CSS.
// Uses the workspace's existing tools; the delivered site has no runtime dependencies.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createRequire} = require('node:module');
const root = path.resolve(__dirname, '..');
const toolRequire = createRequire(path.resolve(root, '../aldebaran-blackgold-paperlogy-20261026/site/package.json'));
const esbuild = toolRequire('esbuild');
const React = toolRequire('react');
const {renderToStaticMarkup} = toolRequire('react-dom/server');
const {compile} = toolRequire('@tailwindcss/node');
const assets = JSON.parse(fs.readFileSync(path.join(__dirname, 'asset-map.json'), 'utf8'));
async function main() {
  const classes = new Set();
  fs.mkdirSync(path.join(root, 'site/screens'), {recursive:true});
  for (const name of ['home', 'live', 'slots', 'notice']) {
    let source = fs.readFileSync(path.join(__dirname, `figma-${name}.tsx`), 'utf8');
    for (const asset of assets.filter(x=>x.source===`figma-${name}.tsx`)) source=source.replaceAll(asset.url, asset.local);
    const code = esbuild.transformSync(source, {loader:'tsx',format:'cjs',jsx:'transform',jsxFactory:'React.createElement',jsxFragment:'React.Fragment'}).code;
    const sandbox={module:{exports:{}},exports:{},React};
    vm.runInNewContext(code,sandbox);
    let html = renderToStaticMarkup(React.createElement(sandbox.module.exports.default));
    html=html.replace(/<link[^>]*rel="preload"[^>]*>/g,'');
    for(const match of html.matchAll(/class="([^"]*)"/g)) for(const token of match[1].split(/\s+/)) classes.add(token.replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&amp;','&'));
    fs.writeFileSync(path.join(root,'site/screens',name+'.html'),html);
  }
  const base=path.dirname(toolRequire.resolve('tailwindcss/package.json'));
  const compiler=await compile('@import "tailwindcss";', {base,onDependency(){}});
  fs.writeFileSync(path.join(root,'site/design.css'),compiler.build([...classes]));
  console.log(`Converted 4 screens and ${classes.size} style tokens.`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
