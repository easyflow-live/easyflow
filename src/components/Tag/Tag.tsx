import { CSSProperties, memo } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import './Tag.css';

interface TagProps {
  title: string;
  color?: string;
  bgcolor?: string;
  tagStyle?: CSSProperties;
  removable?: boolean;
  className?: string;
  onClick?(tag: string): void;
}

// TODO: Pass a prop to show/hide close button

const Tag = ({
  title,
  color,
  bgcolor,
  tagStyle,
  onClick,
  removable,
  className,
  ...otherProps
}: TagProps) => {
  const style = {
    color: color || 'white',
    backgroundColor: bgcolor || '#025E6B',
    ...tagStyle,
  };

  const handleClick = () => onClick(title);

  return (
    <StyledTag
      style={style}
      className={classNames(
        'tag',
        removable ? 'tag--removable' : '',
        className
      )}
      {...otherProps}
    >
      {title}
      <span className='tag__close' onClick={handleClick}>
        x
      </span>
    </StyledTag>
  );
};

export default memo(Tag);

const StyledTag = styled.span`
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 1rem;
  position: relative;

  &:first-child {
    margin-left: 0;
  }

  & > .tag__close {
    display: none;
    transition: all 0.5s;
    cursor: pointer;
    font-size: 14px;
    margin-left: 6px;
  }
`;
