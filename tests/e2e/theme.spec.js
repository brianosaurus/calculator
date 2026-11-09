// T-9 / I-11 / B-17: theme computed styles (R-2, A-1, B-3, D-3)
import { test, expect } from '@playwright/test';

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};

test('T-9 theme computed styles', async ({ page }) => {
  const errors = [];
  const external = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1') && !r.url().startsWith('data:')) external.push(r.url());
  });
  await page.goto('/');
  await expect(page.getByTestId('display')).toHaveText('0');

  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundImage);
  expect(bg).toMatch(/conic-gradient|radial-gradient/);

  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(font).toMatch(/^"?Fredoka"?/);
  for (const f of ['Baloo 2', 'Comfortaa', 'Trebuchet MS', 'sans-serif']) expect(font).toContain(f);

  // palette: collect all colors used by calculator and keys
  const colors = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('.calculator, .display, .key')) {
      const s = getComputedStyle(el);
      out.push(s.backgroundColor, s.color);
    }
    return out;
  });
  for (const hex of ['#CC5500', '#E1AD01', '#568203', '#3B2314', '#FFF1D0']) {
    expect(colors, hex).toContain(rgb(hex));
  }

  const radii = await page.$$eval('button', (bs) =>
    bs.map((b) => parseFloat(getComputedStyle(b).borderTopLeftRadius)));
  expect(radii.length).toBeGreaterThan(0);
  for (const r of radii) expect(r).toBeGreaterThanOrEqual(12);
  const keyRadii = await page.$$eval('.key', (bs) =>
    bs.map((b) => parseFloat(getComputedStyle(b).borderTopLeftRadius)));
  expect(keyRadii.length).toBe(radii.length);

  await expect(page.locator('[data-key="7"]')).toBeVisible();
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

const bodyStyle = (page) =>
  page.evaluate(() => {
    const s = getComputedStyle(document.body);
    return { name: s.animationName, pos: s.backgroundPosition };
  });
const isBase = (pos) => pos.split(',').every((p) => /^\s*0(px|%)?\s+0(px|%)?\s*$/.test(p));

test('T-9b animated background changes over time', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect.poll(async () => (await bodyStyle(page)).name).not.toBe('none');
  expect(await page.evaluate(() => getComputedStyle(document.body).animationIterationCount)).toBe('infinite');
  const a = await bodyStyle(page);
  await page.waitForTimeout(500);
  const b = await bodyStyle(page);
  expect(a.pos).not.toBe(b.pos);
  await ctx.close();
});

test('T-9c reduced motion is static at base position and applies live', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  const a = await bodyStyle(page);
  expect(a.name).toBe('none');
  expect(isBase(a.pos)).toBe(true);
  await page.waitForTimeout(500);
  const b = await bodyStyle(page);
  expect(b.pos).toBe(a.pos);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(async () => (await bodyStyle(page)).name).not.toBe('none');
  await ctx.close();
});

test('T-9d calculator background is opaque brown', async ({ page }) => {
  await page.goto('/');
  const bg = await page.evaluate(() => getComputedStyle(document.querySelector('.calculator')).backgroundColor);
  expect(bg).toBe(rgb('#3B2314'));
});

test('T-9e theme.css has no url( or @import', async () => {
  const fs = await import('node:fs');
  const css = fs.readFileSync(new URL('../../src/theme.css', import.meta.url), 'utf8');
  expect(css).not.toMatch(/url\(|@import/);
});

const centerX = (b) => b.x + b.width / 2;

test('T-10 heading Groovy visible and centered above calculator (AC-1, AC-2)', async ({ page }) => {
  for (const vp of [null, { width: 320, height: 640 }]) {
    if (vp) await page.setViewportSize(vp);
    await page.goto('/');
    await expect(page.getByTestId('display')).toHaveText('0');
    const h = page.getByRole('heading', { level: 1, name: 'Groovy Calculator!', exact: true });
    await expect(h).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    const hb = await h.boundingBox();
    const cb = await page.locator('.calculator').boundingBox();
    expect(Math.abs(centerX(hb) - centerX(cb))).toBeLessThanOrEqual(2);
    expect(hb.y + hb.height).toBeLessThanOrEqual(cb.y + 1);
  }
});

test('T-10b title styling (AC-3)', async ({ page }) => {
  await page.goto('/');
  const r = await page.evaluate(() => {
    const t = getComputedStyle(document.querySelector('h1'));
    const c = getComputedStyle(document.querySelector('.calculator'));
    return { color: t.color, shadow: t.textShadow, font: t.fontFamily, size: parseFloat(t.fontSize), cfont: c.fontFamily };
  });
  expect(r.color).toBe(rgb('#E1AD01'));
  expect(r.color).not.toBe(rgb('#3B2314'));
  expect(r.shadow).toContain(rgb('#3B2314'));
  expect(r.font).toBe(r.cfont);
  expect(r.size).toBeGreaterThanOrEqual(40);
  expect(r.size).toBeLessThanOrEqual(64);
});

test('T-10c no horizontal overflow at 320px (AC-4)', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Groovy Calculator!', exact: true })).toBeVisible();
  const r = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
    title: document.querySelector('h1').getBoundingClientRect().width,
    app: document.querySelector('.app').getBoundingClientRect().width,
  }));
  expect(r.sw).toBeLessThanOrEqual(r.cw);
  expect(r.title).toBeLessThanOrEqual(r.app + 0.5);
});

test('T-10d short viewport scrolls, nothing clipped (AC-4)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 300 });
  await page.goto('/');
  const h = page.getByRole('heading', { name: 'Groovy Calculator!', exact: true });
  await expect(h).toBeVisible();
  expect((await h.boundingBox()).y).toBeGreaterThanOrEqual(0);
  const calc = page.locator('.calculator');
  await calc.evaluate((el) => el.scrollIntoView({ block: 'end' }));
  const b = await calc.boundingBox();
  expect(b.y + b.height).toBeLessThanOrEqual(300 + 1);
});

test('T-9f loop is seamless: end keyframe shifts each layer by whole tiles', async ({ page }) => {
  await page.goto('/');
  const r = await page.evaluate(() => {
    const kf = [...document.styleSheets].flatMap((s) => [...s.cssRules]).find((x) => x.name === 'groovy');
    const end = [...kf.cssRules].find((x) => x.keyText === '100%').style.backgroundPosition;
    return { end, size: getComputedStyle(document.body).backgroundSize };
  });
  const sizes = r.size.split(',').map((s) => parseFloat(s));
  const pos = r.end.split(',').map((s) => parseFloat(s.trim().split(/\s+/)[0]));
  expect(pos.length).toBe(sizes.length);
  pos.forEach((p, i) => {
    // percentage position p moves the tile by p*(1 - s/100) viewport widths; tile is s/100 wide
    const tiles = Math.abs((p / 100) * (sizes[i] / 100 - 1)) / (sizes[i] / 100);
    expect(tiles, `layer ${i}`).toBeGreaterThanOrEqual(1);
    expect(Math.abs(tiles - Math.round(tiles)), `layer ${i}`).toBeLessThan(1e-6);
  });
});

test('T-10e heading stays on one line and inside the calculator width (MC-200)', async ({ page }) => {
  for (const vp of [{ width: 1280, height: 800 }, { width: 375, height: 667 }, { width: 320, height: 640 }]) {
    await page.setViewportSize(vp);
    await page.goto('/');
    const h = page.getByRole('heading', { level: 1, name: 'Groovy Calculator!', exact: true });
    await expect(h).toBeVisible();
    const r = await h.evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const box = el.getBoundingClientRect();
      return { lines: range.getClientRects().length, overflow: el.scrollWidth > el.clientWidth, left: box.left, right: box.right };
    });
    expect(r.lines).toBe(1);
    expect(r.overflow).toBe(false);
    expect(r.left).toBeGreaterThanOrEqual(0);
    expect(r.right).toBeLessThanOrEqual(vp.width);
  }
});
