import React from 'react';
import { observer } from 'mobx-react-lite';

import BoardDocument from 'modules/Board/data/board.doc';
import TagList from 'components/shared/TagList';
import AddTags from 'components/shared/AddTags/AddTags';
import Dialog from 'components/shared/Dialog';

interface AddTagsModalProps {
  board: BoardDocument;
  isOpen?: boolean;
  toggleIsOpen: () => void;
}

const AddTagsModal = ({ board, toggleIsOpen, isOpen }: AddTagsModalProps) => {
  const handleRemoveClick = (tag: string) => {
    board.removeTag(tag);
  };

  return (
    <Dialog title='Tags' isOpen={isOpen} onClose={toggleIsOpen}>
      <div className='m-8 mt-0'>
        <AddTags document={board} />

        {board && board.data.tags && (
          <TagList
            removable
            className='mt-10'
            tags={board.data.tags}
            onRemoveTag={handleRemoveClick}
          />
        )}
      </div>
    </Dialog>
  );
};

export default observer(AddTagsModal);
