import { gql } from '@apollo/client'

const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    address
    isPromoted
    category {
      name
    }
  }
`

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
       ...RestaurantParts
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
    ${RESTAURANT_FRAGMENT}
  }

  query SearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
       ...RestaurantParts
      }
    }
    ${RESTAURANT_FRAGMENT}
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
