import { useLayoutEffect, CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
import { useTransition, animated, useSpring, config } from 'react-spring';

import { Avatar } from '../Avatar/Avatar';
import { useCardContext } from './CardProvider';
import './Assignee.css';

interface AssigneeProps {
  cardColor: string;
  style?: CSSProperties;
  className?: string;
}

const Assignee = ({ cardColor }: AssigneeProps) => {
  const { assignees } = useCardContext();

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

  useLayoutEffect(() => {
    setTimeout(() => {
      setSpring({ marginLeft: '-8px' }); //
    }, 1000);
  }, [assignees.length]);

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
                boxShadowColor={cardColor}
              />
            </animated.div>
          )
      )}
    </div>
  );
};

export default observer(Assignee);
