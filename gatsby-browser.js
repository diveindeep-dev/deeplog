import React from 'react';
import { ThemeContextProvider } from './src/context/ThemeContext';
import { render } from 'react-dom';

require('./src/styles/prismTheme.css');

export const wrapRootElement = ({ element }) => {
  return <ThemeContextProvider>{element}</ThemeContextProvider>;
};

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    render(element, container, callback);
  };
};
