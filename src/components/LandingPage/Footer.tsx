import Link from 'next/link';

const Footer = () => (
  <footer className='px-6 py-16 text-center'>
    <div className='text-gray-500'>
      <span className='mr-2'>© EasyFlow</span>
      {/* <a className='mr-2' href=''>
        Terms
      </a> */}
      <Link href='/privacy'>
        <a className='hover:text-pink-500'>Privacy</a>
      </Link>
    </div>
  </footer>
);

export default Footer;
