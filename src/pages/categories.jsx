import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import Seo from '../layouts/SEO';
import description from '../../contents/data/pageText';
import Group from '../components/buttons/Group';
import Cover from '../components/Graphic/Cover';
import styled from 'styled-components';
import { ContentContainer } from '../styles/Mixin';

const Body = styled(ContentContainer)`
  padding-top: 60px;
  min-height: 60vh;
`;

const Categories = ({ data }) => {
  return (
    <Layout>
      <Cover text={`All Categories`} />
      <Body>
        <Group
          button={`active`}
          name={`categories`}
          group={data.allMdx.group}
          data={`totalCount`}
        />
      </Body>
    </Layout>
  );
};

export const Head = (props) => {
  const seo = {
    description: description.categories,
    path: `${props.location.pathname}`,
  };

  return <Seo pageTitle={`Categories`} pageSEO={seo} />;
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
