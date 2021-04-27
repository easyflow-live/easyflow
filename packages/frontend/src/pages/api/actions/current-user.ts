import { NextApiRequest } from 'next'
import { getAuthenticatedUser } from 'server/auth/getAuthenticatedUser'
import { verifyActionToken } from 'server/auth/verifyActionToken'
import prisma from 'server/db/prisma'

export default async (req: NextApiRequest, res) => {
  verifyActionToken(req)
  const authUser = getAuthenticatedUser(req)
  const user = await prisma.users.findUnique({
    where: { id: authUser.id },
  })

  return res.send({
    name: user.name,
    email: user.email,
    image: user.image,
    theme: user.theme,
  })
}
