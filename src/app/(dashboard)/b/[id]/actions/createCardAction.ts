'use server'

import prismadb from '@/libs/prismadb'

export async function createCardAction(formData: FormData) {
  const title = String(formData.get('title'))
  const text = String(formData.get('text'))
  const assigneeId = String(formData.get('assigneeId'))
  const groupId = String(formData.get('groupId'))
  const index = Number(formData.get('index'))

  await prismadb.card.create({
    data: {
      color: '',
      index,
      title,
      text,
      assigneeId,
      groupId,
    },
  })
}
