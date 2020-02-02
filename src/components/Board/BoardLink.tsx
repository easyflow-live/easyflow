import Link from 'next/link';

interface BoardLinkProps {
  title: string;
  href: string;
}

export default ({ title, href }: BoardLinkProps) => {
  return (
    <Link href={href}>
      <a
        title={title}
        className='bg-gray-700 hover:bg-gray-600 shadow-lg rounded-lg p-4 ml-0 mr-4 mb-4 w-full sm:w-48 h-32 cursor-pointer break-words'
      >
        <span className='text-white'>{title}</span>
      </a>
    </Link>
  );
};
