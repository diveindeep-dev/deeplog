import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = () => {
  const { site, blogCount, noteCount, categoryCount, tagsCount } =
    useStaticQuery(graphql`
      query SiteData {
        site {
          siteMetadata {
            siteTitle
            siteDescription
            author
            nav {
              name
              link
            }
            sitemap {
              title
              links {
                link
                name
              }
            }
            mail
            github
            siteUrl
            siteLogo
            siteOg
          }
        }
        blogCount: allMdx(filter: { frontmatter: { nav: { eq: "blog" } } }) {
          totalCount
        }
        noteCount: allMdx(filter: { frontmatter: { nav: { eq: "note" } } }) {
          totalCount
        }
        categoryCount: allMdx {
          distinct(field: { frontmatter: { category: SELECT } })
        }
        tagsCount: allMdx {
          distinct(field: { frontmatter: { tags: SELECT } })
        }
      }
    `);

  const count = {
    blog: blogCount.totalCount,
    note: noteCount.totalCount,
    categories: categoryCount.distinct.length,
    tags: tagsCount.distinct.length,
  };

  return { siteMetadata: site.siteMetadata, count };
};

export default useSiteMetadata;
