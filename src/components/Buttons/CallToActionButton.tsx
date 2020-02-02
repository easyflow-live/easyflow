import React, { MouseEvent } from 'react';
import classNames from 'classnames';

type Size = 'small' | 'medium';

const sizes = {
  small: 'px-2 py-2 text-sm',
  medium: 'px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 md:text-lg',
};

interface CallToActionButtonProps {
  children: React.ReactChild;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: Size;
}

export default ({
  className,
  size = 'medium',
  ...props
}: CallToActionButtonProps) => (
  <button
    className={classNames(
      `transition-all
      rounded-lg
      bg-pink-500
      hover:bg-pink-600
      xl:text-base
      text-white
      font-semibold
      leading-tight
      shadow-md
      cursor-pointer`,
      sizes[size],
      className
    )}
    {...props}
  />
);
