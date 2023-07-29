import React from 'react';
import { Link } from 'gatsby';
import useSiteMetadata from '../hooks/useSiteMetadata';
import CopyButton from '../components/buttons/Copy';
import { BiLinkExternal, BiSolidCopy } from 'react-icons/bi';
import styled from 'styled-components';
import { color, font } from '../styles/Variables';
import { media } from '../styles/Mixin';

const Bold = styled.div`
  font-size: 1.8rem;
  font-family: ${font.frank};
  font-weight: 900;
`;

const SubTitle = styled.div`
  padding: 2px 0;
  height: 20px;
  font-family: ${font.frank};
  font-weight: 900;

  ${media.mobile} {
    height: initial;
    padding: 10px 0 5px 0;
  }
`;

const LinkFact = styled(Link)`
  display: flex;
  justify-content: space-between;
`;

const Li = styled.li`
  padding: 1px 5px;
  width: 150px;
  border-bottom: ${({ order }) => order !== 3 && `1px solid black`};
  &:hover {
    font-weight: 900;
  }

  ${media.mobile} {
    width: 100%;
  }
`;

const Column = styled.ol`
  margin: 0 5px;
  font-size: 0.8rem;
  font-family: ${font.body};
`;

const Sites = styled.div`
  display: flex;
  justify-content: center;
  margin: 2px 0;
  padding: 5px 2px;
  border-top: 5px solid black;
  border-bottom: 5px solid black;

  ${media.mobile} {
    flex-direction: column;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 10px 5px;
  border-top: 1px solid black;
  border-bottom: 5px solid black;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`;

const GridLinks = styled.div`
  grid-area: link;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
  max-width: 335px;
  font-size: 0.8rem;

  svg {
    width: 1rem;
    height: 1rem;
    margin: 0 3px;
  }
  a {
    display: flex;
    align-items: center;
    font-family: ${font.upper};
    font-size: 1rem;
    padding: 5px 0;

    &:hover {
      color: ${color.main};
    }
  }
`;

const Map = styled.div`
  grid-area: map;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: ${font.body};

  ol {
    list-style: none;
  }

  ${Bold} {
    display: flex;
    justify-content: right;
    padding: 0 5px;
    font-size: 0.7rem;
  }

  ${Box} {
    align-items: flex-start;
  }
`;

const GridTitle = styled.div`
  grid-area: title;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${Box} {
    div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Div = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1.5fr;
  grid-template-areas:
    'title map'
    'title link';
  padding: 10px;
  margin: 0 auto;
  background-color: white;
  box-shadow: black 0px 0px 0px 2px, white 0px 0px 0px 10px;
  font-size: 0.9rem;
  font-family: ${font.frank};
  z-index: 3;

  ${media.mobile} {
    max-width: 250px;
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'map'
      'link';
  }
`;

const Sitemap = ({ sitemap, github, mail }) => {
  const { count } = useSiteMetadata();
  const postTotal = count.blog + count.note;
  const sites = sitemap.map((site, i) => {
    const links = site.links.map((site, i) => {
      const type = site.link.slice(1);

      return (
        <Li key={i} order={i}>
          <LinkFact to={site.link}>
            - {site.name}
            <span>{count[type]}</span>
          </LinkFact>
        </Li>
      );
    });

    return (
      <Column key={i}>
        <SubTitle>{site.title}</SubTitle>
        {links}
      </Column>
    );
  });

  return (
    <Div>
      <GridTitle>
        <Box>
          <Bold>
            Blog
            <br /> Nutrition Facts
          </Bold>
        </Box>
        <Line>
          <div>Serving size</div>
          <div>1 page</div>
        </Line>
        <Box>
          <div>Amount of blog</div>
          <div>
            <Bold>Posts</Bold>
            <Bold>{postTotal}</Bold>
          </div>
        </Box>
      </GridTitle>
      <Map>
        <Bold>% Daily Value*</Bold>
        <Sites>{sites}</Sites>
      </Map>
      <GridLinks>
        <div>
          * It is a meaningless unit(%). It is just a element of
          #Nutrition_Facts design.
        </div>
        <a href={github}>
          ** github repository <BiLinkExternal />
        </a>
        <CopyButton text={mail}>
          ** Mail Address <BiSolidCopy />
        </CopyButton>
      </GridLinks>
    </Div>
  );
};

export default Sitemap;
