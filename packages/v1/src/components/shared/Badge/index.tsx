import React from 'react';
import cn from 'classnames';

type BadgeProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

const Badge = ({ className, ...props }: BadgeProps) => (
  <div
    className={cn(
      'inline-flex items-center rounded-full text-xs text-white py-1 px-2',
      className
    )}
    {...props}
  />
);

export default Badge;
