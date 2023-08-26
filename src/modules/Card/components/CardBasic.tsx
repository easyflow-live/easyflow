import React, { FC, ReactChild } from 'react'
import cn from 'classnames'

export interface CardBasicProps extends WithChildren {
  bgColor: string
  previewMode?: boolean
  isHidden?: boolean
  renderBadges?: () => ReactChild
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
}

export const CardBasic: FC<CardBasicProps> = ({
  children,
  previewMode,
  bgColor,
  isHidden,
  renderBadges,
  onClick,
  onKeyDown,
}) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        'card relative text-sm select-none rounded my-2 mx-0 text-gray-900 break-words',
        { hidden: isHidden },
        { 'cursor-pointer': !previewMode }
      )}
      style={{ backgroundColor: bgColor, minHeight: '60px' }}
    >
      <div className="p-2">{children}</div>

      {renderBadges && renderBadges()}
    </div>
  )
}
