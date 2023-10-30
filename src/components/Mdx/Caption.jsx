import React from 'react';
import styled from 'styled-components';
import { color } from '../../styles/Variables';

const Cap = styled.div`
  width: 100%;
  font-size: 0.85rem;
  padding: 5px 0 10px;
  color: ${color.grey};
  text-align: center;
`;

const Caption = ({ children }) => {
  return (
    <Cap>
      {children}
    </Cap>
  );
};

export default Caption;
