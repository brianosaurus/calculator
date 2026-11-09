export const initialState = { entry: '0', acc: null, op: null, fresh: true, error: false };

const MAX_DIGITS = 12;

function compute(a, op, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? null : a / b;
    default: return b;
  }
}

function roundStr(n) {
  return String(Number(n.toPrecision(MAX_DIGITS)));
}

const errorState = { entry: '0', acc: null, op: null, fresh: true, error: true };

export function reduce(state, action) {
  switch (action.type) {
    case 'clear':
      return initialState;
    case 'digit': {
      const d = action.value;
      if (state.error) return { ...initialState, entry: d, fresh: false };
      if (state.fresh) return { ...state, entry: d, fresh: false };
      if (state.entry === '0') return { ...state, entry: d };
      if (state.entry.replace(/[^0-9]/g, '').length >= MAX_DIGITS) return state;
      return { ...state, entry: state.entry + d };
    }
    case 'decimal': {
      if (state.error) return { ...initialState, entry: '0.', fresh: false };
      if (state.fresh) return { ...state, entry: '0.', fresh: false };
      if (state.entry.includes('.')) return state;
      return { ...state, entry: state.entry + '.' };
    }
    case 'op': {
      if (state.error) return initialState;
      if (state.op !== null && state.fresh) return { ...state, op: action.value };
      if (state.op !== null) {
        const r = compute(state.acc, state.op, Number(state.entry));
        if (r === null || !Number.isFinite(r)) return errorState;
        const s = roundStr(r);
        return { entry: s, acc: Number(s), op: action.value, fresh: true, error: false };
      }
      return { ...state, acc: Number(state.entry), op: action.value, fresh: true };
    }
    case 'equals': {
      if (state.error) return initialState;
      if (state.op === null || state.fresh) return state;
      const r = compute(state.acc, state.op, Number(state.entry));
      if (r === null || !Number.isFinite(r)) return errorState;
      return { entry: roundStr(r), acc: null, op: null, fresh: true, error: false };
    }
    case 'backspace': {
      if (state.error) return initialState;
      if (state.fresh) return state;
      const e = state.entry.slice(0, -1);
      return { ...state, entry: e === '' || e === '-' ? '0' : e };
    }
    default:
      return state;
  }
}

export function formatDisplay(state) {
  if (state.error) return 'Error';
  const n = Number(state.entry);
  if (!Number.isFinite(n)) return 'Error';
  if (!state.fresh) return state.entry;
  const s = String(Number(n.toPrecision(MAX_DIGITS)));
  if (s.length <= MAX_DIGITS) return s;
  for (let p = MAX_DIGITS - 1; p >= 0; p--) {
    let t = n.toExponential(p);
    t = t.replace(/\.?0+e/, 'e').replace('e+', 'e+');
    if (t.length <= MAX_DIGITS) return t;
  }
  return n.toExponential(0);
}
