const config = require('./contents/config');

module.exports = {
  siteMetadata: {
    siteTitle: config.siteTitle,
    author: config.author,
    nav: config.nav,
  },
  plugins: [`gatsby-plugin-styled-components`],
};
