import React from 'react';
import styled from 'styled-components';
import { color } from '../../styles/Variables';

const Div = styled.div`
  font-size: 1.2rem;
  padding: 5px 0 10px;
  color: ${color.main};
  text-align: center;
`;

const Caption = ({ children }) => {
  return (
    <Div>
      <strong>{children}</strong>
    </Div>
  );
};

export default Caption;
