import { useCallback } from 'react';
import { useRef } from 'react';

// identify the clicked checkbox by its index and give it a new checked attribute
export const useMarkdownCheckbox = (
  text: string
): (({ checked, index }: { checked: boolean; index: number }) => string) => {
  const jRef = useRef(0);
  const max = text?.match(/\[(\s|x)\]/g)?.length;

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

        if (jRef.current === max) {
          jRef.current = 0;
        }

        return newString;
      }),
    [text, max]
  );

  return toggle;
};
