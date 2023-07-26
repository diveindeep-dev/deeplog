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
          sitemap {
            title
            links {
              link
              name
            }
          }
          mail
          github
        }
      }
      blogCount: allMdx(filter: { frontmatter: { nav: { eq: "blog" } } }) {
        totalCount
      }
      noteCount: allMdx(filter: { frontmatter: { nav: { eq: "note" } } }) {
        totalCount
      }
      categoryCount: allMdx {
        distinct(field: {frontmatter: {category: SELECT}})
      }
      tagsCount: allMdx {
        distinct(field: {frontmatter: {tags: SELECT}})
      }
    }
  `);

  const { siteMetadata } = metaData.site;
  const count = {
    blog: metaData.blogCount.totalCount,
    note: metaData.noteCount.totalCount,
    categories: metaData.categoryCount.distinct.length,
    tags: metaData.tagsCount.distinct.length,
  };

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
          count={count}
          mail={siteMetadata.mail}
          github={siteMetadata.github}
        />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
