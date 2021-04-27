import { ApolloProviderProps } from '@apollo/client/react/context'
import { ApolloProvider } from '@apollo/client'
import createClient from './client'

const client = createClient()

export function GraphQLProvider(
  props: Omit<ApolloProviderProps<unknown>, 'client'>
) {
  return <ApolloProvider client={client} {...props} />
}
