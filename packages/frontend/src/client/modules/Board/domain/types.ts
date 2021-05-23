export type LoadingStatus = 'fulfilled' | 'rejected' | 'pending' | 'idle'

export interface BoardStoreInterface {
  subscribeToBoard(callback: Function): void
  getBoards(): Board[]
  setBoards(boards: Board[]): void
  getStatus(): LoadingStatus
}

export interface BoardRepositoryInterface {
  fetchBoards: () => Promise<void>
}

// type Role = {
//   id: string
//   createdAt: Date
//   name: string
//   boardMembers: BoardMember[]
//   userRole: UserRole
// }

// type BoardMember = {
//   id: string
//   createdAt: Date
//   updatedAt: Date
//   memberId: string
//   boardId: string
//   roleId: string
//   active: boolean
//   boards: Board[]
//   users: User[]
//   roles: Role[]
// }

export type User = {
  id: string
  username: string
  image: string | undefined
}

export type Board = {
  id: string
  createdAt: Date
  updatedAt: Date
  ownerId: string
  name: string
  visibility: string
  members: User[]
  // boardMembers: BoardMember[]
  // userBoardStars: user_board_stars[]
}
