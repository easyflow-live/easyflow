import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

interface BadgeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Badge = ({ className, ...props }: BadgeProps) => (
  <div
    className={cn(
      'flex items-center mr-2 rounded text-white py-1 pr-2 pl-1',
      className
    )}
    {...props}
  />
);

export default Badge;
