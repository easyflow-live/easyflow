import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

interface iToken {
  id: string
  email: string
  name?: string
  picture?: string
}

const options = {
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ token, secret }: { token: iToken; secret: string }) => {
      const tokenContents = {
        id: token.id,
        email: token.email,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['admin', 'user'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': token.id,
        },
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        sub: token.id,
      }

      const encodedToken = jwt.sign(
        tokenContents,
        process.env.JWT_SECRET || secret
      )

      return encodedToken
    },
    decode: async ({ token, secret }: { token: string; secret: string }) => {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || secret)

      return decodedToken
    },
  },
  debug: true,
  callbacks: {
    session: async (session, user) => {
      const encodedToken = jwt.sign(user, process.env.JWT_SECRET)

      session.id = user.id
      session.accessToken = encodedToken

      return Promise.resolve(session)
    },
    jwt: async (token, user) => {
      const isSignIn = !!user

      if (isSignIn) {
        token.id = user.id
      }

      return Promise.resolve(token)
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
