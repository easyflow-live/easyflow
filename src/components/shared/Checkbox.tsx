import styled from 'styled-components';

import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  RefObject,
} from 'react';

export interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const StyledInput = styled.input`
  position: relative;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;

  &::before {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    transition: all 0.1s;
    background: #ed64a6;
  }

  &:checked {
    display: inline-block;
    background: #fff;

    &::before {
      transform: rotate(45deg);
      content: '';
      position: absolute;
      width: 1px;
      height: 6px;
      background-color: #48bb78;
      left: 7px;
      top: 3px;
    }

    &::after {
      transform: rotate(45deg);
      content: '';
      position: absolute;
      width: 3px;
      height: 1px;
      background-color: #48bb78;
      left: 3px;
      top: 6px;
    }
  }

  &:disabled {
    border-color: hsla(320, 4.2%, 13.9%, 0.2);
    cursor: default;
    background-color: hsla(320, 4.2%, 13.9%, 0.2);

    &::before {
      background-color: hsla(320, 4.2%, 13.9%, 0.2);
    }

    + label {
      color: hsla(320, 4.2%, 13.9%, 0.2);
      cursor: default;
    }
  }
`;

const Checkbox = forwardRef(
  (props: CheckboxProps, ref: RefObject<HTMLInputElement>) => (
    <StyledInput type='checkbox' {...props} ref={ref} />
  )
);

export default Checkbox;
