import { describe, it, expect } from 'vitest';
import { initialState, reduce, formatDisplay } from '../src/engine.js';

const run = (keys) =>
  keys.split(' ').reduce((s, k) => {
    if (/^[0-9]$/.test(k)) return reduce(s, { type: 'digit', value: k });
    if (k === '.') return reduce(s, { type: 'decimal' });
    if (k === '=') return reduce(s, { type: 'equals' });
    if (k === 'C') return reduce(s, { type: 'clear' });
    if (k === 'B') return reduce(s, { type: 'backspace' });
    return reduce(s, { type: 'op', value: k });
  }, initialState);
const show = (keys) => formatDisplay(run(keys));

describe('T-1 arithmetic (I-2, I-3)', () => {
  it('basic ops', () => {
    expect(show('7 + 8 =')).toBe('15');
    expect(show('9 - 4 =')).toBe('5');
    expect(show('6 * 7 =')).toBe('42');
    expect(show('8 / 4 =')).toBe('2');
  });
  it('no precedence', () => {
    expect(show('2 + 3 * 4 =')).toBe('20');
    expect(show('2 + 3 *')).toBe('5');
  });
  it('rounding', () => {
    expect(show('0 . 1 + 0 . 2 =')).toBe('0.3');
    expect(show('1 . 5 + 1 . 5 =')).toBe('3');
  });
  it('entry building (I-7)', () => {
    expect(show('1 . 2 . 3')).toBe('1.23');
    expect(show('0 0 5')).toBe('5');
    expect(show('.')).toBe('0.');
    expect(show('1 2 3 C')).toBe('0');
    expect(initialState.entry).toBe('0');
  });
  it('caps 12 digits (B-1)', () => {
    expect(show('1 2 3 4 5 6 7 8 9 0 1 2 3')).toBe('123456789012');
  });
});

describe('T-2 errors and overflow (I-4..I-6)', () => {
  it('divide by zero', () => {
    expect(show('5 / 0 =')).toBe('Error');
    expect(show('5 / 0 +')).toBe('Error');
  });
  it('recovery', () => {
    expect(show('5 / 0 = 7')).toBe('7');
    expect(show('5 / 0 = .')).toBe('0.');
    expect(show('5 / 0 = C')).toBe('0');
  });
  it('operator, equals, backspace in Error reset to 0 with nothing pending', () => {
    for (const k of ['+', '=', 'B']) {
      const s = run(`5 / 0 = ${k}`);
      expect(formatDisplay(s)).toBe('0');
      expect(s.op).toBeNull();
      expect(s.acc).toBeNull();
    }
  });
  it('exponent within 12 chars', () => {
    const d = show('9 9 9 9 9 9 9 9 9 9 9 * 9 9 9 9 9 9 9 9 9 9 9 =');
    expect(d.length).toBeLessThanOrEqual(12);
    expect(d).toMatch(/e\+/);
    expect(d).not.toMatch(/NaN|Infinity|undefined/);
  });
});

describe('T-3 state matrix (I-8, I-9)', () => {
  it('equals no-ops', () => {
    expect(show('5 =')).toBe('5');
    expect(show('5 + =')).toBe('5');
    expect(run('5 + =').op).toBe('+');
    expect(show('5 + 3 = =')).toBe('8');
  });
  it('after result', () => {
    expect(show('5 + 3 = 2')).toBe('2');
    expect(show('5 + 3 = .')).toBe('0.');
    expect(show('5 + 3 = * 2 =')).toBe('16');
  });
  it('consecutive operators replace', () => {
    expect(show('5 + * 3 =')).toBe('15');
  });
  it('backspace', () => {
    expect(show('1 2 B')).toBe('1');
    expect(show('1 B')).toBe('0');
    expect(show('B')).toBe('0');
    expect(show('5 + 3 = B')).toBe('8');
    expect(show('5 + B')).toBe('5');
  });
  it('clear resets everything', () => {
    expect(run('5 + 3 C')).toEqual(initialState);
  });
  it('is pure', () => {
    const s = Object.freeze({ ...initialState });
    expect(reduce(s, { type: 'digit', value: '3' }).entry).toBe('3');
    expect(s.entry).toBe('0');
  });
});
