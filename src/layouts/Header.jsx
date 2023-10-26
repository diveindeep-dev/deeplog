import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import ThemeContext from '../context/ThemeContext';
import Logo from './Logo';
import ToggleButton from '../components/buttons/Toggle';
import { RxExternalLink } from 'react-icons/rx';
import styled from 'styled-components';
import { ContentContainer, media } from '../styles/Mixin';
import { color, font } from '../styles/Variables';
import config from '../../contents/config';

const ActiveLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-family: ${font.upper};
  font-size: 1.3rem;
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
  display: flex;
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
  color: var(--font);
  z-index: 100;

  &.back {
    backdrop-filter: blur(2px);
    &:hover {
      background-color: var(--bg);
    }
  }
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
    <HeaderLayout className={isScrolled && 'back'}>
      <Container className={isScrolled && 'scrolled'}>
        <Logo siteTitle={siteTitle} />
        <Menu>
          <nav>
            {navList}
            <ActiveLink to={`${config.portfolio}`} target="_blank">
              Projects <RxExternalLink />
            </ActiveLink>
          </nav>
          <ToggleButton
            name={`switch`}
            isChecked={state.theme === 'dark'}
            handleToggle={() => dispatch({ type: 'TOGGLE_THEME' })}
          />
        </Menu>
      </Container>
    </HeaderLayout>
  );
};

export default Header;
