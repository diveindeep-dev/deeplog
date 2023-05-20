import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';

const Index = (props) => {
  const { latestPosts } = props.data;

  const latestPostItem = latestPosts.edges.map((edge, i) => {
    const { frontmatter, fields } = edge.node;
    const icon = getImage(frontmatter.icon);

    return (
      <li key={i}>
        <GatsbyImage image={icon} alt={frontmatter.icon.name} />
        <Link to={`/blog/${fields.slug}`}>
          <div>{frontmatter.title}</div>
          <div>{frontmatter.date}</div>
        </Link>
      </li>
    );
  });

  return (
    <Layout>
      <ol>{latestPostItem}</ol>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    latestPosts: allMarkdownRemark(
      filter: { frontmatter: { nav: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
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

export default Index;
