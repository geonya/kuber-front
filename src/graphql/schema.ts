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
