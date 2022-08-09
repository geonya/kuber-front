import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center space-y-6'>
      <h2 className='font-semibold text-2xl'>
        <strong className='text-red-400'>404 Error</strong> : Page Not Found
      </h2>
      <h4>Sorry, This page doesn't exists or has moved. 😭</h4>
      <Link className='button button__green--hover' to='/'>
        Go Back Home &rarr;
      </Link>
    </div>
  );
}
