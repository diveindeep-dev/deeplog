import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import styled from 'styled-components';
import { color } from '../../styles/Variables';

const FileName = styled.div`
  text-align: center;
  width: 100%;
  color: ${color.light};
  font-size: 0.7rem;
`;

const Circle = styled.div`
  position: absolute;
  left: ${({order}) => order * 15}px;
  width: 10px;
  height: 10px;
  margin: 4px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const Tag = styled.div`
  position: relative;
`;

const Div = styled.div`
  background-color: #002342;
  padding: 10px;
  margin: 16px 8px;
  border-radius: 0.3rem;
`;

const CodeBlock = ({ fileName, children }) => {
  return (
    <Div>
      <Tag>
        <Circle color={`#ff4f4d`} order={0} />
        <Circle color={`#ffba00`} order={1} />
        <Circle color={`#02cd15`} order={2} />
        <FileName>{fileName}</FileName>
      </Tag>
      <MDXProvider>{children}</MDXProvider>
    </Div>
  );
};

export default CodeBlock;
