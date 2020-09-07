import { useLayoutEffect } from 'react';

export const useLockBodyScroll = (enable: boolean) => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (enable) {
      document.body.style.overflow = 'hidden';
    }

    return () => (document.body.style.overflow = originalStyle);
  }, [enable]);
};
