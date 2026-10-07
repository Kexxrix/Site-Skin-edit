import fs from 'node:fs/promises';
import {paletteCss,parsePaletteJson} from '../theme/palette-compiler.ts';

// Build-time only. The browser receives static CSS and no palette editor code.
const input=new URL('../theme/mercury-palette_98.json',import.meta.url);
const css=paletteCss(parsePaletteJson(await fs.readFile(input,'utf8')));
await fs.writeFile(new URL('../app/mercury-white-theme.css',import.meta.url),css);
console.log('Generated static MERCURY white CSS from mercury-palette_98.json.');
