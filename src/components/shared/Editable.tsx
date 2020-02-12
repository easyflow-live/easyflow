import React, { useState, ReactChild } from 'react';

import { useKeySubmit } from '../../hooks/use-key-submit';
import { Input } from '../shared';
import { InputProps } from './Input';

interface EditableProps {
  value: string;
  editable?: boolean;
  inputProps?: InputProps;
  onSubmit: (value: string) => void;
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
  editable,
  onSubmit,
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
      ) : (
        children({ value, onClick: handleClick })
      )}
    </div>
  );
};

export default Editable;
