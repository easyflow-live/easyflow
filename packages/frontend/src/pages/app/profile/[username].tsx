import { GetServerSideProps } from 'next'
import { Profile } from 'src/client/modules/User/Pages/Profile'
import prisma from 'src/server/db/prisma'

export default Profile

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const username = (query.username || '') as string

  const user = await prisma.users.findUnique({
    where: { username },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  const { created_at, updated_at, email_verified, ...rest } = user

  return { props: { user: rest } }
}
