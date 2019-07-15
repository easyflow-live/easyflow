import { useLayoutEffect, useState, useEffect } from 'react';

const useResizeObserver = (element, callback) => {
  useLayoutEffect(() => {
    if (!element || !element.current) {
      return;
    }

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => callback());
      console.log(element);
      resizeObserver.observe(element.current);

      return () => {
        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      // Browser support, remove freely
      window.addEventListener('resize', callback);

      return () => {
        window.removeEventListener('resize', callback);
      };
    }
  }, [element, callback]);
};

export const useThinDisplay = () => {
  const [isThin, setIsThin] = useState(false);

  // useResizeObserver({ current: window.document.scrollingElement }, () =>
  //   setIsThin(window.innerWidth < 550)
  // );

  useLayoutEffect(() => {
    setIsThin(window.innerWidth < 550);
  }, []);

  return isThin;
};
