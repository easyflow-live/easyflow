import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';
import { toast } from 'react-toastify';
import cn from 'classnames';

import ListDocument, { List as ListModel } from '../../documents/list.doc';
import CardAdder from '../CardAdder/CardAdder';
import ListHeader from './ListHeader';
import Cards from '../Card/Cards';
import DraggableElement from '../shared/DraggableElement';
import ToastUndo from '../shared/ToastUndo';
import { useInterface } from '../providers/InterfaceProvider';

interface ListProps {
  index: number;
  list: ListDocument;
  previewMode?: boolean;
}

const List = ({ index, list, previewMode }: ListProps) => {
  const { isLoading } = list;

  const { hasOpenedModal } = useInterface();

  const isHiddenRef = useRef(false);
  const [, forceRenderer] = useState(false);

  const updateList = (data: Partial<ListModel>) => list.ref.update(data);

  const remove = async () => {
    if (!isHiddenRef.current) return;

    await list.delete();
  };

  const undo = () => {
    isHiddenRef.current = false;
    forceRenderer(s => !s);
  };

  const deleteList = async (title: string) => {
    isHiddenRef.current = true;
    forceRenderer(s => !s);
    toast(
      <ToastUndo
        title={`The list ${title} was removed!`}
        id={list.id}
        undo={undo}
      />,
      {
        onClose: remove,
      }
    );
  };

  if (isLoading) return null;

  return (
    <DraggableElement
      id={list.id}
      index={index}
      draggable={!previewMode && !hasOpenedModal}
    >
      {({ isDragging }) => (
        <StyledList
          tabIndex={0}
          className={cn(
            'flex flex-col relative max-h-full min-h-0 bg-gray-750 rounded-lg p-1 mx-2 mt-px',
            isHiddenRef.current && 'hidden'
          )}
          previewMode={previewMode}
        >
          <ListHeader
            listTitle={list.data.title}
            list={list}
            isDragging={isDragging}
            previewMode={previewMode}
            onRemove={deleteList}
            onUpdate={updateList}
          />

          <div className='mt-3 overflow-y-auto overflow-x-hidden'>
            <Cards
              cards={list.cards}
              listId={list.id}
              previewMode={previewMode}
            />
          </div>

          {!previewMode && (
            <CardAdder
              limit={list.data.cardsLimit}
              cards={list.cards}
              list={list}
            />
          )}
        </StyledList>
      )}
    </DraggableElement>
  );
};

export default observer(List);

const StyledList = styled.div<{ previewMode: boolean }>`
  width: 300px;

  ${({ previewMode }) =>
    previewMode
      ? css`
          height: calc(100vh - 115px);
        `
      : css`
          height: calc(100vh - 187px);
        `};

  &:first-child {
    margin-left: 0.2rem;
  }

  &:hover .add-card-button,
  &:focus .add-card-button,
  .add-card-button:focus {
    opacity: 1;
  }
`;
