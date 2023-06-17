import React from 'react';
import { Link, graphql } from 'gatsby';
import _ from 'lodash';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import BorderLink from '../components/buttons/BorderLink';

const Post = ({ children, data: { mdx } }) => {
  const { title, date, tags, category, icon } = mdx.frontmatter;
  const kebabCategory = _.kebabCase(category);
  const iconImage = getImage(icon);

  const tagItems = tags.map((tag, i) => {
    return (
      <li key={i}>
        <BorderLink text={tag} path={`tags`} />
      </li>
    );
  });

  return (
    <Layout>
      <div>
        <Link to={`/categories/${kebabCategory}`}>{category}</Link>
        <h1>{title}</h1>
        <div>{date}</div>
        <ul>{tagItems}</ul>
        <GatsbyImage image={iconImage} alt={icon.name} />
      </div>
      <div>{children}</div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        category
        date(formatString: "MMMM DD, YYYY")
        icon {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
        tags
        title
      }
    }
  }
`;

export default Post;
