import React from 'react';

import app from '../../firebase.service';

export const FirebaeContext = React.createContext(null);

export const FirebaseProvider = props => (
  <FirebaeContext.Provider {...props} value={app} />
);
