import { useLayoutEffect, useCallback, useState, DependencyList } from 'react';

export const useRect = (ref, deps: DependencyList = []) => {
  const [rect, setRect] = useState(
    getRect(ref && ref.current ? ref.current : undefined)
  );

  const refreshRect = useCallback(() => {
    if (!(ref && ref.current)) {
      return;
    }

    // Update client rect
    setRect(getRect(ref.current));
  }, [ref, ...deps]);

  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    refreshRect();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => refreshRect());
      resizeObserver.observe(ref.current);

      return () => {
        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      // Browser support, remove freely
      window.addEventListener('resize', refreshRect);

      return () => {
        window.removeEventListener('resize', refreshRect);
      };
    }
  }, [ref, ...deps]);

  return [rect, refreshRect];
};

function getRect(element) {
  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
}
