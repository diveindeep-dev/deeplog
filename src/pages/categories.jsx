import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import Group from '../components/buttons/Group';

const Categories = ({ data }) => {
  return (
    <Layout>
      <h1>All Categories</h1>
      <Group
        button={`active`}
        name={`categories`}
        group={data.allMdx.group}
        data={`totalCount`}
      />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Categories;
