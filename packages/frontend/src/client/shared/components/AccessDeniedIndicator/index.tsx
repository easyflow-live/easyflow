import Link from 'next/link'
import { signIn } from 'next-auth/client'

export function AccessDeniedIndicator() {
  const signInButtonNode = () => {
    return (
      <Link href="/api/auth/signin">
        <button
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          Sign In
        </button>
      </Link>
    )
  }

  return (
    <div>
      <div>
        <h2>You should not pass!</h2>
        <div>{signInButtonNode()}</div>
      </div>
    </div>
  )
}
