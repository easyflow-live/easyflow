import classnames from 'classnames';

const Divider = ({ className = '' }) => (
  <div
    className={classnames(
      'my-2 border-b border-solid border-gray-600 min-w-full',
      className
    )}
  />
);

export default Divider;
