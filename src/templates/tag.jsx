import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Group from '../components/buttons/Group';

const Tag = ({ data, pageContext }) => {
  const { allMdx, allTags } = data;

  const postList = allMdx.edges.map((edge, i) => {
    const { title, tags, icon, nav } = edge.node.frontmatter;
    const { slug } = edge.node.fields;
    const iconImage = getImage(icon);

    return (
      <li key={i}>
        <Link to={`/${nav}/${slug}`}>
          {icon && <GatsbyImage image={iconImage} alt={icon.name} />}
          <div>{nav.toUpperCase()}</div>
          <div>{title}</div>
        </Link>
        <Group button={`link`} group={tags} name={`tags`} ul={`post-lists`} />
      </li>
    );
  });

  return (
    <Layout>
      <div>
        <h1>
          Posts tagged as <span>{`${pageContext.tag}`}</span>
        </h1>
      </div>
      <div>{postList}</div>
      <div>
        <div>All Tags</div>
        <Group
          button={`active`}
          group={allTags.group}
          name={`tags`}
          data={`totalCount`}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($tag: [String]) {
    allMdx(
      filter: { frontmatter: { tags: { in: $tag } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
            nav
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
    allTags: allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tag;
