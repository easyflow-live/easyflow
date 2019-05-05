import React, { useContext } from 'react';

import app from '../../firebase.service';

export const FirebaeContext = React.createContext(null);

export const FirebaseProvider = props => {
  return <FirebaeContext.Provider {...props} value={app} />;
};

export const useFirebase = () => {
  return useContext(FirebaeContext);
};
