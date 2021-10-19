import { gql } from 'graphql-tag'
export default gql`
  mutation signUp(
    $token: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      token: $token
      email: $email
      password: $password
    ) {
      status
    }
  }
`
