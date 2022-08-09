import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { LoginMutation, useLoginMutation } from '../graphql/__generated__';

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState, clearErrors } =
    useForm<ILoginForm>({ mode: 'onBlur' });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [
    loginMutation,
    {
      data: loginMutationResult,
      loading: loginMutationLoading,
      error: loginMutationError,
    },
  ] = useLoginMutation({
    onCompleted,
  });
  const onSubmit = ({ email, password }: ILoginForm) => {
    if (loginMutationLoading || loginMutationError) return;
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-800'>
      <div className='bg-white w-full max-w-sm pt-6 pb-7 rounded-lg text-center'>
        <h3 className='font-bold text-2xl text-gray-800'>Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col mt-5 px-5 space-y-3'
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
          <button className='button'>
            {loginMutationLoading ? 'Loading...' : 'Log In'}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
}
