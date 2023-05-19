import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const metaData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          author
          nav {
            name
            link
          }
        }
      }
    }
  `);
  const { siteMetadata } = metaData.site;

  return (
    <div className="App">
      <Header navArray={siteMetadata.nav} siteTitle={siteMetadata.siteTitle} />
      <main>{children}</main>
      <Footer author={siteMetadata.author} />
    </div>
  );
};

export default Layout;
