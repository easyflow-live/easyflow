import React from 'react';
import { FaTrash, FaEllipsisH } from 'react-icons/fa';

import Menu, { MenuItem, Button } from 'components/shared/Menu';

interface CardMenuProps {
  title: string;
  onRemove: (title: string) => void;
}

const CardMenu: React.FC<CardMenuProps> = props => {
  const { title, onRemove } = props;

  const handleSelection = (value: string) => {
    switch (value) {
      case 'delete':
        onRemove(title);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Menu
        onSelection={handleSelection}
        className='w-56 px-0 py-2'
        trigger={
          <Button
            className='text-gray-500 hover:text-gray-100 rounded p-2 hover:bg-gray-900 hover:bg-opacity-25 transition duration-300 mr-4'
            tag='button'
          >
            <FaEllipsisH size='25' />
          </Button>
        }
        items={
          <>
            {/* <Divider className='my-2 ' /> */}
            <MenuItem value='delete'>
              <FaTrash className='text-red-400 mr-3' />
              <span className='text-red-400'>Delete this card</span>
            </MenuItem>
          </>
        }
      />
    </>
  );
};

export default CardMenu;
