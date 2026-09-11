const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const qaDir = __dirname;
  const browsers = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    chromium.executablePath()
  ];
  const executablePath = browsers.find(p => fs.existsSync(p));
  if (!executablePath) throw new Error('No installed Chromium browser found; nothing was installed.');
  const browser = await chromium.launch({ executablePath, headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1150 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(pathToFileURL(path.join(qaDir, 'display-proof.html')).href, { waitUntil: 'load' });
    await page.evaluate(async () => { await Promise.all(Array.from(document.images).map(i => i.decode())); });
    const metrics = await page.locator('img').evaluateAll(images => images.map(img => {
      const r = img.getBoundingClientRect();
      const css = getComputedStyle(img);
      const scale = Math.max(r.width / img.naturalWidth, r.height / img.naturalHeight);
      const [px, py] = css.objectPosition.split(' ').map(Number.parseFloat);
      const visibleWidth = r.width / scale;
      const visibleHeight = r.height / scale;
      return { id: img.id, src: img.currentSrc, complete: img.complete, naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight, displayWidth: r.width, displayHeight: r.height,
        objectFit: css.objectFit, objectPosition: css.objectPosition,
        visibleSource: { left: (img.naturalWidth - visibleWidth) * px / 100,
          top: (img.naturalHeight - visibleHeight) * py / 100,
          width: visibleWidth, height: visibleHeight } };
    }));
    for (const m of metrics) {
      if (!m.complete || m.naturalWidth !== 1122 || m.naturalHeight !== 1402) throw new Error('Image failed dimensions/read check: ' + m.id);
      if (m.displayHeight !== 400 || ![238,313].includes(m.displayWidth)) throw new Error('Unexpected rendered size: ' + m.id);
    }
    for (const id of ['a-313','a-238','b-313','b-238']) {
      await page.locator('#' + id).screenshot({ path: path.join(qaDir, id + '.png') });
    }
    await page.screenshot({ path: path.join(qaDir, 'display-proof.png'), fullPage: true });
    fs.writeFileSync(path.join(qaDir, 'display-metrics.json'), JSON.stringify({ browser: executablePath, deviceScaleFactor: 1, errors, metrics }, null, 2));
    if (errors.length) throw new Error(errors.join('\n'));
    process.stdout.write(JSON.stringify({ checks: 'passed', screenshots: 5, imagesRead: metrics.length, qaDir, metricsFile: path.join(qaDir, 'display-metrics.json') }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { process.stderr.write(error.stack + '\n'); process.exitCode = 1; });

