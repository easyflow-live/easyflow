import Editable from 'components/shared/Editable';

const MAX_DEFAULT_VALUE = 0;

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
  const handleSubmit = (value: string) => {
    const maxValue = parseInt(value, 10) >= 0 ? parseInt(value, 10) : 0;
    onChange(maxValue);
  };

  // @ts-ignore
  const isDefault = parseInt(max, 10) === parseInt(MAX_DEFAULT_VALUE, 10);
  // @ts-ignore
  const reachedLimit = parseInt(counter, 10) > parseInt(max, 10);

  // if number type is used here, the click button stops work ib Firefox
  // https://github.com/facebook/react/issues/6556
  return (
    <div className='pl-2'>
      <Editable
        value={max.toString()}
        onSubmit={handleSubmit}
        editable={editable}
        inputProps={{
          min: MAX_DEFAULT_VALUE,
          type: 'tel',
          inputMode: 'numeric',
          full: false,
          className: 'w-12',
        }}
      >
        {({ value, onClick }) => (
          <button
            title='Click to change the cards limit. Use 0 (zero) to remove the limit.'
            className={`
              text-white text-sm rounded-full h-8 w-10 flex items-center justify-center
              ${reachedLimit && !isDefault && 'bg-red-500'}
              ${editable ? 'cursor-text' : 'cursor-default'}
            `}
            onClick={onClick}
          >
            {counter}/{value}
          </button>
        )}
      </Editable>
    </div>
  );
};

export default CardCounter;
