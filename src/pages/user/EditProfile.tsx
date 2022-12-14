import { gql, useApolloClient } from '@apollo/client'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import FormButton from '../../components/FormButton'
import { FormError } from '../../components/FormError'
import Title from '../../components/Title'
import { useEditProfileMutation } from '../../graphql/__generated__'
import useMe from '../../hooks/userMe'

interface IFormProps {
  email?: string
  password?: string
}

export default function EditProfile() {
  const client = useApolloClient()
  const { data: userData } = useMe()
  const { register, handleSubmit, formState, clearErrors, getValues } =
    useForm<IFormProps>({
      mode: 'onBlur',
      defaultValues: {
        email: userData?.me.email || '',
        password: '',
      },
    })
  const [editProfile, { loading: EditProfileLoading }] = useEditProfileMutation(
    {
      onCompleted: async (data) => {
        if (data.editProfile.ok && userData?.me) {
          const {
            me: { email: prevEmail, id },
          } = userData
          const { email: newEmail } = getValues()
          if (prevEmail !== newEmail) {
            client.writeFragment({
              id: `User:${id}`,
              fragment: gql`
                fragment EditedUser on User {
                  verified
                  email
                }
              `,
              data: {
                email: newEmail,
                verified: false,
              },
            })
          }
        }
      },
    },
  )
  const onSubmit = ({ email, password }: IFormProps) => {
    if (EditProfileLoading) return
    editProfile({
      variables: {
        input: {
          email,
          ...(password && {}),
        },
      },
    })
  }
  return (
    <div className='mt-52 flex flex-col justify-center items-center'>
      <Helmet>
        <title>Edit Profile | Kuber Eats</title>
      </Helmet>
      <Title title='Edit Profile' />
      <form
        className='w-full grid gap-3 mt-5 max-w-screen-sm'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('email', {
            required: '???????????? ??????????????????.',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '???????????? ????????? ?????? ????????????.',
            },
            onChange: () => clearErrors(),
          })}
          type='text'
          placeholder='Email'
          className='input'
        />
        {formState.errors.email?.message && (
          <FormError errorMessage={formState.errors.email?.message} />
        )}
        <input
          {...register('password', {
            minLength: {
              value: 4,
              message: '??????????????? ?????? 4??? ??????????????? ?????????.',
            },
            onChange: () => clearErrors(),
          })}
          type='password'
          placeholder='Password'
          className='input'
        />
        {formState.errors.password?.message && (
          <FormError errorMessage={formState.errors.password?.message} />
        )}
        <FormButton
          isValid={!EditProfileLoading}
          loading={EditProfileLoading}
          actionText='Update Profile'
        />
      </form>
    </div>
  )
}
