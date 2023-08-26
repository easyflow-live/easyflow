import { Heading } from '@/components/shared/Heading'
import { BoardAdder } from '@/modules/Dashboard/components/BoardAdder'

export function DashboardHeader() {
  return (
    <div className="p-6 flex justify-between">
      <Heading text={'Boards'} />
      <BoardAdder />
    </div>
  )
}
