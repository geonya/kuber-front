import { isLoggedInVar } from '../apollo';

export default function LoggedInRouter() {
  const onClick = () => {
    isLoggedInVar(false);
  };

  return (
    <div>
      <h1 className='text-5xl font-bold'>Logged In</h1>
      <button onClick={onClick}>Click to Log Out</button>
    </div>
  );
}
