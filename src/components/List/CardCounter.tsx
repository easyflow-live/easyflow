import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useKeySubmit } from '../../hooks/use-key-submit';

const MAX_DEFAULT_VALUE = 0;
const ENTER_CODE = 13;

interface CardCounterProps {
  counter: number;
  max?: number;
  onChange: (value: number) => void;
}

const CardCounter = observer(
  ({ counter, max = MAX_DEFAULT_VALUE, onChange }: CardCounterProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [maxValue, setMaxValue] = useState(max);

    const handleChange = ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) =>
      setMaxValue(parseInt(value, 10) >= 0 ? parseInt(value, 10) : 0);

    const handleOnClick = (e: React.MouseEvent) => {
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
        {isEditing ? (
          <input
            min={MAX_DEFAULT_VALUE}
            type='tel'
            inputMode='numeric'
            autoFocus
            value={maxValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight'
            onBlur={handleSubmit}
          />
        ) : (
          <div
            role='button'
            tabIndex={0}
            onKeyDown={handleButtonKeyDown}
            title='Click to change the cards limit. Use 0 (zero) to remove the limit.'
            className={`
              text-white text-sm rounded-full h-8 w-10 flex items-center justify-center cursor-pointer
              ${reachedLimit && !isDefault ? 'bg-red-500' : 'bg-teal-500 '}
            `}
            onClick={handleOnClick}
          >
            {counter}/{max}
          </div>
        )}
      </div>
    );
  }
);

export default CardCounter;
