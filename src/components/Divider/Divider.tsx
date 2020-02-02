import classnames from 'classnames';

interface DividerProps {
  className?: string;
}

const Divider = ({ className = '' }: DividerProps) => (
  <div
    className={classnames(
      'my-2 border-b border-solid border-gray-600 min-w-full',
      className
    )}
  />
);

export default Divider;
