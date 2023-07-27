import React from 'react';
import Layout from '../layouts';
import styled from 'styled-components';
import { ContentContainer } from '../styles/Mixin';
import { font } from '../styles/Variables';

const Subtitle = styled.div`
  font-size: 2rem;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Body = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  font-family: ${font.upper};
`;

const NotFound = () => {
  return (
    <Layout>
      <Body>
        <Title>404</Title>
        <Subtitle>Not Found</Subtitle>
      </Body>
    </Layout>
  );
};

export default NotFound;
