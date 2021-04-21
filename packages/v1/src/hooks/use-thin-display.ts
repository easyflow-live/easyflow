import { useLayoutEffect, useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (element, callback) => {
  useLayoutEffect(() => {
    if (!element || !element.current) {
      return;
    }

    let resizeObserver = new ResizeObserver(() => callback());
    resizeObserver.observe(element.current);

    return () => {
      if (!resizeObserver) {
        return;
      }

      resizeObserver.disconnect();
      resizeObserver = null;
    };
  }, [element, callback]);
};

export const useThinDisplay = () => {
  const [isThin, setIsThin] = useState(false);

  useResizeObserver({ current: window.document.scrollingElement }, () =>
    setIsThin(window.innerWidth < 550)
  );

  useEffect(() => {
    setIsThin(window.innerWidth < 550);
  }, []);

  return isThin;
};
