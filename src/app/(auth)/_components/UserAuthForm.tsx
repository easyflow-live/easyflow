'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { SignInButton } from './SignInButton'

export function UserAuthForm({
  onSubmit,
}: {
  onSubmit: (
    formData: FormData,
    currentUrl?: string
  ) => Promise<{
    error: string
  }>
}) {
  const [error, setError] = useState('')

  const callAction = async (formData: FormData) => {
    const { error } = await onSubmit(formData, window.location.origin)

    if (error) setError(error)
  }
  return (
    <div className="grid gap-6">
      <form action={callAction}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />

            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              name="password"
              id="password"
              type="password"
              autoCorrect="off"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className={'text-sm font-medium text-destructive'}>{error}</p>
          )}

          <SignInButton />
        </div>
      </form>
    </div>
  )
}
