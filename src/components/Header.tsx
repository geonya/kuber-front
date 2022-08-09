import { Link } from 'react-router-dom';
import useMe from '../hooks/userMe';
import { logoSymbol, userSymbol } from './Symbols';

export default function Header() {
  const { data } = useMe();
  return (
    <header className='py-4 px-5 xl:px-0'>
      <div className='w-full max-w-screen-xl mx-auto flex items-center justify-between'>
        {logoSymbol(121, 21)}
        <span className='text-xs'>
          <Link to='/users'>{userSymbol(48, 48)}</Link>
          {data?.me.email}
        </span>
      </div>
    </header>
  );
}
