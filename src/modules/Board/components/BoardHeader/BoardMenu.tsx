'use client'

import React from 'react'
import {
  ArchiveIcon,
  HashIcon,
  SettingsIcon,
  Users,
  ListIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import { useBoardId } from '@/hooks/use-board-id'
import { TeamMembers } from '../TeamMembers'
import { useArchiveBoardById } from '../../hooks/useArchiveBoardById'
import { useLeaveBoardById } from '../../hooks/useLeaveBoardById'
import { UserWithBoards } from '@/types/types'
import { GroupAdder } from '../GroupAdder'

type BoardMenuProps = {
  user: UserWithBoards | null
}

export function BoardMenu({ user }: BoardMenuProps) {
  const [showTemMembersDialog, setShowTemMembersDialog] = React.useState(false)
  const [showGroupAdderDialog, setShowGroupAdderDialog] = React.useState(false)
  const router = useRouter()
  const boardId = useBoardId()
  const board = user?.boards.find((b) => b.id === boardId)
  const isOwner = board?.ownerId === user?.id

  const { mutateAsync: archiveBoard } = useArchiveBoardById()
  const { mutateAsync: leaveBord } = useLeaveBoardById()

  const handleArchiveOrDeleteBoard = async () => {
    if (isOwner) {
      await archiveBoard(boardId)
    } else {
      await leaveBord({ boardId, memberId: user?.id ?? '' })
    }
    router.replace('/dashboard')
  }

  if (!board) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Board menu</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setShowGroupAdderDialog(true)}>
              <ListIcon className="mr-2 h-4 w-4" />
              <span>Add group</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setShowTemMembersDialog(true)}>
              <Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleArchiveOrDeleteBoard}>
            <ArchiveIcon className="mr-2 h-4 w-4" />
            <span>{isOwner ? 'Archive board' : 'Leave board'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TeamMembers
        board={board}
        open={showTemMembersDialog}
        onOpenChange={setShowTemMembersDialog}
      />

      <GroupAdder
        board={board}
        open={showGroupAdderDialog}
        onOpenChange={setShowGroupAdderDialog}
      />
    </>
  )
}
