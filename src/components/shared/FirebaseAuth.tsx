/* globals window */
import { useEffect, useState, useRef } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

import { normalizeCookieUser } from 'components/providers/SessionProvider';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }) => {
      cookie.set('auth', normalizeCookieUser(user));

      return true;
    },
  },
};

const FirebaseAuth = () => {
  const route = useRouter();
  const [renderAuth, setRenderAuth] = useState(false);
  const configsRef = useRef<any>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);

      configsRef.current = {
        ...firebaseAuthConfig,
        //...(route.pathname !== '/' ? { signInSuccessUrl: route.asPath } : {}),
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={configsRef.current}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
