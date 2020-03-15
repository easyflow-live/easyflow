import React, { ReactChild } from 'react';
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

interface DraggableElementProps {
  id: string;
  index: number;
  draggable?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  children:
    | (({ isDragging }: { isDragging: boolean }) => ReactChild)
    | ReactChild;
}

const DraggableElement = ({
  id,
  index,
  draggable = true,
  onKeyDown,
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
            onKeyDown={e => {
              // Avoid run drag handle with spacebar when editing
              // a input or textarea
              if (e.target === e.currentTarget) {
                provided.dragHandleProps.onKeyDown(e);
              }
              onKeyDown && onKeyDown(e);
            }}
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
