import React, { useEffect, useState } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../layouts';
import Seo from '../layouts/SEO';
import description from '../../contents/data/pageText';
import Cover from '../components/Graphic/Cover';
import BorderLink from '../components/buttons/BorderLink';
import ToggleButton from '../components/buttons/Toggle';
import GridMenu from '../components/Box/GridMenu';
import Group from '../components/buttons/Group';
import styled from 'styled-components';
import { ContentContainer, flexCenter, media } from '../styles/Mixin';
import { ListSection } from '../styles/List';
import { font } from '../styles/Variables';

const Li = styled.li`
  margin: 2px 3px 2px 0;
`;

const Tags = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 50px;
`;

const Input = styled.input`
  padding: 10px;
  font-family: ${font.title};
  background-color: var(--bg);
`;

const ResetButton = styled.button`
  align-self: flex-end;
  color: var(--fontSub);
  font-size: 1rem;
  font-family: ${font.upper};

  &:hover {
    color: var(--font);
  }
`;

const FilterTitle = styled.div`
  display: flex;
  font-size: 1.1rem;
  font-family: ${font.upper};
  color: var(--fontSub);
`;

const FilterBox = styled(ListSection)`
  margin-bottom: 15px;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--line);
  color: var(--fontSub);
  font-size: 0.75rem;
`;

const Title = styled.div`
  ${flexCenter}
  width: 100%;
  font-family: ${font.serif};
  font-size: 1.4rem;
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
`;

const NoteLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 230px;
  border: 1px solid var(--bgSub);
  border-radius: 5px;
  background-color: var(--bgSub);
  font-family: ${font.title};

  &:hover {
    border: 1px solid var(--line);
  }

  ${media.mobile} {
    padding: 10px;
    height: 150px;

    ${Tags} {
      min-height: 30px;
    }
  }
`;

const NoteLink = styled(Link)`
  display: flex;
`;

const NoteOl = styled.ol`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const NotesArea = styled(ListSection)`
  grid-area: notes;
`;

const Body = styled(ContentContainer)`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    'notes search'
    'notes filter'
    'notes tags'
    'notes .';

  ${media.tablet} {
    grid-template-columns: 3fr 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'search'
      'filter'
      'notes'
      'tags';
  }
`;

const Note = (props) => {
  const { allNotes } = props.data;
  const { edges, totalCount, tags, types, froms, levels } = allNotes;
  const [filtered, setFiltered] = useState(edges);
  const initialFilters = { title: [], from: [], level: [], type: [] };
  const [filters, setFilters] = useState(initialFilters);

  const filterArr = [
    { name: 'type', group: types },
    { name: 'from', group: froms },
    { name: 'level', group: levels },
  ];

  useEffect(() => {
    const filtering = () => {
      let result = edges;

      for (let filter in filters) {
        const words = filters[`${filter}`];
        if (words.length === 0) continue;

        if (filter === 'title') {
          result = result.filter((post) =>
            post.node.frontmatter[`title`]
              .toLowerCase()
              .includes(words[0].toLowerCase()),
          );
        } else {
          let temp = [];
          for (let word of words) {
            const newFiltered = result.filter((post) =>
              post.node.frontmatter[filter]?.includes(word),
            );
            temp.push(...newFiltered);
          }
          result = temp;
        }
      }
      return result;
    };

    setFiltered(filtering());
  }, [filters, edges]);

  const handleChange = (event) => {
    setFilters({ ...filters, title: [event.target.value] });
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleToggle = (event) => {
    const { value, name } = event.target;

    const delIndex = filters[name].indexOf(value);
    const newFilter = [...filters[name]];

    if (delIndex === -1) {
      newFilter.push(value);
    } else {
      newFilter.splice(delIndex, 1);
    }

    setFilters({ ...filters, [name]: newFilter });
  };

  const filterCheckBox = filterArr.map((filterObj, i) => {
    const { name, group } = filterObj;

    const Check = (checked) => {
      return filters[name].includes(checked);
    };

    return (
      <FilterBox key={i}>
        <FilterTitle>{name.toUpperCase()}</FilterTitle>
        <Group
          group={group}
          button={`toggle`}
          handle={handleToggle}
          check={Check}
          name={name}
        />
      </FilterBox>
    );
  });

  const noteList = filtered.map((edge, i) => {
    const { frontmatter, fields } = edge.node;
    const { tags, type, from, title, level } = frontmatter;

    const tagList = tags.map((tag, i) => {
      return (
        <Li key={i}>
          <BorderLink text={tag} path={`tags`} />
        </Li>
      );
    });

    return (
      <NoteLi key={i}>
        <Container>
          <div>{type.toUpperCase()}</div>
          <div>{from}</div>
        </Container>
        <NoteLink to={`/note/${fields.slug}`}>
          <Title>{title}</Title>
        </NoteLink>
        <Tags>
          {level && (
            <Li>
              <ToggleButton
                name={`level`}
                value={level}
                handleToggle={handleToggle}
                isChecked={filters[`level`].includes(level)}
              />
            </Li>
          )}
          {tagList}
        </Tags>
      </NoteLi>
    );
  });

  return (
    <Layout>
      <Cover text={`NOTE`} />
      <Body>
        <NotesArea>
          <NoteOl>{noteList}</NoteOl>
        </NotesArea>
        <GridMenu title={`search`} data={`${filtered.length} / ${totalCount}`}>
          <Input
            type="text"
            placeholder="검색어를 입력하세요."
            onChange={handleChange}
          />
        </GridMenu>
        <GridMenu title={`filter`}>
          {filterCheckBox}
          <ResetButton onClick={handleReset}>RESET ⟳</ResetButton>
        </GridMenu>
        <GridMenu title={`tags`}>
          <Group group={tags} button={`link`} name={'tags'} />
        </GridMenu>
      </Body>
    </Layout>
  );
};

export const Head = (props) => {
  const seo = {
    description: description.note,
    path: `${props.location.pathname}`,
  };

  return <Seo pageTitle={`NOTE`} pageSEO={seo} />;
};

export const pageQuery = graphql`
  query {
    allNotes: allMdx(
      filter: { frontmatter: { nav: { eq: "note" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            type
            tags
            level
            nav
            from
            date(formatString: "MMM DD")
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
      levels: group(field: { frontmatter: { level: SELECT } }) {
        fieldValue
        totalCount
      }
      froms: group(field: { frontmatter: { from: SELECT } }) {
        fieldValue
        totalCount
      }
      types: group(field: { frontmatter: { type: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Note;
