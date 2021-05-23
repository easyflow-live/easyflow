import * as React from 'react'
import { motion } from 'framer-motion'

const variants = {
  teal: {
    x: [-7, 0],
    y: [-4, 1],
  },
  pink: {
    x: [7, 0],
    y: [4, -1],
  },
}

const transition = {
  x: {
    duration: 0.8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
  y: {
    duration: 0.8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export function Loader() {
  return (
    <div className="container">
      <motion.svg
        width={47}
        height={41}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <motion.rect
          x={15}
          y={9}
          width={32}
          height={32}
          rx={4}
          fill="#ED64A6"
          variants={variants}
          transition={transition}
          animate="teal"
        />

        <motion.rect
          width={32}
          height={32}
          rx={4}
          fill="#4FD1C5"
          variants={variants}
          transition={transition}
          animate="pink"
        />
      </motion.svg>
    </div>
  )
}
