import { NextApiRequest } from 'next'

export const getAuthenticatedUser = (
  req: NextApiRequest
): { id: string; role: string } => {
  const { session_variables } = req.body
  const { 'x-hasura-user-id': id, 'x-hasura-role': role } = session_variables

  return { id, role }
}
