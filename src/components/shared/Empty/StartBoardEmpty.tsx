'use client'

import { BoardAdder } from '@/modules/Dashboard/components/BoardAdder'
import { Empty } from './Empty'

export const StartProjectEmpty = () => (
  <Empty
    image={null}
    message="Create a board to start a project and get things done."
    button={<BoardAdder />}
    messageClass="mt-8"
  />
)
