import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';
import { color, font } from '../../styles/Variables';

const LinkButton = styled(Link)`
  padding: 4px 10px;
  font-family: ${font.title};
  border: 1px solid var(--line);
  border-radius: 5px;
  font-size: 0.85rem;

  span {
    color: ${color.mainText};
    font-size: 0.7rem;
    padding-left: 7px;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--bgSub);
    border: 1px solid ${color.main};
  }

  &.active {
    color: ${color.main};
    border: 1px solid ${color.main};
  }
`;

const ActiveLink = ({ text, path, data }) => {
  const kebabName = _.kebabCase(text.toLowerCase());
  const to = path ? `/${path}/${kebabName}` : `/${kebabName}`;

  return (
    <LinkButton to={to} type={path} activeClassName="active">
      {text}
      {data && <span>{data}</span>}
    </LinkButton>
  );
};

export default ActiveLink;
