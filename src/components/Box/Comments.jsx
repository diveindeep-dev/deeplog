import React, { createRef, useContext, useEffect } from 'react';
import config from '../../../contents/config';
import ThemeContext from '../../context/ThemeContext';

const Comments = () => {
  const { state } = useContext(ThemeContext);
  const commentRef = createRef();
  const currentTheme = state.theme === 'light' ? 'github-light' : 'photon-dark';

  useEffect(() => {
    const isComment = commentRef.current.firstChild;
    if (isComment) {
      commentRef.current.removeChild(isComment);
    }

    const utterances = document.createElement('script');

    const utterancesConfig = {
      src: 'https://utteranc.es/client.js',
      repo: config.commentsRepo,
      'issue-term': 'pathname',
      theme: currentTheme,
      crossorigin: 'anonymous',
      async: true,
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    commentRef.current.appendChild(utterances);
  }, [commentRef, currentTheme]);

  return <div ref={commentRef}></div>;
};

export default Comments;
