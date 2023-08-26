import { getBoardByIdAction } from './actions/getBoardByIdAction'
import { Groups } from '@/modules/Board/components/Groups'

export default async function BoardPage({
  params,
}: {
  params: { id: string }
}) {
  const board = await getBoardByIdAction(params.id)

  return <Groups groups={board?.groups ?? []} />
}
