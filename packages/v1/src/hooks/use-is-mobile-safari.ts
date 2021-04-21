import { useEffect, useState } from 'react';

export const useIsMobileSafari = () => {
  const [isMobileSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      /^((?!chrome|android|macintosh|crios|fxios).)*safari/i.test(
        window.navigator.userAgent
      )
    );
  }, []);

  return isMobileSafari;
};
