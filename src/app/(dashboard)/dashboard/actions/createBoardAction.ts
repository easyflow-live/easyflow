'use server'

import prismadb from '@/libs/prismadb'

export async function createBoardAction(formData: FormData) {
  const title = String(formData.get('title'))
  const code = String(formData.get('code'))
  const ownerId = String(formData.get('ownerId'))

  await prismadb.board.create({
    data: {
      title,
      code,
      ownerId,
    },
  })
}
