import { gql } from '@apollo/client'

gql`
  query Me {
    me {
      id
      email
      role
      verified
    }
  }
  query Restaurants($restaurantsInput: RestaurantsInput!) {
    restaurants(input: $restaurantsInput) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        address
        isPromoted
        category {
          name
        }
      }
    }
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
  }
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
  mutation VerifyEmail($input: VerifyEmailInputType!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`
