'use client'

import React from 'react'
import { useTrail, animated } from 'react-spring'

// import { AnimatedSlideUp } from '@/components/shared/Animated/AnimatedSlideUp'
import { BoardAndProcess } from '@/components/shared/images/BoardAndProcess'
// import AnimateSlideUpinView from '@/components/shared/Animated/AnimateSlideUpinView'
// import { SafariButtonWarning } from '@/components/shared/SafariButtonWarning's
// import Article from './Article'

const items = ['Simple.', 'Beautiful.', 'Darker.', 'Open source.']

export function LandingPage() {
  const trail = useTrail(items.length, {
    from: {
      opacity: 0,
      transform: 'translate3d(0, 20px,0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0,0px,0)',
    },
  })

  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl pt-12 xl:pt-0 pb-16">
          <div className="xl:flex xl:items-center">
            <div className="px-6 text-left md:text-center xl:text-left max-w-2xl md:max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-4xl xl:text-4xl font-light text-white leading-tight mb-2">
                {trail.map((props, index) => (
                  <animated.div
                    key={items[index]}
                    className="trails-text mr-2 inline-block"
                    style={props}
                  >
                    {items[index]}
                  </animated.div>
                ))}
              </h1>

              <h2 className="text-2xl sm:block text-teal-500 font-normal mb-3">
                Everything a project manager should be.
              </h2>

              <p className="leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-300">
                Easy Flow is a real time collaborative project manager based on
                Kanban methodology. We make everything easier so you and your
                team can focus on complete tasks and ship great products.
              </p>

              <div className="flex mt-6 justify-start md:justify-center xl:justify-start mb-8">
                {/* <SafariButtonWarning /> */}
                <span className="bg-amber-300 rounded p-4 text-amber-900">
                  We are rebuilding from the ground up. Stay tuned!
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <BoardAndProcess className="max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="rgb(58, 68, 86)"
          d="M0,32L80,69.3C160,107,320,181,480,192C640,203,800,149,960,122.7C1120,96,1280,96,1360,96L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          data-darkreader-inline-fill=""
        />
      </svg> */}

      {/* <section
        className="w-full md:pb-32"
        style={{
          backgroundColor: 'rgb(58, 68, 86)',
        }}
      >
        <div className="px-6 py-16 mx-auto" style={{ maxWidth: '1280px' }}>
          <AnimateSlideUpinView>
            <h2 className="text-white mb-16 md:mb-32 text-4xl text-center">
              Features
            </h2>
          </AnimateSlideUpinView>

          <Article
            subtitle="Boards"
            title="Easier to visualize all information and tasks"
            description="Visualize your workflow. Move taks through multiple stages
              quickly, easily, and beautifully."
            srcImg="/static/images/book-store-board.png"
          />
        </div>
      </section> */}

      {/* <section className="w-full md:py-32">
        <div className="px-6 py-16 mx-auto" style={{ maxWidth: '1280px' }}>
          <Article
            reverse
            subtitle="Team"
            title="Collaborative boards"
            description=" Manage your team. Invite others EasyFlow users."
            srcImg="/static/images/board-members.png"
            sizeImg="small"
          />
        </div>
      </section> */}

      {/* <section
        className="w-full md:py-32"
        style={{ backgroundColor: 'rgb(58, 68, 86)' }}
      >
        <div className="px-6 py-16 mx-auto" style={{ maxWidth: '1280px' }}>
          <Article
            subtitle="Cards"
            title="Use all the powers of Markdown"
            description="Markdown will let you to write the way you want. Create checklists, lists, images and links with ease."
            srcImg="/static/images/card-modal.png"
            sizeImg="small"
          />
        </div>
      </section> */}

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="rgb(58, 68, 86)"
          d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,74.7C1120,43,1280,21,1360,10.7L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          data-darkreader-inline-fill=""
        />
      </svg>

      <section className="w-full">
        <div className="px-6 py-16 mx-auto" style={{ maxWidth: '1280px' }}>
          <div className="flex flex-col items-center mt-6 ">
            <AnimateSlideUpinView>
              <h2 className="text-white mb-16 text-4xl text-center">
                Start today and get more done in a simple way
              </h2>
            </AnimateSlideUpinView>
          </div>
        </div>
      </section> */}

      {/* <section
        className='flex w-full mx-auto px-6 py-16'
        style={{ maxWidth: '1280px' }}
      >
        <Pricing />
      </section> */}
    </>
  )
}
