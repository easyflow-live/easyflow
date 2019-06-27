import React from 'react';
import { FaHashtag } from 'react-icons/fa';
import AddTagsModal from './AddTagsModal';
import BoardButton from './BoardButton';

const BoardAddTagsButton = ({ boardId }) => {
  return (
    <BoardButton
      icon={<FaHashtag />}
      text='Tags'
      renderModal={props => <AddTagsModal {...props} boardId={boardId} />}
    />
  );
};

export default BoardAddTagsButton;
