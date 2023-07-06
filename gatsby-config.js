const remarkGfm = require('remark-gfm');
const config = require('./contents/config');

module.exports = {
  siteMetadata: {
    siteTitle: config.siteTitle,
    author: config.author,
    nav: config.nav,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [{ resolve: `gatsby-remark-prismjs` }],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contents',
        path: `${__dirname}/contents`,
      },
    },
  ],
};
