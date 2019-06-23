import { observer } from 'mobx-react-lite';

import { useKeySubmit } from '../../hooks/use-key-submit';
import { useState } from 'react';

const MAX_DEFAULT_VALUE = 0;

interface CardCounterProps {
  counter: number;
  max?: number;
  onChange: (value: number) => void;
}

const CardCounter = observer(
  ({ counter, max = MAX_DEFAULT_VALUE, onChange }: CardCounterProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [maxValue, setMaxValue] = useState(max);

    const handleChange = e =>
      setMaxValue(e.target.value >= 0 ? e.target.value : 0);
    const toggleEditing = () => setIsEditing(!isEditing);
    const handleSubmit = () => {
      onChange(maxValue);
      toggleEditing();
    };

    const handleButtonKeyDown = event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        toggleEditing();
      }
    };
    const handleKeyDown = useKeySubmit(handleSubmit, toggleEditing);

    // @ts-ignore
    const isDefault = parseInt(max, 10) === parseInt(MAX_DEFAULT_VALUE, 10);
    // @ts-ignore
    const reachedLimit = parseInt(counter, 10) > parseInt(max, 10);

    return (
      <div>
        {isEditing ? (
          <input
            min={MAX_DEFAULT_VALUE}
            type='number'
            autoFocus
            value={maxValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700'
            onBlur={handleSubmit}
          />
        ) : (
          <span
            role='button'
            tabIndex={0}
            onKeyDown={handleButtonKeyDown}
            title='Click to change the cards limit. Use 0 (zero) to remove the limit.'
            className={`
              text-white text-sm rounded-full h-8 w-10 flex items-center justify-center cursor-pointer
              ${reachedLimit && !isDefault ? 'bg-red-500' : 'bg-teal-500 '}
            `}
            onClick={toggleEditing}
          >
            {counter}/{max}
          </span>
        )}
      </div>
    );
  }
);

export default CardCounter;
