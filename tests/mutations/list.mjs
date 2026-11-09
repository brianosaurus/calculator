/**
 * Entry shape (consumed exactly by run.mjs):
 * {
 *   id: string,        // 'DI-1'..'DI-9'
 *   description: string,
 *   file: string,      // target path relative to project root
 *   find: string,      // text occurring exactly once in file (may contain \n)
 *   replace: string,   // replacement text
 *   tests: string[],   // plain test file paths the mutant must break
 * }
 */
export const mutations = [
  {
    id: 'DI-1',
    description: 'Multiplication-first precedence instead of left-to-right',
    file: 'src/engine.js',
    find: 'if (state.op !== null) {',
    replace: "if (state.op !== null && state.op !== '*' && action.value !== '*' && action.value !== '/') {",
    tests: ['tests/engine.test.js'],
  },
  {
    id: 'DI-2',
    description: 'Remove float rounding',
    file: 'src/engine.js',
    find: 'return String(Number(n.toPrecision(MAX_DIGITS)));',
    replace: 'return String(n);',
    tests: ['tests/engine.test.js'],
  },
  {
    id: 'DI-3',
    description: 'Divide by zero no longer yields Error',
    file: 'src/engine.js',
    find: "const errorState = { entry: '0', acc: null, op: null, fresh: true, error: true };",
    replace: "const errorState = { entry: '0', acc: null, op: null, fresh: true, error: false };",
    tests: ['tests/engine.test.js'],
  },
  {
    id: 'DI-4',
    description: 'Error state ignores digits and never recovers',
    file: 'src/engine.js',
    find: "if (state.error) return { ...initialState, entry: d, fresh: false };",
    replace: 'if (state.error) return state;',
    tests: ['tests/engine.test.js'],
  },
  {
    id: 'DI-5',
    description: 'Escape maps to null',
    file: 'src/keymap.js',
    find: "if (key === 'Escape') return { type: 'clear' };",
    replace: "if (key === 'Escape') return null;",
    tests: ['tests/keymap.test.js'],
  },
  {
    id: 'DI-6',
    description: 'Drop preventDefault in key listener',
    file: 'src/Calculator.jsx',
    find: '      e.preventDefault();\n',
    replace: '',
    tests: ['tests/e2e/keyboard.spec.js'],
  },
  {
    id: 'DI-7',
    description: 'Mustard changed to stock purple-blue',
    file: 'src/theme.css',
    find: '--gold: #E1AD01;',
    replace: '--gold: #5B5BD6;',
    tests: ['tests/e2e/theme.spec.js'],
  },
  {
    id: 'DI-8',
    description: 'Key border-radius 4px',
    file: 'src/theme.css',
    find: '  border: 0;\n  border-radius: 14px;',
    replace: '  border: 0;\n  border-radius: 4px;',
    tests: ['tests/e2e/theme.spec.js'],
  },
  {
    id: 'DI-9',
    description: 'Disable exponent fallback so long results overflow',
    file: 'src/engine.js',
    find: 'if (s.length <= MAX_DIGITS) return s;',
    replace: 'return s;',
    tests: ['tests/e2e/calculator.spec.js'],
  },
];
