import React, { ReactChild } from 'react';
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

interface DraggableElementProps {
  id: string;
  index: number;
  draggable?: boolean;
  children:
    | (({ isDragging }: { isDragging: boolean }) => ReactChild)
    | ReactChild;
}

const DraggableElement = ({
  id,
  index,
  draggable = true,
  children,
}: DraggableElementProps) => {
  return (
    <Draggable
      draggableId={id}
      index={index}
      disableInteractiveElementBlocking
      isDragDisabled={!draggable}
    >
      {(provided, { isDragging }: DraggableStateSnapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(isDragging && 'shadow-lg')}
          >
            {typeof children === 'function'
              ? children({ isDragging: isDragging })
              : children}
          </div>
          {isDragging && provided.placeholder}
        </>
      )}
    </Draggable>
  );
};

export default observer(DraggableElement);
