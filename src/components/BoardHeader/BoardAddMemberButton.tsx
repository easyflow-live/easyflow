import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as firebase from 'firebase/app';

import InputModal from './InputModal';
import BoardButton from './BoardButton';

const BoardAddMemberButton = ({ boardId }) => {
  const handleSubmit = async value => {
    if (!value) return;

    const userRef = await firebase
      .firestore()
      .collection('users')
      .doc(value);

    const user = await userRef.get();

    if (user.exists) {
      return firebase
        .firestore()
        .collection('boards')
        .doc(boardId)
        .update({
          users: firebase.firestore.FieldValue.arrayUnion(userRef),
        })
        .then(r => {
          toast(`User ${value} was added as a board member!`);
          return r;
        });
    }

    toast(`User ${value} does not exists!`);
    return Promise.resolve();
  };
  return (
    <BoardButton
      icon={<FaUsers />}
      text='Add member'
      renderModal={props => (
        <InputModal {...props} inputType='email' onSubmit={handleSubmit} />
      )}
    />
  );
};

export default BoardAddMemberButton;
