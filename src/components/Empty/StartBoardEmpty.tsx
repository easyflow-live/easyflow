import { Empty } from './Empty';
import { ScrumBoard } from '../images/ScrumBoard';
import AddBoardModal from '../modals/AddBoardModal';
import { useState } from 'react';
import { Button } from '../shared';

const AddBoardButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Button className='mt-5' onClick={toggle}>
        Add new board
      </Button>

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
