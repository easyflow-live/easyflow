import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import { useIsMobileSafari } from 'hooks/use-is-mobile-safari';
import { Button } from 'components/shared';

interface SafariWarningProps {
  onLogin: () => void;
}

const SafariButtonWarning: React.FC<SafariWarningProps> = ({
  children,
  onLogin,
}) => {
  const isMobileSafari = useIsMobileSafari();

  return isMobileSafari ? (
    <p className='text-red-500 '>
      <FaExclamationTriangle className='inline mr-1' />
      <span>
        This app is unavailable when using Safari on IPhone because of iOS
        native issues. Please use the app from Google Chrome or Firefox. We hope
        to improve this as soon as possible.
      </span>
    </p>
  ) : (
    <Button onClick={onLogin}>{children}</Button>
  );
};

export default SafariButtonWarning;
