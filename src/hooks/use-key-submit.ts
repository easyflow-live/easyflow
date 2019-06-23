import { useCallback } from 'react';

type Callback = () => void;
const ENTER_CODE = 13;
const ESCAPE_CODE = 27;

export const useKeySubmit = (
  onEnter: Callback,
  onEscape: Callback
): ((event: React.KeyboardEvent) => void) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.keyCode === ENTER_CODE) {
        event.preventDefault();
        onEnter && onEnter();
      } else if (event.keyCode === ESCAPE_CODE) {
        onEscape && onEscape();
      }
    },
    [onEnter, onEscape]
  );

  return handleKeyDown;
};
