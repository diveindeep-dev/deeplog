const remarkGfm = require('remark-gfm');
const config = require('./contents/config');

module.exports = {
  siteMetadata: {
    siteTitle: config.siteTitle,
    siteDescription: config.siteDescription,
    author: config.author,
    nav: config.nav,
    sitemap: config.sitemap,
    mail: config.mail,
    github: config.github,
    siteUrl: config.siteUrl,
    siteLogo: config.siteLogo,
    siteOg: config.siteOg,
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
