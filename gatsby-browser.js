import React from 'react';
import { ThemeContextProvider } from './src/context/ThemeContext';

require('./src/styles/prismTheme.css');

export const wrapRootElement = ({ element }) => {
  return <ThemeContextProvider>{element}</ThemeContextProvider>;
};
