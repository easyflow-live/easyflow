import { StartProjectEmpty } from '@/components/shared/Empty/StartBoardEmpty'
import { getUserWithBoardsAction } from '@/app/(dashboard)/dashboard/actions/getUserWithBoardsAction'
import { BoardCard } from './components/BoardCard'

type BoardsProps = {
  userId?: string
}

export async function Boards({ userId }: BoardsProps) {
  const user = await getUserWithBoardsAction(userId)

  if (!user?.boards?.length) {
    return (
      <div className="m-6 flex justify-center">
        <StartProjectEmpty />
      </div>
    )
  }

  return (
    <div className="m-6 flex flex-wrap w-full gap-4">
      {user.boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  )
}
