import React, { useEffect, useState } from 'react';
import {
  closestCorners,
  CollisionDetection,
  DndContext,
  KeyboardSensor,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  ScreenReaderInstructions,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Item } from './components/Item';
import { List } from './components/List';
import {
  getColor,
  defaultContainerStyle,
  createRange,
  announcements,
} from './helpers';
import { restrictToColumnsEdge } from './restrict-to-columns-edge';

export default {
  title: 'Presets/Sortable/Multiple Containers',
};

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}

function DroppableContainer({
  children,
  columns = 1,
  id,
  items,
  getStyle = () => ({}),
}: {
  children: React.ReactNode;
  columns?: number;
  id: string;
  items: string[];
  getStyle: ({
    isOverContainer,
  }: {
    isOverContainer: boolean;
  }) => React.CSSProperties;
}) {
  const { over, isOver, setNodeRef } = useDroppable({
    id,
  });
  const isOverContainer = isOver || (over ? items.includes(over.id) : false);

  return (
    <List
      ref={setNodeRef}
      style={getStyle({ isOverContainer })}
      columns={columns}
    >
      {children}
    </List>
  );
}

type Items = Record<string, string[]>;

interface Props {
  collisionDetection?: CollisionDetection;
  columns?: number;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {
    index: number;
    isDragging: boolean;
    id: string;
  }): React.CSSProperties;
  getContainerStyle?(args: { isOverContainer: boolean }): React.CSSProperties;
  items?: Items;
  handle?: boolean;
  strategy?: SortingStrategy;
  vertical?: boolean;
  confirmDrop?: (overId: string) => boolean;
}

export const VOID_ID = 'void';

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a card, press the space bar.
    While sorting, use the arrow keys to move the card.
    Press space again to drop the card in its new position, or press escape to cancel.
  `,
};

export function MultipleContainers({
  collisionDetection = closestCorners,
  columns,
  handle = false,
  items: initialItems,
  getItemStyles = () => ({}),
  getContainerStyle = defaultContainerStyle,
  wrapperStyle = () => ({}),
  strategy = verticalListSortingStrategy,
  vertical = false,
  confirmDrop,
}: Props) {
  const [items, setItems] = useState<Items>(
    () =>
      initialItems ?? {
        A: createRange(3, index => `A${index + 1}`),
        B: createRange(3, index => `B${index + 1}`),
        // C: createRange(3, index => `C${index + 1}`),
        // D: createRange(3, index => `D${index + 1}`),
        [VOID_ID]: [],
      }
  );
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const findContainer = (itemId: string) => {
    if (itemId in items) {
      return itemId;
    }

    return Object.keys(items).find(key => items[key].includes(itemId));
  };

  const getItemIndex = (itemId: string) => {
    const container = findContainer(itemId);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(itemId);

    return index;
  };

  const getItemPosition = (itemId: string) => getItemIndex(itemId) + 1;

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containrs
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  return (
    <DndContext
      modifiers={[restrictToColumnsEdge]}
      screenReaderInstructions={screenReaderInstructions}
      announcements={{
        onDragStart(id) {
          const container = findContainer(id);
          return announcements['onDragStart']({
            id,
            totalItems: container.length,
          });
        },
        onDragOver(id, overId) {
          if (overId) {
            const container = findContainer(overId);
            return announcements['onDragOver']({
              id,
              overPosition: getItemPosition(overId),
              totalItems: container.length,
            });
          }

          return;
        },
        onDragEnd(id, overId) {
          if (overId) {
            const container = findContainer(overId);
            return announcements['onDragEnd']({
              id,
              overPosition: getItemPosition(overId),
              totalItems: container.length,
            });
          }

          return;
        },
        onDragCancel(id) {
          return announcements['onDragCancel']({
            id,
          });
        },
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({ active, over, draggingRect }) => {
        const overId = over?.id;

        if (!overId) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems(items => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowLastItem =
                over &&
                overIndex === overItems.length - 1 &&
                draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

              const modifier = isBelowLastItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
              ...items,
              [activeContainer]: [
                ...items[activeContainer].filter(item => item !== active.id),
              ],
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                ),
              ],
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id || VOID_ID;

        if (confirmDrop) {
          const confirmed = confirmDrop(overId);
          if (!confirmed) {
            onDragCancel();
            return;
          }
        }

        if (overId === VOID_ID) {
          setItems(items => ({
            ...(over?.id === VOID_ID ? items : clonedItems),
            [VOID_ID]: [],
          }));
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (activeContainer && overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems(items => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }
        }

        setActiveId(null);
      }}
      onDragCancel={onDragCancel}
    >
      <div
        style={{
          display: 'inline-grid',
          boxSizing: 'border-box',
          padding: '0px 20px',
          gridAutoFlow: vertical ? 'row' : 'column',
        }}
        id='js-columns'
      >
        {Object.keys(items)
          .filter(key => key !== VOID_ID)
          .map(containerId => (
            <SortableContext
              key={containerId}
              items={items[containerId]}
              strategy={strategy}
            >
              <DroppableContainer
                key={containerId}
                id={containerId}
                columns={columns}
                items={items[containerId]}
                getStyle={getContainerStyle}
              >
                {items[containerId].map((value, index) => (
                  <SortableItem
                    key={value}
                    id={value}
                    index={index}
                    handle={handle}
                    style={getItemStyles}
                    wrapperStyle={wrapperStyle}
                    containerId={containerId}
                    getIndex={getItemIndex}
                  />
                ))}
              </DroppableContainer>
            </SortableContext>
          ))}
      </div>
    </DndContext>
  );
}

interface SortableItemProps {
  containerId: string;
  id: string;
  index: number;
  handle: boolean;
  style(args: any): React.CSSProperties;
  getIndex(id: string): number;
  wrapperStyle({ index }: { index: number }): React.CSSProperties;
}

function SortableItem({
  id,
  index,
  handle,
  style,
  containerId,
  getIndex,
  wrapperStyle,
}: SortableItemProps) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  const styles = {
    ...style({
      index,
      value: id,
      isDragging,
      isSorting,
      overIndex: over ? getIndex(over.id) : overIndex,
      containerId,
    }),
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={styles}
      color={getColor(id)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
    />
  );
}
