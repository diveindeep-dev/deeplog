import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';
import Header from './Header';
import Footer from './Footer';
import GlobalStyle from '../styles/GlobalStyle';
import '../styles/Theme.css';

const Layout = ({ children }) => {
  const { siteMetadata } = useSiteMetadata();

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Header
          navArray={siteMetadata.nav}
          siteTitle={siteMetadata.siteTitle}
        />
        <main>{children}</main>
        <Footer
          author={siteMetadata.author}
          sitemap={siteMetadata.sitemap}
          mail={siteMetadata.mail}
          github={siteMetadata.github}
        />
      </div>
    </>
  );
};

export default Layout;
