import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Group from '../components/buttons/Group';

const Category = ({ data, pageContext }) => {
  const { allMdx, allCategories } = data;

  const postList = allMdx.edges.map((edge, i) => {
    const { title, tags, icon, date, nav } = edge.node.frontmatter;
    const { slug } = edge.node.fields;
    const iconImage = getImage(icon);

    return (
      <li key={i}>
        <Link to={`/${nav}/${slug}`}>
          <GatsbyImage image={iconImage} alt={icon.name} />
          <div>{title}</div>
          <div>{date}</div>
        </Link>
        <Group button={`link`} group={tags} name={`tags`} ul={`post-lists`} />
      </li>
    );
  });

  return (
    <Layout>
      <div>
        <h1>
          Posts in category: <span>{pageContext.category}</span>
        </h1>
      </div>
      <div>{postList}</div>
      <div>
        <div>All Categories</div>
        <Group
          button={`active`}
          group={allCategories.group}
          name={`categories`}
          data={`totalCount`}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($category: String) {
    allMdx(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
            nav
            date(formatString: "MMM DD")
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
    allCategories: allMdx {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Category;
