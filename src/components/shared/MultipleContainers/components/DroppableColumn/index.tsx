import { useDroppable } from '@dnd-kit/core';

import Column from 'components/shared/Board/Column';

interface DroppableColumnProps {
  children: React.ReactNode;
  id: string;
}

const DroppableColumn = ({ children, id }: DroppableColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return <Column ref={setNodeRef}>{children}</Column>;
};
export default DroppableColumn;
