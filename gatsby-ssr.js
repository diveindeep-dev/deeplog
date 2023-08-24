import React, { createElement } from 'react';
import { ThemeContextProvider } from './src/context/ThemeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>{element}</ThemeContextProvider>
);

const BodyAttributes = {
  className: 'light',
};

const ScriptElement = [
  createElement('script', {
    dangerouslySetInnerHTML: {
      __html: `
      (() => {
        let preferredTheme;
        try {
          preferredTheme = localStorage.getItem('theme');
        } catch (err) {}

        const setTheme = (newTheme) => {
          window.__theme = newTheme;
          preferredTheme = newTheme;
          document.body.className = newTheme;
        }

        window.__setPreferredTheme = (newTheme) => {
          setTheme(newTheme);
          try {
            localStorage.setItem('theme', newTheme);
          } catch (err) {}
        }

        let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkQuery.addListener(e => {
          window.__setPreferredTheme(e.matches ? 'dark' : 'light');
        })
        setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
      })();`,
    },
  }),
];

export const onRenderBody = ({ setBodyAttributes, setPreBodyComponents }) => {
  setBodyAttributes(BodyAttributes);
  setPreBodyComponents(ScriptElement);
};
