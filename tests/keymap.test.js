import { describe, it, expect } from 'vitest';
import { keyToAction } from '../src/keymap.js';

describe('keyToAction (B-2)', () => {
  it('maps digits', () => {
    for (const d of '0123456789') expect(keyToAction(d)).toEqual({ type: 'digit', value: d });
  });
  it('maps decimal, operators, equals, backspace, clear', () => {
    expect(keyToAction('.')).toEqual({ type: 'decimal' });
    for (const o of ['+', '-', '*', '/']) expect(keyToAction(o)).toEqual({ type: 'op', value: o });
    expect(keyToAction('Enter')).toEqual({ type: 'equals' });
    expect(keyToAction('=')).toEqual({ type: 'equals' });
    expect(keyToAction('Backspace')).toEqual({ type: 'backspace' });
    expect(keyToAction('Escape')).toEqual({ type: 'clear' });
  });
  it('returns null for unmapped keys', () => {
    for (const k of ['q', 'F5', 'Tab', 'Shift', ' ', '', '10', 'x', 'Delete', 'c'])
      expect(keyToAction(k)).toBeNull();
    expect(keyToAction(undefined)).toBeNull();
  });
});
