import React from 'react';
import BorderLink from './BorderLink';
import styled from 'styled-components';

const Li = styled.li`
  &.tags-li {
    margin: 4px 4px 4px 0;
  }

  &.categories-li {
    width: 100%;
    margin: 2px 0;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const LinkGroup = (props) => {
  const { group, type } = props;

  const groupList = group.map((item, i) => {
    const { fieldValue, totalCount } = item;
    const data = type === 'categories' && totalCount;

    return (
      <Li key={i} className={`${type}-li`}>
        <BorderLink path={type} text={fieldValue} data={data} />
      </Li>
    );
  });

  return <Ul>{groupList}</Ul>;
};

export default LinkGroup;
