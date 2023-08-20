import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Group from '../components/buttons/Group';
import GridMenu from '../components/Box/GridMenu';
import GridCover from '../components/Graphic/GridCover';
import styled from 'styled-components';
import { ContentContainer, flexCenter, media } from '../styles/Mixin';
import { ListSection, PostLi } from '../styles/List';
import { color, font } from '../styles/Variables';
import Seo from '../layouts/SEO';

const Icon = styled(GatsbyImage)`
  width: 40px;
  height: 40px;

  ${media.mobile} {
    width: 35px;
    height: 35px;
  }
`;

const IconWrap = styled.div`
  ${flexCenter}
  margin: 0 10px;
`;

const Title = styled.div`
  padding-bottom: 3px;
  font-size: 1.2rem;
  font-family: ${font.title};
`;

const Data = styled.div`
  color: ${color.grey};
  font-size: 0.8rem;
`;

const Frontmatter = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostLink = styled(Link)`
  display: flex;
`;

const Li = styled(PostLi)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.line};

  ${media.mobile} {
    flex-direction: column;
    align-items: baseline;
  }
`;

const PostsArea = styled(ListSection)`
  grid-area: posts;
  margin-bottom: 50px;
`;

const SubTitle = styled.div`
  font-family: ${font.title};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontSub};
  padding: 5px 0;
`;

const H1 = styled.h1`
  font-family: ${font.logo};
  font-size: 2.5rem;
  font-weight: 400;
`;

const Tag = ({ data, pageContext }) => {
  const { allMdx, allTags } = data;

  const postList = allMdx.edges.map((edge, i) => {
    const { title, tags, icon, nav } = edge.node.frontmatter;
    const { slug } = edge.node.fields;
    const iconImage = getImage(icon);

    return (
      <Li key={i}>
        <PostLink to={`/${nav}/${slug}`}>
          {icon && (
            <IconWrap>
              <Icon image={iconImage} alt={icon.name} />
            </IconWrap>
          )}
          <Frontmatter>
            <Data>{nav.toUpperCase()}</Data>
            <Title>{title}</Title>
          </Frontmatter>
        </PostLink>
        <Group button={`link`} group={tags} name={`tags`} ul={`post-lists`} />
      </Li>
    );
  });

  return (
    <Layout>
      <GridCover>
        <SubTitle>Posts tagged as</SubTitle>
        <H1>{`${pageContext.tag}`}</H1>
      </GridCover>
      <ContentContainer>
        <PostsArea>
          <ol>{postList}</ol>
        </PostsArea>
        <GridMenu title={`All Tags`}>
          <Group button={`active`} group={allTags.group} name={`tags`} />
        </GridMenu>
      </ContentContainer>
    </Layout>
  );
};

export const Head = (props) => {
  const { location, pageContext } = props;
  const seo = {
    description: `${pageContext.tag} 태그된 포스트 리스트`,
    path: `${location.pathname}`,
  };

  return <Seo pageTitle={`${pageContext.tag}`} pageSEO={seo} />;
};

export const query = graphql`
  query ($tag: [String]) {
    allMdx(
      filter: { frontmatter: { tags: { in: $tag } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
            nav
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
    allTags: allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tag;
