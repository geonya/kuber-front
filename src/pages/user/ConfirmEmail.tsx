import { gql, useApolloClient } from '@apollo/client'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useVerifyEmailMutation } from '../../graphql/__generated__'
import useMe from '../../hooks/userMe'

export default function ConfirmEmail() {
  const { data: userData } = useMe()
  const client = useApolloClient()
  const navigate = useNavigate()
  const [veryfyEmail, { loading: veryfyEmailLoading }] = useVerifyEmailMutation(
    {
      onCompleted: (data) => {
        if (data.verifyEmail.ok && userData?.me.id) {
          client.writeFragment({
            id: `User:${userData.me.id}`,
            fragment: gql`
              fragment verifiedUser on User {
                verified
              }
            `,
            data: {
              verified: true,
            },
          })
        }
        navigate('/')
      },
    },
  )
  useEffect(() => {
    const [, code] = window.location.href.split('code=')
    veryfyEmail({
      variables: {
        input: {
          code,
        },
      },
    })
  }, [veryfyEmail])

  return (
    <div className='mt-60 flex flex-col items-center justify-center'>
      <Helmet>
        <title>Verify Email | Kuber</title>
      </Helmet>
      {veryfyEmailLoading ? (
        <h2 className='text-lg mb-2 font-thin'>Loading...</h2>
      ) : (
        <>
          <h2 className='text-lg mb-2 font-thin'>Confirming Email...</h2>
          <h4 className='text-green-500 font-thin'>
            Please wait, don't close thie page.
          </h4>
        </>
      )}
    </div>
  )
}
