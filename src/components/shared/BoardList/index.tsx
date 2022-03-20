import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';
import cn from 'classnames';

import ListDocument, { List as ListModel } from 'documents/list.doc';
import CardAdder from 'components/shared/CardAdder';
import Cards from 'components/shared/Cards';
import DraggableElement from 'components/shared/DraggableElement';
import { useInterface } from 'components/providers/InterfaceProvider';
import { useAppToast } from 'hooks/use-app-toast';
import ListHeader from './ListHeader';

interface ListProps {
  index: number;
  list: ListDocument;
  previewMode?: boolean;
}

const List = ({ index, list, previewMode }: ListProps) => {
  const toast = useAppToast();
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

    toast({
      id: list.id,
      undo,
      title: `The list ${title} was removed.`,
      onCloseComplete: remove,
    });
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
            'bg-gray-750 rounded-lg p-1',
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

          <div className='flex justify-center mb-2'>
            {!previewMode && (
              <CardAdder
                limit={list.data.cardsLimit}
                cards={list.cards}
                list={list}
              />
            )}
          </div>
        </StyledList>
      )}
    </DraggableElement>
  );
};

export default observer(List);

const StyledList = styled.div<{ previewMode: boolean }>`
  flex: 0 0 27rem;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 11.8rem);
  border-radius: 0.3rem;
  margin-right: 1rem;

  &:last-of-type {
    margin-right: 0;
  }

  display: grid;
  grid-template-rows: auto minmax(auto, 1fr) auto;
 
  &:hover .add-card-button,
  &:focus .add-card-button,
  .add-card-button:focus {
    opacity: 1;
  } 
`;
