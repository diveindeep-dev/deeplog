import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../context/ThemeContext';
import Logo from './Logo';
import styled from 'styled-components';
import { ContentContainer, flexCenter, media } from '../styles/Mixin';
import { color, font } from '../styles/Variables';

const Label = styled.label`
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
  &:checked + ${Label} {
    color: ${color.main};
  }
`;

const ActiveLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-family: ${font.button};
  &:hover {
    cursor: pointer;
    color: ${color.main};
  }
  &.active {
    color: ${color.main};
  }
`;

const Menu = styled.div`
  display: flex;
  nav {
    display: flex;
  }
`;

const Container = styled(ContentContainer)`
  align-items: center;
  justify-content: space-between;
  height: 140px;
  z-index: 100;
  transition: height 0.3s ease;

  &.scrolled {
    height: 80px;
  }

  ${media.mobile} {
    flex-direction: column;
    justify-content: space-around;

    &.scrolled {
      flex-direction: row;
      justify-content: space-between;
      .logo-text {
        display: none;
      }
    }
  }
`;

const HeaderLayout = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: ${({ theme }) => theme.font};
  z-index: 100;
`;

const Header = ({ navArray, siteTitle }) => {
  const { state, dispatch } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolled && window.scrollY > 30) {
        setIsScrolled(true);
      } else if (isScrolled && window.scrollY <= 30) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const navList = navArray.map((nav, i) => {
    return (
      <ActiveLink key={i} to={nav.link} activeClassName="active">
        {nav.name}
      </ActiveLink>
    );
  });

  return (
    <HeaderLayout>
      <Container className={isScrolled && 'scrolled'}>
        <Logo siteTitle={siteTitle} />
        <Menu>
          <nav>{navList}</nav>
          <InvisibleInput
            type="checkbox"
            id="switch"
            onChange={() => dispatch({ type: 'TOGGLE_MODE' })}
            checked={state.mode === 'dark'}
          />
          <Label htmlFor="switch">✦</Label>
        </Menu>
      </Container>
    </HeaderLayout>
  );
};

export default Header;
