import Link from 'next/link';
import './BoardLink.css';

interface BoardLinkProps {
  title: string;
  href: string;
}

export default ({ title, href }: BoardLinkProps) => {
  return (
    <Link href={href}>
      <a
        title={title}
        className='board-link bg-gray-700 hover:bg-gray-600 shadow-lg rounded-lg p-4 m-2 w-full cursor-pointer break-words'
      >
        <span className='text-white'>{title}</span>
      </a>
    </Link>
  );
};
