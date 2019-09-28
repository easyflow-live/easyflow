import { useEffect } from 'react';
import { usePrevious } from './use-previous';

export const useClickOutside = ({ element, active, onClick }) => {
  const previousActive = usePrevious(active);

  useEffect(() => {
    if (!element) return;

    const handleClick = event => {
      const { current } = element;

      if (!current) return;

      if (!hasParent(event.target, current)) {
        if (typeof onClick === 'function') {
          onClick(event);
        }
      }
    };

    if (active) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }

    if (!previousActive && active) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }

    if (previousActive && !active) {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    }

    return () => {
      if (active) {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('touchstart', handleClick);
      }
    };
  }, [active, element && element.current]);
};

function hasParent(element, root) {
  return root.contains(element) && isInDOM(element);
}

function isInDOM(obj) {
  return Boolean(obj.closest('body'));
}
