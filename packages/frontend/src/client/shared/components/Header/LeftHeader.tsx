import Link from 'next/link'
import { BasicHeader } from './BasicHeader'

function Icon() {
  return (
    <svg width={31} height={32} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x={12} y={12} width={16} height={16} rx={4} fill="#ED64A6" />
      <rect x={2} y={2} width={16} height={16} rx={4} fill="#4FD1C5" />
    </svg>
  )
}

export function LeftHeader() {
  return (
    <BasicHeader>
      <Link href="/">
        <a>
          <Icon />
        </a>
      </Link>
    </BasicHeader>
  )
}
