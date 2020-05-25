import React, { useState, ReactChild, ReactElement } from 'react';

import { useKeySubmit } from '../../hooks/use-key-submit';
import { Input } from '../shared';
import { InputProps } from './Input';

interface EditableProps {
  value: string;
  editable?: boolean;
  inputProps?: InputProps;
  onSubmit: (value: string) => void;
  onRenderInput?: ReactElement;
  children: ({
    value,
    onClick,
  }: {
    value: string;
    onClick: () => void;
  }) => ReactChild;
}

const Editable = ({
  value,
  editable = true,
  onSubmit,
  onRenderInput,
  children,
  inputProps,
}: EditableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleClick = () => {
    setIsOpen(true);
    setNewValue(value);
  };

  const handleChange = event => setNewValue(event.target.value);

  const submitTitle = () => {
    if (newValue === '') return;

    if (value !== newValue) {
      onSubmit(newValue);
    }
    setIsOpen(false);
  };

  const revertTitle = () => {
    setIsOpen(false);
    setNewValue(value);
  };

  const handleKeyDown = useKeySubmit(submitTitle, revertTitle);

  return (
    <div className='flex-grow'>
      {isOpen && editable ? (
        onRenderInput ? (
          React.cloneElement(onRenderInput, {
            value: newValue,
            onKeyDown: handleKeyDown,
            onChange: handleChange,
            onBlur: revertTitle,
            autoFocus: true,
            ...inputProps,
          })
        ) : (
          <Input
            type='text'
            autoFocus
            value={newValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={revertTitle}
            spellCheck={false}
            {...inputProps}
          />
        )
      ) : (
        children({ value, onClick: handleClick })
      )}
    </div>
  );
};

export default Editable;
