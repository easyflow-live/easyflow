import { CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
import { useTransition, animated, useSpring, config } from 'react-spring';

import CardDocument from '../../../src/documents/card.doc';
import { useCardAssignees } from '../../../src/hooks/use-card-assignees';
import { useFirstRender } from '../../../src/hooks/use-first-render';

import { Avatar } from '../Avatar/Avatar';
import './Assignee.css';

interface AssigneeProps {
  card: CardDocument;
  style?: CSSProperties;
  className?: string;
}

const Assignee = ({ card }: AssigneeProps) => {
  const { assignees } = useCardAssignees(card);

  const initAnimation = () =>
    setTimeout(() => {
      setSpring({ marginLeft: '-8px' });
    }, 1000);

  useFirstRender(initAnimation);

  const transitions = useTransition(assignees, item => item.username, {
    from: { transform: 'translate3d(40px, 0, 0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0px, 0)', opacity: 1 },
    leave: { transform: 'translate3d(40px, 0, 0)', opacity: 0 },
  });

  const [spring, setSpring] = useSpring(() => ({
    marginLeft: '0px',
    immediate: true,
    config: config.stiff,
  }));

  return (
    <div className='assignees'>
      {transitions.map(
        ({ item, key, props: tprops }, index) =>
          item && (
            <animated.div
              key={key}
              style={{
                ...tprops,
                ...(index !== 0 && { marginLeft: spring.marginLeft }),
              }}
              className='assignee mr-1'
            >
              <Avatar
                key={item.username}
                imgUrl={item.photo}
                username={item.username}
                boxShadowColor={card.data.color}
              />
            </animated.div>
          )
      )}
    </div>
  );
};

export default observer(Assignee);
