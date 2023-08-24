import React from 'react';
import styled, { css } from 'styled-components';
import { color } from '../../styles/Variables';
import { flexCenter, media } from '../../styles/Mixin';

const Twinkle = styled.div`
  position: absolute;
  font-size: ${({ size }) => size}px;
  left: ${({ top }) => top}px;
  top: ${({ left }) => left}px;
`;

const Oval = styled.div`
  width: 350px;
  height: 200px;
  transform: rotate(-35deg);
  border-radius: 50%;
`;

const OvalBorder = styled(Oval)`
  border-style: solid;
  border-color: ${color.grey};
  border-width: 5px 1px 5px 1px;
  z-index: 9;
`;

const OvalColor = styled(Oval)`
  position: absolute;
  bottom: -10px;
  left: 15px;
  background-color: var(--bg);
  background-image: linear-gradient(var(--gradientA), transparent, var(--gradientB)), url(https://grainy-gradients.vercel.app/noise.svg);
  z-index: 7;
`;

const OvalGrid = styled(Oval)`
  position: absolute;
  bottom: -20px;
  left: 25px;
  border: 1px solid ${color.grey};
  background-image: linear-gradient(${color.grey} 1px, transparent 1px),
    linear-gradient(to right, ${color.grey} 1px, transparent 1px);
  background-size: 25px 25px;
  z-index: 6;
`;

const Div = styled.div`
  ${flexCenter}
  position: relative;

  ${({ desktop }) => css`
    transform: ${desktop};
  `};

  ${media.mobile} {
    position: absolute;
    ${({ mobile }) => css`
      transform: ${mobile};
    `};
  }
`;

const Graphic = ({ desktop, mobile, isColor = true }) => {
  return (
    <Div desktop={desktop} mobile={mobile}>
      <OvalBorder>
        <Twinkle top={40} left={0}>
          ✦
        </Twinkle>
        <Twinkle top={300} left={100}>
          ✦
        </Twinkle>
        <Twinkle top={322} left={155} size={15}>
          ✧
        </Twinkle>
        <Twinkle top={100} left={95} size={20}>
          ✧
        </Twinkle>
        <Twinkle top={0} left={115} size={30}>
          ✦
        </Twinkle>
        <Twinkle top={200} left={250}>
          ✦
        </Twinkle>
      </OvalBorder>
      {isColor && <OvalColor />}
      <OvalGrid />
    </Div>
  );
};

export default Graphic;
