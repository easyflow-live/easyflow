import { CSSProperties } from 'react';
import './Tag.css';

interface TagProps {
  title: string;
  color?: string;
  bgcolor?: string;
  tagStyle?: CSSProperties;
  removable?: boolean;
  onClick?(tag: string): void;
}

const Tag = ({
  title,
  color,
  bgcolor,
  tagStyle,
  onClick,
  removable,
  ...otherProps
}: TagProps) => {
  const style = {
    color: color || 'white',
    backgroundColor: bgcolor || '#025E6B',
    ...tagStyle,
  };

  const handleClick = () => onClick(title);

  return (
    <span
      style={style}
      className={`tag ${removable ? 'tag--removable' : ''}`}
      {...otherProps}
    >
      {title}
      <span className='tag__close' onClick={handleClick}>
        x
      </span>
    </span>
  );
};

export default Tag;
