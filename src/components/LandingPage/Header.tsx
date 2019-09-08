import Link from 'next/link';

const Header = () => (
  <div className='z-100 bg-gray-800 inset-x-0 top-0 lg:static flex items-center shadow-lg'>
    <div
      className='w-full max-w-screen-xl relative mx-auto px-6'
      style={{ maxWidth: '1280px' }}
    >
      <div className='h-24 flex flex-col justify-center'>
        <div className='flex items-center -mx-6'>
          <div className='lg:w-1/4 xl:w-1/5 pl-6 pr-6'>
            <div className='flex items-center'>
              <Link href='/'>
                <a className='md:block text-2xl text-white'>
                  <span className='text-teal-500'>easy</span>flow
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
