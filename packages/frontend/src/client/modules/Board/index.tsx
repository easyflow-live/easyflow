import React, { useState } from 'react'
import { useSession } from 'next-auth/client'
import { Loader } from 'src/client/shared/components/Loader'
import {
  useFetchBoardsSubscription,
  useCreateBoardMutation,
} from 'src/types/generated'

export function Boards() {
  const [name, setName] = useState('')
  const [boards, setBoards] = useState([])
  const [session] = useSession()
  const currentUserId = session?.id
  const [
    createBoardMutation,
    { loading: mutationFetching, error: mutationError },
  ] = useCreateBoardMutation()

  useFetchBoardsSubscription({
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      setBoards(data.boards)
    },
  })

  if (!boards) {
    return <Loader />
  }

  const handleSubmit = async () => {
    await createBoardMutation({
      variables: {
        user_id: currentUserId,
        name,
      },
    })

    if (!mutationError) {
      setName('')
    }
  }

  return (
    <div>
      <div>
        {boards.map((board: { id: number; name: string }) => {
          return (
            <div key={board.id}>
              <div>
                <h4>{board.name}</h4>
                <span>{board.id}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
