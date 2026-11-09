import { test, expect } from '@playwright/test';

// T-7, T-8 (R-3, B-2, B-15, B-16, I-10)
async function ready(page) {
  await page.goto('/');
  const display = page.getByTestId('display');
  await expect(display).toHaveText('0');
  return display;
}

async function press(page, ...keys) {
  for (const k of keys) await page.keyboard.press(k);
}

function dispatch(page, init) {
  return page.evaluate((i) => {
    const e = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...i });
    window.dispatchEvent(e);
    return e.defaultPrevented;
  }, init);
}

test('T-7 Enter computes 1 2 + 3 Enter = 15', async ({ page }) => {
  const display = await ready(page);
  await press(page, '1', '2', '+', '3', 'Enter');
  await expect(display).toHaveText('15');
});

test('T-7 = key computes', async ({ page }) => {
  const display = await ready(page);
  await press(page, '6', '*', '7', '=');
  await expect(display).toHaveText('42');
});

test('T-7 Backspace deletes one digit', async ({ page }) => {
  const display = await ready(page);
  await press(page, '1', '2', '3');
  await expect(display).toHaveText('123');
  await press(page, 'Backspace');
  await expect(display).toHaveText('12');
});

test('T-7 Escape clears', async ({ page }) => {
  const display = await ready(page);
  await press(page, '9', '+', '4', 'Escape');
  await expect(display).toHaveText('0');
});

test('T-7 decimal point key', async ({ page }) => {
  const display = await ready(page);
  await press(page, '1', '.', '5', '.', '5');
  await expect(display).toHaveText('1.55');
});

test('T-7 divide by zero shows Error and digit recovers', async ({ page }) => {
  const display = await ready(page);
  await press(page, '5', '/', '0', 'Enter');
  await expect(display).toHaveText('Error');
  await press(page, '7');
  await expect(display).toHaveText('7');
});

test('T-8 handled keys are prevented', async ({ page }) => {
  await ready(page);
  expect(await dispatch(page, { key: '/' })).toBe(true);
  expect(await dispatch(page, { key: 'Enter' })).toBe(true);
});

test('T-8 unmapped keys ignored, not prevented, no page error', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e));
  const display = await ready(page);
  await press(page, '4');
  await expect(display).toHaveText('4');
  for (const key of ['q', 'F5', 'Tab', 'Shift']) {
    expect(await dispatch(page, { key })).toBe(false);
  }
  await expect(display).toHaveText('4');
  expect(errors).toEqual([]);
});

test('T-8 Ctrl/Meta/Alt combos ignored and not prevented', async ({ page }) => {
  const display = await ready(page);
  await press(page, '4');
  for (const mod of ['ctrlKey', 'metaKey', 'altKey']) {
    expect(await dispatch(page, { key: '5', [mod]: true })).toBe(false);
  }
  await expect(display).toHaveText('4');
});
