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
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'contents',
        path: `${__dirname}/contents`,
      },
    },
  ],
};
