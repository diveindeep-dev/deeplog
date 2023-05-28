import React from 'react';
import Graphic from '.';
import styled from 'styled-components';
import { ContentContainer, media } from '../../styles/Mixin';
import { font } from '../../styles/Variables';

const H1 = styled.h1`
  padding: 0 30px;
  font-size: 3.5rem;
  font-weight: 400;
  font-family: ${font.logo};
  z-index: 8;
`;

const Div = styled(ContentContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 200px;
  padding: 20px 30px;
  overflow: hidden;

  ${media.mobile} {
    justify-content: center;
    padding: 30px;
  }
`;

const Cover = ({ text }) => {
  return (
    <Div>
      <H1>{text}</H1>
      <Graphic
        desktop={`scale(65%) translate(60px)`}
        mobile={`scale(65%)`}
        isColor={false}
      />
    </Div>
  );
};

export default Cover;
