import { useState } from 'react';

import { useKeySubmit } from '../../hooks/use-key-submit';

const MAX_DEFAULT_VALUE = 0;
const ENTER_CODE = 13;

interface CardCounterProps {
  counter: number;
  max?: number;
  onChange: (value: number) => void;
  editable?: boolean;
}

const CardCounter = ({
  counter,
  max = MAX_DEFAULT_VALUE,
  onChange,
  editable,
}: CardCounterProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [maxValue, setMaxValue] = useState(max);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setMaxValue(parseInt(value, 10) >= 0 ? parseInt(value, 10) : 0);

  const handleOnClick = (e: React.MouseEvent) => {
    if (!editable) return;

    e.preventDefault();
    e.stopPropagation();
    toggleEditing();
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleSubmit = () => {
    onChange(maxValue);
    toggleEditing();
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (!editable) return;

    if (e.keyCode === ENTER_CODE) {
      e.preventDefault();
      toggleEditing();
    }
  };
  const handleKeyDown = useKeySubmit(handleSubmit, toggleEditing);

  // @ts-ignore
  const isDefault = parseInt(max, 10) === parseInt(MAX_DEFAULT_VALUE, 10);
  // @ts-ignore
  const reachedLimit = parseInt(counter, 10) > parseInt(max, 10);

  // if number type is used here, the click button stops work ib Firefox
  // https://github.com/facebook/react/issues/6556
  return (
    <div className='pl-2'>
      {isEditing && editable ? (
        <input
          min={MAX_DEFAULT_VALUE}
          type='tel'
          inputMode='numeric'
          autoFocus
          value={maxValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='shadow appearance-none rounded w-10 py-1 px-2 text-white bg-gray-600 leading-tight'
          onBlur={handleSubmit}
        />
      ) : (
        <div
          role='button'
          tabIndex={0}
          onKeyDown={handleButtonKeyDown}
          title='Click to change the cards limit. Use 0 (zero) to remove the limit.'
          className={`
              text-white text-sm rounded-full h-8 w-10 flex items-center justify-center
              ${reachedLimit && !isDefault && 'bg-red-500'}
              ${editable ? 'cursor-text' : ''}
            `}
          onClick={handleOnClick}
        >
          {counter}/{maxValue}
        </div>
      )}
    </div>
  );
};

export default CardCounter;
