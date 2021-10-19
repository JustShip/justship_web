import { gql } from 'graphql-tag'
export default gql`
  mutation emailCodeAuth($email: String!, $code: String!) {
    emailCodeAuth(email: $email, code: $code) {
      status
      token
    }
  }
`
