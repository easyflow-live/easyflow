import { memo } from 'react';

interface AvatarProps {
  imgUrl: string;
  username: string;
}

export const Avatar = memo(({ imgUrl, username }: AvatarProps) => (
  <img
    src={imgUrl}
    alt={username}
    className='user-thumbnail'
    title={username}
  />
));
