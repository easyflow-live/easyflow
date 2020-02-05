import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  full?: boolean;
}

const Input = ({ className, full = true, ...props }: InputProps) => (
  <input
    className={classNames(
      'bg-gray-600 shadow appearance-none rounded py-2 px-3 text-white leading-tight placeholder-gray-900',
      full ? 'w-full' : '',
      className
    )}
    {...props}
  />
);

export default Input;
