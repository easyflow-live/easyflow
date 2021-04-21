import cn from 'classnames';

interface DividerProps {
  className?: string;
}

const Divider = ({ className = '' }: DividerProps) => (
  <div
    className={cn(
      'my-2 border-b border-solid border-gray-600 min-w-full',
      className
    )}
  />
);

export default Divider;
