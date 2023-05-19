import React from 'react';
import { Link } from 'gatsby';

const Header = ({ navArray, siteTitle }) => {
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
    </header>
  );
};

export default Header;
