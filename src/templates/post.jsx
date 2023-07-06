import React from 'react';
import { Link, graphql } from 'gatsby';
import _ from 'lodash';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layouts';
import Group from '../components/buttons/Group';
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
  color: ${({ theme }) => theme.font};
  background-color: ${({ theme }) => theme.line};
  border: 1px solid ${({ theme }) => theme.line};

  &:hover {
    color: ${({ theme }) => theme.font};
    border: 1px solid ${({ theme }) => theme.font};
  }
`;

const Date = styled.div`
  margin: 0 5px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.fontSub};
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
  color: ${({ theme }) => theme.bg};
  background-color: ${({ theme }) => theme.line};
  border: 1px solid ${({ theme }) => theme.line};
`;

const Level = styled.div`
  ${smallBorder}
  margin: 0 4px;
  color: ${({ theme }) => theme.bg};
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

const Body = styled(ContentContainer)``;

const Frontmatter = styled(ContentContainer)`
  display: flex;
  width: min(116ch, 100% - 2rem);
  justify-content: space-between;
  font-family: ${font.title};

  ${media.mobile} {
    flex-direction: column-reverse;
    align-items: flex-start;

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
      frontmatterByNav = <div></div>;
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
    </Layout>
  );
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
    }
  }
`;

export default Post;
