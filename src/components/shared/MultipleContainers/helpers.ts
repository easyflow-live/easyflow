export const getColor = (id: string) => {
  switch (id[0]) {
    case 'A':
      return '#7193f1';
    case 'B':
      return '#ffda6c';
    case 'C':
      return '#00bcd4';
    case 'D':
      return '#ef769f';
  }

  return undefined;
};

export const defaultContainerStyle = ({
  isOverContainer,
}: {
  isOverContainer: boolean;
}) => ({
  marginTop: 40,
  backgroundColor: isOverContainer
    ? 'rgb(235,235,235,1)'
    : 'rgba(246,246,246,1)',
});

const defaultInitializer = (index: number) => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

export interface AnnouncementHandlerProps {
  id: string;
  overId?: string;
  position?: number;
  overPosition?: number;
  totalItems?: number;
}

export const announcements = {
  onDragStart: ({ id, position, totalItems }: AnnouncementHandlerProps) =>
    `Picked up a card. Card ${id} is in position ${position} of ${totalItems}`,
  onDragOver: ({
    id,
    overId,
    overPosition,
    totalItems,
  }: AnnouncementHandlerProps) =>
    overId
      ? `Sortable item ${id} was moved into position ${overPosition} of ${totalItems}`
      : '',
  onDragEnd: ({
    id,
    overId,
    overPosition,
    totalItems,
  }: AnnouncementHandlerProps) =>
    overId
      ? `Sortable item ${id} was dropped at position ${overPosition} of ${totalItems}`
      : '',
  onDragCancel: ({ id }: AnnouncementHandlerProps) =>
    `Sorting was cancelled. Sortable item ${id} was dropped.`,
};
