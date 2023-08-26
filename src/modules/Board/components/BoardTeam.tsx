'use client'

import { useState } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { UserSimpleProfileCard } from '@/modules/Dashboard/components/UserSimpleProfileCard'
import { useBoardId } from '@/hooks/use-board-id'
import { TeamMembers } from './TeamMembers'
import { Button } from '@/components/ui/Button'
import { Board } from '@/types/types'

type BoardTeamProps = {
  board: Board
}

export function BoardTeam({ board }: BoardTeamProps) {
  return (
    <div className="flex -space-x-2">
      {board.members.map(({ user }) => (
        <HoverAvatar
          key={user.id}
          email={user.email}
          photo={`https://github.com/${user.username}.png`}
          username={user.username ?? ''}
        />
      ))}

      <HoverAvatar
        email={board.owner.email}
        photo={`https://github.com/${board.owner.username}.png`}
        username={board.owner.username ?? ''}
      />
    </div>
  )
}

type BoardTeamWithDataProps = {
  boards: Board[]
}

export function BoardTeamWithData({ boards }: BoardTeamWithDataProps) {
  const [showTemMembersDialog, setShowTemMembersDialog] = useState(false)
  const boardId = useBoardId()
  const board = boards.find((b) => b.id === boardId)

  if (!board) return null

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowTemMembersDialog(true)}
      >
        <BoardTeam board={board} />
      </Button>
      <TeamMembers
        board={board}
        open={showTemMembersDialog}
        onOpenChange={setShowTemMembersDialog}
      />
    </>
  )
}

function HoverAvatar({
  photo,
  username,
  email,
}: {
  photo: string
  username: string
  email: string
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar className="h-7 w-7">
          <AvatarImage src={photo} />
          <AvatarFallback>{username.slice(1, 2)}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent>
        <UserSimpleProfileCard
          username={username}
          photo={photo}
          email={email}
        />
      </HoverCardContent>
    </HoverCard>
  )
}
