import { memo, DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import cn from 'classnames';

type Size = 'small' | 'medium' | 'big';

const sizes = {
  small: 'h-6 w-6',
  medium: 'h-8 w-8',
  big: 'h-10 w-10',
};

interface AvatarProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  username: string;
  borderColor?: string;
  boxShadowColor?: string;
  size?: Size;
}

const getBorder = (borderColor: string) =>
  borderColor ? `border-2 border-solid ${borderColor}` : '';

export const Avatar = memo(
  ({
    username,
    borderColor,
    className = '',
    size = 'medium',
    ...props
  }: AvatarProps) => (
    <img
      alt={`Avatar image of ${username}`}
      className={cn(
        'avatar rounded-full',
        getBorder(borderColor),
        sizes[size],
        className
      )}
      title={username}
      {...props}
    />
  )
);
