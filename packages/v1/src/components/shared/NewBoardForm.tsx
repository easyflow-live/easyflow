import { useState, KeyboardEvent, ChangeEvent } from 'react';

import { useSession } from 'hooks/use-session';
import Button from 'components/shared/Button';
import Input from 'components/shared/Input';
import { isAlphanumeric } from 'helpers/is-alphanumeric';

const MIN_CHAR = 2;
const MAX_CHAR = 6;

const isBoardCodeValid = (code: string) =>
  code !== '' &&
  code.length >= MIN_CHAR &&
  code.length <= MAX_CHAR &&
  isAlphanumeric(code);

const isBoardTitleValid = (title: string) => title !== '';

interface NewBoardFormProps {
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: ({
    title,
    code,
    index,
  }: {
    title: string;
    code: string;
    index: number;
  }) => void;
}

const NewBoardForm = ({
  onKeyDown = () => {},
  onSubmit,
}: NewBoardFormProps) => {
  const { userDoc } = useSession();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCode(e.target.value.toUpperCase());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === '' || code === '') return;

    const index = userDoc.boards.docs.length;

    onSubmit({
      title,
      code,
      index,
    });

    setTitle('');
    setCode('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className='text-white mb-8'>New board</legend>
        <label className='text-gray-300 text-sm'>Name</label>
        <Input
          autoFocus
          value={title}
          onKeyDown={onKeyDown}
          onChange={handleTitleChange}
          placeholder='Ex: Easy Flow'
          className='mt-1 mb-3'
          isRequired
        />

        <label className='text-gray-300 text-sm'>Code</label>
        <span className='block text-xs text-gray-500'>
          Must be between {MIN_CHAR} and {MAX_CHAR} letters or numbers
        </span>
        <Input
          value={code}
          onKeyDown={onKeyDown}
          onChange={handleCodeChange}
          placeholder='Ex: EF'
          className='mt-1 mb-8'
          minLength={MIN_CHAR}
          maxLength={MAX_CHAR}
          isRequired
        />

        <Button
          type='submit'
          disabled={!isBoardTitleValid(title) || !isBoardCodeValid(code)}
          size='small'
          block
        >
          Create Board
        </Button>
      </fieldset>
    </form>
  );
};
export default NewBoardForm;
