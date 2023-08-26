'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogProps,
} from '@/components/ui/Dialog'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/use-toast'
import { sendInviteEmail } from '@/libs/api'
import { Board } from '@/types/types'
import { Label } from '@/components/ui/Label'

type TeamMembersProps = DialogProps & {
  board: Board
}

export function TeamMembers({ board, ...props }: TeamMembersProps) {
  const { toast } = useToast()

  const callAction = async (formData: FormData) => {
    // sendInviteEmail({
    //   to: formData.email,
    //   userName: board.owner.full_name!,
    //   userEmail: board.owner.email,
    //   ownerName: board.owner.username!,
    //   boardName: board.title,
    //   boardUrl: `https://easyflow.live/b/${board.id}`,
    //   inviteId: invite.id,
    // }).catch(() => {
    //   toast({
    //     description:
    //       "Sorry, something went wrong and we could't sent the invite, please, try again later.",
    //   })
    // })

    const email = formData.get('email')

    toast({
      title: 'Member invited',
      description: `An invite was sent to ${email} inbox.`,
    })
  }

  if (!board) return null

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
          <DialogDescription>
            Invite your team members to collaborate.
          </DialogDescription>
        </DialogHeader>

        <form action={callAction} className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
          <Button type="submit">Invite member</Button>
        </form>

        <Separator className="my-4" />

        <div className="mt-4 flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://github.com/${board?.owner.username}.png`}
              />
              <AvatarFallback>
                {board?.owner.username?.slice(1, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {board?.owner.firstName || board?.owner.username}
              </p>
              <p className="text-sm text-muted-foreground">
                {board?.owner.username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge>Owner</Badge>
          </div>
        </div>

        {board?.members.map(({ user }) => (
          <div
            key={user.id}
            className="mt-4 flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`https://github.com/${user.username}.png`} />
                <AvatarFallback>{user.username?.slice(1, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {user.firstName || user.username}
                </p>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="default" variant="outline">
                Give ownership
              </Button>
              <Button size="default" variant="destructive">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
