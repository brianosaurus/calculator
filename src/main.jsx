import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Calculator from './Calculator.jsx';
import './theme.css';

const root = createRoot(document.getElementById('root'));
flushSync(() => {
  root.render(<Calculator />);
});
