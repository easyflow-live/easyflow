import React from 'react';
import { observer } from 'mobx-react-lite';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { useTransition, useSpring, animated } from 'react-spring';

import { useCardAssignees } from '../../../src/hooks/use-card-assignees';
import { useSession } from '../../../src/hooks/use-session';
import { useAssign } from '../../../src/hooks/use-assign';
import CardDocument from '../../../src/documents/card.doc';
import { Avatar } from '../shared';

const Container = styled.div`
  & button {
    transition: transform 0.3s, opacity 0.3s;
    transform: translateX(-100%);
    opacity: 0;
  }

  &:hover button {
    transform: translateX(0);
    opacity: 1;
  }
`;

interface AssigneesProps {
  card: CardDocument;
  listId: string;
}

export const Assignees: React.FC<AssigneesProps> = observer(props => {
  const { card, listId } = props;
  const { assignees } = useCardAssignees(card);
  const { userDoc } = useSession();
  const toogleAssigment = useAssign(card, listId);

  const assigneesId = assignees.map(a => a.id);
  const hasMySelfAsAssignee = assigneesId.includes(userDoc.id);

  const transitions = useTransition(assignees, item => item.username, {
    initial: { transform: 'translate3d(0px, 0, 0)', opacity: 0 },
    from: { transform: 'translate3d(40px, 0, 0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0px, 0)', opacity: 1 },
    leave: { transform: 'translate3d(40px, 0, 0)', opacity: 0 },
  });

  const animate = useSpring({
    delay: 600,
    opacity: !hasMySelfAsAssignee ? 1 : 0,
  });

  return (
    <div>
      {!hasMySelfAsAssignee && (
        <animated.div style={animate}>
          <div className='-ml-2 inline-flex hover:bg-gray-800 rounded transition duration-300'>
            <button
              className='flex items-center text-white text-sm hover:bg-gray-800 p-2 rounded'
              onClick={toogleAssigment}
            >
              Assign me
            </button>
          </div>
        </animated.div>
      )}

      {transitions.map(({ item: assignee, key, props }) => (
        <animated.div key={key} style={props}>
          <Container
            className='flex items-center text-white mb-2'
            key={assignee.username}
          >
            <Avatar
              src={assignee.photo}
              username={assignee.username}
              className='border mr-2'
              size='small'
            />
            <span>{assignee.username}</span>

            {userDoc.id === assignee.email && (
              <button
                title='Remove assignment'
                className='ml-2 hover:text-red-500'
                onClick={toogleAssigment}
              >
                <MdClose />
              </button>
            )}
          </Container>
        </animated.div>
      ))}
    </div>
  );
});
