import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { color, font } from '../../styles/Variables';

const TagStyle = css`
  padding: 3px 10px;
  font-size: 0.7rem;
  background-color: ${(props) => props.theme.bg};
  border-radius: 5px;
`;

const CategoryStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const LinkButton = styled(Link)`
  padding: 3px 10px;
  color: ${({ theme }) => theme.fontSub};
  font-family: ${font.title};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 3px;

  ${({ type }) => type === 'tags' && TagStyle};
  ${({ type }) => type === 'categories' && CategoryStyle};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.bgSub};
    border: 1px solid ${color.main};
  }
`;

const BorderLink = ({ text, path, data }) => {
  const kebabName = _.kebabCase(text.toLowerCase());
  const to = path ? `/${path}/${kebabName}` : `/${kebabName}`;

  return (
    <LinkButton to={to} type={path}>
      {text}
      {data && <div>{data}</div>}
    </LinkButton>
  );
};

export default BorderLink;
