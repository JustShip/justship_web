import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default function createApolloClient(ctx) {
  const token = ctx.app.$cookies.get('auth._token.local')

  const cache = new InMemoryCache()

  const httpLink = createHttpLink({
    uri: process.env.API_BASE_URL,
    headers: token
      ? {
          authorization: token || null,
        }
      : {},
  })

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      if (
        graphQLErrors[0].message === 'Signature has expired' ||
        graphQLErrors[0].message === 'Error decoding signature' ||
        graphQLErrors[0].message === 'Invalid signature'
      ) {
        if (process.browser) {
          ctx.$auth.setToken('local', null)
          ctx.$auth.logout()
          ctx.$cookies.set('auth._token.local', null)
          window.location = '/signin'
        }
      }
    }
  })

  return {
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
    defaultHttpLink: false,
  }
}
