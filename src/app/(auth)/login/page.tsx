import { Metadata } from 'next'
import Link from 'next/link'

import { UserAuthForm } from '../_components/UserAuthForm'
import { loginAction } from '../actions/loginAction'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <div
      className={`
      lg:container
      relative
      h-[800px]
      items-center
      justify-center
      grid
      lg:max-w-none
      lg:grid-cols-2
      lg:px-0`}
    >
      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-20 flex items-center text-lg">
          <Link href="/" className="block text-2xl text-foreground">
            <span className="text-teal-400">easy</span>
            <span className="text-pink-500">flow</span>
          </Link>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mb-4">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400">
              Enter your email to sign in to your account
            </p>
          </div>

          <UserAuthForm onSubmit={loginAction} />
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Link href="/signup" className="text-sm flex justify-center">
          Sign up
        </Link>
      </div>
    </div>
  )
}
