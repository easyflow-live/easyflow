import { NextApiRequest, NextApiResponse } from 'next'
import { getAuthenticatedUser } from 'src/server/auth/getAuthenticatedUser'
import { verifyActionToken } from 'src/server/auth/verifyActionToken'
import prisma from 'src/server/db/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  verifyActionToken(req)
  const authUser = getAuthenticatedUser(req)
  const user = await prisma.users.findUnique({
    where: { id: authUser.id },
  })

  if (!user) {
    return res.status(404)
  }

  return res.send({
    name: user.name,
    email: user.email,
    image: user.image,
    theme: user.theme,
    username: user.username,
    description: user.description,
  })
}
