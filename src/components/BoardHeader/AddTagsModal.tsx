import React, { useRef, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { observer } from 'mobx-react-lite';

import BoardDocument from '../../documents/board.doc';
import { useRect } from '../../hooks/use-rect';
import { useThinDisplay } from '../../hooks/use-thin-display';
import TagList from '../Tag/TagList';
import AddTags from '../Tag/AddTags';
import Modal from '../Modal/Modal';

interface AddTagsModalProps {
  boardId?: string;
  buttonElement?: HTMLButtonElement;
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const AddTagsModal = ({
  boardId,
  toggleIsOpen,
  isOpen,
  buttonElement,
}: AddTagsModalProps) => {
  const boardRef = useRef(null);
  const [buttonRect] = useRect(buttonElement);
  const isThinDisplay = useThinDisplay();

  useEffect(() => {
    boardRef.current = new BoardDocument(`boards/${boardId}`);
  }, [boardId]);

  const handleRemoveClick = (tag: string) => {
    boardRef.current.update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      targetElement={buttonElement}
      toggleIsOpen={toggleIsOpen}
    >
      <div
        className='tags-modal'
        style={{
          minHeight: isThinDisplay ? 'none' : buttonRect.height,
          width: isThinDisplay ? '100%' : '290px',
        }}
      >
        <AddTags document={boardRef.current} />

        {boardRef.current &&
          boardRef.current.data.tags &&
          boardRef.current.data.tags.length && (
            <TagList
              tags={boardRef.current.data.tags}
              onRemoveTag={handleRemoveClick}
            />
          )}
      </div>
    </Modal>
  );
};

export default observer(AddTagsModal);
