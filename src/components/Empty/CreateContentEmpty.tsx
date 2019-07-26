import { Empty } from './Empty';
import { CreateContent } from '../images/CreateContent';
import { useState } from 'react';
import CallToActionButton from '../Buttons/CallToActionButton';
import AddNewListModal from '../BoardHeader/AddNewListModal';

const AddNewListButton = ({ boardId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <CallToActionButton className='mt-5' onClick={toggle}>
        Add new list
      </CallToActionButton>

      <AddNewListModal
        boardId={boardId}
        isOpen={isOpen}
        toggleIsOpen={toggle}
      />
    </>
  );
};

export const CreateContentEmpty = ({ boardId }) => (
  <Empty
    image={<CreateContent />}
    message={`Let's start a new board! Add a new list to continue.`}
    button={<AddNewListButton boardId={boardId} />}
  />
);
