import Link from 'next/link'

export function Header() {
  return (
    <header className="z-10 max-w-6xl w-full mx-auto px-6 bg-gray-800">
      <div className="h-20 py-6">
        <Link href="/" className="block text-2xl text-white">
          <span className="text-teal-400">easy</span>
          <span className="text-pink-400">flow</span>
        </Link>
      </div>
    </header>
  )
}
