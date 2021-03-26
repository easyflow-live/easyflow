import React, { useState } from 'react';
import {
  closestCorners,
  CollisionDetection,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  Modifiers,
  PointerSensor,
  UniqueIdentifier,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy,
} from '@dnd-kit/sortable';

import { restrictToColumnsEdge } from './restrict-to-columns-edge';
import DroppableColumn from './components/DroppableColumn';
import SortableItem from './components/SortableItem';
import { Box } from 'components/design';
import CardContainer from '../Board/CardContainer';

type Items = Record<string, string[]>;

interface Props {
  collisionDetection?: CollisionDetection;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  getContainerStyle?(args: { isOverContainer: boolean }): React.CSSProperties;
  items?: Items;
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  vertical?: boolean;
  confirmDrop?: (overId: string) => boolean;
}

export const VOID_ID = 'void';

export function MultipleContainers({
  collisionDetection = closestCorners,
  handle = false,
  items: initialItems,
  getItemStyles = () => ({}),
  modifiers = [restrictToColumnsEdge],
  strategy = verticalListSortingStrategy,
  vertical = false,
  confirmDrop,
}: Props) {
  const [items, setItems] = useState<Items>(() => initialItems);
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const findContainer = (id: string) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find(key => items[key].includes(id));
  };

  const getIndex = (id: string) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

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
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
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
      modifiers={modifiers}
    >
      <Box
        display='inline-grid'
        gridAutoFlow={vertical ? 'row' : 'column'}
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
              <DroppableColumn id={containerId}>
                {items[containerId].map((value, index) => (
                  <SortableItem
                    key={value}
                    id={value}
                    index={index}
                    handle={handle}
                    getStyle={getItemStyles}
                    containerId={containerId}
                    getItemIndex={getIndex}
                  />
                ))}
              </DroppableColumn>
            </SortableContext>
          ))}
      </Box>

      <DragOverlay>
        {activeId ? (
          <CardContainer
            id={activeId}
            index={getIndex(activeId)}
            containerId={findContainer(activeId) as string}
            isDragging={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
