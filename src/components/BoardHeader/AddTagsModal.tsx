import React, { useRef, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { observer } from 'mobx-react-lite';

import BoardDocument from '../../documents/board.doc';
import TagList from '../Tag/TagList';
import AddTags from '../Tag/AddTags';
import Dialog from '../Dialog/Dialog';

interface AddTagsModalProps {
  boardId?: string;
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const AddTagsModal = ({ boardId, toggleIsOpen, isOpen }: AddTagsModalProps) => {
  const boardRef = useRef(null);

  useEffect(() => {
    boardRef.current = new BoardDocument(`boards/${boardId}`);
  }, [boardId]);

  const handleRemoveClick = (tag: string) => {
    boardRef.current.update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag),
    });
  };

  return (
    <Dialog title='Tags' isOpen={isOpen} onClose={toggleIsOpen}>
      <div className='m-8 mt-0'>
        <AddTags document={boardRef.current} />

        {boardRef.current && boardRef.current.data.tags && (
          <TagList
            removable
            className='mt-10'
            tags={boardRef.current.data.tags}
            onRemoveTag={handleRemoveClick}
          />
        )}
      </div>
    </Dialog>
  );
};

export default observer(AddTagsModal);
