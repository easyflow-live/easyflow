import { ReactChild } from 'react';
import { useInView } from 'react-intersection-observer';
import { AnimatedSlideUp } from './AnimatedSlideUp';

interface AnimateSlideUpinViewProps {
  children?: ReactChild;
  className?: string;
}

const AnimateSlideUpinView = ({
  children,
  ...props
}: AnimateSlideUpinViewProps) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <AnimatedSlideUp ref={ref} show={inView} {...props}>
      {children}
    </AnimatedSlideUp>
  );
};

export default AnimateSlideUpinView;
