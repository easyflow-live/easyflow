import { Flex, FlexProps } from 'components/design';
import Card from 'modules/Card/components/Card';

interface CardContainerProps extends FlexProps {
  id: string;
  containerId: string;
  index: number;
  handle?: boolean;
  isDragging: boolean;
  listeners?: Record<string, Function> | never;
  ghost?: boolean;
}

const CardContainer = ({
  id,
  containerId,
  index,
  handle = false,
  isDragging,
  listeners,
  ghost = false,
  ...props
}: CardContainerProps) => {
  return (
    <Flex
      as='div'
      position='relative'
      userSelect={!handle ? 'none' : 'initial'}
      wordBreak='break-word'
      boxSizing='border-box'
      width='full'
      {...(!handle ? listeners : undefined)}
    >
      <Flex rounded='md' bg='white' minHeight='60px' width='full' {...props}>
        {ghost ? null : (
          <Card
            card={{
              text: `olar ${index} ${id}`,
              index,
              color: 'red',
            }}
            assignees={[]}
            onUpdate={null}
            onClick={null}
            onKeyDown={null}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default CardContainer;
