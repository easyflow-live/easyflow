import Link from 'next/link'
import { MoveRightIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { formatDate } from '@/helpers/date'
import { BoardTeam } from '@/modules/Board/components/BoardTeam'
import { Board } from '@/types/types'

export function BoardCard({ board }: { board: Board }) {
  return (
    <Card className="min-w-[200px]">
      <CardHeader>
        <Link href={`b/${board.id}`} className="flex gap-2 items-center group">
          <CardTitle>{board.title}</CardTitle>
          <MoveRightIcon className="-rotate-12 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {board.createdAt && (
          <CardDescription>{formatDate(board.createdAt)}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex justify-end">
        <BoardTeam board={board} />
      </CardContent>
    </Card>
  )
}
