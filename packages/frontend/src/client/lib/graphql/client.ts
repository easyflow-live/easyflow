import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  from,
  createHttpLink,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { pathEq } from 'ramda'

const apolloCache = new InMemoryCache()

const getToken = () => {
  if (!process.browser) return ''

  const token = window.localStorage.getItem('token')

  if (!token) return ''

  return `Bearer ${token}`
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const hasExpired = pathEq([0, 'extensions', 'code'], 'invalid-jwt')

  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

    if (hasExpired(graphQLErrors)) {
      localStorage.removeItem('token')
    }
  }

  if (networkError) console.error('[Network error]', networkError)
})

const createConnectionParams = () => {
  const token = getToken()

  if (!token) return {}

  return {
    headers: {
      authorization: token,
    },
  }
}

const wsLink = () =>
  new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_HOST!.replace(/http?/, 'ws'),
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: createConnectionParams,
    },
  })

const hasuraLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_HOST,
})

const hasuraLinkWithWs = () => {
  if (!process.browser) return hasuraLink

  return split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink(),
    hasuraLink
  )
}

const authMiddleware = new ApolloLink((operation, forward) => {
  if (!process.browser) return forward(operation)

  const token = getToken() || 'Bearer invalid-token'
  const authHeaders = { authorization: token }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...authHeaders,
    },
  }))

  return forward(operation)
})

const createClient = () => {
  return new ApolloClient({
    ssrMode: false,
    cache: apolloCache,
    link: from([errorLink, authMiddleware, hasuraLinkWithWs()]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  })
}

export default createClient
