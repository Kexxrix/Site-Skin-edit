// Convert the high-fidelity Figma responses into static HTML and CSS.
// Reuse existing workspace tooling; the delivered site has no runtime dependencies.
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
  fs.mkdirSync(path.join(root, 'site/notices'), {recursive:true});
  const render = (file, props={}) => {
    let source = fs.readFileSync(path.join(__dirname,file), 'utf8');
    for (const asset of assets.filter(x=>x.source===file)) source=source.replaceAll(asset.url,asset.local);
    const code = esbuild.transformSync(source,{loader:'tsx',format:'cjs',jsx:'transform',jsxFactory:'React.createElement',jsxFragment:'React.Fragment'}).code;
    const sandbox={module:{exports:{}},exports:{},React};
    vm.runInNewContext(code,sandbox);
    const html = renderToStaticMarkup(React.createElement(sandbox.module.exports.default,props)).replace(/<link[^>]*rel="preload"[^>]*>/g,'');
    for(const match of html.matchAll(/class="([^"]*)"/g)) for(const token of match[1].split(/\s+/)) classes.add(token.replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&amp;','&'));
    return html;
  };
  for(const name of ['home','live','slots','notice']) fs.writeFileSync(path.join(root,'site/screens',name+'.html'),render(`figma-${name}.tsx`));
  for(const [type,count] of [['Page',4],['Article',20]]) for(let n=1;n<=count;n++) fs.writeFileSync(path.join(root,'site/notices',`${type.toLowerCase()}-${n}.html`),render('figma-notice-views.tsx',{view:`${type} ${n}`}));
  const base=path.dirname(toolRequire.resolve('tailwindcss/package.json'));
  const compiler=await compile('@import "tailwindcss";',{base,onDependency(){}});
  fs.writeFileSync(path.join(root,'site/design.css'),compiler.build([...classes]));
  console.log(`Converted 4 screens, 24 notice views and ${classes.size} style tokens.`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
