import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import styled, { css } from 'styled-components';

import { Editable, Heading } from 'components/shared';

interface BoardTitleProps {
  boardTitle: string;
  boardId: string;
  editable?: boolean;
}

const BoardTitle = ({ boardId, boardTitle, editable }: BoardTitleProps) => {
  const submitTitle = (value: string) => {
    if (value === '') return;

    if (boardTitle !== value) {
      firebase
        .firestore()
        .collection('boards')
        .doc(boardId)
        .update({
          title: value,
        });
    }
  };

  return (
    <div>
      <Editable value={boardTitle} onSubmit={submitTitle} editable={editable}>
        {({ value, onClick }) => (
          <BoardTitleButton onClick={onClick} editable={editable}>
            <Heading text={value} />
          </BoardTitleButton>
        )}
      </Editable>
    </div>
  );
};

export default BoardTitle;

const BoardTitleButton = styled.button<{ editable: boolean }>`
  display: flex;
  min-width: 0;
  padding: 6px;
  border: 0;
  border-radius: 3px;
  background: transparent;
  transition: background 0.1s;
  cursor: default;

  ${props =>
    props.editable &&
    css`
      cursor: pointer;

      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.2);
      }
    `}
`;
