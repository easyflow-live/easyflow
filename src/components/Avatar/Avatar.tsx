import * as React from 'react';
import { FaUserSecret } from 'react-icons/fa';

type AvatarProps = {
  user: any;
};

export class Avatar extends React.Component<AvatarProps> {
  render() {
    const { user } = this.props;
    return (
      <div>
        {user ? (
          <img
            src={user.photoURL || user.photo}
            alt={user.displayName || user.username}
            className="user-thumbnail"
            title={user.displayName || user.username}
          />
        ) : (
          <FaUserSecret className="guest-icon" />
        )}
      </div>
    );
  }
}
