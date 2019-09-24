import { useLayoutEffect, useCallback, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useRect = (ref): [ClientRect, () => void] => {
  const [rect, setRect] = useState<ClientRect>(
    getRect(ref && ref.current ? ref.current : undefined)
  );

  const refreshRect = useCallback(() => {
    if (!(ref && ref.current)) {
      return;
    }
    console.log('resized', ref.current);

    // Update client rect
    setRect(getRect(ref.current));
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    refreshRect();

    let resizeObserver = new ResizeObserver(() => refreshRect());
    resizeObserver.observe(ref.current);

    return () => {
      if (!resizeObserver) {
        return;
      }

      resizeObserver.disconnect();
      resizeObserver = null;
    };
  }, [ref]);

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
