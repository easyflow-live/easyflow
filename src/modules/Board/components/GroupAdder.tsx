'use client'

import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { createGroupAction } from '@/app/(dashboard)/b/[id]/actions/createGroupAction'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Board } from '@/types/types'

type GroupAdderProps = DialogProps & {
  board: Board
}

export function GroupAdder({ board, ...props }: GroupAdderProps) {
  const router = useRouter()
  const { pending } = useFormStatus()

  const index = board.groups.length

  const callAction = async (formData: FormData) => {
    await createGroupAction(formData)

    router.refresh()
  }

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add group</DialogTitle>
          <DialogDescription>Choose a title.</DialogDescription>
        </DialogHeader>

        <form action={callAction} className="flex flex-col gap-4" id="addGroup">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" />

          <Input readOnly name="boardId" value={board.id} className="hidden" />
          <Input readOnly name="index" value={index} className="hidden" />
        </form>

        <DialogFooter>
          <Button disabled={pending} type="submit" form="addGroup">
            {pending && (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin animate-in" />
            )}
            Add group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
