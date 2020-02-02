import { useCallback } from 'react';
import { useRef } from 'react';

// identify the clicked checkbox by its index and give it a new checked attribute
export const useMarkdownCheckbox = (
  text: string
): (({ checked, index }: { checked: boolean; index: number }) => string) => {
  const jRef = useRef(0);

  const toggle = useCallback(
    ({ checked, index }) =>
      text.replace(/\[(\s|x)\]/g, match => {
        let newString: string;
        if (index === jRef.current) {
          newString = checked ? '[x]' : '[ ]';
        } else {
          newString = match;
        }
        jRef.current += 1;
        return newString;
      }),
    [text]
  );

  return toggle;
};
