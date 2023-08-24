import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const toggled = window.__theme === 'light' ? 'dark' : 'light';
      window.__setPreferredTheme(toggled);
      return { theme: toggled };

    default: {
      return state;
    }
  }
};

const GlobalState = () => {
  const isWindow = () => {
    if (typeof window !== 'undefined') {
      return {
        theme: window.__theme,
      };
    } else {
      return { theme: 'light' };
    }
  };

  const [state, dispatch] = useReducer(reducer, isWindow());

  return { state, dispatch };
};

export default GlobalState;
