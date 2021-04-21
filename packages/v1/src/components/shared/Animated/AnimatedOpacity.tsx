import { animated, useTransition } from 'react-spring';
import { ReactChild } from 'react';

interface AnitedOpacityProps {
  show: boolean;
  children: ReactChild;
}

export const AnimatedOpacity = ({ show, children }: AnitedOpacityProps) => {
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {children}
            </animated.div>
          )
      )}
    </>
  );
};
