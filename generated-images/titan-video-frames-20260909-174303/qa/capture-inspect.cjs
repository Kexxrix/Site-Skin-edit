const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = 'E:/codexwork/Site-Skin-edit/generated-images/titan-video-frames-20260909-174303';
const candidates = [
  { id: 'cat-village', url: 'https://titan-solution-t01.pages.dev/', viewport: { width: 1200, height: 900 }, mobile: false, scale: 1 },
  { id: 'aures', url: 'https://titan-solution-t02.pages.dev/', viewport: { width: 390, height: 844 }, mobile: true, scale: 2 },
  { id: 'cobalt', url: 'https://titan-solution-t03.pages.dev/', viewport: { width: 390, height: 844 }, mobile: true, scale: 2 },
  { id: 'lumiere', url: 'https://titan-solution-t04.pages.dev/', viewport: { width: 390, height: 844 }, mobile: true, scale: 2 },
];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = await Promise.all(candidates.map(async candidate => {
    const context = await browser.newContext({ viewport: candidate.viewport, deviceScaleFactor: candidate.scale, isMobile: candidate.mobile, hasTouch: candidate.mobile });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      const response = await page.goto(candidate.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
      await page.evaluate(() => document.fonts.ready);
      const data = await page.evaluate(() => ({
        title: document.title,
        url: location.href,
        viewport: { width: innerWidth, height: innerHeight },
        scroll: { x: scrollX, y: scrollY },
        bodyText: document.body.innerText.slice(0, 18000),
        links: [...document.querySelectorAll('a')].map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })).filter(a => a.text),
        buttons: [...document.querySelectorAll('button')].map(b => ({ text: b.innerText.trim(), ariaLabel: b.getAttribute('aria-label') })).filter(b => b.text || b.ariaLabel),
        dialogs: [...document.querySelectorAll('[role="dialog"],dialog')].map(el => el.innerText.slice(0, 1000)),
      }));
      const screenshot = path.join(root, 'qa', `capture-${candidate.id}-initial.png`);
      await page.screenshot({ path: screenshot, fullPage: false });
      const result = { ...candidate, status: response && response.status(), screenshot, errors, ...data };
      console.log(JSON.stringify(result));
      return result;
    } catch (error) {
      const result = { ...candidate, error: String(error), errors };
      console.log(JSON.stringify(result));
      return result;
    } finally { await context.close(); }
  }));
  await fs.writeFile(path.join(root, 'qa', 'capture-initial-inspection.json'), JSON.stringify(results, null, 2));
  await browser.close();
})();
