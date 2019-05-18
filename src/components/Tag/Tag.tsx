import './Tag.scss';
import { CSSProperties } from 'react';

interface TagProps {
  title: string;
  color?: string;
  bgcolor?: string;
  tagStyle?: CSSProperties;
  onClick(tag: string): void;
}

const Tag = ({
  title,
  color,
  bgcolor,
  tagStyle,
  onClick,
  ...otherProps
}: TagProps) => {
  const style = {
    color: color || 'white',
    backgroundColor: bgcolor || '#3f51b5',
    ...tagStyle,
  };

  const handleClick = () => onClick(title);

  return (
    <span style={style} className='tag' {...otherProps}>
      <span className='tag__close' onClick={handleClick} />
      {title}
    </span>
  );
};

export default Tag;
