import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import { useIsMobileSafari } from 'hooks/use-is-mobile-safari';
import FirebaseAuth from './FirebaseAuth';

const SafariButtonWarning = () => {
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
    <FirebaseAuth />
  );
};

export default SafariButtonWarning;
