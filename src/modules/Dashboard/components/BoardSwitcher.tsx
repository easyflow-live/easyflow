'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  ChevronsUpDownIcon,
  CheckIcon,
  PlusCircleIcon,
  LoaderIcon,
} from 'lucide-react'
import cn from 'classnames'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { BoardForm } from './BoardForm'
import { UserWithBoards } from '@/types/types'

type BoardSwitcherProps = {
  boards: UserWithBoards['boards']
}

export function BoardSwitcher({ boards }: BoardSwitcherProps) {
  const { pending } = useFormStatus()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [showNewBoardDialog, setShowNewBoardDialog] = React.useState(false)

  const selectedBoard = boards.find((b) => b.id === pathname.split('/')[2])
  const setSelectedBoard = (id: string) => router.push(`/b/${id}`)

  return (
    <Dialog open={showNewBoardDialog} onOpenChange={setShowNewBoardDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a board"
            className={cn('w-[200px] justify-between')}
          >
            {selectedBoard?.title}
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search board..." />
              <CommandEmpty>No board found.</CommandEmpty>
              <CommandGroup heading={'Boards'}>
                {boards.map((board) => (
                  <CommandItem
                    key={board.id}
                    onSelect={() => {
                      setSelectedBoard(board.id)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <span>{board.title}</span>
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedBoard?.id === board.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>

            <CommandSeparator />

            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewBoardDialog(true)
                    }}
                  >
                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                    Create Board
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
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
