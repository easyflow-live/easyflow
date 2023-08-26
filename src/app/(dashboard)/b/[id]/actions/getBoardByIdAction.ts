'use server'

import prismadb from '@/libs/prismadb'

export async function getBoardByIdAction(boardId?: string) {
  return prismadb.board.findFirst({
    where: {
      id: boardId,
    },
    include: {
      groups: {
        orderBy: {
          index: 'asc',
        },
        include: {
          bord: {
            include: {
              owner: true,
            },
          },
          cards: {
            orderBy: {
              index: 'asc',
            },
            include: {
              assignee: true,
            },
          },
        },
      },
      members: {
        include: {
          user: true,
        },
      },
      owner: true,
    },
  })
}
