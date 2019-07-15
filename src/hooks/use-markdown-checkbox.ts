import { useCallback } from 'react';

// identify the clicked checkbox by its index and give it a new checked attribute
export const useMarkdownCheckbox = (
  text: string
): (({ checked, index }: { checked: boolean; index: number }) => string) => {
  let j = 0;
  const toggle = useCallback(
    ({ checked, index }) =>
      text.replace(/\[(\s|x)\]/g, match => {
        let newString;
        if (index === j) {
          newString = checked ? '[x]' : '[ ]';
        } else {
          newString = match;
        }
        j += 1;
        return newString;
      }),
    [text]
  );

  return toggle;
};
