import PricingCard from './PricingCard';
import { useInView } from 'react-intersection-observer';

import './Pricing.css';
import { AnimatedSlideUp } from 'components/Animated/AnimatedSlideUp';

const Pricing = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className='flex flex-col w-full'>
      <AnimatedSlideUp
        ref={ref}
        show={inView}
        className='flex justify-center mb-16'
      >
        <h2 className='text-4xl mx-auto text-white'>
          Simple and transparent pricing
        </h2>
      </AnimatedSlideUp>

      <div className=' flex flex-col items-stretch w-full relative mx-auto'>
        <div className='PricingCards'>
          <PricingCard
            title='Free'
            price='0'
            description='Free Forever'
            options={[
              { title: '1 board' },
              { title: 'unlimited lists' },
              { title: 'unlimited cards' },
            ]}
            onClick={() => console.log('clicked')}
            colored
          />

          <PricingCard
            title='Personal'
            price='3'
            options={[
              { title: 'unlimited boards' },
              { title: 'unlimited lists' },
              { title: 'unlimited cards' },
            ]}
            onClick={() => console.log('clicked')}
            disabled
          />

          <PricingCard
            title='Team'
            price='5'
            description='$5 per user / month'
            options={[
              { title: 'unlimited boards' },
              { title: 'unlimited lists' },
              { title: 'unlimited cards' },
              { title: '2 free members' },
            ]}
            onClick={() => console.log('clicked')}
            disabled
          />
        </div>
      </div>
    </div>
  );
};
export default Pricing;
