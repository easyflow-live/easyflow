import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Flex, FlexProps } from 'components/design';
import CardContainer from 'components/shared/Board/CardContainer';
import { useIsMounted } from 'hooks/use-is-mounted';
import { useGrabCursor } from 'hooks/use-grab-cursor';

interface SortableItemProps extends FlexProps {
  id: string;
  containerId: string;
  index: number;
  handle: boolean;
  ghost?: boolean;
  getStyle(args: any): CSSProperties;
  getItemIndex(id: string): number;
}

const SortableItem = ({
  id,
  containerId,
  index,
  handle = false,
  ghost = false,
  getStyle,
  getItemIndex,
  ...props
}: SortableItemProps) => {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transition,
    ...sortables
  } = useSortable({
    id,
  });

  let { transform } = sortables;

  if (!transform) {
    transform = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
  }

  useGrabCursor(isDragging);
  const mounted = useIsMounted();
  const fadeIn = isDragging && !mounted;

  const styles = {
    ...getStyle({
      index,
      value: id,
      isDragging,
      isSorting,
      overIndex: over ? getItemIndex(over.id) : overIndex,
      containerId,
    }),
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'manipulation',
  };

  return (
    <Flex
      as='li'
      ref={setNodeRef}
      boxSizing='border-box'
      rounded='md'
      transform={`translate3d(${transform.x || 0}, ${transform.y ||
        0}) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`}
      transformOrigin='0 0'
      animation={fadeIn ? 'fade 500ms ease' : ''}
      style={styles}
      {...props}
    >
      <CardContainer
        ghost={ghost}
        handle={handle}
        id={id}
        index={index}
        containerId={containerId}
        isDragging={isDragging}
        listeners={listeners}
      />
    </Flex>
  );
};

export default SortableItem;
