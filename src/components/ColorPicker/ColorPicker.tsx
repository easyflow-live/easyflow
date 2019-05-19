import ClickOutside from '../ClickOutside/ClickOutside';
import { useRef, useState } from 'react';

interface PickerModalProps {
  isOpen: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
  onChange(color: string): void;
  onClose(): void;
}

const PickerModal = ({
  isOpen,
  buttonRef,
  onChange,
  onClose,
}: PickerModalProps) => {
  const handleClickOutside = () => {
    focusButtonAndCloseModal();
  };

  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      focusButtonAndCloseModal();
    }
  };

  const changeColor = color => {
    onChange(color);
    focusButtonAndCloseModal();
  };

  const focusButtonAndCloseModal = () => {
    buttonRef.current.focus();
    onClose && onClose();
  };

  return (
    isOpen && (
      <ClickOutside eventTypes='click' handleClickOutside={handleClickOutside}>
        <div className='modal-color-picker' onKeyDown={handleKeyDown}>
          {['white', '#6df', '#6f6', '#ff6', '#fa4', '#f66'].map(color => (
            <button
              key={color}
              style={{ background: color }}
              className='color-picker-color'
              onClick={() => changeColor(color)}
            />
          ))}
        </div>
      </ClickOutside>
    )
  );
};

const ColorPicker = ({ onChange }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        className='options-list-button'
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
        aria-haspopup
        aria-expanded={isOpen}
      >
        <img
          src={'/static/images/color-icon.png'}
          alt='colorwheel'
          className='modal-icon'
        />
        &nbsp;Color
      </button>

      <PickerModal
        isOpen={isOpen}
        buttonRef={buttonRef}
        onChange={onChange}
        onClose={closeModal}
      />
    </div>
  );
};

export default ColorPicker;
