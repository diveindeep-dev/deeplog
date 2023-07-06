import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';

require('./src/styles/prismTheme.css');

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
