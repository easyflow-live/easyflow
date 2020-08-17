import React, { FC } from 'react';

import MarkdownText from 'components/shared/MarkdownText';
import CardBasic, { CardBasicProps } from './CardBasic';
import { observer } from 'mobx-react-lite';

interface CardMarkdownProps extends CardBasicProps {
  text: string;
}

const CardMarkdown: FC<CardMarkdownProps> = props => (
  <CardBasic {...props}>
    <MarkdownText source={props.text} />
  </CardBasic>
);

export default observer(CardMarkdown);
