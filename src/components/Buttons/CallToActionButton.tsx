import React from 'react';

interface CallToActionButtonProps {
  children: React.ReactChild;
  className: string;
}

export default ({ children, className, ...props }: CallToActionButtonProps) => (
  <button
    className={`rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-pink-500 hover:bg-pink-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
);
