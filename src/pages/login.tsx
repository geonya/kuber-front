import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import FormButton from '../components/FormButton'
import { FormError } from '../components/FormError'
import { LoginMutation, useLoginMutation } from '../graphql/__generated__'
import { isLoggedInVar, authTokenVar } from '../apollo'
import { LOCALSTORAGE_TOKEN } from '../constants'
import { Helmet } from 'react-helmet-async'
import Title from '../components/Title'
import { logoSymbol } from '../hooks/useSymbols'

interface ILoginForm {
  email: string
  password: string
}

export interface ILoginState extends ILoginForm {}

export default function Login() {
  const loginState = useLocation()?.state as ILoginState
  const { register, handleSubmit, formState, clearErrors } =
    useForm<ILoginForm>({
      mode: 'onBlur',
      defaultValues: {
        email: loginState?.email || '',
        password: loginState?.password || '',
      },
    })
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token)
      authTokenVar(token)
      isLoggedInVar(true)
    }
  }
  const [
    loginMutation,
    {
      data: loginMutationResult,
      loading: loginMutationLoading,
      error: loginMutationError,
    },
  ] = useLoginMutation({
    onCompleted,
  })
  const onSubmit = ({ email, password }: ILoginForm) => {
    if (loginMutationLoading || loginMutationError) return
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    })
  }
  return (
    <div className='h-screen flex items-center flex-col mt-10 lg:mt-28'>
      <Helmet>
        <title>Login | Kuber Eats</title>
      </Helmet>

      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
        {logoSymbol(121, 21)}
        <Title title="Let's Get Started 🚀" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full grid gap-3 mt-5'
        >
          <input
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일이 형식에 맞지 않습니다.',
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
                message: '비밀번호는 최소 4자 이상이여야 합니다.',
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
            loading={loginMutationLoading}
            isValid={formState.isValid}
            actionText='Log In'
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className='mt-5'>
          <span>New to Kuber ?</span>{' '}
          <Link to={'/create-account'}>
            <span className='cursor-pointer text-green-500 hover:underline underline-offset-4'>
              Create Account
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
