import React from 'react';
import { Link } from 'gatsby';
import logo from '../../static/logo.png';
import styled from 'styled-components';
import { flexCenter } from '../styles/Mixin';
import { font } from '../styles/Variables';

const Img = styled.img`
  width: 40px;
`;

const Text = styled.div`
  font-size: 1.5rem;
  font-family: ${font.logo};
  font-weight: bold;
  padding: 0 5px;
`;

const LogoLink = styled(Link)`
  ${flexCenter}
`;

const Logo = ({ siteTitle }) => {
  return (
    <LogoLink to="/">
      <Img src={logo} alt="logo" />
      <Text className="logo-text">{siteTitle}</Text>
    </LogoLink>
  );
};

export default Logo;
