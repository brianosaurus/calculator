import React, { useEffect, useReducer } from 'react';
import { initialState, reduce, formatDisplay } from './engine.js';
import { keyToAction } from './keymap.js';

const KEYS = [
  ['Escape', 'C', 'key-clear'],
  ['Backspace', '⌫', 'key-clear'],
  ['/', '/', 'key-op'],
  ['*', '*', 'key-op'],
  ['7', '7', 'key-digit'],
  ['8', '8', 'key-digit'],
  ['9', '9', 'key-digit'],
  ['-', '-', 'key-op'],
  ['4', '4', 'key-digit'],
  ['5', '5', 'key-digit'],
  ['6', '6', 'key-digit'],
  ['+', '+', 'key-op'],
  ['1', '1', 'key-digit'],
  ['2', '2', 'key-digit'],
  ['3', '3', 'key-digit'],
  ['=', '=', 'key-equals'],
  ['0', '0', 'key-digit'],
  ['.', '.', 'key-digit'],
];

export default function Calculator() {
  const [state, dispatch] = useReducer(reduce, initialState);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const action = keyToAction(e.key);
      if (!action) return;
      e.preventDefault();
      dispatch(action);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const text = formatDisplay(state);
  const len = text.length;
  const size = len <= 8 ? '2.6rem' : len <= 10 ? '2rem' : '1.6rem';

  return (
    <div className="app">
      <h1 className="title">Groovy...</h1>
      <div className="calculator">
        <div
          className="display"
          data-testid="display"
          style={{ fontSize: size }}
        >
          {text}
        </div>
        <div className="keypad">
          {KEYS.map(([k, label, cls]) => (
            <button
              key={k}
              type="button"
              className={`key ${cls}`}
              data-key={k}
              onClick={() => dispatch(keyToAction(k))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
