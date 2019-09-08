import React, { MouseEvent } from 'react';

import './CallToActionButton.css';

interface CallToActionButtonProps {
  children: React.ReactChild;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default ({
  children,
  className,
  onClick,
  ...props
}: CallToActionButtonProps) => (
  <button
    className={`CallToActionButton rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-pink-500 hover:bg-pink-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md cursor-pointer ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
