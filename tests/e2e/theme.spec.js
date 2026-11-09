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
