import { useLayoutEffect, useState } from 'react';

export const useThinDisplay = () => {
  const [isThin, setIsThin] = useState(false);

  useLayoutEffect(() => {
    setIsThin(window.innerWidth < 550);
  });

  return isThin;
};
