import { gql } from 'graphql-tag'
export default gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`
