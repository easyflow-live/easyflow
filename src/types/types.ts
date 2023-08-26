import { Prisma } from '@prisma/client'

const userWithBoards = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    boards: {
      include: {
        groups: true,
        owner: true,
        members: { include: { user: true } },
      },
    },
  },
})

export type UserWithBoards = Prisma.UserGetPayload<typeof userWithBoards>

export type Board = UserWithBoards['boards'][0]

const boardWithGroups = Prisma.validator<Prisma.BoardDefaultArgs>()({
  include: {
    groups: {
      include: {
        bord: {
          include: {
            owner: true,
          },
        },
        cards: {
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

export type BoardWithGroups = Prisma.BoardGetPayload<typeof boardWithGroups>

export type Group = BoardWithGroups['groups'][0]
export type Card = BoardWithGroups['groups'][0]['cards'][0]
