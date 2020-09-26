import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { MdRemove, MdSupervisorAccount } from 'react-icons/md';
import Router from 'next/router';

import firebase from 'services/firebase.service';
import { sendInviteEmail } from 'libs/api';
import { sortUsersAlpha } from 'helpers/sortUsersAlpha';
import BoardDocument from 'modules/Board/data/board.doc';
import { useBoardTeam } from 'modules/Board/hooks/use-board-team';
import { useKeySubmit } from 'hooks/use-key-submit';
import { useSession } from 'hooks/use-session';
import Dialog from 'components/shared/Dialog';
import { Avatar, Input } from 'components/shared';
import { List, ListItem } from 'components/shared/List';

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

  const getUser = async (email: string) => firebase.getUser(email).get();

  const save = async (newValue: string) => {
    if (!newValue) return;

    setSubmit(true);

    const user = await getUser(newValue);

    if (board.hasMember(user.id)) {
      toast(`The user ${value} is already a member.`);
      setSubmit(false);
      return;
    }

    if (user.exists) {
      board.addMember(user).catch(() => {
        toast(
          "Sorry, something went wrong and we could't add the new member to the board, please, try again later."
        );
      });
      toast(`${value} was added to the board.`);
      setSubmit(false);
      setValue('');
      return;
    }

    const invite = await board.createInvite(user, userDoc);

    sendInviteEmail({
      to: user.id,
      userName: userDoc.data.username,
      userEmail: userDoc.id,
      ownerName: owner.username,
      boardName: board.data.title,
      boardUrl: `https://easyflow.live/b/${board.id}`,
      inviteId: invite.id,
    }).catch(() => {
      toast(
        "Sorry, something went wrong and we could't sent the invite, please, try again later."
      );
    });

    toast(`An invite was sent to ${value} inbox.`);
    setSubmit(false);
    setValue('');
  };

  const remove = async (index: number) => {
    const assignee = assignees[index];
    assignees = assignees.splice(index, 1);

    const user = await getUser(assignee.email);

    if (user.exists) {
      board.removeMember(user).then(r => {
        const myself = user.id === userDoc.id;

        const subject = myself
          ? 'You left'
          : `User ${assignee.username} was remved from`;

        toast(`${subject} the board!`);

        if (myself) Router.replace('/');
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
  const amITheBoardOwner = userDoc.data.email === ownerEmail;

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
            isLoading={submitting}
            isDisabled={submitting}
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
                  {ownerEmail !== item.email && amITheBoardOwner && (
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

                  {item.email === userDoc.id && !amITheBoardOwner && (
                    <button
                      className='text-red-500 hover:text-red-700  h-4 pl-4'
                      title={`Leave the board`}
                      onClick={() => remove(key)}
                    >
                      <MdRemove size='24px' />
                    </button>
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
