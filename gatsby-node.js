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
      allMdx(
        filter: { frontmatter: { nav: { in: ["blog", "note", "template"] } } }
      ) {
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
      categoryGroup: allMdx {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
        }
      }
      tagGroup: allMdx {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  const nodes = data.allMdx.nodes;
  const categoryGroup = data.categoryGroup.group;
  const tagGroup = data.tagGroup.group;

  const postTemplate = path.resolve(`./src/templates/post.jsx`);
  const categoryTemplate = path.resolve(`./src/templates/category.jsx`);
  const tagTemplate = path.resolve(`./src/templates/tag.jsx`);

  nodes.forEach((node) => {
    const nav = node.frontmatter.nav;
    const slug = node.fields.slug;

    createPage({
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      path: `${nav}/${slug}`,
      context: { slug: slug },
    });
  });

  categoryGroup.forEach((category) => {
    const kebabValue = _.kebabCase(category.fieldValue.toLowerCase());
    createPage({
      component: categoryTemplate,
      path: `categories/${kebabValue}`,
      context: {
        category: category.fieldValue,
      },
    });
  });

  tagGroup.forEach((tag) => {
    const kebabValue = _.kebabCase(tag.fieldValue.toLowerCase());
    createPage({
      component: tagTemplate,
      path: `tags/${kebabValue}`,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
