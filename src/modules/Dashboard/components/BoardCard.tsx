import { Text, VStack } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/system';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import BoardDocument from 'modules/Board/data/board.doc';
import { useBoardTeam } from 'modules/Board/hooks/use-board-team';
import { MembersAtavar } from './UserPopupProfile';
import Link from 'next/link';
import { forwardRef, ReactNode } from 'react';

const MotionDiv = chakra(motion.div);

const StyledContainer = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <MotionDiv
        ref={ref}
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: -50, opacity: 0 }}
        bg='gray.800'
        borderRadius='lg'
        cursor='pointer'
        shadow='lg'
        p={4}
        ml={0}
        mr={4}
        mb={4}
        w={{ base: 'full', md: 48 }}
        h={32}
        wordBreak='break-word'
        transition='background 0.3s'
        _hover={{ backgroundColor: 'gray.600' }}
      >
        {children}
      </MotionDiv>
    );
  }
);

type BoardCardProps = {
  board: BoardDocument;
};

export const BoardCard = observer(function BoardCard({
  board,
}: BoardCardProps) {
  const { assignees } = useBoardTeam(board);

  return (
    <Link href='/b/[uid]' as={`/b/${board.id}`}>
      <a>
        <StyledContainer>
          <VStack
            onClick={(event) => event.stopPropagation()}
            spacing={4}
            alignItems='stretch'
            justifyContent='space-between'
            h='full'
            borderRadius={10}
          >
            <Text fontWeight='bold' fontSize='lg'>
              {board.data.title}
            </Text>

            <MembersAtavar members={assignees} />
          </VStack>
        </StyledContainer>
      </a>
    </Link>
  );
});
