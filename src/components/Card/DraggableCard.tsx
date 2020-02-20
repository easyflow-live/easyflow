import { ReactChild } from 'react';
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

interface DraggableCardProps {
  id: string;
  index: number;
  draggable: boolean;
  children: ReactChild;
}

const DraggableCard = ({
  id,
  index,
  draggable = true,
  children,
}: DraggableCardProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!draggable}>
      {(provided, { isDragging }: DraggableStateSnapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(isDragging && 'shadow-lg')}
          >
            {children}
          </div>
          {isDragging && provided.placeholder}
        </>
      )}
    </Draggable>
  );
};

export default observer(DraggableCard);
