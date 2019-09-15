import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { FaUserMinus } from 'react-icons/fa';

import BoardDocument from '../../documents/board.doc';
import { useBoardTeam } from '../../hooks/use-board-team';
import { useKeySubmit } from '../../hooks/use-key-submit';
import { emitter } from '../../libs/emitter';
import Dialog from '../Dialog/Dialog';
import { Avatar } from '../Avatar/Avatar';

interface TeamListModalProps {
  board?: BoardDocument;
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const UserName = ({ name, isOwner }) => (
  <div className='flex items-center'>
    <span className='text-white font-semibold'>{name}</span>{' '}
    {isOwner && <span className='text-pink-500 ml-4 font-bold'>Owner</span>}
  </div>
);
const UserEmail = ({ email }) => (
  <span className='text-gray-500 font-light'>{email}</span>
);

const TeamListModal = ({ board, toggleIsOpen, isOpen }: TeamListModalProps) => {
  let { assignees, owner } = useBoardTeam(board);
  const [value, setValue] = useState('');

  const save = async (newValue: string) => {
    if (!newValue) return;

    const userRef = await firebase
      .firestore()
      .collection('users')
      .doc(newValue);

    const user = await userRef.get();

    if (user.exists) {
      return firebase
        .firestore()
        .collection('boards')
        .doc(board.id)
        .update({
          users: firebase.firestore.FieldValue.arrayUnion(userRef),
        })
        .then(r => {
          emitter.emit('TEAM_MEMBER_UPDATED', {});
          return r;
        });
    }
    toast(`${value} is not a registered user!`);
    return Promise.resolve();
  };

  const remove = async index => {
    const assignee = assignees[index];
    assignees = assignees.splice(index, 1);

    const userRef = await firebase
      .firestore()
      .collection('users')
      .doc(assignee.email);

    const user = await userRef.get();

    if (user.exists) {
      firebase
        .firestore()
        .collection('boards')
        .doc(board.id)
        .update({
          users: firebase.firestore.FieldValue.arrayRemove(userRef),
        })
        .then(r => {
          toast(`User ${assignee.username} was removed from the board!`);
          return r;
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    await save(value);
    setValue('');
  };

  const handleKeyDown = useKeySubmit(handleSubmit, () => {
    setValue('');
    toggleIsOpen();
  });

  const sortAlpha = (a, b) => {
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  };

  return (
    <Dialog
      title='My Board Team'
      isOpen={isOpen}
      onClose={toggleIsOpen}
      width={600}
      top={assignees.length > 5 ? 5 : undefined}
    >
      <>
        <div className='m-4 mt-0 sm:mt-0 sm:m-8'>
          <label className='text-white'>Add a new member</label>
          <input
            placeholder='member@email.com'
            autoFocus
            type={'text'}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='bg-gray-700 shadow appearance-none rounded w-full py-2 px-3 mt-5 text-white leading-tight'
          />
        </div>
        <ul>
          {assignees.sort(sortAlpha).map(
            (item, key) =>
              item && (
                <li
                  tabIndex={0}
                  key={key}
                  className='flex justify-between items-center py-2 px-4 sm:px-8 mb-5 hover:bg-gray-700'
                >
                  <div className='flex items-center'>
                    <div className='mr-4'>
                      <Avatar
                        className='h-10'
                        key={item.username}
                        imgUrl={item.photo}
                        username={item.username}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <UserName
                        name={item.username}
                        isOwner={owner.email === item.email}
                      />
                      <UserEmail email={item.email} />
                    </div>
                  </div>
                  {owner.email !== item.email && (
                    <button
                      className='text-red-500 h-4'
                      title={`Remove ${item.username}`}
                      onClick={() => remove(key)}
                    >
                      <FaUserMinus size='24px' />
                    </button>
                  )}
                </li>
              )
          )}
        </ul>
      </>
    </Dialog>
  );
};

export default observer(TeamListModal);
