import React from 'react';
import Details from './Details';
import styled from 'styled-components';
import { media } from '../../styles/Mixin';
import { color } from '../../styles/Variables';

const Ex = styled.div`
  margin: 30px;
  padding: 5px 10px;
  border-left: 3px solid ${color.main};

  &::before {
    content: 'Example';
    font-size: 0.9rem;
    font-weight: 900;
  }

  ${media.mobile} {
    margin: 20px 10px;
    padding: 5px 10px;
  }
`;

const Div = styled.div`
  border-radius: 0.3rem;
`;

const Problem = ({ children }) => {
  const findIndex = children
    .map((item, index) => {
      if (item.type === 'h4') {
        return index;
      } else {
        return -1;
      }
    })
    .filter((item) => item !== -1);

  return (
    <Div>
      <Details>{children.slice(findIndex[0], findIndex[1])}</Details>
      <Details>{children.slice(findIndex[1])}</Details>
    </Div>
  );
};

export const Example = ({ children }) => {
  return <Ex>{children}</Ex>;
};

export default Problem;
