import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface InputProps extends HTMLAttributes<HTMLButtonElement> {}

const StyledInput = styled.input.attrs(({ className = '' }) => ({
  className: classNames(
    'bg-gray-600 shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight',
    className
  ),
}))<InputProps>`
  &::placeholder {
    color: #1a202c; // bg-gray-900
  }
`;

export default StyledInput;
