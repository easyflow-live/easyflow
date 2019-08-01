import { animated, useSpring } from 'react-spring';
import { forwardRef, ReactChild } from 'react';

type Ref = HTMLDivElement;

interface AnimatedSlideUpProps {
  show: boolean;
  children: ReactChild;
  className?: string;
}

export const AnimatedSlideUp = forwardRef<Ref, AnimatedSlideUpProps>(
  (props, ref) => {
    const { show, children, className } = props;

    const spring = useSpring({
      from: {
        opacity: 0,
        transform: 'translate3d(0, 20px, 0)',
        freq: '0.0175, 0.0',
      },
      to: {
        opacity: show ? 1 : 0,
        transform: show ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        freq: '0.0, 0.0',
      },
      config: { duration: 500 },
    });

    return (
      <animated.div ref={ref} className={className} style={spring}>
        {children}
      </animated.div>
    );
  }
);
