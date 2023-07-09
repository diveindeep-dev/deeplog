import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import Group from '../components/buttons/Group';

const Tags = ({ data }) => {
  return (
    <Layout>
      <h1>All Tags</h1>
      <Group
        button={`active`}
        name={`tags`}
        group={data.allMdx.group}
        data={`totalCount`}
      />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tags;
