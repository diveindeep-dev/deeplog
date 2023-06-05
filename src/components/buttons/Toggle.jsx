import React from 'react';
import styled from 'styled-components';
import { flexCenter, smallButton } from '../../styles/Mixin';
import { color } from '../../styles/Variables';

const Switch = styled.label`
  ${flexCenter}
  width: 35px;
  height: 35px;
  margin: 0 10px;
  color: ${({ theme }) => theme.font};
  font-size: 1.2rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.font};
  &:hover {
    cursor: pointer;
    color: ${color.main};
    background-color: ${({ theme }) => theme.font};
    border: 1px solid ${({ theme }) => theme.font};
  }
`;

const InvisibleInput = styled.input`
  display: none;

  &:checked + ${Switch} {
    color: ${color.main};
  }
`;

const ToggleButton = (props) => {
  const { handleToggle, isChecked, name, value } = props;
  const inputId = value ? `${name}-${value}` : `${name}`;

  let labelComponent;
  switch (name) {
    case 'switch':
      labelComponent = <Switch htmlFor={inputId}>✦</Switch>;
      break;
    default:
      labelComponent = <label htmlFor={inputId}>{value}</label>;
  }

  return (
    <>
      <InvisibleInput
        type="checkbox"
        id={inputId}
        checked={isChecked}
        onChange={handleToggle}
        value={value}
        name={name}
      />
      {labelComponent}
    </>
  );
};

export default ToggleButton;
