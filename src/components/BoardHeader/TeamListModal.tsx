import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { MdRemove, MdSupervisorAccount } from 'react-icons/md';

import { sortUsersAlpha } from '../../helpers/sortUsersAlpha';
import BoardDocument from '../../documents/board.doc';
import { useBoardTeam } from '../../hooks/use-board-team';
import { useKeySubmit } from '../../hooks/use-key-submit';
import { useSession } from '../../hooks/use-session';
import Dialog from '../Dialog/Dialog';
import { Avatar, Input } from '../shared';
import { List, ListItem } from '../shared/List';
import { sendInviteEmail } from 'src/libs/api';

interface UserNameProps {
  name: string;
  isOwner: boolean;
}

const UserName: React.FC<UserNameProps> = props => (
  <div className='flex items-center'>
    <span className='text-white font-semibold'>{props.name}</span>{' '}
    {props.isOwner && (
      <span className='text-pink-500 ml-4 font-bold'>Owner</span>
    )}
  </div>
);

interface UserEmailProps {
  email: string;
}

const UserEmail: React.FC<UserEmailProps> = props => (
  <span className='text-gray-500 font-light'>{props.email}</span>
);

interface TeamListModalProps {
  board?: BoardDocument;
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const TeamListModal: React.FC<TeamListModalProps> = props => {
  const { board, toggleIsOpen, isOpen } = props;

  const { owner } = useBoardTeam(board);
  let { assignees } = useBoardTeam(board);
  const { userDoc } = useSession();
  const [value, setValue] = useState('');

  const [submitting, setSubmit] = useState<boolean>(false);

  const getUser = async (email: string) =>
    firebase
      .firestore()
      .collection('users')
      .doc(email)
      .get();

  const save = async (newValue: string) => {
    if (!newValue) return;

    setSubmit(true);

    const user = await getUser(newValue);

    if (board.hasMember(user)) {
      toast(`The user ${value} is already a member.`);
      setSubmit(false);
      return;
    }

    const updateBoard = user.exists
      ? board.update({
          users: firebase.firestore.FieldValue.arrayUnion(user.ref),
        })
      : Promise.resolve();

    Promise.all([
      sendInviteEmail({
        to: user.id,
        userName: userDoc.data.username,
        userEmail: userDoc.id,
        ownerName: owner.username,
        boardName: board.data.title,
        boardUrl: `https://easyflow.live/b/${board.id}`,
      }),
      updateBoard,
    ]).then(() => {
      if (user.exists) {
        toast(`${value} was added to the team.`);
      } else {
        toast(`An invite was sent to ${value} imbox.`);
      }
      setSubmit(false);
      setValue('');
    });
  };

  const remove = async (index: number) => {
    const assignee = assignees[index];
    assignees = assignees.splice(index, 1);

    const user = await getUser(assignee.email);

    if (user.exists) {
      board
        .update({
          users: firebase.firestore.FieldValue.arrayRemove(user.ref),
        })
        .then(r => {
          toast(`User ${assignee.username} was removed from the board!`);
          return r;
        });
    }
  };

  const giveOwnership = async (index: number) => {
    const assignee = assignees[index];

    const user = await getUser(assignee.email);

    if (user.exists) {
      board
        .update({
          owner: user.ref,
        })
        .then(r => {
          toast(
            `User ${assignee.username} is the new owner of ${board.data.title}!`
          );
          return r;
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    save(value);
  };

  const handleKeyDown = useKeySubmit(handleSubmit, () => {
    setValue('');
    toggleIsOpen();
  });

  if (!userDoc) return null;

  const ownerEmail = owner ? owner.email : '';
  const AmITheBoardOwner = userDoc.data.email === ownerEmail;

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
          <Input
            loading={submitting}
            disabled={submitting}
            placeholder='member@email.com'
            className='mt-4'
            autoFocus
            type={'text'}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <List>
          {assignees.sort(sortUsersAlpha).map(
            (item, key) =>
              item && (
                <ListItem tabIndex={0} key={key}>
                  <div className='flex items-center'>
                    <div className='mr-4'>
                      <Avatar
                        size='big'
                        key={item.username}
                        src={item.photo}
                        username={item.username}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <UserName
                        name={item.username}
                        isOwner={ownerEmail === item.email}
                      />
                      <UserEmail email={item.email} />
                    </div>
                  </div>
                  {ownerEmail !== item.email && AmITheBoardOwner && (
                    <div>
                      <button
                        className='text-gray-500 hover:text-gray-900 h-4'
                        title={`Give ${item.username} the board ownership`}
                        onClick={() => giveOwnership(key)}
                      >
                        <MdSupervisorAccount size='24px' />
                      </button>
                      <button
                        className='text-red-500 hover:text-red-700  h-4 pl-4'
                        title={`Remove ${item.username} from the board`}
                        onClick={() => remove(key)}
                      >
                        <MdRemove size='24px' />
                      </button>
                    </div>
                  )}
                </ListItem>
              )
          )}
        </List>
      </>
    </Dialog>
  );
};

export default observer(TeamListModal);
