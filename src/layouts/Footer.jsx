import React from 'react';
import Sitemap from './Sitemap';
import styled from 'styled-components';
import { Background, media } from '../styles/Mixin';
import { color, font } from '../styles/Variables';

const FrontSection = styled.section`
  position: relative;
  padding: 130px 0;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  z-index: 1;

  p {
    font-family: ${font.serif};
    font-size: 1.1rem;
    text-align: center;
    span {
      padding: 0 3px 0 4px;
      font-family: ${font.logo};
      color: ${color.mainText};
    }
  }
`;

const PusherSection = styled.section`
  margin: 0;
  height: 476px;
  z-index: -2;

  ${media.mobile} {
    height: 600px;
  }
`;

const BackSection = styled.section`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 110px 0;
  bottom: 0;
  width: 100%;
  z-index: -1;
  ${media.mobile} {
    padding: 50px 0px;
  }
`;

const Back = styled(Background)`
  background: ${({ theme }) => `
  radial-gradient(
    circle at 100% 100%,
    ${theme.gradientA},
    transparent 75%
  ),
  radial-gradient(
    circle at 0% 100%,
    ${theme.gradientB},
    transparent 40%
  );`};
`;

const Footer = styled.footer`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const FooterLayout = ({ author, sitemap, count, github, mail }) => {
  const year = new Date().getFullYear();

  return (
    <Footer>
      <FrontSection>
        <p>
          Copyright 2020-{year}. <span>{author}</span> all rights reserved.
        </p>
      </FrontSection>
      <PusherSection />
      <BackSection>
        <Back />
        <Sitemap sitemap={sitemap} count={count} github={github} mail={mail} />
      </BackSection>
    </Footer>
  );
};

export default FooterLayout;
