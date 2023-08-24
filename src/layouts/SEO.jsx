import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';
import urlJoin from 'url-join';

const Seo = (props) => {
  const { pageTitle, pageSEO } = props;
  const { siteMetadata } = useSiteMetadata();
  const { siteTitle, siteUrl, siteDescription, siteLogo } = siteMetadata;

  let title = pageTitle ? `${pageTitle} | ${siteTitle}` : `${siteTitle}`;
  let description = siteDescription;
  let url = siteUrl;
  let image = urlJoin(siteUrl, siteLogo);

  const jasonLd = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: title,
      alternateName: siteTitle,
      logo: siteLogo,
    },
  ];

  if (pageSEO) {
    description = pageSEO.description;
    url = urlJoin(siteUrl, pageSEO.path);
    image = pageSEO.image ? urlJoin(siteUrl, pageSEO.image) : image;

    if (pageSEO.isStructuredData === 'blog') {
      jasonLd.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': urlJoin(siteUrl, pageSEO.isStructuredData),
                name: pageSEO.isStructuredData,
                image: siteLogo,
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: siteTitle,
          description,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
        },
      );
    }
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="url" content={url} />
      <meta name="image" content={image} />
      <script type="application/ld+json">{JSON.stringify(jasonLd)}</script>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#ffffff" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
    </>
  );
};

export default Seo;
