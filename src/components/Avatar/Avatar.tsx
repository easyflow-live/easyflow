import { memo, CSSProperties } from 'react';

interface AvatarProps {
  imgUrl: string;
  username: string;
  className?: string;
  style?: CSSProperties;
  boxShadowColor?: string;
}

export const Avatar = memo(
  ({ imgUrl, username, boxShadowColor, className = '' }: AvatarProps) => (
    <img
      src={imgUrl}
      alt={username}
      className={`avatar h-8 rounded-full ${className}`}
      style={{ boxShadow: `0px 0px 0px 2px ${boxShadowColor}` }}
      title={username}
    />
  )
);
