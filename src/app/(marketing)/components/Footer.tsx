import Link from 'next/link'

export function Footer() {
  return (
    <footer className="px-6 py-16 text-center">
      <div className="text-gray-500">
        <span className="mr-2">© EasyFlow</span>
        <Link href="/changelog" className="hover:text-pink-500 mr-2">
          Changelog
        </Link>
        <a
          href="https://twitter.com/pinheirofellipe"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 mr-2"
        >
          Twitter
        </a>
        <a
          href="https://github.com/easyflow-live/easyflow"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
        >
          Github
        </a>
      </div>
    </footer>
  )
}
