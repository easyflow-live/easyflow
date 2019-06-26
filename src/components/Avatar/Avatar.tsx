import { memo, CSSProperties } from 'react';

interface AvatarProps {
  imgUrl: string;
  username: string;
  className?: string;
  style?: CSSProperties;
}

export const Avatar = memo(
  ({ imgUrl, username, className, ...props }: AvatarProps) => (
    <img
      src={imgUrl}
      alt={username}
      className={`h-10 rounded-full ${className}`}
      title={username}
      {...props}
    />
  )
);
