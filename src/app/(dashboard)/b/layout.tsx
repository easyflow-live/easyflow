import { BoardMenu } from '@/modules/Board/components/BoardHeader/BoardMenu'
import { BoardTeamWithData } from '@/modules/Board/components/BoardTeam'
import { BoardSwitcher } from '@/modules/Dashboard/components/BoardSwitcher'
import { getLoggedUserAction } from '../dashboard/actions/getLoggedUserAction'

export default async function BoardLayout({ children }: WithChildren) {
  const user = await getLoggedUserAction()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <BoardSwitcher boards={user?.boards ?? []} />

        <div className="flex items-center gap-4">
          <BoardTeamWithData boards={user?.boards ?? []} />
          <BoardMenu user={user} />
        </div>
      </div>

      {children}
    </div>
  )
}
