import React, { createContext } from 'react';
import GlobalState from './GlobalState';

const ThemeContext = createContext({ theme: 'light' });

export const ThemeContextProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={GlobalState()}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
