import { DetailedHTMLProps, InputHTMLAttributes, ReactChild } from 'react';
import classNames from 'classnames';
import { Spinner } from './Spinner';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  full?: boolean;
  loading?: boolean;
}

const Input = ({
  className,
  full = true,
  disabled,
  loading,
  ...props
}: InputProps) => (
  <div className='inline relative'>
    <input
      disabled={disabled}
      className={classNames(
        'bg-gray-600 shadow appearance-none rounded py-2 px-3 text-white leading-tight placeholder-gray-900',
        {
          'bg-gray-700 text-gray-900 cursor-not-allowed': disabled,
          'w-full': full,
        },
        className
      )}
      {...props}
    />

    {loading && <Spinner className='absolute top-0 right-0 mr-2' />}
  </div>
);

export default Input;
