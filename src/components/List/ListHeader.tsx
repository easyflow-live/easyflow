import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import ListDocument from '../../documents/list.doc';
import { useInterface } from '../providers/InterfaceProvider';
import CardCounter from './CardCounter';
import ListMenu from './ListMenu';
import Editable from '../shared/Editable';

interface ListHeaderProps {
  listTitle: string;
  dragHandleProps: any;
  list: ListDocument;
  isDragging: boolean;
}

const ListHeader = ({
  listTitle,
  dragHandleProps,
  list,
  isDragging,
}: ListHeaderProps) => {
  const { isEditable } = useInterface();

  const handleSubmit = (value: string) => {
    if (value === '') return;

    if (value !== listTitle) {
      list.ref.update({ title: value });
    }
  };

  const handleCounterSubmit = (value: number) => {
    list.ref.update({ cardsLimit: value });
  };

  return (
    <div
      className={cn(
        'flex inline-flex items-center flex-shrink-0 p-3 rounded-lg',
        isDragging && 'bg-gray-600'
      )}
      {...(isEditable && dragHandleProps)}
    >
      <Editable
        value={listTitle}
        onSubmit={handleSubmit}
        editable={isEditable}
        inputProps={{ full: false, style: { maxWidth: '179px' } }}
      >
        {({ value, onClick }) => (
          <div className='flex-grow' {...dragHandleProps}>
            <div
              role='button'
              tabIndex={0}
              onClick={onClick}
              className='text-white text-left font-semibold w-full cursor-text break-words'
            >
              <span
                title='Click to change the list title'
                className={cn(isEditable && 'cursor-text')}
              >
                {value}
              </span>
            </div>
          </div>
        )}
      </Editable>

      <CardCounter
        counter={list.cards.docs.length}
        max={list.data.cardsLimit}
        onChange={handleCounterSubmit}
        editable={isEditable}
      />

      {isEditable && <ListMenu list={list} />}
    </div>
  );
};

export default observer(ListHeader);
