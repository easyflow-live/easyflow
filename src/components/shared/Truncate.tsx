import { PropsWithChildren } from 'react';
import cn from 'classnames';

interface TruncateProps {
  className?: string;
  title?: string;
}

const Truncate = ({
  children,
  className,
  title,
}: PropsWithChildren<TruncateProps>) => (
  <span className={cn('truncate', className)} title={title}>
    {children}
  </span>
);

export default Truncate;
