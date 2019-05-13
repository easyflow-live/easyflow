import { useCallback} from 'react';
import Router from 'next/router';

export default (WrappedComponent) => (props) => {
  const { routeTo, children, onClick, ...othersProps } = props;

  const handleOnClick = useCallback(() => {
    onClick && onClick();
    Router.push(routeTo);
  });

  return (
    <WrappedComponent {...othersProps} onClick={handleOnClick}>
      {children}
    </WrappedComponent>
  );
};
