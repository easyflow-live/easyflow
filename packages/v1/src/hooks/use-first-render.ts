import { useRef, useEffect } from 'react';

export const useFirstRender = (callback?: () => void): [boolean] => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      callback && callback();
    }
  });

  return [firstRender.current];
};
