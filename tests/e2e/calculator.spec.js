import { test, expect } from '@playwright/test';

const key = (page, k) => page.locator(`[data-key="${k}"]`);
const click = async (page, keys) => {
  for (const k of keys) await key(page, k).click();
};

test.describe('click input (T-5, T-6; R-1, R-4, B-1, F-1, F-2)', () => {
  let display;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    display = page.getByTestId('display');
    await expect(display).toHaveText('0');
  });

  test('T-5 clicking 1 2 + 3 = shows 15', async ({ page }) => {
    await click(page, ['1', '2', '+', '3', '=']);
    await expect(display).toHaveText('15');
  });

  test('T-5 2+3*4 = shows 20 (no precedence)', async ({ page }) => {
    await click(page, ['2', '+', '3', '*', '4', '=']);
    await expect(display).toHaveText('20');
  });

  test('T-5 0.1+0.2 shows 0.3', async ({ page }) => {
    await click(page, ['0', '.', '1', '+', '0', '.', '2', '=']);
    await expect(display).toHaveText('0.3');
  });

  test('F-1 8 / 0 = shows Error, digit recovers', async ({ page }) => {
    await click(page, ['8', '/', '0', '=']);
    await expect(display).toHaveText('Error');
    await click(page, ['7']);
    await expect(display).toHaveText('7');
  });

  test('F-1 clear recovers from Error and clears to 0', async ({ page }) => {
    await click(page, ['8', '/', '0', '=']);
    await expect(display).toHaveText('Error');
    await click(page, ['Escape']);
    await expect(display).toHaveText('0');
    await click(page, ['5', '+', '3']);
    await click(page, ['Escape']);
    await expect(display).toHaveText('0');
  });

  test('T-6 F-2 large product does not overflow display', async ({ page }) => {
    await click(page, [...'99999999999', '*', ...'99999999999', '=']);
    const text = await display.textContent();
    expect(text.length).toBeLessThanOrEqual(12);
    expect(text).not.toMatch(/NaN|Infinity|undefined/);
    const m = await display.evaluate((el) => ({ s: el.scrollWidth, c: el.clientWidth }));
    expect(m.s).toBeLessThanOrEqual(m.c);
  });

  test('B-1 operand capped at 12 digits', async ({ page }) => {
    await click(page, [...'1234567890123']);
    await expect(display).toHaveText('123456789012');
  });
});
