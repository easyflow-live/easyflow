import { HomeIcon } from 'lucide-react'
import { type Session } from '@supabase/supabase-js'
import Link from 'next/link'

import { UserMenu } from './shared/UserMenu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/Tooltip'

function Logo() {
  return (
    <svg
      width="24"
      height="21"
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7.65955"
        y="4.65955"
        width="16.3404"
        height="16.3404"
        rx="4"
        fill="#ED64A6"
      />
      <rect
        y="0.0638428"
        width="16.3404"
        height="16.3404"
        rx="4"
        fill="#4FD1C5"
      />
    </svg>
  )
}

const links = [{ href: '/dashboard', icon: <HomeIcon className="w-5 h-5" /> }]

type SidebarProps = {
  session: Session | null
}

export async function Sidebar({ session }: SidebarProps) {
  return (
    <TooltipProvider>
      <div className="p-4 flex flex-col items-center gap-4 h-screen justify-between border-r">
        <nav className="flex flex-col gap-4">
          <Link href="/" className="p-3">
            <Logo />
          </Link>

          {links.map((link) => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className="hover:bg-accent p-3 rounded transition-colors duration-300 flex justify-center"
                >
                  {link.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {session && <UserMenu user={session.user} />}
      </div>
    </TooltipProvider>
  )
}
