/* globals window */
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import cookie from 'js-cookie';

import { normalizeCookieUser } from 'components/providers/SessionProvider';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: ({ user }) => {
      cookie.set('auth', normalizeCookieUser(user));

      return true;
    },
  },
};

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
