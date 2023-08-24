import React from 'react';
import { Link, graphql } from 'gatsby';
import _ from 'lodash';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Group from '../components/buttons/Group';
import Comments from '../components/Box/Comments';
import Seo from '../layouts/SEO';
import styled from 'styled-components';
import {
  ContentContainer,
  colorMap,
  media,
  smallBorder,
} from '../styles/Mixin';
import { color, font } from '../styles/Variables';
import { Markdown } from '../styles/Markdown';

const Icon = styled(GatsbyImage)`
  width: 100px;
  height: 100px;
`;

const WrapIcon = styled.div`
  margin-left: 20px;
`;

const Category = styled(Link)`
  ${smallBorder}
  color: var(--font);
  background-color: var(--line);
  border: 1px solid var(--line);

  &:hover {
    color: var(--font);
    border: 1px solid var(--font);
  }
`;

const Date = styled.div`
  margin: 0 5px;
  font-size: 0.8rem;
  color: var(--fontSub);
`;

const Title = styled.div`
  display: flex;
  padding-bottom: 10px;

  h1 {
    font-size: 2.5rem;
  }
`;

const From = styled.div`
  ${smallBorder}
  color: var(--bg);
  background-color: var(--line);
  border: 1px solid var(--line);
`;

const Level = styled.div`
  ${smallBorder}
  margin: 0 4px;
  color: var(--bg);
  background-color: ${({ bg }) => color.button[bg]};
  border: 1px solid ${({ bg }) => color.button[bg]};
  opacity: 35%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  div {
    display: flex;
    align-items: center;
  }
`;

const CommentsTitle = styled.div`
  margin: 20px 0;
  border-bottom: 2px solid var(--line);
  font-size: 1.8em;
  font-family: ${font.title};
  color: ${color.main};
`;

const Body = styled(ContentContainer)`
  padding: 40px 100px;
  ${media.mobile} {
    padding: 20px 10px;
  }
`;

const Frontmatter = styled(ContentContainer)`
  display: flex;
  justify-content: space-between;
  width: min(116ch, 100% - 2rem);
  padding: 40px 100px;
  font-family: ${font.title};

  ${media.mobile} {
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 20px 10px;

    ${WrapIcon} {
      margin: 0;
    }

    ${Icon} {
      width: 60px;
      height: 60px;
    }
  }
`;

const Post = ({ children, data: { mdx } }) => {
  const { nav, title, date, tags, category, icon, from, level } =
    mdx.frontmatter;
  const kebabCategory = _.kebabCase(category);
  const iconImage = getImage(icon);

  const getColor = () => {
    if (!level) return;
    const valueLower = level.toLowerCase();
    const colorKey = colorMap.hasOwnProperty(valueLower)
      ? valueLower
      : 'default';

    return colorMap[colorKey];
  };

  let frontmatterByNav;
  switch (nav) {
    case 'note':
      frontmatterByNav = (
        <div>
          <Title>
            <h1>{title}</h1>
          </Title>
          <Box>
            <div>
              <From>{from}</From>
              <Level bg={getColor()}>{level}</Level>
            </div>
            <Group button={`link`} group={tags} name={`tags`} />
          </Box>
        </div>
      );
      break;

    case 'blog':
      frontmatterByNav = (
        <div>
          <Title>
            <h1>{title}</h1>
          </Title>
          <Box>
            <div>
              <Category to={`/categories/${kebabCategory}`}>
                {category.toUpperCase()}
              </Category>
              <Date>{date}</Date>
            </div>
            <Group button={`link`} group={tags} name={`tags`} />
          </Box>
        </div>
      );
      break;

    default:
      frontmatterByNav = <div />;
  }

  return (
    <Layout>
      <Frontmatter>
        {frontmatterByNav}
        {icon && (
          <WrapIcon>
            <Icon image={iconImage} alt={icon.name} />
          </WrapIcon>
        )}
      </Frontmatter>
      <Body>
        <Markdown>{children}</Markdown>
      </Body>
      <Body>
        <CommentsTitle>댓글</CommentsTitle>
        <Comments />
      </Body>
    </Layout>
  );
};

export const Head = (props) => {
  const { location, data } = props;
  const { excerpt, frontmatter } = data.mdx;
  const seo = {
    description: excerpt,
    path: `${location.pathname}`,
    image:
      frontmatter.icon &&
      frontmatter.icon.childImageSharp.gatsbyImageData.images.fallback.src,
    isStructuredData: `blog`,
  };

  return <Seo pageTitle={frontmatter.title} pageSEO={seo} />;
};

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        category
        date(formatString: "MMMM DD, YYYY")
        icon {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
        tags
        title
        nav
        level
        type
        from
      }
      excerpt
    }
  }
`;

export default Post;
