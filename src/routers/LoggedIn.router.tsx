import { Navigate, Route, Routes } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { useMeQuery, UserRole } from '../graphql/__generated__';
import NotFound from '../pages/404';
import Restaurant from '../pages/client/Restaurant';

const RoleRoute = (role: UserRole) => {
  if (role) {
    if (role === UserRole.Client) {
      return <Restaurant />;
    }
    if (role === UserRole.Delivery) {
      return <>Delivery</>;
    }
    if (role === UserRole.Owner) {
      return <>Owner</>;
    }
  } else {
    return null;
  }
};

export default function LoggedInRouter() {
  const logout = () => {
    isLoggedInVar(false);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
  };

  const { data: meData, loading: meLoading, error: meError } = useMeQuery();
  if (!meData || meLoading || meError) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wide'>Loading...</span>
      </div>
    );
  }
  return (
    <Routes>
      <Route path='/' element={RoleRoute(meData.me.role) || <NotFound />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
