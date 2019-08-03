import React from 'react';
import { Title } from 'react-head';

import { useGoogleLogin } from '../../hooks/useLogin';
import CallToActionButton from '../Buttons/CallToActionButton';
import Pricing from './Pricing';
import Header from './Header';
import Footer from './Footer';
import { useTrail, animated } from 'react-spring';
import { AnimatedSlideUp } from '../Animated/AnimatedSlideUp';
import { BoardAndProcess } from '../images/BoardAndProcess';
import Article from './Article';
import AnimateSlideUpinView from '../Animated/AnimateSlideUpinView';
import './LandingPage.scss';

const items = ['Simple.', 'Beautiful.', 'Darker.'];
const config = { mass: 5, tension: 2000, friction: 800 };

const LandingPage = () => {
  const { login } = useGoogleLogin();
  const trail = useTrail(items.length, {
    config,
    from: {
      opacity: 0,
      transform: 'translate3d(0, 20px,0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0,0px,0)',
    },
  });

  return (
    <main>
      <Title>Easy Flow</Title>

      <Header />

      <section className='w-full '>
        <div className='mx-auto px-6 py-16' style={{ maxWidth: '1280px' }}>
          <div className='xl:flex -mx-6'>
            <div className='px-6 text-left md:text-center xl:text-left max-w-2xl md:max-w-3xl mx-auto'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-light text-white leading-tight'>
                {trail.map((props, index) => (
                  <animated.div
                    key={items[index]}
                    className='trails-text'
                    style={{
                      ...props,
                      display: 'inline-block',
                      marginRight: '0.5rem',
                    }}
                  >
                    {items[index]}
                  </animated.div>
                ))}
                <AnimatedSlideUp show={true}>
                  <span className='sm:block text-teal-500 font-normal'>
                    Everything a project manager should be.
                  </span>
                </AnimatedSlideUp>
              </h1>
              <AnimatedSlideUp show={true}>
                <>
                  <p className='mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-500'>
                    Easy Flow is a{' '}
                    <span className='text-teal-500'>real time</span>{' '}
                    collaborative project manager based on Kanban methodology.
                    We make everything easier so you and your team can focus on
                    complete tasks and ship great products.
                  </p>
                  <div className='flex mt-6 justify-start md:justify-center xl:justify-start'>
                    <CallToActionButton onClick={login}>
                      Get Started
                    </CallToActionButton>
                  </div>
                </>
              </AnimatedSlideUp>
            </div>
            <AnimatedSlideUp
              show={true}
              className='mt-20 xl:mt-0 px-6 flex-shrink-0 hidden md:block'
            >
              <BoardAndProcess />
            </AnimatedSlideUp>
          </div>
        </div>
      </section>

      <section className='w-full pt-16 md:pt-32 pb-32'>
        <div className='px-6 py-16 mx-auto' style={{ maxWidth: '1280px' }}>
          <AnimateSlideUpinView>
            <h2 className='text-white mb-16 md:mb-32 text-4xl text-center'>
              Features
            </h2>
          </AnimateSlideUpinView>

          <Article
            subtitle='Boards'
            title='Easier to visualize all information and tasks'
            description='Visualize your workflow. Move taks through multiple stages
              quickly, easily, and beautifully.'
            srcImg='/static/images/book-store-board.png'
          />
        </div>
      </section>

      <section
        className='w-full py-16 md:py-32'
        style={{ backgroundColor: '#4a556875' }}
      >
        <div className='px-6 py-16 mx-auto' style={{ maxWidth: '1280px' }}>
          <Article
            reverse
            subtitle='Team'
            title='Collaborative boards'
            description=' Manage your team. Invite others EasyFlow users.'
            srcImg='/static/images/board-members.png'
            sizeImg='small'
          />
        </div>
      </section>

      <section className='w-full py-16 md:py-32'>
        <div className='px-6 py-16 mx-auto' style={{ maxWidth: '1280px' }}>
          <Article
            subtitle='Cards'
            title='Use all the powers of Markdown'
            description='Markdown will let you to write the way you want. Create checklists, lists, images and links with ease.'
            srcImg='/static/images/card-modal.png'
            sizeImg='small'
          />
        </div>
      </section>

      <section className='w-full pt-0 pb-16'>
        <div className='px-6 py-16 mx-auto' style={{ maxWidth: '1280px' }}>
          <div className='flex flex-col items-center mt-6 '>
            <AnimateSlideUpinView>
              <h2 className='text-white mb-16 text-4xl text-center'>
                Start today and get more done in a simple way
              </h2>
            </AnimateSlideUpinView>
            <CallToActionButton onClick={login}>Get Started</CallToActionButton>
          </div>
        </div>
      </section>

      {/* <section
        className='flex w-full mx-auto px-6 py-16'
        style={{ maxWidth: '1280px' }}
      >
        <Pricing />
      </section> */}

      <Footer />
    </main>
  );
};

export default LandingPage;
