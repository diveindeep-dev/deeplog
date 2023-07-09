import React from 'react';
import styled from 'styled-components';
import { ContentContainer, backGrid } from '../../styles/Mixin';

const Cover = styled.div`
  ${backGrid}
  display: flex;
  align-items: center;
  min-height: 241px;
`;

const GridCover = ({ children }) => {
  return (
    <Cover>
      <ContentContainer>{children}</ContentContainer>
    </Cover>
  );
};

export default GridCover;
