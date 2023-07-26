import React, { useState } from 'react';
import useCopyClipboard from '../../hooks/useCopyClipboard';
import styled from 'styled-components';
import { font, color } from '../../styles/Variables';

const Button = styled.button`
  display: flex;
  align-items: center;
  font-family: ${font.upper};
  font-size: 1rem;

  &:hover {
    color: ${color.main};
  }

  &:hover::after {
    content: '→ ${(props) => props.message}';
    font-size: 0.8rem;
    color: ${color.dark};
  }
`;

const CopyButton = (props) => {
  const { type, text, children } = props;
  const [copyMessage, setCopyMessage] = useState('Click to Copy');
  const { isCopy, doCopy } = useCopyClipboard();

  const handleCopyText = (text) => {
    doCopy(text);
    isCopy ? setCopyMessage('Copied') : setCopyMessage('Retry');
  };

  const handleMouseLeave = () => {
    setCopyMessage('Click to Copy');
  };

  return (
    <Button
      onClick={() => handleCopyText(text)}
      onMouseLeave={handleMouseLeave}
      message={copyMessage}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CopyButton;
