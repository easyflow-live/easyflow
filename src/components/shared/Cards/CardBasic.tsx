import React, { FC, ReactChild } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

export interface CardBasicProps {
  bgColor: string;
  previewMode?: boolean;
  isHidden?: boolean;
  renderBadges?: () => ReactChild;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CardBasic: FC<CardBasicProps> = ({
  children,
  previewMode,
  bgColor,
  isHidden,
  renderBadges,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'card relative text-sm select-none rounded my-2 mx-0 text-gray-900 break-words',
        { hidden: isHidden },
        { 'cursor-pointer': !previewMode }
      )}
      style={{ backgroundColor: bgColor, minHeight: '60px' }}
    >
      <div className='p-2'>{children}</div>

      {renderBadges && renderBadges()}
    </div>
  );
};

export default observer(CardBasic);
