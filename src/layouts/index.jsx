import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Header from './Header';
import Footer from './Footer';
import ThemeContext from '../context/ThemeContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme, lightTheme } from '../styles/Theme';

const Layout = ({ children }) => {
  const { state } = useContext(ThemeContext);
  const setTheme = state.mode === 'light' ? lightTheme : darkTheme;

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
    <ThemeProvider theme={setTheme}>
      <GlobalStyle />
      <div className="App">
        <Header
          navArray={siteMetadata.nav}
          siteTitle={siteMetadata.siteTitle}
        />
        <main>{children}</main>
        <Footer author={siteMetadata.author} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
