import { useLayoutEffect, CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
import { useTransition, animated } from 'react-spring';

import { Avatar } from '../Avatar/Avatar';

import './Assignee.css';
import { useCardContext } from './CardProvider';

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

  useLayoutEffect(() => {
    // We should change this to react-spring
    setTimeout(() => {
      document
        .querySelectorAll('.assignee')
        .forEach(e => e.classList.add('assignee--effect'));
    }, 1000);
  }, [assignees]);

  return (
    <div className='assignees'>
      {transitions.map(
        ({ item, key, props: tprops }) =>
          item && (
            <animated.div key={key} style={tprops} className='assignee mr-1'>
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
