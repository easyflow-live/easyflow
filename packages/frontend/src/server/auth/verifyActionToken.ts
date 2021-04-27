import { NextApiRequest } from 'next'

export const verifyActionToken = (req: NextApiRequest) => {
  const { hasura_action_token } = req.headers

  if (hasura_action_token !== process.env.HASURA_ACTION_TOKEN) {
    throw new Error('Action token not valid')
  }
}
