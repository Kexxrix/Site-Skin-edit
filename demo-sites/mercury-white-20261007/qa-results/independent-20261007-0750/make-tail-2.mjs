import fs from'node:fs';const out='../qa-results/independent-20261007-0750';let s=fs.readFileSync(out+'/ui-tail.mjs','utf8').replace("'ui-tail-results.json'","'ui-tail-2-results.json'");
s=s.replace("await p.locator('.mc-odd[data-selection-id=\"'+selection+'\"]').getAttribute('aria-pressed')==='false'","await p.locator('.mc-odd[data-selection-id=\"'+selection+'\"]').evaluateAll(es=>es.every(e=>e.getAttribute('aria-pressed')==='false'))");
s=s.replace("const switchDom=await", "console.log('KEEP ACCESSIBLE',await p.locator('.mc-slip-toggle').ariaSnapshot());const switchDom=await");
fs.writeFileSync(out+'/ui-tail-2.mjs',s,{flag:'wx'});
