import React from 'react';
import BorderLink from './BorderLink';
import styled from 'styled-components';
import { media } from '../../styles/Mixin';

const Li = styled.li`
  margin: 3px 3px 3px 0;

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
  list-style: none;

  &.post-lists {
    justify-content: flex-end;
    align-items: center;
    max-width: 45%;

    .tags-li {
      margin: 2px 3px 3px 0;
    }

    ${media.mobile} {
      align-self: flex-end;
      max-width: 80%;
    }
  }
`;

const Group = (props) => {
  const { group, button, name, data, ul } = props;

  const groupList = group.map((item, i) => {
    const formatted = item[data];

    switch (button) {
      case 'link':
        return (
          <Li key={i} className={`${name}-li`}>
            <BorderLink
              path={name}
              text={item.fieldValue || item}
              data={formatted}
            />
          </Li>
        );
      default:
        return (
          <Li key={i}>
            <BorderLink />;
          </Li>
        );
    }
  });

  return <Ul className={ul}>{groupList}</Ul>;
};

export default Group;
