import React, { useContext } from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../context/ThemeContext';

const Header = ({ navArray, siteTitle }) => {
  const { state, dispatch } = useContext(ThemeContext);

  const navList = navArray.map((nav, i) => {
    return (
      <li key={i}>
        <Link to={nav.link}>{nav.name}</Link>
      </li>
    );
  });

  return (
    <header>
      <div>{siteTitle}</div>
      <ol>{navList}</ol>
      <input
        type="checkbox"
        id="switch"
        onChange={() => dispatch({ type: 'TOGGLE_MODE' })}
        checked={state.mode === 'light'}
      />
      <label htmlFor="switch">Toggle Mode</label>
    </header>
  );
};

export default Header;
