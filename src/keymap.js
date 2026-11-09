const OPS = ['+', '-', '*', '/'];

export function keyToAction(key) {
  if (typeof key !== 'string') return null;
  if (key.length === 1 && key >= '0' && key <= '9') return { type: 'digit', value: key };
  if (key === '.') return { type: 'decimal' };
  if (OPS.includes(key)) return { type: 'op', value: key };
  if (key === 'Enter' || key === '=') return { type: 'equals' };
  if (key === 'Backspace') return { type: 'backspace' };
  if (key === 'Escape') return { type: 'clear' };
  return null;
}
