import React, { createContext } from 'react';
import GlobalState from './GlobalState';

const ThemeContext = createContext({ mode: 'light' });

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={GlobalState()}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
