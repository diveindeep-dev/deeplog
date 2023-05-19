import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MODE':
      const toggled = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', toggled);
      return {
        mode: toggled,
      };

    default: {
      return state;
    }
  }
};

const GlobalState = () => {
  const [state, dispatch] = useReducer(reducer, {
    mode: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light',
  });

  return { state, dispatch };
};

export default GlobalState;