import { isLoggedInVar } from '../apollo';

export default function LoggedOutRouter() {
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <div>
      <h1 className='text-5xl font-bold'>Logged out</h1>
      <button onClick={onClick}>Click to Login</button>
    </div>
  );
}
