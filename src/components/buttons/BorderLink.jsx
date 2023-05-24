import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { color, font } from '../../styles/Variables';

const TagLink = styled(Link)`
  padding: 3px 10px;
  color: ${({ theme }) => theme.fontSub};
  font-family: ${font.title};
  font-size: 0.7rem;
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.bgSub};
    border: 1px solid ${color.main};
  }
`;

const BorderLink = ({ text, path }) => {
  return <TagLink to={path}>{text}</TagLink>;
};

export default BorderLink;
