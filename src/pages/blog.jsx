import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Cover from '../components/Graphic/Cover';
import Tag from '../components/buttons/BorderLink';
import GridMenu from '../components/Box/GridMenu';
import LinkGroup from '../components/buttons/LinkGroup';
import styled from 'styled-components';
import { ContentContainer, flexCenter, media } from '../styles/Mixin';
import { ListSection, PostLi } from '../styles/List';
import { color, font } from '../styles/Variables';

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

const TagLi = styled.li`
  margin: 2px 1px;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  max-width: 50%;
`;

const Date = styled.div`
  color: ${color.grey};
  font-size: 0.8rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-family: ${font.title};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  ${media.mobile} {
    padding: 5px;
  }
`;

const Li = styled(PostLi)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.line};

  ${media.mobile} {
    flex-direction: column;
    align-items: baseline;

    ${Tags} {
      align-self: flex-end;
      max-width: 80%;
    }
  }
`;

const PostLink = styled(Link)`
  display: flex;
`;

const PostsArea = styled(ListSection)`
  grid-area: posts;
  margin-bottom: 50px;
`;

const Input = styled.input`
  padding: 10px;
  font-family: ${font.title};
  background-color: ${({ theme }) => theme.bg};
`;

const Body = styled(ContentContainer)`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    'posts search'
    'posts categories'
    'posts tags'
    'posts .';

  ${media.tablet} {
    grid-template-columns: 2.5fr 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'search'
      'posts'
      'categories'
      'tags';
  }
`;

const Blog = (props) => {
  const { allPosts } = props.data;
  const [filtered, setFiltered] = useState(allPosts.edges);

  const searchPost = (keywords) => {
    const filteredPost = allPosts.edges.filter((post) =>
      post.node.frontmatter.title
        .toLowerCase()
        .includes(keywords.toLowerCase()),
    );

    setFiltered(filteredPost);
  };

  const handleChange = (event) => {
    searchPost(event.target.value);
  };

  const postList = filtered.map((edge, i) => {
    const { frontmatter, fields } = edge.node;
    const icon = getImage(frontmatter.icon);
    const tags = frontmatter.tags.map((tag, i) => {
      return (
        <TagLi key={i}>
          <Tag text={tag} path={`tags`} />
        </TagLi>
      );
    });

    return (
      <Li key={i}>
        <PostLink to={`/blog/${fields.slug}`}>
          <IconWrap>
            <Icon image={icon} alt={frontmatter.icon.name || ''} />
          </IconWrap>
          <Container>
            <Title>{frontmatter.title}</Title>
            <Date>{frontmatter.date}</Date>
          </Container>
        </PostLink>
        <Tags>{tags}</Tags>
      </Li>
    );
  });

  return (
    <Layout>
      <Cover text={'BLOG'} />
      <Body>
        <PostsArea>
          <ol>{postList}</ol>
        </PostsArea>
        <GridMenu
          title={`search`}
          data={`${filtered.length} / ${allPosts.totalCount}`}
        >
          <Input
            type="text"
            placeholder="검색어를 입력하세요."
            onChange={handleChange}
          />
        </GridMenu>
        <GridMenu title={`categories`}>
          <ListSection>
            <LinkGroup group={allPosts.categories} type={`categories`} />
          </ListSection>
        </GridMenu>
        <GridMenu title={`tags`}>
          <ListSection>
            <LinkGroup group={allPosts.tags} type={`tags`} />
          </ListSection>
        </GridMenu>
      </Body>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allPosts: allMarkdownRemark(
      filter: { frontmatter: { nav: { eq: "blog" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            category
            date(formatString: "MMM DD")
            nav
            tags
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
      totalCount
      tags: group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
      categories: group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Blog;
