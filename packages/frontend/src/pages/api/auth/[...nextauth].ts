import NextAuth, { Session } from 'next-auth'
import Providers from 'next-auth/providers'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'src/server/db/prisma'
import { JWT, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt'

type Token = {
  id: string
  email: string
}

type TokenUser = {
  id: string
  email: string
  iat: number
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': string[]
    'x-hasura-default-role': string
    'x-hasura-user-id': string
  }
} & JWT

type SessionUser = {
  user: { name: string | undefined; email: string; image: string | undefined }
  expires: string
  id: string
  accessToken: string
} & Session

const options = {
  database: process.env.DATABASE_URL,
  debug: true,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USERNAME || '',
          pass: process.env.EMAIL_PASSWORD || '',
        },
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async (params: JWTEncodeParams | undefined) => {
      const { token: jwtToken, secret } = params || { token: '', secret: '' }

      const token = jwtToken as Token

      const tokenContents = {
        id: token.id,
        email: token.email,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['admin', 'user'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': token.id,
        },
        // iat: Date.now() / 1000,
        // exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        // sub: token.id,
      }

      const encodedToken = jwt.sign(
        tokenContents,
        process.env.JWT_SECRET || secret
      )

      return encodedToken as string
    },
    decode: async (params: JWTDecodeParams | undefined) => {
      const { token: jwtToken, secret } = params || { token: '', secret: '' }

      const token = (jwtToken || '') as string
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || secret)

      return decodedToken as JWT
    },
  },
  callbacks: {
    session: async (session: SessionUser, user: TokenUser) => {
      const encodedToken = jwt.sign(user, process.env.JWT_SECRET || '')

      const userDb = await prisma.users.findUnique({
        where: { id: user.id },
      })

      session = {
        ...session,
        id: user.id,
        accessToken: encodedToken,
        user: {
          ...session.user,
          image: userDb ? userDb.image || undefined : undefined,
          name: userDb ? userDb.name || undefined : undefined,
        },
      }

      return Promise.resolve(session)
    },
    jwt: async (token: Token, user: TokenUser) => {
      const isSignIn = !!user

      if (isSignIn) {
        token.id = user.id
      }

      return Promise.resolve(token)
    },
    redirect: async (url: string) => Promise.resolve(url),
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
