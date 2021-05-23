import React, { useState } from 'react';
import { Box, useOutsideClick } from '@chakra-ui/react';

import { useSession } from 'hooks/use-session';
import BoardDocument from 'modules/Board/data/board.doc';
import NewBoardForm from 'components/shared/NewBoardForm';
import { AnimatedOpacity } from 'components/shared/Animated/AnimatedOpacity';

export function BoardAdder() {
  const { userDoc } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>();

  const toggleOpen = () => setIsOpen(!isOpen);

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  const handleSubmit = async props => {
    const { title, code, index } = props;

    await BoardDocument.create({
      owner: userDoc.ref,
      users: [userDoc.ref],
      title,
      code,
      index,
    });

    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <Box
      bg='gray.700'
      shadow='lg'
      borderRadius='lg'
      p={4}
      mr={4}
      mb={4}
      w={{ base: 'full', md: 64 }}
      ref={ref}
    >
      <NewBoardForm onKeyDown={handleKeyDown} onSubmit={handleSubmit} />
    </Box>
  ) : (
    <AnimatedOpacity
      show={true}
      w={{ base: 'full', md: 32 }}
      ml={0}
      mr={4}
      mb={4}
    >
      <button
        title='Add a new board'
        onClick={toggleOpen}
        className='bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-4xl shadow-lg p-4 rounded-lg w-full h-32 cursor-pointer text-white'
      >
        +
      </button>
    </AnimatedOpacity>
  );
}
