import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function UnLoggedInRouter() {
  const onClick = () => {
    isLoggedInVar(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: 'onBlur' });
  const onValid = ({ email, password }: LoginFormValues) => {
    console.log(email, password);
  };
  return (
    <div>
      <h1 className='text-5xl font-bold'>Log In</h1>
      <button onClick={onClick}>Click to Login</button>

      <form onSubmit={handleSubmit(onValid)} className='flex flex-col'>
        <input
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일이 형식에 맞지 않습니다.',
            },
          })}
          placeholder='Email'
        />
        <span>{errors.email?.message}</span>
        <input
          {...register('password', { required: '비밀번호를 입력해주세요' })}
          placeholder='Password'
        />
        <span>{errors.password?.message}</span>
        <button>Login</button>
      </form>
    </div>
  );
}
