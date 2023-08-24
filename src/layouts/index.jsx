import React, { useContext } from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';
import Header from './Header';
import Footer from './Footer';
import ThemeContext from '../context/ThemeContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme, lightTheme } from '../styles/Theme';

const Layout = ({ children }) => {
  const { state } = useContext(ThemeContext);
  const setTheme = state.theme === 'light' ? lightTheme : darkTheme;
  const { siteMetadata } = useSiteMetadata();

  return (
    <ThemeProvider theme={setTheme}>
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
    </ThemeProvider>
  );
};

export default Layout;
