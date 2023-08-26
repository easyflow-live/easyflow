'use client'

import { LoaderIcon, PlusCircleIcon } from 'lucide-react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { BoardForm } from './BoardForm'

export function BoardAdder() {
  const { pending } = useFormStatus()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" size="sm">
          <PlusCircleIcon className="w-4 h-4" />
          Add board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add board</DialogTitle>
          <DialogDescription>Choose a name and a code.</DialogDescription>
        </DialogHeader>

        <BoardForm />

        <DialogFooter>
          <Button disabled={pending} type="submit" form="addBoard">
            {pending && (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin animate-in" />
            )}
            Add board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
