'use server'

import prismadb from '@/libs/prismadb'

export async function createGroupAction(formData: FormData) {
  const title = String(formData.get('title'))
  const boardId = String(formData.get('boardId'))
  const index = Number(formData.get('index'))

  await prismadb.group.create({
    data: {
      color: '',
      cardsLimit: 0,
      boardId,
      title,
      index,
    },
  })
}
