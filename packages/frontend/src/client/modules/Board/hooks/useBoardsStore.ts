import create from 'zustand'
import { Board, LoadingStatus } from '../domain/types'
import { boards } from './mock'

type State = {
  boards: Board[]
  status: LoadingStatus
  fetchBoards: () => void
}

export const useBoardsStore = create<State>((set, get) => ({
  boards: [],
  status: 'idle',
  fetchBoards: () => {
    set({ status: 'pending' })

    setTimeout(() => {
      set({ boards })
      set({ status: 'fulfilled' })
    }, 1000)
  },
}))
