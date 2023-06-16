import React from 'react';
import { Link, graphql } from 'gatsby';
import _ from 'lodash';
import Layout from '../layouts';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import BorderLink from '../components/buttons/BorderLink';

const Post = (props) => {
  const { html, frontmatter } = props.data.markdownRemark;
  const { title, date, tags, category, icon } = frontmatter;
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
      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
