import React from 'react';
import { Link, graphql } from 'gatsby';
import _ from 'lodash';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Cover from '../components/Graphic/Cover';
import Tag from '../components/buttons/BorderLink';
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
  margin: 5px 1px;
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
  padding: 0 10px;
  ${media.mobile} {
    padding: 5px;
  }
`;

const Li = styled(PostLi)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.line};

  ${media.mobile} {
    flex-direction: column;

    ${Tags} {
      align-self: flex-end;
      max-width: 80%;
    }
  }
`;

const PostLink = styled(Link)`
  display: flex;
`;

const Body = styled(ContentContainer)`
  /* ... */
`;

const Blog = (props) => {
  const { allPosts } = props.data;

  const postList = allPosts.edges.map((edge, i) => {
    const { frontmatter, fields } = edge.node;
    const icon = getImage(frontmatter.icon);
    const tags = frontmatter.tags.map((tag, i) => {
      const kebabTag = _.kebabCase(tag);

      return (
        <TagLi key={i}>
          <Tag text={tag} path={`/tags/${kebabTag}`} />
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
        <ListSection>
          <ol>{postList}</ol>
        </ListSection>
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
    }
  }
`;

export default Blog;
