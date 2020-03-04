import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import cn from 'classnames';

import ListDocument, { List as ListModel } from '../../documents/list.doc';
import CardAdder from '../CardAdder/CardAdder';
import ListHeader from './ListHeader';
import Cards from '../Card/Cards';
import { useInterface } from '../providers/InterfaceProvider';
import DraggableElement from '../shared/DraggableElement';
import ToastUndo from '../shared/ToastUndo';

interface ListProps {
  index: number;
  list: ListDocument;
}

const List = ({ index, list }: ListProps) => {
  const { isEditable } = useInterface();
  const { isLoading } = list;

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
    <DraggableElement id={list.id} index={index}>
      {({ isDragging }) => (
        <StyledList
          tabIndex={0}
          className={cn(
            'flex flex-col relative max-h-full min-h-0 bg-gray-750 rounded-lg p-1 mx-2 mt-px',
            isHiddenRef.current && 'hidden'
          )}
        >
          <ListHeader
            dragHandleProps={null}
            listTitle={list.data.title}
            list={list}
            isDragging={isDragging}
            onRemove={deleteList}
            onUpdate={updateList}
          />
          <div className='mt-3 overflow-y-auto overflow-x-hidden'>
            <Cards cards={list.cards} listId={list.id} />
          </div>

          {isEditable && (
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

const StyledList = styled.div`
  width: 300px;
  height: calc(100vh - 187px);

  &:first-child {
    margin-left: 0.2rem;
  }

  &:hover .add-card-button,
  &:focus .add-card-button,
  .add-card-button:focus {
    opacity: 1;
  }
`;
