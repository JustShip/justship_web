import { gql } from 'graphql-tag'
export default gql`
  mutation signUp(
    $email: String!
    $password: String!
  ) {
    signUp(
      email: $email
      password: $password
    ) {
      status
    }
  }
`
