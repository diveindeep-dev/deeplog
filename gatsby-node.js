const path = require('path');
const _ = require('lodash');
const { graphql } = require('gatsby');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');

    createNodeField({
      node,
      name: 'slug',
      value: _.kebabCase(slug),
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { nav: { in: ["blog", "note"] } } }
      ) {
        edges {
          node {
            frontmatter {
              nav
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const edges = data.allMarkdownRemark.edges;
  const markdownTemplate = path.resolve(`./src/templates/post.jsx`);

  edges.forEach((edge) => {
    const nav = edge.node.frontmatter.nav;
    const slug = edge.node.fields.slug;

    createPage({
      component: markdownTemplate,
      path: `${nav}/${slug}`,
      context: { slug: slug },
    });
  });
};
