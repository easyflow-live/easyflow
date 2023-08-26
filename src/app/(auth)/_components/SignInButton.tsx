'use client'

import { LoaderIcon } from 'lucide-react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/Button'

export function SignInButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} className="mt-4">
      {pending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
      Sign In with Email
    </Button>
  )
}
