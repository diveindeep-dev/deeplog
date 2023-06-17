import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Graphic from '../components/Graphic';
import styled from 'styled-components';
import { color, font } from '../styles/Variables';
import {
  Background,
  ContentContainer,
  flexCenter,
  media,
} from '../styles/Mixin';
import { ListSection, PostLi } from '../styles/List';

const Icon = styled(GatsbyImage)`
  width: 35px;
  height: 35px;
`;

const IconWrap = styled.div`
  ${flexCenter}
  margin: 0 10px;
`;

const Category = styled.div`
  padding: 3px 0;
  color: ${color.grey};
  font-size: 0.7rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

const PostLink = styled(Link)`
  display: flex;
`;

const PinnedLI = styled(PostLi)`
  display: flex;
  background-color: ${({ theme }) => theme.bgSub};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.bgSub};
  &:hover {
    border: 1px solid ${({ theme }) => theme.line};
  }

  ${PostLink} {
    flex-direction: column;
    align-items: flex-start;
  }

  ${Title} {
    font-size: 1rem;
    padding-top: 5px;
  }

  ${IconWrap} {
    margin: 5px 10px;
  }

  ${Icon} {
    width: 30px;
    height: 30px;
  }
`;

const PinnedOL = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const LatestLI = styled(PostLi)`
  margin-bottom: 5px;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 5px;
`;

const SubTitle = styled.h2`
  width: 220px;
  margin-right: 20px;
  padding: 10px 0;
  font-family: ${font.upper};
  font-size: 2rem;
`;

const Section = styled(ListSection)`
  display: flex;
  padding: 25px 0;

  ${media.mobile} {
    flex-direction: column;
  }
`;

const Body = styled(ContentContainer)``;

const H1 = styled.h1`
  font-size: 5rem;
  font-family: ${font.logo};
  z-index: 8;
`;

const FrontH1 = styled(H1)`
  z-index: 10;
  color: ${color.main};
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cover = styled(ContentContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 400px;
  padding: 10px 60px;
  overflow: hidden;

  ${media.mobile} {
    justify-content: center;
  }
`;

const Back = styled(Background)`
  background: ${({ theme }) => `
  radial-gradient(
    circle at 0% 10%,
    ${theme.gradientA},
    transparent 35%
  ),
  radial-gradient(
    circle at 0% 30%,
    ${theme.gradientB},
    transparent 30%
  );`};
`;

const Index = (props) => {
  const { latestPosts, pinnedPosts } = props.data;

  const latestPostItem = latestPosts.edges.map((edge, i) => {
    const { frontmatter, fields } = edge.node;
    const icon = getImage(frontmatter.icon);

    return (
      <LatestLI key={i}>
        <PostLink to={`/blog/${fields.slug}`}>
          <IconWrap>
            <Icon image={icon} alt={frontmatter.icon.name} />
          </IconWrap>
          <Container>
            <Category>{frontmatter.category}</Category>
            <Title>{frontmatter.title}</Title>
          </Container>
        </PostLink>
      </LatestLI>
    );
  });

  const pinnedPostItem = pinnedPosts.edges.map((edge, i) => {
    const { frontmatter, fields } = edge.node;
    const icon = getImage(frontmatter.icon);

    return (
      <PinnedLI key={i}>
        <PostLink to={`/blog/${fields.slug}`}>
          <IconWrap>
            <Icon image={icon} alt={frontmatter.icon.name || ''} />
          </IconWrap>
          <Container>
            <Title>{frontmatter.title}</Title>
          </Container>
        </PostLink>
      </PinnedLI>
    );
  });

  return (
    <Layout>
      <Back />
      <Cover>
        <Text>
          <H1>
            DIVE<br></br>IN
          </H1>
          <FrontH1>DEEP</FrontH1>
        </Text>
        <Graphic />
      </Cover>
      <Body>
        <Section>
          <SubTitle>Pinned Posts</SubTitle>
          <PinnedOL>{pinnedPostItem}</PinnedOL>
        </Section>
        <Section>
          <SubTitle>Latest Posts</SubTitle>
          <ol>{latestPostItem}</ol>
        </Section>
      </Body>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    latestPosts: allMdx(
      filter: { frontmatter: { nav: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            category
            title
            icon {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }

    pinnedPosts: allMdx(
      filter: { frontmatter: { pin: { eq: true } } }
      sort: { frontmatter: { date: DESC } }
      limit: 4
    ) {
      edges {
        node {
          frontmatter {
            category
            title
            icon {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Index;
