import React from 'react';
import styled from 'styled-components';
import { font } from '../../styles/Variables';

const Data = styled.div`
  font-size: 0.9rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${font.upper};
  color: var(--fontSub);
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  grid-area: ${({ area }) => area};
  background-color: var(--bgSub);
  border-radius: 5px;
`;

const GridMenu = (props) => {
  const { children, title, data } = props;
  return (
    <Div area={title}>
      <Container>
        <Title>{title}</Title>
        {data && <Data>{data}</Data>}
      </Container>
      {children}
    </Div>
  );
};

export default GridMenu;
