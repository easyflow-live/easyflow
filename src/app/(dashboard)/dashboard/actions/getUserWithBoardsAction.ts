'use server'

import prismadb from '@/libs/prismadb'

export async function getUserWithBoardsAction(userId?: string) {
  return prismadb.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      boards: {
        include: {
          groups: true,
          owner: {
            include: {
              boards: true,
            },
          },
          members: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })
}
