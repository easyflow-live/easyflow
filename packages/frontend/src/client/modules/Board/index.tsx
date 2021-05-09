import { Box } from '@chakra-ui/layout'
import React from 'react'
import { Loader } from 'src/client/shared/components/Loader'
import { useGetBoardsQuery } from 'src/types/generated'
import { BoardCard, Visibility } from './components/BoardCard'

function Divider() {
  return <Box my={4} />
}

export function Boards() {
  const { data: boards, loading } = useGetBoardsQuery()

  if (loading) {
    return <Loader />
  }

  if (!boards?.boards) {
    return <p>Empt list</p>
  }

  return (
    <div>
      {boards.boards.map(({ id, name, visibility }, index) => {
        return (
          <div key={id}>
            <BoardCard
              name={name}
              projectName={name}
              visibility={visibility as Visibility}
            />

            {boards.boards.length - 1 === index ? null : <Divider />}
          </div>
        )
      })}
    </div>
  )
}
