import React from 'react';
import { Title } from 'react-head';
import { FaUserSecret } from 'react-icons/fa';

import './LandingPage.scss';
import { useGoogleLogin } from '../../hooks/useLogin';
import CallToActionButton from '../Buttons/CallToActionButton';

const LandingPage = () => {
  const { login } = useGoogleLogin();

  return (
    <div>
      <Title>Easy Flow</Title>

      <div className='fixed z-100 bg-gray-800 inset-x-0 top-0 lg:static flex items-center shadow-lg'>
        <div
          className='w-full max-w-screen-xl relative mx-auto px-6'
          style={{ maxWidth: '1280px' }}
        >
          <div className='h-24 flex flex-col justify-center'>
            <div className='flex items-center -mx-6'>
              <div className='lg:w-1/4 xl:w-1/5 pl-6 pr-6'>
                <div className='flex items-center'>
                  <a href='/' className='block'>
                    <span className='md:block text-2xl text-white'>
                      <span className='text-teal-500'>easy</span>flow
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='w-full relative mx-auto px-6 pt-16 pb-40 md:pb-24'
        style={{ maxWidth: '1280px' }}
      >
        <div className='xl:flex -mx-6'>
          <div className='px-6 text-left md:text-center xl:text-left max-w-2xl md:max-w-3xl mx-auto'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-light text-white leading-tight'>
              Free. Simple. Beautiful. Darker.
              <span className='sm:block text-teal-500 font-normal'>
                Everything a project manager should be.
              </span>
            </h1>
            <p className='mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-500'>
              Easy Flow is a real time collaborative project manager based on
              Kanban methodology. We make everything easier so you and your team
              can focus on complete tasks and ship great products.
            </p>
            <div className='flex mt-6 justify-start md:justify-center xl:justify-start'>
              <CallToActionButton onClick={login}> Get Started </CallToActionButton>
            </div>
          </div>
          <div className='mt-12 xl:mt-0 px-6 flex-shrink-0 hidden md:block'>
            <svg
              id='effd0595-b14c-4c7e-b56f-e463e9379f7d'
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              width='600'
              height='400'
              viewBox='0 0 930 788'
              className='mx-auto'
            >
              <title>process</title>
              <circle
                cx='748.16555'
                cy='49.47737'
                r='14.75556'
                fill='#f1f1f1'
              />
              <circle
                cx='661.16555'
                cy='620.47737'
                r='14.75556'
                fill='#f1f1f1'
              />
              <circle
                cx='294.16555'
                cy='191.47737'
                r='14.75556'
                fill='#f1f1f1'
              />
              <ellipse cx='157' cy='765' rx='157' ry='23' fill='#f1f1f1' />
              <path
                d='M374.93615,654.976,414.351,642.62838a144.4615,144.4615,0,0,0-14.72211-46.99462l-39.41484,12.34757A88.61133,88.61133,0,0,1,374.93615,654.976Z'
                transform='translate(-135 -56)'
                fill='#1297b2'
              />
              <circle
                cx='145.20015'
                cy='266.35278'
                r='36.79985'
                fill='#2f2e41'
              />
              <polygon
                points='105.5 727.5 98.5 757.5 115.5 757.5 122.5 723.5 105.5 727.5'
                fill='#9f616a'
              />
              <polygon
                points='187.5 727.5 187.5 755.5 204.5 757.5 204.5 727.5 187.5 727.5'
                fill='#9f616a'
              />
              <path
                d='M235.5,465.5s2,43,4,46,20,46,20,46l9-28s-14-23-12-36,.74-28.99711.74-28.99711Z'
                transform='translate(-135 -56)'
                fill='#9f616a'
              />
              <circle cx='157.5' cy='277.5' r='28' fill='#9f616a' />
              <path
                d='M269.5,336.5s1,40-6,46,40,1,40,1-10-28-2-34S269.5,336.5,269.5,336.5Z'
                transform='translate(-135 -56)'
                fill='#9f616a'
              />
              <path
                d='M306.5,381.5s-6-11-14-10-34,3-35,5-4,9-6,11-17,5-18,17,36,85,36,85-5,17-4,21-5,16-4,21-15,35-7,74v63s-27,109-19,117,35,3,40,0,26-154,26-154l10-51,1,112s-2,94,5,97,34,4,36-2c1.55984-4.67951,9.2024-129.18869,12.49082-183.76643a203.90452,203.90452,0,0,0-4.40285-56.17549C357.42589,528.6804,351.3835,506.5015,344.5,497.5c-13-17-21-71-21-71l17-31s-10-10-16-10S306.5,381.5,306.5,381.5Z'
                transform='translate(-135 -56)'
                fill='#2f2e41'
              />
              <path
                d='M239.5,397.5l-5.27357,3.58937S230.5,465.5,233.5,469.5s23.85728,2.04776,25.42864-1.47612S239.5,397.5,239.5,397.5Z'
                transform='translate(-135 -56)'
                fill='#2f2e41'
              />
              <path
                d='M321.5,457.5s1,42,7,54,28,62,28,62-1.277,55.0315,9.86148,41.51575S370.5,569.5,370.5,569.5l-19-74s-10-33-9-43S321.5,457.5,321.5,457.5Z'
                transform='translate(-135 -56)'
                fill='#9f616a'
              />
              <path
                d='M339.5,795.29921s1-.79921,4,2.20079,11,7,10,18-7,13-7,13v-3h-3v5s-5,16-28,6c0,0-1-8,0-13s1-29,4-28,11,2,13,6S340.5,804.09843,339.5,795.29921Z'
                transform='translate(-135 -56)'
                fill='#2f2e41'
              />
              <path
                d='M236.5,796.29921s-1-.79921-4,2.20079-11,7-10,18,7,13,7,13v-3h3v5s5,16,28,6c0,0,1-8,0-13s-1-29-4-28-11,2-13,6S235.5,805.09843,236.5,796.29921Z'
                transform='translate(-135 -56)'
                fill='#2f2e41'
              />
              <path
                d='M326.5,392.5l14,3s0,22,4,31,11,30,8,31-31,15-33,7S312.5,392.5,326.5,392.5Z'
                transform='translate(-135 -56)'
                fill='#2f2e41'
              />
              <circle
                cx='105.33366'
                cy='217.89966'
                r='36.79985'
                fill='#2f2e41'
              />
              <path
                d='M208.59183,304.3723a36.80186,36.80186,0,0,0,56.82871-19.323A36.80188,36.80188,0,1,1,193.634,269.958,36.7883,36.7883,0,0,0,208.59183,304.3723Z'
                transform='translate(-135 -56)'
                fill='#2f2e41'
              />
              <circle
                cx='135.38687'
                cy='272.48608'
                r='26.98656'
                fill='#2f2e41'
              />
              <ellipse
                cx='158.0801'
                cy='262.36611'
                rx='23.9199'
                ry='18.70659'
                fill='#2f2e41'
              />
              <ellipse
                cx='164.46023'
                cy='281.53469'
                rx='4.53977'
                ry='8.03191'
                fill='#a0616a'
              />
              <rect
                x='468.23543'
                y='145.3883'
                width='534'
                height='429'
                transform='matrix(0.95775, 0.2876, -0.2876, 0.95775, -0.4351, -252.24625)'
                fill='#f1f1f1'
              />
              <line
                x1='611.1651'
                y1='141.89293'
                x2='732.30548'
                y2='190.85793'
                fill='none'
                stroke='#3f3d56'
                strokeMiterlimit='10'
                strokeWidth='2'
              />
              <polygon
                points='614.244 151.96 616.058 151.113 611.876 142.182 621.09 138.664 620.374 136.795 609.153 141.082 614.244 151.96'
                fill='#3f3d56'
              />
              <polygon
                points='723.096 195.958 722.38 194.089 731.593 190.572 727.412 181.64 729.226 180.793 734.316 191.673 723.096 195.958'
                fill='#3f3d56'
              />
              <circle cx='671.73528' cy='166.37543' r='11' fill='#3f3d56' />
              <line
                x1='601.93365'
                y1='481.35077'
                x2='713.53687'
                y2='413.40012'
                fill='none'
                stroke='#3f3d56'
                strokeMiterlimit='10'
                strokeWidth='2'
              />
              <polygon
                points='611.848 484.891 612.251 482.93 602.59 480.953 605.268 471.461 603.341 470.919 600.082 482.48 611.848 484.891'
                fill='#3f3d56'
              />
              <polygon
                points='712.13 423.833 710.203 423.291 712.882 413.801 703.22 411.822 703.624 409.862 715.391 412.274 712.13 423.833'
                fill='#3f3d56'
              />
              <circle cx='657.73528' cy='447.37543' r='11' fill='#3f3d56' />
              <line
                x1='461.71552'
                y1='266.04443'
                x2='461.75507'
                y2='396.70642'
                fill='none'
                stroke='#3f3d56'
                strokeMiterlimit='10'
                strokeWidth='2'
              />
              <polygon
                points='453.538 272.674 455.003 274.038 461.714 266.812 468.431 274.034 469.895 272.669 461.713 263.875 453.538 272.674'
                fill='#3f3d56'
              />
              <polygon
                points='453.573 390.082 455.038 388.717 461.753 395.939 468.466 388.713 469.931 390.077 461.754 398.875 453.573 390.082'
                fill='#3f3d56'
              />
              <circle cx='461.73528' cy='331.37543' r='11' fill='#3f3d56' />
              <rect x='369' width='182' height='226' fill='#3f3d56' />
              <path
                d='M583.6211,140.13446H542.31744a144.46152,144.46152,0,0,1,0-49.24667H583.6211A88.6115,88.6115,0,0,0,583.6211,140.13446Z'
                transform='translate(-135 -56)'
                fill='#ff6584'
              />
              <path
                d='M606.3789,165.11221h41.30366a144.46152,144.46152,0,0,0,0-49.24667H606.3789A88.6115,88.6115,0,0,1,606.3789,165.11221Z'
                transform='translate(-135 -56)'
                fill='#1297b2'
              />
              <path
                d='M567.3789,247.11221h41.30366a144.46152,144.46152,0,0,0,0-49.24667H567.3789A88.6115,88.6115,0,0,1,567.3789,247.11221Z'
                transform='translate(-135 -56)'
                fill='#1297b2'
              />
              <rect x='748' y='215' width='182' height='226' fill='#3f3d56' />
              <rect x='774' y='263' width='130' height='6' fill='#1297b2' />
              <rect x='774' y='284' width='130' height='6' fill='#1297b2' />
              <rect x='774' y='305' width='130' height='6' fill='#1297b2' />
              <rect x='774' y='326' width='130' height='6' fill='#1297b2' />
              <rect x='774' y='347' width='130' height='6' fill='#1297b2' />
              <rect x='805' y='369' width='68' height='24' fill='#1297b2' />
              <rect x='385' y='447' width='182' height='226' fill='#3f3d56' />
              <rect
                x='411.29654'
                y='572.80611'
                width='130'
                height='6'
                fill='#1297b2'
              />
              <rect
                x='411.29654'
                y='593.80611'
                width='130'
                height='6'
                fill='#1297b2'
              />
              <rect
                x='411.29654'
                y='614.80611'
                width='130'
                height='6'
                fill='#1297b2'
              />
              <rect
                x='411.29654'
                y='635.80611'
                width='130'
                height='6'
                fill='#1297b2'
              />
              <path
                d='M586.1211,583.44057H544.81744a144.46158,144.46158,0,0,1,0-49.24668H586.1211A88.61154,88.61154,0,0,0,586.1211,583.44057Z'
                transform='translate(-135 -56)'
                fill='#1297b2'
                opacity='0.3'
              />
              <rect
                x='468.29654'
                y='482.80611'
                width='76'
                height='5'
                fill='#1297b2'
                opacity='0.3'
              />
              <rect
                x='468.29654'
                y='500.80611'
                width='76'
                height='5'
                fill='#1297b2'
                opacity='0.3'
              />
              <rect
                x='468.29654'
                y='518.80611'
                width='76'
                height='5'
                fill='#1297b2'
                opacity='0.3'
              />
              <rect
                x='468.29654'
                y='536.80611'
                width='76'
                height='5'
                fill='#1297b2'
                opacity='0.3'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
