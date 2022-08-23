import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../components/FormButton'
import { FormError } from '../components/FormError'
import { useCreateAccountMutation, UserRole } from '../graphql/__generated__'
import { ILoginState } from './Login'
import { Helmet } from 'react-helmet-async'
import { logoSymbol } from '../hooks/useSymbols'

interface ICreateAccountForm {
  email: string
  password: string
  role: UserRole
}

export default function CreateAccount() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState, clearErrors, getValues } =
    useForm<ICreateAccountForm>({
      mode: 'onBlur',
      defaultValues: {
        role: UserRole.Client,
      },
    })

  const [
    createAccountMutation,
    {
      data: createAccountResult,
      loading: createAccountLoading,
      error: createAccountError,
    },
  ] = useCreateAccountMutation({
    onCompleted: (data) => {
      const {
        createAccount: { ok },
      } = data
      if (ok) {
        const loginState: ILoginState = {
          email: getValues('email'),
          password: getValues('password'),
        }
        navigate('/', {
          state: loginState,
        })
      }
    },
  })

  const onSubmit = ({ email, password, role }: ICreateAccountForm) => {
    if (createAccountLoading || createAccountError) return
    createAccountMutation({
      variables: {
        createAccountInput: {
          email,
          password,
          role,
        },
      },
    })
  }
  return (
    <div className='h-screen flex items-center flex-col mt-10 lg:mt-28'>
      <Helmet>
        <title>Create Account | Kuber Eats</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
        {logoSymbol(121, 21)}
        <h4 className='w-full text-left text-xl font-medium'>
          Hello, Awesome people 🙋🏻‍♂️
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col mt-5 space-y-3'
        >
          <input
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
          <select
            {...register('role', {
              required: '역할을 선택해주세요.',
            })}
            className='input'
          >
            {Object.keys(UserRole).map((role, i) => (
              <option key={i}>{role}</option>
            ))}
          </select>
          {formState.errors.role?.message && (
            <FormError errorMessage={formState.errors.role?.message} />
          )}
          <FormButton
            loading={createAccountLoading}
            isValid={formState.isValid}
            actionText='Log In'
          />
          {createAccountResult?.createAccount.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
        </form>
        <div className='mt-5'>
          <span>Already have an account ?</span>{' '}
          <Link to={'/'}>
            <span className='cursor-pointer text-green-500 hover:underline underline-offset-4'>
              Log In now
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
