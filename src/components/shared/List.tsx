import {
  Children,
  isValidElement,
  DetailedHTMLProps,
  LiHTMLAttributes,
  HTMLAttributes,
} from 'react';
import cn from 'classnames';

interface ListProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {}

export const List = ({ children, ...props }: ListProps) => (
  <ul {...props}>
    {Children.map(children, child => {
      if (!isValidElement(child)) return;

      return child;
    })}
  </ul>
);

interface ListItemProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {}

export const ListItem = ({ className, ...props }: ListItemProps) => (
  <li
    {...props}
    className={cn(
      'flex justify-between items-center py-2 px-4 sm:px-8 mb-5 hover:bg-gray-700',
      className
    )}
  />
);
