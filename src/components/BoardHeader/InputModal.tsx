import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';

import { useRect } from '../../hooks/use-rect';
import { useThinDisplay } from '../../hooks/use-thin-display';
import { useKeySubmit } from '../../hooks/use-key-submit';
import Modal from '../Modal/Modal';

interface InputModalProps {
  buttonElement?: HTMLButtonElement;
  inputType?: string;
  isOpen?: boolean;
  toggleIsOpen?(): void;
  onSubmit: (value: string) => Promise<any>;
}

const InputModal = ({
  buttonElement,
  inputType = 'text',
  isOpen,
  toggleIsOpen,
  onSubmit,
}: InputModalProps) => {
  const [value, setValue] = useState('');
  const buttonRect = useRect(buttonElement);
  const isThinDisplay = useThinDisplay();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    await onSubmit(value);
    setValue('');
    toggleIsOpen();
  };

  const handleKeyDown = useKeySubmit(handleSubmit, () => {
    setValue('');
    toggleIsOpen();
  });

  return (
    <Modal
      isOpen={isOpen}
      targetElement={buttonElement}
      toggleIsOpen={toggleIsOpen}
    >
      <div
        style={{
          minHeight: isThinDisplay ? 'none' : buttonRect.height,
          width: isThinDisplay ? '100%' : '350px',
        }}
      >
        <input
          autoFocus
          type={inputType}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
        />
      </div>
    </Modal>
  );
};

export default observer(InputModal);
