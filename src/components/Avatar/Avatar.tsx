import { useEffect, useState } from 'react';
import { FaUserSecret } from 'react-icons/fa';
import * as firebase from 'firebase/app';

type AvatarProps = {
  user: firebase.firestore.DocumentReference | firebase.User;
  children: React.ReactChild;
};

export const Avatar = ({ user }: AvatarProps) => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // @ts-ignore
      setUserState(user && user.get ? (await user.get()).data() : user);
    }
    fetchData();
  }, [user]);

  return (
    <div>
      {userState ? (
        <img
          src={userState.photoURL || userState.photo}
          alt={userState.displayName || userState.username}
          className="user-thumbnail"
          title={userState.displayName || userState.username}
        />
      ) : (
        <FaUserSecret className="guest-icon" />
      )}
    </div>
  );
};
