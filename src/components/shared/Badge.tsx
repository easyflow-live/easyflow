import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

interface BadgeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Badge = ({ className, ...props }: BadgeProps) => (
  <div
    className={cn(
      'flex items-center rounded-full text-xs text-white py-1 px-2',
      className
    )}
    {...props}
  />
);

export default Badge;
