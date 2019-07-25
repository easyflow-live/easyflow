import { Empty } from './Empty';
import { ScrumBoard } from '../images/ScrumBoard';
import AddBoardModal from '../modals/AddBoardModal';
import CallToActionButton from '../Buttons/CallToActionButton';
import { useState } from 'react';

const AddBoardButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <CallToActionButton className='mt-5' onClick={toggle}>
        Add new board
      </CallToActionButton>

      <AddBoardModal isOpen={isOpen} toggleIsOpen={toggle} />
    </>
  );
};

export const StartProjectEmpty = () => (
  <Empty
    image={<ScrumBoard />}
    message='Create a board to start a project and get things done.'
    button={<AddBoardButton />}
    messageClass='mt-8'
  />
);
