import { memo } from 'react';
import cn from 'classnames';

interface TagProps {
  title: string;
  color?: string;
  removable?: boolean;
  className?: string;
  onClick?(tag: string): void;
}

const Tag = ({
  title,
  color = 'purple',
  onClick,
  removable,
  className,
}: TagProps) => {
  const handleClick = () => onClick(title);

  const textColor = `text-${color}-700`;

  return (
    <div
      className={cn(
        'tag px-2 h-6 rounded-full text-xs font-semibold flex items-center',
        removable ? 'tag--removable' : '',
        textColor,
        `bg-${color}-100`,
        className
      )}
    >
      <span
        className={cn('w-2 h-2 rounded-full mr-1', `bg-${color}-400`)}
      ></span>
      {title}
      <span
        className={cn(
          'cursor-pointer ml-2 transition-all',
          textColor,
          removable ? 'inline' : 'hidden'
        )}
        onClick={handleClick}
      >
        x
      </span>
    </div>
  );
};

export default memo(Tag);
