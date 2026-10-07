import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import {defineConfig} from 'vite';

// Isolated local white site: no Sites project binding or deploy adapter.
export default defineConfig({
  css: {postcss: {plugins: [tailwindcss()]}},
  plugins: [vinext()],
  server: {host: '127.0.0.1', port: 5418, strictPort: true, open: false},
});
