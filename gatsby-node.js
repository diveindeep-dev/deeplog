const path = require('path');
const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const filePath = createFilePath({
      node,
      getNode,
      trailingSlash: false,
    });
    const slashIndex = filePath.lastIndexOf('/');
    const fileName = filePath.slice(slashIndex + 1);

    createNodeField({
      node,
      name: 'slug',
      value: _.kebabCase(fileName),
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      allMdx(filter: { frontmatter: { nav: { in: ["blog", "note", "template"] } } }) {
        nodes {
          frontmatter {
            nav
          }
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const nodes = data.allMdx.nodes;
  const postTemplate = path.resolve(`./src/templates/post.jsx`);

  nodes.forEach((node) => {
    const nav = node.frontmatter.nav;
    const slug = node.fields.slug;

    createPage({
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      path: `${nav}/${slug}`,
      context: { slug: slug },
    });
  });
};
