import styled from 'styled-components';
import { ChangeEvent, CSSProperties } from 'react';

interface CheckboxProps {
  label: string;
  id?: string;
  checked: boolean;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  id,
  label,
  containerClassName,
  containerStyle,
  ...inputProps
}: CheckboxProps) => {
  return (
    <CheckBoxContainer
      style={containerStyle}
      className={containerClassName || ''}
    >
      <StyledInput type='checkbox' id={id} {...inputProps} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </CheckBoxContainer>
  );
};

export default Checkbox;

const StyledLabel = styled.label`
  flex-shrink: 0;
  padding: 0 0.75rem;
  color: #252224;
  cursor: pointer;
`;

const StyledInput = styled.input`
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #718096;
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
    background: #ed64a6;

    &::before {
      transform: rotate(45deg);
      content: '';
      position: absolute;
      width: 3px;
      height: 9px;
      background-color: #fff;
      left: 9px;
      top: 5px;
    }

    &::after {
      transform: rotate(45deg);
      content: '';
      position: absolute;
      width: 5px;
      height: 3px;
      background-color: #fff;
      left: 5px;
      top: 9px;
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

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
