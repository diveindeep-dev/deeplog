import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';

const Blog = (props) => {
  const { allPosts } = props.data;

  const postList = allPosts.edges.map((edge, i) => {
    const { frontmatter, fields } = edge.node;
    const icon = getImage(frontmatter.icon);

    return (
      <li key={i}>
        <Link to={`/blog/${fields.slug}`}>
          <GatsbyImage image={icon} alt={frontmatter.icon.name} />
          <div>{frontmatter.title}</div>
          <div>{frontmatter.date}</div>
        </Link>
      </li>
    );
  });

  return (
    <Layout>
      <ol>{postList}</ol>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allPosts: allMarkdownRemark(
      filter: { frontmatter: { nav: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            category
            date
            nav
            tags
            title
            icon {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Blog;
