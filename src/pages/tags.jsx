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

const Tags = ({ data }) => {
  return (
    <Layout>
      <Cover text={`All Tags`} />
      <Body>
        <Group
          button={`active`}
          name={`tags`}
          group={data.allMdx.group}
          data={`totalCount`}
        />
      </Body>
    </Layout>
  );
};

export const Head = (props) => {
  const seo = {
    description: description.tags,
    path: `${props.location.pathname}`,
  };

  return <Seo pageTitle={`Tags`} pageSEO={seo} />;
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
