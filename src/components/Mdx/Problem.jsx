import React from 'react';
import Details from './Details';
import styled from 'styled-components';

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

export default Problem;
