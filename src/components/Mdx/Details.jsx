import React from 'react';
import { MDXProvider } from '@mdx-js/react';

const Details = ({ children }) => {
  const summary = children[0].props.children;
  const body = children.slice(1);

  return (
    <details>
      <summary>{summary}</summary>
      <MDXProvider>{body}</MDXProvider>
    </details>
  );
};

export default Details;
