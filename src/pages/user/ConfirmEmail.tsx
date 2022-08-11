import { useEffect } from 'react'
import { useVerifyEmailMutation } from '../../graphql/__generated__'

export default function ConfirmEmail() {
  const [veryfyEmail, { data, loading: veryfyEmailLoading, error }] =
    useVerifyEmailMutation()
  useEffect(() => {}, [])
  return (
    <div className='mt-60 flex flex-col items-center justify-center'>
      <h2 className='text-lg mb-2 font-thin'>Confirming Email...</h2>
      <h4 className='text-green-500 font-thin'>
        Please wait, don't close thie page.
      </h4>
    </div>
  )
}
