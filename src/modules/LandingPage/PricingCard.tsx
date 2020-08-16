import { FaCheck } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

import './PricingCard.css';
import { AnimatedSlideUp } from 'components/Animated/AnimatedSlideUp';

interface PricingCardProps {
  title: string;
  price: string;
  description?: string;
  colored?: boolean;
  options: Array<{ title: string }>;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const PricingCard = ({
  title,
  price,
  description = '',
  options,
  onClick,
  colored,
  className = '',
  disabled,
}: PricingCardProps) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <AnimatedSlideUp
      ref={ref}
      className={`PricingCard rounded-lg w-full p-10 ${className} ${
        colored ? 'bg-teal-500 ' : 'bg-white'
      }
      ${disabled && 'PricingCard--disabled'}
      `}
      show={inView}
    >
      <>
        <div className='flex flex-col items-center'>
          <h3 className='text-2xl text-gray-800'>{title}</h3>
          <p className='text-5xl text-pink-500'>
            <small className='text-base align-top'>$</small>
            {price}
            <small className='text-base'>/ month</small>
          </p>
          <p className='text-gray-800'>{description}</p>
        </div>
        <ul>
          {options.map((o, i) => (
            <li className='flex mt-2' key={i}>
              <FaCheck style={{ color: 'green' }} />
              <span className='ml-3'>{o.title}</span>
            </li>
          ))}
        </ul>
        <div className='mt-auto'>
          {disabled ? (
            <div className='p-6 w-full text-center text-gray-700'>
              <span>Coming Soon</span>
            </div>
          ) : (
            <button
              className={`p-6 rounded-lg w-full ${
                colored
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'border border-pink-500 border-solid hover:bg-pink-500 hover:text-white'
              }`}
              onClick={onClick}
            >
              Get Started
            </button>
          )}
        </div>
      </>
    </AnimatedSlideUp>
  );
};

export default PricingCard;
