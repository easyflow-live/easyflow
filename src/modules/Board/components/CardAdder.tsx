'use client'

import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { LoaderIcon, PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { createCardAction } from '@/app/(dashboard)/b/[id]/actions/createCardAction'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'

interface CardAdderProps {
  index: number
  assigneeId: string
  groupId: string
}

export function CardAdder({ index, assigneeId, groupId }: CardAdderProps) {
  const router = useRouter()
  const { pending } = useFormStatus()

  const callAction = async (formData: FormData) => {
    await createCardAction(formData)

    router.refresh()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 w-full">
          <PlusCircleIcon className="w-4 h-4" />
          Add card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add card</DialogTitle>
          <DialogDescription>Choose a title and a text.</DialogDescription>
        </DialogHeader>

        <form action={callAction} className="flex flex-col gap-4" id="addCard">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" />

          <Label htmlFor="text">Content</Label>
          <Textarea id="text" name="text" />

          <Input
            readOnly
            name="assigneeId"
            value={assigneeId}
            className="hidden"
          />
          <Input readOnly name="groupId" value={groupId} className="hidden" />
          <Input readOnly name="index" value={index} className="hidden" />
        </form>

        <DialogFooter>
          <Button disabled={pending} type="submit" form="addCard">
            {pending && (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin animate-in" />
            )}
            Add card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
