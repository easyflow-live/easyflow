import styled from 'styled-components';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import { listItem as defaultListItem } from 'react-markdown/lib/renderers';

import Checkbox from '../shared/Checkbox';

const renderListItem = props => {
  if (props.checked !== null && props.checked !== undefined) {
    return (
      <li>
        <Checkbox defaultChecked={props.checked} id={props.index} />
        <label htmlFor={props.index}>{props.children}</label>
      </li>
    );
  }
  return defaultListItem(props);
};

const MarkdownText = ({ renderers, ...props }: ReactMarkdownProps) => {
  return (
    <StyledCardHtml>
      <ReactMarkdown
        renderers={{ ...renderers, listItem: renderListItem }}
        {...props}
      />
    </StyledCardHtml>
  );
};

export default MarkdownText;

const StyledCardHtml = styled.div`
  h1 {
    font-size: 1.3rem !important;
  }

  h2 {
    font-size: 1.2rem !important;
  }

  h3 {
    font-size: 1.1rem !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 8px;
    font-weight: bold !important;
  }

  img {
    max-width: 100%;
  }

  p {
    margin: 4px 0;
  }

  code,
  pre {
    white-space: pre-wrap;
  }
  pre {
    margin: 4px 0;
    padding: 4px 2px;
    background: rgba(100, 100, 100, 0.08);
  }

  ul {
    list-style: disc;

    p {
      display: inline;
    }
  }

  & > ul {
    margin-left: 1rem;
  }

  & li > input {
    margin-right: 0.3rem;
  }

  a {
    text-decoration: underline;
  }

  table {
    width: 100%;
  }

  thead {
    border-bottom: 1px solid #939393;
  }

  tbody > tr > td:first-child {
    border-left: 1px solid #939393;
  }

  tbody > tr:last-child {
    border-bottom: 1px solid #939393;
  }

  tbody > tr > td {
    border-right: 1px solid #939393;
  }

  tbody > tr:hover {
    background-color: #dedede;
  }
`;
