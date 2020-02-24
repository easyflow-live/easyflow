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
  <p className={cn('truncate', className)} title={title}>
    {children}
  </p>
);

export default Truncate;
