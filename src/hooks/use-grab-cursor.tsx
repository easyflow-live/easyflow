import { useEffect } from 'react';

export const useGrabCursor = (isDragging: boolean) => {
  useEffect(() => {
    if (!isDragging) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    return () => {
      document.body.style.cursor = '';
    };
  }, [isDragging]);
};
