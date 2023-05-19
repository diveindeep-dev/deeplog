import React from 'react';

const Footer = ({ author }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      Copyright 2020-{year}. {author} all rights reserved.
    </footer>
  );
};

export default Footer;
