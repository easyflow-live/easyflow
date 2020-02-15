import styled from 'styled-components';
import { ChangeEvent, CSSProperties } from 'react';

interface CheckboxProps {
  label?: string;
  id?: string;
  checked: boolean;
  containerStyle?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  id,
  label,
  containerStyle,
  ...inputProps
}: CheckboxProps) => {
  return (
    <div style={containerStyle} className='flex items-center cursor-pointer'>
      <StyledInput type='checkbox' id={id} {...inputProps} />
      {label && (
        <StyledLabel className='cursor-pointer ml-2 flex-shrink-0' htmlFor={id}>
          {label}
        </StyledLabel>
      )}
    </div>
  );
};

export default Checkbox;

const StyledLabel = styled.label`
  color: #252224;
`;

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

    + ${StyledLabel} {
      color: hsla(320, 4.2%, 13.9%, 0.2);
      cursor: default;
    }
  }
`;
