'use client'

import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { z } from 'zod'
import { createBoardAction } from '@/app/(dashboard)/dashboard/actions/createBoardAction'
import { Label } from '@/components/ui/Label'

const MIN_CHAR = 2
const MAX_CHAR = 6

const addBoardSchema = z.object({
  title: z.string().nonempty(),
  code: z.string().min(MIN_CHAR).max(MAX_CHAR),
})

export function BoardForm() {
  const router = useRouter()
  const { session } = useAuth()

  const callAction = async (formData: FormData) => {
    await createBoardAction(formData)
    router.refresh()
  }

  return (
    <form id="addBoard" action={callAction}>
      <div className="grid gap-4 py-4">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Ex: Easy Flow"
          type="title"
          autoComplete="title"
        />

        <Label htmlFor="code">Code</Label>
        <Input name="code" id="code" autoCorrect="off" placeholder="Ex: EF" />

        <Input
          name="ownerId"
          className="hidden"
          value={session?.user.id}
          readOnly
        />
      </div>
    </form>
  )
}
