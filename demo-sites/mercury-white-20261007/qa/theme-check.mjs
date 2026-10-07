import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as original from '../../mercury-user-cream-20261006/site/app/skin-palette.ts';
import * as compiler from '../site/theme/palette-compiler.ts';
const raw=await fs.readFile(new URL('../input/mercury-palette_98.json',import.meta.url),'utf8');
const checks=[];function check(name,run){try{run();checks.push({name,pass:true})}catch(e){checks.push({name,pass:false,error:e.stack})}}
const s=compiler.parsePaletteJson(raw),expected=original.parsePaletteJson(raw),input=JSON.parse(raw),css=await fs.readFile(new URL('../site/app/mercury-white-theme.css',import.meta.url),'utf8');
check('exact 3132-byte approved input',()=>{assert.equal(Buffer.byteLength(raw),3132);assert.equal(createHash('sha256').update(raw).digest('hex'),'f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5')});
check('all 39 role values and locks unchanged',()=>{assert.equal(Object.keys(s.palette).length,39);assert.deepEqual(s.palette,input.palette);assert.deepEqual(s.locks,input.locks)});
check('all authored effects preserved',()=>{for(const key of ['mood','menuStyle','goldIconOutline','buttonFill','oddsSelectedStyle','creamDetails','goldIconTuning','chipStyle'])assert.deepEqual(s[key],input[key],key)});
check('compiler snapshot matches original editor compiler',()=>assert.deepEqual(s,expected));
check('static CSS exactly matches approved editor effective CSS',()=>assert.equal(css,original.paletteCss(expected)));
check('independent chips and warm odds settings preserved',()=>{assert.match(css,/--skin-chip-fill: linear-gradient\(180deg, #ffdb9e 0%, #ffbe0a 100%\)/);assert.match(css,/--skin-action-fill: initial/);assert.match(css,/--skin-menu-active-color: #ff8f0f/);assert.match(css,/--skin-leagueText: #000000/)});
check('gold filter groups match supplied tuning',()=>{assert.match(css,/--skin-gold-sport-filter: brightness\(93%\) contrast\(92%\) saturate\(105%\)/);assert.match(css,/--skin-gold-selectedSport-filter: brightness\(97%\) contrast\(120%\) saturate\(112%\)/);assert.match(css,/--skin-gold-service-filter: brightness\(90%\) contrast\(101%\) saturate\(104%\)/)});
const compilerSource=await fs.readFile(new URL('../site/theme/palette-compiler.ts',import.meta.url),'utf8');
check('build compiler has no editor storage/history/presets',()=>{const text=compilerSource;for(const item of ['STORAGE_KEY','PRESET_KEY','historyReducer','BUILTIN_PRESETS','USER_CREAM_SNAPSHOT','localStorage'])assert.ok(!text.includes(item),item)});
const result={pass:checks.filter(x=>x.pass).length,fail:checks.filter(x=>!x.pass).length,checks};
await fs.writeFile(new URL('theme-results.json',import.meta.url),JSON.stringify(result,null,2));console.log(JSON.stringify(result));if(result.fail)process.exitCode=1;
