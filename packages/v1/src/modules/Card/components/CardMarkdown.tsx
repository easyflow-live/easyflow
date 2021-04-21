import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import MarkdownText from 'components/shared/MarkdownText';
import { useMarkdownCheckbox } from 'hooks/use-markdown-checkbox';
import CardBasic, { CardBasicProps } from './CardBasic';

interface CardMarkdownProps extends CardBasicProps {
  text: string;
  onChangeCheckbox: (text: string) => void;
}

const isLink = (tagName: string) => tagName.toLowerCase() === 'a';
const isInput = (tagName: string) => tagName.toLowerCase() === 'input';

const CardMarkdown: FC<CardMarkdownProps> = ({
  text,
  onChangeCheckbox,
  ...props
}) => {
  const toggleCheckbox = useMarkdownCheckbox(text);

  const changeCheckbox = (checked: boolean, index: number) => {
    const newText = toggleCheckbox({
      checked,
      index,
    });

    onChangeCheckbox(newText);
  };

  const handleClick = e => {
    const { tagName, checked, id } = e.target;

    if (isInput(tagName)) {
      changeCheckbox(checked, parseInt(id));
    } else if (!isLink(tagName)) {
      props.onClick && props.onClick(e);
    }
  };

  return (
    <CardBasic {...props} onClick={handleClick}>
      <MarkdownText source={text} />
    </CardBasic>
  );
};

export default observer(CardMarkdown);
