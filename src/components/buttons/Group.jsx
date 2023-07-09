import React from 'react';
import ToggleButton from './Toggle';
import BorderLink from './BorderLink';
import ActiveLink from './ActiveLink';
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

  &.active-li {
    margin: 7px 3px;
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
  const { group, button, name, data, ul, handle, check } = props;

  const groupList = group.map((item, i) => {
    const formatted = item[data];

    switch (button) {
      case 'toggle':
        return (
          <Li key={i}>
            <ToggleButton
              name={name}
              value={item.fieldValue || item}
              handleToggle={handle}
              isChecked={check(item.fieldValue)}
            />
          </Li>
        );
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
      case 'active':
        return (
          <Li key={i} className={`active-li`}>
            <ActiveLink
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
