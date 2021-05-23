import { Flex, VStack, Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { Loader } from 'src/client/shared/components/Loader'
import { BoardCard, Visibility } from './components/BoardCard'
import { Empty } from './components/Empty'
import { ScrumBoardImage } from './components/ScrumBoardImage'
import { useBoardsStore } from './hooks/useBoardsStore'

function Divider() {
  return <Flex my={1} />
}

export function Boards() {
  const { boards, fetchBoards, status } = useBoardsStore()

  useEffect(() => {
    fetchBoards()
  }, [fetchBoards])

  if (status === 'pending') {
    return (
      <Flex justifyContent="center">
        <Loader />
      </Flex>
    )
  }

  if (!boards.length) {
    return (
      <Empty
        image={<ScrumBoardImage />}
        message="Create a board to start a project and get things done."
      />
    )
  }

  return (
    <VStack alignItems="stretch" spacing={4}>
      <Text ml={4} fontWeight="bold" fontSize="xl">
        Boards
      </Text>

      {boards.map(({ id, name, visibility, members }, index) => (
        <div key={id}>
          <BoardCard
            name={name}
            projectName={name}
            visibility={visibility as Visibility}
            members={members}
          />

          {boards.length - 1 === index ? null : <Divider />}
        </div>
      ))}
    </VStack>
  )
}
